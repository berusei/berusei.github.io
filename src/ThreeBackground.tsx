/* ===========================================================================
   ThreeBackground.tsx — three.js / WebGL のシンプルな 3D 背景（React + TypeScript）
   使い方:
     <ThreeBackground motif="particles" />   // particles | grid | contour
     <main style={{ position: 'relative', zIndex: 1 }}>...</main>
   three.js は CDN から動的 import するため、npm install / @types/three は不要です。
   （バンドルする場合は import * as THREE from 'three' に差し替え、
     下の動的 import 部分を置き換えてください）
   strict / noUncheckedIndexedAccess 有効でも型エラーは出ません。
   =========================================================================== */
import { useEffect, useRef, type CSSProperties } from 'react';

export type MotifName = 'particles' | 'grid' | 'contour';

export interface ThreeBackgroundOptions {
  /** 表示するモチーフ */
  motif?: MotifName;
  /** 動きの速さ（1 = 標準） */
  speed?: number;
  /** 粒子・格子の密度（1 = 標準） */
  density?: number;
  /** 濃い部分の色 */
  ink?: string;
  /** 接続線・淡い部分の色 */
  line?: string;
  /** particles の粒子色 */
  dot?: string;
  /** アクセント色 */
  accent?: string;
  /** 下地の色。'transparent' で背後を透かす */
  background?: string;
  /** マウス追従（視差） */
  parallax?: boolean;
  /** スクロール連動 */
  scroll?: boolean;
  /** クリックで波紋 */
  click?: boolean;
  /** particles にアクセント色の点を混ぜる */
  accentDots?: boolean;
  /** three.js の ESM URL */
  threeUrl?: string;
}

export interface ThreeBackgroundApi {
  /** モチーフを差し替える（再生成なし） */
  setMotif(name: MotifName): void;
  /** イベントと WebGL リソースを解放する */
  destroy(): void;
}

/** 各モチーフが返す内部インターフェース */
interface MotifImpl {
  scene: any;
  camera: any;
  resize(w: number, h: number): void;
  update(t: number, dt: number): void;
  dispose(): void;
}

function createThreeBackground(
  container: HTMLElement,
  options?: ThreeBackgroundOptions
): ThreeBackgroundApi {
  var o: Required<ThreeBackgroundOptions> = Object.assign({
    motif: 'particles',      // 'particles' | 'grid' | 'contour'
    speed: 1,                // 動きの速さ
    density: 1,              // 粒子・格子の密度
    ink: '#0a0a0a',
    line: '#f5f5f5',
    dot: '#e2e2e2',          // particles の粒子色（白寄りグレー）
    accent: '#007853',
    background: '#ffffff',   // 'transparent' で下地を透かす
    parallax: true,          // マウス追従（視差）
    scroll: true,            // スクロール連動
    click: true,             // クリックで波紋
    accentDots: false,       // particles に緑のアクセント点を混ぜるか
    threeUrl: 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'
  }, options || {});

  var disposed = false;
  var motif: any = null, renderer: any = null, THREE: any = null;
  var api: ThreeBackgroundApi = {
    setMotif: function (name: MotifName) { o.motif = name; if (THREE) { swap(); } },
    destroy: function () { disposed = true; teardown(); }
  };

  var isMobile = matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(canvas);

  var pointer = { x: 0, y: 0 }, aim = { x: 0, y: 0 }, scrollP = 0;
  var ripple = { x: 0, y: 0, t: -10 };
  var listeners: Array<[any, string, any]> = [];
  function on(el: any, ev: string, fn: any, opt?: AddEventListenerOptions) { el.addEventListener(ev, fn, opt || { passive: true }); listeners.push([el, ev, fn]); }

  import(/* @vite-ignore */ /* webpackIgnore: true */ o.threeUrl).then(function (mod: any) { if (!disposed) start(mod); })
    .catch(function (e: unknown) { console.warn('[three-bg] three.js の読み込みに失敗:', e); });

  function start(mod: any) {
    THREE = mod;
    var alpha = o.background === 'transparent';
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !isMobile, alpha: alpha, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    if (alpha) renderer.setClearAlpha(0); else renderer.setClearColor(new THREE.Color(o.background), 1);

    if (o.parallax) on(window, 'pointermove', function (e: PointerEvent) {
      aim.x = (e.clientX / innerWidth) * 2 - 1;
      aim.y = (e.clientY / innerHeight) * 2 - 1;
    });
    if (o.scroll) on(window, 'scroll', function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      scrollP = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    });
    if (o.click) on(window, 'pointerdown', function (e: PointerEvent) {
      ripple.x = (e.clientX / innerWidth) * 2 - 1;
      ripple.y = -((e.clientY / innerHeight) * 2 - 1);
      ripple.t = clock();
    });

    swap();
    resize();
    if ('ResizeObserver' in window) { var ro = new ResizeObserver(resize); ro.observe(container); listeners.push([{ removeEventListener: function () { ro.disconnect(); } }, '', null]); }
    else on(window, 'resize', resize);
    on(document, 'visibilitychange', function () { if (!document.hidden) tick(); });

    if (reduced) { motif.update(0, 0); renderer.render(motif.scene, motif.camera); }
    else tick();
  }

  function swap() {
    if (motif) motif.dispose();
    motif = (o.motif === 'grid' ? buildGrid : o.motif === 'contour' ? buildContour : buildParticles)();
    resize();
  }

  function resize() {
    if (!renderer || !motif) return;
    var w = container.clientWidth || innerWidth, h = container.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    motif.resize(w, h);
    if (reduced) renderer.render(motif.scene, motif.camera);
  }

  var t0 = performance.now(), last = 0, raf = 0;
  function clock() { return (performance.now() - t0) / 1000; }
  function tick() {
    cancelAnimationFrame(raf);
    if (disposed || document.hidden) return;
    raf = requestAnimationFrame(tick);
    var t = clock() * o.speed, dt = Math.min(0.05, t - last); last = t;
    pointer.x += (aim.x - pointer.x) * 0.045;
    pointer.y += (aim.y - pointer.y) * 0.045;
    motif.update(t, dt);
    renderer.render(motif.scene, motif.camera);
  }

  function teardown() {
    cancelAnimationFrame(raf);
    listeners.forEach(function (l: [any, string, any]) { l[0].removeEventListener(l[1], l[2]); });
    listeners = [];
    if (motif) motif.dispose();
    if (renderer) renderer.dispose();
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  }

  /* --- モチーフ 1: 粒子＋近接線 ------------------------------------------ */
  function buildParticles(): MotifImpl {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, 1, 1, 400);
    camera.position.set(0, 0, 78);
    var group = new THREE.Group(); scene.add(group);

    var N = Math.max(30, Math.round((isMobile ? 70 : 150) * o.density));
    var B = { x: 120, y: 74, z: 56 };
    var pos = new Float32Array(N * 3), vel = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * B.x;
      pos[i * 3 + 1] = (Math.random() - 0.5) * B.y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * B.z;
      vel[i * 3] = (Math.random() - 0.5) * 1.6;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
    }
    var pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var pm = new THREE.PointsMaterial({ color: new THREE.Color(o.dot || o.line), size: 2.4, sizeAttenuation: true, transparent: true, opacity: 0.95 });
    group.add(new THREE.Points(pg, pm));

    var MAXSEG = isMobile ? 220 : 520, R = 22;
    var lpos = new Float32Array(MAXSEG * 6);
    var lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(lpos, 3));
    lg.setDrawRange(0, 0);
    var lm = new THREE.LineBasicMaterial({ color: new THREE.Color(o.line), transparent: true, opacity: 0.7 });
    group.add(new THREE.LineSegments(lg, lm));

    // アクセント: 少数の粒子だけ緑
    var ag: any = null, acc: Float32Array | null = null;
    if (o.accentDots) {
      ag = new THREE.BufferGeometry();
      acc = new Float32Array(9);
      ag.setAttribute('position', new THREE.BufferAttribute(acc, 3));
      group.add(new THREE.Points(ag, new THREE.PointsMaterial({ color: new THREE.Color(o.accent), size: 4.2, sizeAttenuation: true })));
    }

    var frame = 0;
    // noUncheckedIndexedAccess でも number として読むための添字ヘルパ
    function at(buf: Float32Array, i: number): number { return buf[i] || 0; }
    function links() {
      var n = 0;
      for (var a = 0; a < N && n < MAXSEG; a++) {
        var ax = at(pos, a * 3), ay = at(pos, a * 3 + 1), az = at(pos, a * 3 + 2);
        for (var b = a + 1; b < N && n < MAXSEG; b++) {
          var bx = at(pos, b * 3), by = at(pos, b * 3 + 1), bz = at(pos, b * 3 + 2);
          var dx = ax - bx, dy = ay - by, dz = az - bz;
          if (dx * dx + dy * dy + dz * dz < R * R) {
            var k = n * 6;
            lpos[k] = ax; lpos[k + 1] = ay; lpos[k + 2] = az;
            lpos[k + 3] = bx; lpos[k + 4] = by; lpos[k + 5] = bz;
            n++;
          }
        }
      }
      lg.attributes.position.needsUpdate = true;
      lg.setDrawRange(0, n * 2);
    }

    return {
      scene: scene, camera: camera,
      resize: function (w: number, h: number) { camera.aspect = w / h; camera.updateProjectionMatrix(); },
      update: function (t: number, dt: number) {
        var age = t - ripple.t, push = age >= 0 && age < 1.2 ? (1 - age / 1.2) : 0;
        var rx = ripple.x * B.x * 0.5, ry = ripple.y * B.y * 0.5;
        for (var i = 0; i < N; i++) {
          var ix = i * 3;
          var px = at(pos, ix), py = at(pos, ix + 1), pz = at(pos, ix + 2);
          var vx = at(vel, ix), vy = at(vel, ix + 1), vz = at(vel, ix + 2);
          if (push > 0) {
            var dx = px - rx, dy = py - ry;
            var d = Math.max(6, Math.sqrt(dx * dx + dy * dy));
            var kick = push * 3.2 * dt * 60 * 0.02;
            vx += (dx / d) * kick;
            vy += (dy / d) * kick;
          }
          vx *= 0.995; vy *= 0.995;
          px += vx * dt; py += vy * dt; pz += vz * dt;
          if (px > B.x / 2) px -= B.x; else if (px < -B.x / 2) px += B.x;
          if (py > B.y / 2) py -= B.y; else if (py < -B.y / 2) py += B.y;
          if (pz > B.z / 2) pz -= B.z; else if (pz < -B.z / 2) pz += B.z;
          pos[ix] = px; pos[ix + 1] = py; pos[ix + 2] = pz;
          vel[ix] = vx; vel[ix + 1] = vy; vel[ix + 2] = vz;
        }
        pg.attributes.position.needsUpdate = true;
        if (ag && acc) {
          for (var j = 0; j < 3; j++) {
            acc[j * 3] = at(pos, j * 3); acc[j * 3 + 1] = at(pos, j * 3 + 1); acc[j * 3 + 2] = at(pos, j * 3 + 2);
          }
          ag.attributes.position.needsUpdate = true;
        }
        if (++frame % 3 === 0 || reduced) links();
        group.rotation.y = pointer.x * 0.14;
        group.rotation.x = pointer.y * 0.09;
        group.position.y = scrollP * 26;
        group.position.z = scrollP * 18;
      },
      dispose: function () { pg.dispose(); lg.dispose(); if (ag) ag.dispose(); pm.dispose(); lm.dispose(); }
    };
  }

  /* --- モチーフ 2: ワイヤーフレームのグリッド波 -------------------------- */
  function buildGrid(): MotifImpl {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 1, 900);
    camera.position.set(0, 34, 130);
    camera.lookAt(0, 0, -40);

    var S = 300, seg = Math.max(14, Math.round((isMobile ? 26 : 44) * o.density));
    var step = S / seg, verts: number[] = [];
    for (var i = 0; i <= seg; i++) {
      for (var j = 0; j < seg; j++) {
        var x0 = -S / 2 + j * step, x1 = x0 + step, z = -S / 2 + i * step;
        verts.push(x0, 0, z, x1, 0, z);                       // 横線
        verts.push(z, 0, x0, z, 0, x1);                       // 縦線
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));

    var m = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 }, uAmp: { value: 13 }, uRipple: { value: new THREE.Vector3(0, 0, -10) },
        uInk: { value: new THREE.Color(o.ink) }, uLine: { value: new THREE.Color(o.line) }, uAccent: { value: new THREE.Color(o.accent) }
      },
      vertexShader: [
        'uniform float uTime; uniform float uAmp; uniform vec3 uRipple;',
        'varying float vH; varying float vFade;',
        'void main(){',
        '  vec3 p = position;',
        '  float h = sin(p.x*0.042 + uTime*0.55) * cos(p.z*0.036 - uTime*0.4);',
        '  h += 0.45 * sin((p.x + p.z) * 0.026 + uTime * 0.8);',
        '  float age = uRipple.z;',
        '  if (age >= 0.0 && age < 2.4) {',
        '    float d = length(p.xz - uRipple.xy);',
        '    h += sin(d*0.16 - age*5.0) * exp(-d*0.014) * (1.0 - age/2.4) * 1.6;',
        '  }',
        '  p.y += h * uAmp;',
        '  vH = clamp(h*0.5+0.5, 0.0, 1.0);',
        '  vFade = clamp(1.0 - length(p.xz)/190.0, 0.0, 1.0);',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform vec3 uInk; uniform vec3 uLine; uniform vec3 uAccent;',
        'varying float vH; varying float vFade;',
        'void main(){',
        '  vec3 c = mix(uLine, uInk, smoothstep(0.5, 1.0, vH));',
        '  c = mix(c, uAccent, smoothstep(0.93, 1.0, vH));',
        '  gl_FragColor = vec4(c, (0.25 + 0.6*vH) * vFade);',
        '}'
      ].join('\n')
    });
    var lines = new THREE.LineSegments(g, m);
    scene.add(lines);

    return {
      scene: scene, camera: camera,
      resize: function (w: number, h: number) { camera.aspect = w / h; camera.updateProjectionMatrix(); },
      update: function (t: number) {
        m.uniforms.uTime.value = t;
        m.uniforms.uRipple.value.set(ripple.x * 150, -ripple.y * 90 - 40, t - ripple.t);
        lines.rotation.y = pointer.x * 0.06;
        camera.position.x = pointer.x * 14;
        camera.position.y = 34 - pointer.y * 8 + scrollP * 40;
        camera.lookAt(0, 0, -40 + scrollP * 60);
      },
      dispose: function () { g.dispose(); m.dispose(); }
    };
  }

  /* --- モチーフ 3: ノイズの等高線 ---------------------------------------- */
  function buildContour(): MotifImpl {
    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    var g = new THREE.PlaneGeometry(2, 2);
    var m = new THREE.ShaderMaterial({
      transparent: true, depthTest: false, depthWrite: false,
      uniforms: {
        uTime: { value: 0 }, uAspect: { value: 1 }, uMouse: { value: new THREE.Vector2() },
        uScroll: { value: 0 }, uRipple: { value: new THREE.Vector3(0, 0, -10) },
        uInk: { value: new THREE.Color(o.ink) }, uLine: { value: new THREE.Color(o.line) }, uAccent: { value: new THREE.Color(o.accent) }
      },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
      fragmentShader: [
        'precision highp float;',
        'uniform float uTime, uAspect, uScroll; uniform vec2 uMouse; uniform vec3 uRipple;',
        'uniform vec3 uInk, uLine, uAccent; varying vec2 vUv;',
        'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
        'float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);',
        '  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }',
        'float fbm(vec2 p){ float s = 0.0, a = 0.5; for(int k=0;k<' + (isMobile ? 3 : 4) + ';k++){ s += a*noise(p); p *= 2.03; a *= 0.5; } return s; }',
        'void main(){',
        '  vec2 uv = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.6;',
        '  uv += uMouse * 0.22;',
        '  uv.y += uScroll * 1.4;',
        '  float f = fbm(uv * 1.15 + vec2(uTime * 0.035, uTime * -0.02));',
        '  float age = uRipple.z;',
        '  if (age >= 0.0 && age < 2.6) {',
        '    float d = length(uv - uRipple.xy * vec2(uAspect,1.0) * 1.3);',
        '    f += sin(d*7.0 - age*5.0) * exp(-d*1.6) * (1.0 - age/2.6) * 0.11;',
        '  }',
        '  float bands = 9.0;',
        '  float g = abs(fract(f * bands) - 0.5) * 2.0;',
        '  float w = fwidth(f * bands) * 2.2 + 0.02;',
        '  float ink = 1.0 - smoothstep(0.0, w * 2.0, g);',
        '  float band = mod(floor(f * bands), 5.0);',
        '  vec3 c = mix(uLine, uInk, 0.55);',
        '  if (band < 0.5) c = uAccent;',
        '  gl_FragColor = vec4(c, ink * 0.55);',
        '}'
      ].join('\n')
    });
    scene.add(new THREE.Mesh(g, m));
    return {
      scene: scene, camera: camera,
      resize: function (w: number, h: number) { m.uniforms.uAspect.value = w / h; },
      update: function (t: number) {
        m.uniforms.uTime.value = t;
        m.uniforms.uMouse.value.set(pointer.x, -pointer.y);
        m.uniforms.uScroll.value = scrollP;
        m.uniforms.uRipple.value.set(ripple.x, ripple.y, t - ripple.t);
      },
      dispose: function () { g.dispose(); m.dispose(); }
    };
  }

  return api;
}

export interface ThreeBackgroundProps extends ThreeBackgroundOptions {
  /** 背景レイヤーの追加スタイル（position / inset も上書き可） */
  style?: CSSProperties;
  className?: string;
}

export default function ThreeBackground({
  motif = 'particles',
  speed = 1,
  density = 1,
  ink = '#0a0a0a',
  line = '#d4d4d4',
  dot = '#e2e2e2',
  accent = '#007853',
  background = '#ffffff',
  parallax = true,
  scroll = true,
  click = true,
  accentDots = false,
  threeUrl,
  style,
  className,
}: ThreeBackgroundProps) {
  const host = useRef<HTMLDivElement | null>(null);
  const bg = useRef<ThreeBackgroundApi | null>(null);
  const first = useRef(true);

  // 生成は一度だけ（色・速度などを変えたい場合は key を変えて再マウント）
  useEffect(() => {
    if (!host.current) return;
    bg.current = createThreeBackground(host.current, {
      motif, speed, density, ink, line, dot, accent, background,
      parallax, scroll, click, accentDots,
      ...(threeUrl ? { threeUrl } : {}),
    });
    return () => {
      bg.current?.destroy();
      bg.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // motif の切り替えだけは作り直さずに反映
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    bg.current?.setMotif(motif);
  }, [motif]);

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={className}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', ...style }}
    />
  );
}

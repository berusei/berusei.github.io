/**
 * Works の出現アニメーション。静的な index.html にインライン展開するので、
 * ビルド対象にせず素の ES5 相当の文字列として持つ。
 */
export const worksRevealScript = `(function () {
    var list = document.querySelector('.works');
    if (list === null || !('IntersectionObserver' in window)) return;

    list.classList.add('js-reveal');

    // 隠した状態を一度描画させてから監視する。同じフレームで is-visible を
    // 付けると変化前の値が描画されず、transition が発火しない。
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            var observer = new IntersectionObserver(function (entries) {
                for (var i = 0; i < entries.length; i += 1) {
                    if (!entries[i].isIntersecting) continue;
                    entries[i].target.classList.add('is-visible');
                    observer.unobserve(entries[i].target);
                }
            }, { threshold: 0.15 });

            var works = list.querySelectorAll('.work');
            for (var j = 0; j < works.length; j += 1) observer.observe(works[j]);
        });
    });
})();`;

export interface NavLink {
    readonly label: string;
    readonly href: string;
}

export const siteMeta = {
    title: 'Berusei',
    description: 'フルスタックになりたいWEBENGINEERのポートフォリオサイト',
    lang: 'ja',
    locale: 'ja_JP',
    siteName: 'berusei',
    /** OGP の絶対 URL 生成に使う起点。末尾スラッシュ必須。 */
    origin: 'https://berusei.github.io/',
    themeColor: '#ffffff',
    twitterHandle: '@sail_vrc',
} as const;

export const siteImage = {
    path: 'photo.jpg',
    type: 'image/jpeg',
    width: 1254,
    height: 1254,
    alt: 'ドット絵にした愛用のデルタフレアちゃん',
} as const;

/** OGP / canonical はクローラの都合で相対 URL が使えないため絶対化する。 */
export function absoluteUrl(path: string): string {
    return new URL(path, siteMeta.origin).href;
}

export const profile = {
    name: 'Berusei',
    role: 'Web エンジニア',
    location: '日本 / リモート',
} as const;

export const navLinks: readonly NavLink[] = [
    { label: 'WORKS', href: '#works' },
    { label: 'PROFILE', href: '#profile' },
    { label: 'RESUME', href: '#resume' },
    { label: 'CONTACT', href: '#contact' },
];

export const footerLinks: readonly NavLink[] = navLinks;

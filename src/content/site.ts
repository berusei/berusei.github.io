export interface NavLink {
    readonly label: string;
    readonly href: string;
}

export const siteMeta = {
    title: 'berusei',
    description: 'フルスタックになりたいWEBENGINEERのポートフォリオサイト',
    lang: 'ja',
} as const;

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

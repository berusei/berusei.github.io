import type { ReactNode } from 'react';
import { factLink, githubLink } from '../components/icons.tsx';

export interface ProfileFact {
    readonly label: string;
    readonly value: ReactNode;
}

export interface ProfilePhoto {
    readonly src: string;
    readonly alt: string;
}

export const profilePhoto: ProfilePhoto = {
    src: '/photo.jpg',
    alt: 'Berusei のプロフィール写真',
};

export const profileBody: readonly ReactNode[] = [
    <>
    2022年12月からPHPを中心としたバックエンドエンジニアをやってます。
    </>
];

export const profileFacts: readonly ProfileFact[] = [
    { label: '名前', value: 'Berusei / Kento Ikeda' },
    { label: '出身', value: '千葉県' },
    { label: '関心', value: 'Web開発、生成AI' },
    { label: '趣味', value: 'ゲーム、VR、音楽鑑賞、読書、創作' },
    { label: 'スキル', value: githubLink('https://github.com/berusei') },
    { label: 'リンク', value: factLink('Qiita', 'https://qiita.com/beru_ike') },
];

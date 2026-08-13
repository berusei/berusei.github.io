import type { ContactIcon } from '../components/icons.tsx';

export interface ContactChannel {
    readonly label: string;
    readonly value: string;
    readonly href: string;
    readonly icon: ContactIcon;
}

export const contactChannels: readonly ContactChannel[] = [
    {
        label: 'DISCORD',
        value: 'beruamo',
        href: 'https://discord.com/channels/@me',
        icon: 'discord',
    },
    {
        label: 'X',
        value: '@sail_vrc',
        href: 'https://x.com/sail_vrc',
        icon: 'x'
    },
    {
        label: 'VRCHAT',
        value: 'シン・べるしー',
        href: 'https://vrchat.com/home/user/usr_afa4f111-23e6-4c48-9d9f-94c330abd4dd',
        icon: 'vrchat',
    },
    {
        label: 'GITHUB',
        value: 'berusei (personal)',
        href: 'https://github.com/berusei',
        icon: 'github',
    },
    {
        label: 'GITHUB',
        value: 'KentoIkeda (works)',
        href: 'https://github.com/KentoIkeda',
        icon: 'github',
    },
];

export const contactLede =
    '恐らくですがDiscordが一番早いです。XやVRChatでも受け付けてます。お気軽にどうぞ。';

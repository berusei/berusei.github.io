export interface Token {
    readonly name: string;
    readonly value: string;
}

export type ColorToken = Token;

export const brandColors: readonly ColorToken[] = [
    { name: 'turf-50', value: '#e8f4ef' },
    { name: 'turf-100', value: '#c6e4d6' },
    { name: 'turf-300', value: '#6bb99b' },
    { name: 'turf-500', value: '#12926a' },
    { name: 'turf-700', value: '#007853' },
    { name: 'turf-900', value: '#004e36' },
    { name: 'turf-1000', value: '#002d1f' },
];

export const neutralColors: readonly ColorToken[] = [
    { name: 'paper', value: '#fff' },
    { name: 'ink-900', value: '#0a0a0a' },
    { name: 'ink-600', value: '#4a4a4a' },
    { name: 'ink-400', value: '#8c8c8c' },
    { name: 'rule', value: '#d4d4d4' },
    { name: 'fill', value: '#f4f4f4' },
];

export const signalColors: readonly ColorToken[] = [
    { name: 'signal-600', value: '#d81920' },
];

export const frameColors: readonly ColorToken[] = [
    { name: 'frame-1', value: '#fff' },
    { name: 'frame-2', value: '#1a1a1a' },
    { name: 'frame-3', value: '#e60012' },
    { name: 'frame-4', value: '#0068b7' },
    { name: 'frame-5', value: '#f6aa00' },
    { name: 'frame-6', value: '#009944' },
    { name: 'frame-7', value: '#f39800' },
    { name: 'frame-8', value: '#e85298' },
];

export const onBrandColors: readonly ColorToken[] = [
    { name: 'on-brand-75', value: 'rgb(255 255 255 / .75)' },
    { name: 'on-brand-70', value: 'rgb(255 255 255 / .7)' },
    { name: 'on-brand-50', value: 'rgb(255 255 255 / .5)' },
    { name: 'on-brand-25', value: 'rgb(255 255 255 / .25)' },
];

export const fontTokens: readonly Token[] = [
    { name: 'font-jp', value: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif" },
    { name: 'font-en', value: "'Archivo', sans-serif" },
    { name: 'font-mono', value: "'Archivo', monospace" },
    {
        name: 'font-mixed',
        value: "'Archivo', 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif",
    },
];

export const layoutTokens: readonly Token[] = [
    { name: 'content-width', value: '1080px' },
    { name: 'gutter', value: '32px' },
    { name: 'radius', value: '6px' },
];

export const spacingScale: readonly number[] = [8, 16, 24, 40, 64, 96];

export const chipColors: readonly ColorToken[] = [
    ...brandColors,
    ...neutralColors.filter((token) => token.name !== 'paper'),
    ...signalColors,
    ...frameColors,
];

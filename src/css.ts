import { readFileSync } from 'node:fs';
import {
    brandColors,
    fontTokens,
    frameColors,
    layoutTokens,
    neutralColors,
    onBrandColors,
    signalColors,
    type Token,
} from './tokens.ts';

const GENERATED_NOTICE = '/* このファイルは自動生成される。直接編集しないこと。 */';

const tokenGroups: readonly (readonly Token[])[] = [
    brandColors,
    neutralColors,
    signalColors,
    frameColors,
    onBrandColors,
    fontTokens,
    layoutTokens,
];

function declarations(tokens: readonly Token[]): string {
    return tokens.map((token) => `    --${token.name}: ${token.value};`).join('\n');
}

function rootBlock(): string {
    return `:root {\n${tokenGroups.map(declarations).join('\n\n')}\n}`;
}

export function generateTokensCss(): string {
    return [GENERATED_NOTICE, '', rootBlock(), ''].join('\n');
}

export function buildStylesheet(): string {
    const components = readFileSync(new URL('./styles/components.css', import.meta.url), 'utf8');

    return [GENERATED_NOTICE, '', rootBlock(), '', components.trim(), ''].join('\n');
}

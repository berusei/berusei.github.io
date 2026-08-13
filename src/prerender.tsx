import { renderToStaticMarkup } from 'react-dom/server';
import { App } from './App.tsx';
import { buildStylesheet } from './css.ts';
import { renderDocument } from './document.ts';

export function renderHtml(): string {
    return renderDocument({ body: renderToStaticMarkup(<App />) });
}

export function renderCss(): string {
    return buildStylesheet();
}

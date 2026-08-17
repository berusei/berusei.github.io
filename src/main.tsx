import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { worksRevealScript } from './works-reveal.ts';
import './styles/tokens.css';
import './styles/components.css';

const container = document.getElementById('root');
if (container === null) throw new Error('#root が見つかりません');

createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

requestAnimationFrame(() => {
    const script = document.createElement('script');
    script.textContent = worksRevealScript;
    document.body.append(script);
});

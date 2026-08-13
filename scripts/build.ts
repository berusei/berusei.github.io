import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';
import { runnerImport } from 'vite';

interface Prerender {
    renderHtml: () => string;
    renderCss: () => string;
}

const rootUrl = new URL('../', import.meta.url);

const { module: prerender } = await runnerImport<Prerender>(
    fileURLToPath(new URL('./src/prerender.tsx', rootUrl)),
);

const html = await prettier.format(prerender.renderHtml(), {
    parser: 'html',
    printWidth: 110,
    tabWidth: 4,
    htmlWhitespaceSensitivity: 'css',
});

const outputs = [
    { file: 'index.html', contents: html },
    { file: 'styles.css', contents: prerender.renderCss() },
];

for (const output of outputs) {
    writeFileSync(new URL(output.file, rootUrl), output.contents, 'utf8');
    console.log(`書き出し: ${output.file} (${output.contents.length} 文字)`);
}

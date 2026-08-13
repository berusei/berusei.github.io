import { createReadStream, existsSync, writeFileSync } from 'node:fs';
import { extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { generateTokensCss } from './src/css.ts';

const tokensSource = fileURLToPath(new URL('./src/tokens.ts', import.meta.url));
const tokensCssPath = fileURLToPath(new URL('./src/styles/tokens.css', import.meta.url));

const imageTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

function tokensCss(): Plugin {
    const write = () => writeFileSync(tokensCssPath, generateTokensCss(), 'utf8');

    write();

    return {
        name: 'jra-tokens-css',
        buildStart() {
            write();
        },
        configureServer(server) {
            server.watcher.add(tokensSource);
            server.watcher.on('change', (file) => {
                if (file === tokensSource) write();
            });
        },
    };
}

function rootImages(): Plugin {
    return {
        name: 'jra-root-images',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const name = /^\/([\w-]+\.[a-z]+)(?:\?|$)/.exec(req.url ?? '')?.[1];
                const type = name && imageTypes[extname(name).toLowerCase()];
                if (!name || !type) return next();

                const file = fileURLToPath(new URL(`./${name}`, import.meta.url));
                if (!existsSync(file)) return next();

                res.setHeader('Content-Type', type);
                createReadStream(file).pipe(res);
            });
        },
    };
}

export default defineConfig({
    root: 'src',
    plugins: [react(), tokensCss(), rootImages()],
    server: {
        host: '127.0.0.1',
        port: 5173,
    },
});

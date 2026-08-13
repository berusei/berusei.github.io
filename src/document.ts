import { siteMeta } from './content/site.ts';

interface DocumentOptions {
    readonly body: string;
}

function attr(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function renderDocument({ body }: DocumentOptions): string {
    return `<!DOCTYPE html>
<html lang="${attr(siteMeta.lang)}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${attr(siteMeta.title)}</title>
    <meta name="description" content="${attr(siteMeta.description)}">
    <meta name="color-scheme" content="light">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${attr(siteMeta.title)}">
    <meta property="og:description" content="${attr(siteMeta.description)}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="./styles.css">
</head>

<body>
${body}
</body>

</html>
`;
}

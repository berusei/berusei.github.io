import { absoluteUrl, profile, siteImage, siteMeta } from './content/site.ts';

interface DocumentOptions {
    readonly body: string;
}

function attr(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function renderDocument({ body }: DocumentOptions): string {
    const pageUrl = absoluteUrl('./');
    const imageUrl = absoluteUrl(siteImage.path);

    return `<!DOCTYPE html>
<html lang="${attr(siteMeta.lang)}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${attr(siteMeta.title)}</title>
    <meta name="description" content="${attr(siteMeta.description)}">
    <meta name="author" content="${attr(profile.name)}">
    <meta name="color-scheme" content="light">
    <meta name="theme-color" content="${attr(siteMeta.themeColor)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="format-detection" content="telephone=no">
    <link rel="canonical" href="${attr(pageUrl)}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${attr(siteMeta.siteName)}">
    <meta property="og:locale" content="${attr(siteMeta.locale)}">
    <meta property="og:url" content="${attr(pageUrl)}">
    <meta property="og:title" content="${attr(siteMeta.title)}">
    <meta property="og:description" content="${attr(siteMeta.description)}">
    <meta property="og:image" content="${attr(imageUrl)}">
    <meta property="og:image:type" content="${attr(siteImage.type)}">
    <meta property="og:image:width" content="${siteImage.width}">
    <meta property="og:image:height" content="${siteImage.height}">
    <meta property="og:image:alt" content="${attr(siteImage.alt)}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="${attr(siteMeta.twitterHandle)}">
    <meta name="twitter:creator" content="${attr(siteMeta.twitterHandle)}">
    <meta name="twitter:title" content="${attr(siteMeta.title)}">
    <meta name="twitter:description" content="${attr(siteMeta.description)}">
    <meta name="twitter:image" content="${attr(imageUrl)}">
    <meta name="twitter:image:alt" content="${attr(siteImage.alt)}">
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

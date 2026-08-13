import type { ReactNode } from 'react';
import type { Work } from '../content/works.ts';

export function WorkRow({ kind, year, role, title, description, tags, href }: Work) {
    const external = href.startsWith('http');
    const meta = [year, kind, role].filter((value) => value !== '');
    const visibleTags = tags.filter((tag) => tag !== '');

    const body = (
        <>
            <span className="work-row__main">
                <span className="work-row__title">{title}</span>
                {meta.length > 0 && (
                    <span className="work-row__meta">
                        {meta.map((value) => (
                            <span className="work-row__meta-item" key={value}>
                                {value}
                            </span>
                        ))}
                    </span>
                )}
                {description !== '' && <span className="work-row__desc">{description}</span>}
                {visibleTags.length > 0 && (
                    <span className="tag-list">
                        {visibleTags.map((tag) => (
                            <span className="tag" key={tag}>
                                {tag}
                            </span>
                        ))}
                    </span>
                )}
            </span>
            {href !== '' && (
                <span className="work-row__arrow" aria-hidden="true">
                    →
                </span>
            )}
        </>
    );

    return <li className="works-list__item">{wrap(body, href, external)}</li>;
}

function wrap(body: ReactNode, href: string, external: boolean) {
    if (href === '') {
        return <div className="work-row">{body}</div>;
    }

    return (
        <a className="work-row" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {body}
        </a>
    );
}

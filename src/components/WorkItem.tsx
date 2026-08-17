import type { Work, WorkShot } from '../content/works.ts';

export function WorkItem({ kind, year, title, description, tags, site, repo, shot }: Work) {
    const meta = [year, kind].filter((value) => value !== '');
    const visibleTags = tags.filter((tag) => tag !== '');

    return (
        <li className="work">
            <div className="work__head">
                {meta.length > 0 && (
                    <p className="work__meta">
                        {meta.map((value) => (
                            <span className="work__meta-item" key={value}>
                                {value}
                            </span>
                        ))}
                    </p>
                )}
                <h3 className="work__title">{title}</h3>
            </div>

            <Shot title={title} site={site} shot={shot} />

            {description !== '' && <p className="work__desc">{description}</p>}

            {visibleTags.length > 0 && (
                <ul className="tag-list">
                    {visibleTags.map((tag) => (
                        <li className="tag" key={tag}>
                            {tag}
                        </li>
                    ))}
                </ul>
            )}

            {(site !== '' || repo !== '') && (
                <div className="work__actions">
                    {repo !== '' && (
                        <a
                            className="btn btn--repo btn--icon"
                            href={repo}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GithubMark />
                            <span className="visually-hidden">
                                {title} のリポジトリ（別のタブで開きます）
                            </span>
                        </a>
                    )}
                    {site !== '' && (
                        <a className="btn btn--primary" href={site} target="_blank" rel="noreferrer">
                            サイトを開く
                            <ExternalIcon />
                        </a>
                    )}
                </div>
            )}
        </li>
    );
}

function ExternalIcon() {
    return (
        <svg className="btn__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M7 3H3v10h10V9" />
            <path d="M10 2.5h3.5V6" />
            <path d="M13.5 2.5 7.5 8.5" />
        </svg>
    );
}

function GithubMark() {
    return (
        <svg className="btn__mark" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
    );
}

interface ShotProps {
    readonly title: string;
    readonly site: string;
    readonly shot: WorkShot | undefined;
}

/**
 * サムネイル。shot が無ければ何も出さない。
 * サイトがある作品だけリンクにする（空リンクは置かない）。
 */
function Shot({ title, site, shot }: ShotProps) {
    if (shot === undefined) return null;

    const img = <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />;

    if (site === '') {
        return <div className="work__shot">{img}</div>;
    }

    return (
        <a
            className="work__shot"
            href={site}
            target="_blank"
            rel="noreferrer"
            aria-label={`${title} を開く`}
        >
            {img}
        </a>
    );
}

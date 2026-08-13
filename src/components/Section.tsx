import type { ReactNode } from 'react';

interface SectionProps {
    readonly id: string;
    readonly eyebrow: string;
    readonly title: string;
    readonly description?: ReactNode;
    readonly children: ReactNode;
}

export function Section({ id, eyebrow, title, description, children }: SectionProps) {
    return (
        <section className="section" id={id}>
            <div className="section__head">
                <div className="section__heading">
                    <p className="section__eyebrow">{eyebrow}</p>
                    <h2 className="section__title">{title}</h2>
                </div>
                {description !== undefined && <p className="section__desc">{description}</p>}
            </div>
            {children}
        </section>
    );
}

import { Section } from '../Section.tsx';
import { WorkRow } from '../WorkRow.tsx';
import { works } from '../../content/works.ts';

export function WorksSection() {
    return (
        <Section id="works" eyebrow="WORKS" title="制作物" description="">
            <ul className="works-list">
                {works.map((work) => (
                    <WorkRow key={work.href} {...work} />
                ))}
            </ul>
        </Section>
    );
}

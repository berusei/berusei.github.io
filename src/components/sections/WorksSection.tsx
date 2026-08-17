import { Section } from '../Section.tsx';
import { WorkItem } from '../WorkItem.tsx';
import { works } from '../../content/works.tsx';

export function WorksSection() {
    return (
        <Section id="works" eyebrow="WORKS" title="制作物" description="">
            <ul className="works">
                {works.map((work) => (
                    <WorkItem key={work.title} {...work} />
                ))}
            </ul>
        </Section>
    );
}

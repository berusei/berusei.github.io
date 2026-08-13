import { Section } from '../Section.tsx';
import { cx } from '../../cx.ts';
import { resumeEntries, resumeNote } from '../../content/resume.tsx';

export function ResumeSection() {
    return (
        <Section id="resume" eyebrow="RESUME" title="経歴">
            <ol className="resume">
                {resumeEntries.map((entry) => (
                    <li
                        className={cx('resume__row', entry.current && 'resume__row--current')}
                        key={entry.period}
                    >
                        <span className="resume__marker" aria-hidden="true" />
                        <div className="resume__body">
                            <p className="resume__period">{entry.period}</p>
                            <h3 className="resume__org">
                                {entry.org}
                                {entry.current === true && <span className="resume__badge">現職</span>}
                            </h3>
                            <p className="resume__role">{entry.role}</p>
                            <p className="resume__desc">{entry.description}</p>
                        </div>
                    </li>
                ))}
            </ol>
            <p className="resume__note">{resumeNote}</p>
        </Section>
    );
}

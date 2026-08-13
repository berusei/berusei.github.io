import { Fragment } from 'react';
import { Section } from '../Section.tsx';
import { PortraitPlaceholder } from '../icons.tsx';
import { profileBody, profileFacts, profilePhoto } from '../../content/profile.tsx';

export function ProfileSection() {
    return (
        <Section id="profile" eyebrow="PROFILE" title="プロフィール">
            <div className="profile">
                <figure className="profile__photo">
                    {profilePhoto.src === '' ? (
                        <div className="profile__photo-frame profile__photo-frame--empty">
                            <PortraitPlaceholder />
                        </div>
                    ) : (
                        <img
                            className="profile__photo-frame"
                            src={profilePhoto.src}
                            alt={profilePhoto.alt}
                        />
                    )}
                </figure>
                <div className="profile__text">
                    <dl className="profile__facts">
                        {profileFacts.map((fact) => (
                            <Fragment key={fact.label}>
                                <dt className="profile__fact-label">{fact.label}</dt>
                                <dd className="profile__fact-value">{fact.value}</dd>
                            </Fragment>
                        ))}
                    </dl>
                </div>
                {profileBody.map((paragraph, index) => (
                    <p className="profile__paragraph" key={index}>
                        {paragraph}
                    </p>
                ))}
            </div>
        </Section>
    );
}

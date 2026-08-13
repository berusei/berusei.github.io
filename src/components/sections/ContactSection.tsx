import { Section } from '../Section.tsx';
import { ChannelIcon } from '../icons.tsx';
import { contactChannels, contactLede } from '../../content/contact.ts';

export function ContactSection() {
    return (
        <Section id="contact" eyebrow="CONTACT" title="お問い合わせ" description={contactLede}>
            <ul className="contact">
                {contactChannels.map((channel) => (
                    <li key={channel.href}>
                        <a
                            className="contact__link"
                            href={channel.href}
                            {...(channel.href.startsWith('http')
                                ? { target: '_blank', rel: 'noreferrer' }
                                : {})}
                        >
                            <ChannelIcon name={channel.icon} />
                            <span className="contact__value">{channel.value}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </Section>
    );
}

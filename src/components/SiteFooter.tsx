import { footerLinks, profile } from '../content/site.ts';

export function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <p className="footer-title">
                    {profile.name}
                </p>
                <nav className="footer-nav" aria-label="フッター">
                    {footerLinks.map((link) => (
                        <a key={link.href} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                </nav>
                <p className="footer-note">
                    © Berusei. / Designed with the JRA <a href="https://github.com/berusei/berusei.github.io">DESIGN.md</a>
                </p>
            </div>
        </footer>
    );
}

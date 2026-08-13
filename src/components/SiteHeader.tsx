import { navLinks } from '../content/site.ts';

export function SiteHeader() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <nav className="site-nav" aria-label="セクション">
                    {navLinks.map((link) => (
                        <a className="site-nav__link" key={link.href} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}

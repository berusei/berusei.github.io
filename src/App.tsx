import { SiteFooter } from './components/SiteFooter.tsx';
import { SiteHeader } from './components/SiteHeader.tsx';
import { ContactSection } from './components/sections/ContactSection.tsx';
import { ProfileSection } from './components/sections/ProfileSection.tsx';
import { ResumeSection } from './components/sections/ResumeSection.tsx';
import { WorksSection } from './components/sections/WorksSection.tsx';

export function App() {
    return (
        <div className="page">
            <SiteHeader />
            <main className="site-main">
                <WorksSection />
                <ProfileSection />
                <ResumeSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    );
}

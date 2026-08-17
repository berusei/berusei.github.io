import { SiteFooter } from './components/SiteFooter.tsx';
import { SiteHeader } from './components/SiteHeader.tsx';
import { ContactSection } from './components/sections/ContactSection.tsx';
import { ProfileSection } from './components/sections/ProfileSection.tsx';
import { ResumeSection } from './components/sections/ResumeSection.tsx';
import { WorksSection } from './components/sections/WorksSection.tsx';
import ThreeBackground from './ThreeBackground.tsx';

export function App() {
    return (
        <>
            {/* 設定は ThreeBackground.tsx の backgroundOptions に集約している */}
            <ThreeBackground />
            <div className="page" style={{ position: 'relative', zIndex: 1 }}>
                <SiteHeader />
                <main className="site-main">
                    <WorksSection />
                    <ProfileSection />
                    <ResumeSection />
                    <ContactSection />
                </main>
                <SiteFooter />
            </div>
        </>
    );
}

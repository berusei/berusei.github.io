import { SiteFooter } from './components/SiteFooter.tsx';
import { SiteHeader } from './components/SiteHeader.tsx';
import { ContactSection } from './components/sections/ContactSection.tsx';
import { ProfileSection } from './components/sections/ProfileSection.tsx';
import { ResumeSection } from './components/sections/ResumeSection.tsx';
import { WorksSection } from './components/sections/WorksSection.tsx';
import ThreeBackground from './ThreeBackground';

export function App() {
    return (
        <>
            <ThreeBackground
                motif="particles"
                speed={1}
                density={1}
                line="#f1f1f1"
                dot="#eeeeee"
                background="#ffffff"
            />
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

import { Helmet } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { Loader } from '@/components/layout/Loader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { useLoading } from '@/hooks/useLoading';
import { site } from '@/data/site';

function App() {
  const isLoading = useLoading();

  return (
    <MotionConfig reducedMotion="user">
      <Helmet>
        <title>{`${site.name} — ${site.role}`}</title>
        <meta name="description" content={site.description} />
      </Helmet>

      <Loader isLoading={isLoading} />
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}

export default App;

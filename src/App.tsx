import React, { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { LoadingScreen } from './components/LoadingScreen';
import { ForestBackground } from './components/ForestBackground';
import { AdminPanel } from './components/AdminPanel';
import { initialProjects } from './data/projects';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [projects, setProjects] = useState(initialProjects);
  const [adminOpen, setAdminOpen] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    // Hidden admin shortcuts: Ctrl+Shift+A, or visiting /#admin
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminOpen(true);
      }
    };
    const onHash = () => window.location.hash === '#admin' && setAdminOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const closeAdmin = () => {
    setAdminOpen(false);
    if (window.location.hash === '#admin') history.replaceState(null, '', window.location.pathname);
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(section);
      
      // Update CSS variable for parallax effect
      document.documentElement.style.setProperty('--scroll', scrollPosition.toString());
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      
      {/* Navigation */}
      <Navigation currentSection={currentSection} />

      {/* Animated Forest Background */}
      <ForestBackground />

      {/* Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection projects={projects} />
        <ContactSection onSecretUnlock={() => setAdminOpen(true)} />
      </div>

      {adminOpen && <AdminPanel onClose={closeAdmin} onPublished={setProjects} />}

      {/* Scroll Indicator */}
      {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-white/60 animate-bounce pointer-events-none">
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </div> */}
    </div>
  );
}
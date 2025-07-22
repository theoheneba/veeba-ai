import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-inter overflow-x-hidden transition-colors duration-300">
      <ParticleBackground />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Code } from 'lucide-react';
import EmailSignup from './EmailSignup';
import CountdownTimer from './CountdownTimer';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-green-900/20">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-green-500/10 animate-pulse"></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-64 h-64 border border-violet-500/20 rounded-full animate-spin"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            animationDuration: '20s'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-violet-500/10 to-green-500/10 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 border-2 border-green-500/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-green-500/20 backdrop-blur-sm border border-violet-500/30 rounded-full px-6 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
            Coming Soon
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <Zap className="w-12 h-12 text-violet-400" />
            <div className="absolute inset-0 bg-violet-400 blur-lg opacity-30 animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-violet-400 via-white to-green-400 bg-clip-text text-transparent">
            Veeba AI
          </h1>
        </div>

        {/* Tagline */}
        <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          From Thoughts to{' '}
          <span className="bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
            Reality
          </span>{' '}
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Experience the future of web development. Simply describe your vision, and watch as our advanced AI creates 
          stunning, fully-functional websites in seconds.
        </p>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Email Signup */}
        <EmailSignup />

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {[
            { icon: Code, text: 'AI-Powered Generation' },
            { icon: Zap, text: 'Lightning Fast' },
            { icon: Sparkles, text: 'Production Ready' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-300">
              <item.icon className="w-5 h-5 text-violet-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
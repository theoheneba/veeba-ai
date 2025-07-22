import React from 'react';
import { Brain, Zap, Palette, Globe, Shield, Rocket } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Engine',
      description: 'Our cutting-edge AI understands your vision and translates it into pixel-perfect websites with intelligent design decisions.',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Generation',
      description: 'Generate complete websites in seconds, not days. Our optimized AI pipeline delivers results at unprecedented speed.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Palette,
      title: 'Intelligent Design System',
      description: 'Automatically applies modern design principles, color theory, and typography for professional-looking results every time.',
      gradient: 'from-violet-500 to-green-500'
    },
    {
      icon: Globe,
      title: 'Responsive by Default',
      description: 'Every generated website is fully responsive and optimized for all devices, from mobile to desktop.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Production Ready',
      description: 'Generated code follows industry best practices with clean structure, security considerations, and SEO optimization.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Rocket,
      title: 'One-Click Deploy',
      description: 'Deploy your generated website instantly to our global CDN or export the code for your own hosting solution.',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section id="features" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">
            Powered by{' '}
            </span>
            <span className="bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              Next-Gen AI
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of web development with our revolutionary AI platform that transforms your ideas into stunning websites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-2xl p-6 hover:bg-gray-100/40 dark:hover:bg-gray-800/40 transition-all duration-500 hover:scale-105"
            >
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
              
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
import React from 'react';
import { Zap, Twitter, Github, Linkedin, Mail, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-300/50 dark:border-gray-700/50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Zap className="w-8 h-8 text-violet-400" />
                <div className="absolute inset-0 bg-violet-400 blur-lg opacity-30"></div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
                Veeba AI
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed mb-6">
              Revolutionizing web development with AI-powered website generation. Transform your ideas into stunning websites in seconds.
            </p>
            <div className="flex gap-4">
              <a
                href="https://web.facebook.com/tryveeba"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-violet-500/20 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-400" />
              </a>
              <a
                href="https://x.com/VeebaAi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-violet-500/20 transition-colors group"
              >
                <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-400" />
              </a>
              <a
                href="https://www.linkedin.com/company/veebaai/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-violet-500/20 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-400" />
              </a>
              <a
                href="mailto:hello@veeba.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-violet-500/20 transition-colors group"
              >
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-400" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> hello@veeba.ai
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Support:</strong> support@veeba.ai
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Ready to revolutionize your web development process? Join our waitlist and be among the first to experience the future.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300/50 dark:border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Veeba AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
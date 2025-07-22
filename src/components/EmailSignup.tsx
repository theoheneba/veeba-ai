import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([
          {
            email: email.toLowerCase().trim(),
            subscribed_at: new Date().toISOString(),
            status: 'active'
          }
        ]);
      
      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setStatus('error');
          setMessage('This email is already subscribed!');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('Thanks! You\'ll be notified when we launch.');
        setEmail('');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Subscription error:', error);
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Be the first to know when we launch</h3>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
              disabled={status === 'loading'}
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-green-500 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Notify Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>

      {message && (
        <div className={`flex items-center gap-2 mt-4 p-3 rounded-lg ${
          status === 'success' 
            ? 'bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400' 
            : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
        }`}>
          {status === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="text-sm">{message}</span>
        </div>
      )}
    </div>
  );
};

export default EmailSignup;
import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Users, X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Job, JobApplication } from '../types/job';

const JobSection = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [applicationMessage, setApplicationMessage] = useState('');
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    cover_letter: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*, image_url')
        .order('posted_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setApplicationStatus('idle');
    setApplicationMessage('');
    setFormData({
      applicant_name: '',
      applicant_email: '',
      cover_letter: ''
    });
  };

  const handleCloseApplication = () => {
    setSelectedJob(null);
    setApplicationStatus('idle');
    setApplicationMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setApplicationStatus('loading');

    try {
      const applicationData: Omit<JobApplication, 'id' | 'applied_at'> = {
        job_id: selectedJob.id,
        applicant_name: formData.applicant_name.trim(),
        applicant_email: formData.applicant_email.toLowerCase().trim(),
        cover_letter: formData.cover_letter.trim() || null
      };

      const { error } = await supabase
        .from('applications')
        .insert([applicationData]);

      if (error) throw error;

      setApplicationStatus('success');
      setApplicationMessage('Your application has been submitted successfully! We\'ll be in touch soon.');
      
      // Reset form after successful submission
      setTimeout(() => {
        handleCloseApplication();
      }, 3000);

    } catch (error) {
      setApplicationStatus('error');
      setApplicationMessage('Something went wrong. Please try again.');
      console.error('Application submission error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRequirements = (text: string | null) => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim().length > 0);
  };

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading opportunities...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="careers" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Join Our </span>
            <span className="bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              Dream Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Be part of the revolution in AI-powered web development. We're looking for passionate individuals to help shape the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-2xl p-6 hover:bg-gray-100/40 dark:hover:bg-gray-800/40 transition-all duration-500 hover:scale-105"
            >
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
              
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    {job.image_url && (
                      <div className="flex-shrink-0">
                        <img
                          src={job.image_url}
                          alt={job.title}
                          className="w-16 h-16 rounded-lg object-cover border-2 border-violet-500/20"
                        />
                      </div>
                    )}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-green-500">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                  {job.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    Posted {formatDate(job.posted_at)}
                  </span>
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-violet-500 to-green-500 rounded-lg font-medium transition-all duration-200 hover:scale-105 group"
                  >
                    <Users className="w-4 h-4" />
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {selectedJob.image_url && (
                      <div className="flex-shrink-0">
                        <img
                          src={selectedJob.image_url}
                          alt={selectedJob.title}
                          className="w-20 h-20 rounded-lg object-cover border-2 border-violet-500/20"
                        />
                      </div>
                    )}
                    <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Apply for {selectedJob.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedJob.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedJob.type}
                      </div>
                    </div>
                  </div>
                  </div>
                  <button
                    onClick={handleCloseApplication}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Job Details */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Job Description</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {selectedJob.description}
                  </p>

                  {selectedJob.responsibilities && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Responsibilities</h4>
                      <ul className="space-y-2">
                        {formatRequirements(selectedJob.responsibilities).map((item, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedJob.requirements && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Requirements</h4>
                      <ul className="space-y-2">
                        {formatRequirements(selectedJob.requirements).map((item, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Application Form */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Submit Your Application</h4>
                  
                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <div>
                      <label htmlFor="applicant_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="applicant_name"
                        name="applicant_name"
                        value={formData.applicant_name}
                        onChange={handleInputChange}
                        required
                        disabled={applicationStatus === 'loading'}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="applicant_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="applicant_email"
                        name="applicant_email"
                        value={formData.applicant_email}
                        onChange={handleInputChange}
                        required
                        disabled={applicationStatus === 'loading'}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cover Letter
                      </label>
                      <textarea
                        id="cover_letter"
                        name="cover_letter"
                        value={formData.cover_letter}
                        onChange={handleInputChange}
                        rows={6}
                        disabled={applicationStatus === 'loading'}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white resize-none"
                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      />
                    </div>

                    {applicationMessage && (
                      <div className={`flex items-center gap-2 p-4 rounded-lg ${
                        applicationStatus === 'success' 
                          ? 'bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400' 
                          : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
                      }`}>
                        {applicationStatus === 'success' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="text-sm">{applicationMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={applicationStatus === 'loading' || !formData.applicant_name || !formData.applicant_email}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-green-500 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {applicationStatus === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobSection;
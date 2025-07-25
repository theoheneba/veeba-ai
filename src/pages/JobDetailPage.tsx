import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Job, JobApplication } from '../types/job';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [applicationMessage, setApplicationMessage] = useState('');
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    cover_letter: '',
    resume_url: '',
    github_link: '',
    linkedin_link: ''
  });

  useEffect(() => {
    if (id) {
      fetchJob(id);
    }
  }, [id]);

  const fetchJob = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
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
    if (!job) return;

    setApplicationStatus('loading');

    try {
      const applicationData: Omit<JobApplication, 'id' | 'applied_at'> = {
        job_id: job.id,
        applicant_name: formData.applicant_name.trim(),
        applicant_email: formData.applicant_email.toLowerCase().trim(),
        cover_letter: formData.cover_letter.trim() || null,
        resume_url: formData.resume_url.trim() || null,
        github_link: formData.github_link.trim() || null,
        linkedin_link: formData.linkedin_link.trim() || null
      };

      const { error } = await supabase
        .from('applications')
        .insert([applicationData]);

      if (error) throw error;

      setApplicationStatus('success');
      setApplicationMessage('Your application has been submitted successfully! We\'ll be in touch soon.');
      
      // Reset form after successful submission
      setFormData({
        applicant_name: '',
        applicant_email: '',
        cover_letter: '',
        resume_url: '',
        github_link: '',
        linkedin_link: ''
      });

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
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Job Details */}
          <div>
            <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                {job.image_url && (
                  <div className="flex-shrink-0">
                    <img
                      src={job.image_url}
                      alt={job.title}
                      className="w-20 h-20 rounded-lg object-cover border-2 border-violet-500/20"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Posted {formatDate(job.posted_at)}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Job Description</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {job.responsibilities && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Responsibilities</h2>
                    <ul className="space-y-2">
                      {formatRequirements(job.responsibilities).map((item, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.requirements && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Requirements</h2>
                    <ul className="space-y-2">
                      {formatRequirements(job.requirements).map((item, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Apply for this Position</h2>
              
              <form onSubmit={handleSubmitApplication} className="space-y-6">
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
                  <label htmlFor="resume_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resume Link
                  </label>
                  <input
                    type="url"
                    id="resume_url"
                    name="resume_url"
                    value={formData.resume_url}
                    onChange={handleInputChange}
                    disabled={applicationStatus === 'loading'}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                    placeholder="https://your-resume-link.com/resume.pdf"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Provide a direct link to your resume (Google Drive, Dropbox, personal website, etc.)
                  </p>
                </div>

                <div>
                  <label htmlFor="github_link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      id="github_link"
                      name="github_link"
                      value={formData.github_link}
                      onChange={handleInputChange}
                      disabled={applicationStatus === 'loading'}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="linkedin_link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      id="linkedin_link"
                      name="linkedin_link"
                      value={formData.linkedin_link}
                      onChange={handleInputChange}
                      disabled={applicationStatus === 'loading'}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>
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
    </div>
  );
};

export default JobDetailPage;
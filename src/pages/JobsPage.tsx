import React from 'react';
import JobSection from '../components/JobSection';

const JobsPage = () => {
  return (
    <div className="pt-20">
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gray-900 dark:text-white">Join Our </span>
          <span className="bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
            Revolution
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Be part of the team that's transforming how websites are built. We're looking for passionate individuals to help shape the future of AI-powered web development.
        </p>
      </div>
      <JobSection />
    </div>
  );
};

export default JobsPage;
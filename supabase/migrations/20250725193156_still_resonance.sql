/*
  # Create Jobs and Applications Tables

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text, not null)
      - `requirements` (text)
      - `responsibilities` (text)
      - `location` (text)
      - `type` (text)
      - `posted_at` (timestamp)
    - `applications`
      - `id` (uuid, primary key)
      - `job_id` (uuid, foreign key)
      - `applicant_name` (text, not null)
      - `applicant_email` (text, not null)
      - `cover_letter` (text)
      - `applied_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policy for public read access to jobs
    - Add policy for public insert access to applications

  3. Sample Data
    - Insert sample job listings for the specified roles
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  requirements text,
  responsibilities text,
  location text DEFAULT 'Remote',
  type text DEFAULT 'Full-time',
  posted_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_name text NOT NULL,
  applicant_email text NOT NULL,
  cover_letter text,
  applied_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to jobs"
  ON jobs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to applications"
  ON applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample job data
INSERT INTO jobs (title, description, requirements, responsibilities, location, type) VALUES
(
  'Backend Developer',
  'Join our team as a Backend Developer and help build scalable, high-performance server-side applications that power our AI platform.',
  '• 3+ years of experience with Node.js, Python, or similar backend technologies
• Strong knowledge of databases (PostgreSQL, MongoDB)
• Experience with RESTful APIs and GraphQL
• Familiarity with cloud platforms (AWS, GCP, Azure)
• Understanding of microservices architecture
• Experience with Docker and Kubernetes',
  '• Design and develop robust backend systems and APIs
• Optimize database queries and improve system performance
• Collaborate with frontend developers and AI engineers
• Implement security best practices and data protection measures
• Write clean, maintainable, and well-documented code
• Participate in code reviews and technical discussions',
  'Remote',
  'Full-time'
),
(
  'Frontend Developer',
  'We are looking for a talented Frontend Developer to create beautiful, responsive user interfaces for our AI-powered web applications.',
  '• 3+ years of experience with React, TypeScript, and modern JavaScript
• Proficiency in HTML5, CSS3, and responsive design
• Experience with state management (Redux, Zustand, or similar)
• Knowledge of modern build tools (Vite, Webpack)
• Familiarity with UI/UX design principles
• Experience with testing frameworks (Jest, Cypress)',
  '• Develop responsive and interactive user interfaces
• Collaborate with designers to implement pixel-perfect designs
• Optimize applications for maximum speed and scalability
• Ensure cross-browser compatibility and accessibility
• Integrate with backend APIs and third-party services
• Maintain and improve existing codebase',
  'Remote',
  'Full-time'
),
(
  'Digital Marketing Manager',
  'Lead our digital marketing efforts to drive growth and brand awareness for Veeba AI across multiple channels and platforms.',
  '• 4+ years of experience in digital marketing
• Proven track record with SEO, SEM, and social media marketing
• Experience with marketing automation tools
• Strong analytical skills and data-driven mindset
• Knowledge of content marketing and email campaigns
• Familiarity with AI/tech industry preferred',
  '• Develop and execute comprehensive digital marketing strategies
• Manage SEO/SEM campaigns and social media presence
• Create engaging content for various marketing channels
• Analyze campaign performance and optimize for ROI
• Collaborate with product and sales teams
• Stay updated with latest marketing trends and technologies',
  'Remote',
  'Full-time'
),
(
  'Project Manager',
  'Join our team as a Project Manager to oversee the development and delivery of our AI products while ensuring seamless collaboration across teams.',
  '• 3+ years of project management experience in tech/software
• Strong knowledge of Agile/Scrum methodologies
• Excellent communication and leadership skills
• Experience with project management tools (Jira, Asana, etc.)
• PMP or similar certification preferred
• Background in AI/ML projects is a plus',
  '• Plan, execute, and deliver projects on time and within budget
• Coordinate cross-functional teams and stakeholders
• Manage project risks and resolve blockers
• Facilitate Agile ceremonies and maintain project documentation
• Ensure quality standards and best practices are followed
• Communicate project status to leadership and stakeholders',
  'Remote',
  'Full-time'
);
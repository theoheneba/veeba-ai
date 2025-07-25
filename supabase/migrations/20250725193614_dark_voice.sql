/*
  # Add image URL column and Senior AI/Backend Developer job

  1. Schema Changes
    - Add `image_url` column to `jobs` table to store job images
  
  2. New Job Data
    - Insert Senior AI/Backend Developer position with professional tech image
    - Includes detailed description, requirements, and responsibilities
    - Set as equity-based position for founding team member

  3. Updates
    - Update existing jobs with appropriate images
*/

-- Add image_url column to jobs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE jobs ADD COLUMN image_url text;
  END IF;
END $$;

-- Insert the new Senior AI/Backend Developer job
INSERT INTO jobs (title, description, requirements, responsibilities, location, type, image_url)
VALUES (
  'Senior AI / Backend Developer (Generative Web Platform)',
  'At Veeba AI (https://veeba.ai), we are on a mission to revolutionize web development. We believe creating a beautiful website should be as simple as describing it. We are building a cutting-edge platform that transforms user prompts into production-ready websites in minutes. We are looking for a brilliant and passionate backend engineer to join our founding team and build the core intelligence of our product.

NB: YOU WILL BE PART OF THE VEEBA TEAM. WE PAY OURSELVES WITH EQUITY TILL WE GET FUNDED OR CAPITAL.

About Us: At Veeba AI, we are revolutionizing web development by making website creation as simple as describing your vision. Our cutting-edge platform transforms user prompts into production-ready websites in minutes.

The Opportunity: As the Founding Backend Engineer, you are the architect of our "magic." You will own the entire AI pipeline, from interpreting a user''s idea to generating a complete, functional codebase. You will build the engine that powers Veeba AI, working at the absolute forefront of generative AI and cloud engineering.',
  '• An experienced software engineer (5+ years) with deep expertise in backend development (Python or Node.js)
• Proven, hands-on experience building with and integrating Large Language Models (LLMs) via APIs
• Direct experience with AI orchestration frameworks (LangChain, LlamaIndex)
• Familiar with vector databases (Pinecone, etc.) and the RAG architecture
• A strong architect with experience deploying scalable applications on cloud platforms (AWS, GCP, Azure)
• Excited by the entrepreneurial journey and motivated by building something impactful from scratch
• Possesses a strong portfolio (GitHub) showcasing complex backend and/or AI projects',
  '• Architect the Core System: Design and implement the scalable, robust backend and cloud architecture for our entire platform
• Build the AI Engine: Develop and fine-tune the AI pipeline responsible for interpreting user needs and generating code
• Ingestion & Prompt Engineering: Create systems to process prompts and extract key entities for our models
• AI Orchestration: Use frameworks like LangChain or LlamaIndex to manage the complex flow from prompt to generated code
• Model Integration: Integrate and fine-tune Large Language Models (e.g., Gemini, GPT-4, Claude 3) for logic, content, and code creation
• Vector Search: Implement RAG techniques using vector databases (Pinecone, Chroma DB) to provide contextual memory and style templating
• Engineer Advanced Code Generation: Design the core logic that translates AI-generated layouts into high-quality codebases, including Next.js (React), Vue.js, and TypeScript
• Develop Backend Services: Build all necessary backend services in Python or Node.js for user authentication, project management, and API endpoints
• Manage Deployment & MLOps: Deploy the application and manage the lifecycle of our AI models on cloud infrastructure (AWS, GCP, Azure)',
  'Remote',
  'Full-time',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800'
);

-- Update existing jobs with appropriate images
UPDATE jobs SET image_url = 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE title = 'Backend Developer';
UPDATE jobs SET image_url = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE title = 'Frontend Developer';
UPDATE jobs SET image_url = 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE title = 'Digital Marketing Manager';
UPDATE jobs SET image_url = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE title = 'Project Manager';
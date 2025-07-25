export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string | null;
  responsibilities: string | null;
  location: string;
  type: string;
  posted_at: string;
  image_url?: string | null;
}

export interface JobApplication {
  id?: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  cover_letter: string | null;
  applied_at?: string;
}
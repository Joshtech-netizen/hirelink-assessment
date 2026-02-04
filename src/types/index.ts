export type ApplicationStage = 'Applied' | 'Reviewed' | 'Interview Scheduled' | 'Offer Sent';

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  experience: number;
  skills: string;
  portfolio?: string;
  resumeName: string;
  stage: ApplicationStage;
  score?: number;
  notes?: string;
  interviewDate?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
}

export const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Frontend Engineer', location: 'Remote', description: 'Build modern UIs with React and TypeScript.' },
  { id: '2', title: 'Full Stack Developer', location: 'Accra, GH', description: 'Work on enterprise PHP and React applications.' },
  { 
    id: '3', 
    title: 'UI/UX Designer', 
    location: 'Accra, GH', 
    description: 'Design beautiful user experiences for the Digicoast fellowship.' 
  },
  { 
    id: '4', 
    title: 'Cybersecurity Analyst', 
    location: 'Remote', 
    description: 'Analyze system vulnerabilities and implement security protocols for contemporary enterprise IT environments.' 
  },
  { 
    id: '5', 
    title: 'Digital Media Specialist', 
    location: 'Accra, GH', 
    description: 'Oversee live streaming operations and high-end video production workflows for institutional events.' 
  }
];
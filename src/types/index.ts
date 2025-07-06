export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  avatar?: string;
  skills?: string[];
  rating?: number;
  completedJobs?: number;
  joinedDate: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: {
    min: number;
    max: number;
  };
  duration: string;
  skillsRequired: string[];
  clientId: string;
  clientName: string;
  clientRating: number;
  postedDate: string;
  proposals: number;
  status: 'open' | 'in-progress' | 'completed';
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isPremium: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'course' | 'template';
  category: string;
  url: string;
  duration?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  authorAvatar?: string;
  category: string;
  replies: number;
  likes: number;
  postedDate: string;
  tags: string[];
}
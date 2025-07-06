import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'client' | 'freelancer';
          avatar_url?: string;
          skills?: string[];
          bio?: string;
          phone?: string;
          location?: string;
          rating?: number;
          completed_jobs?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role: 'client' | 'freelancer';
          avatar_url?: string;
          skills?: string[];
          bio?: string;
          phone?: string;
          location?: string;
        };
        Update: {
          full_name?: string;
          avatar_url?: string;
          skills?: string[];
          bio?: string;
          phone?: string;
          location?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          budget_min: number;
          budget_max: number;
          duration: string;
          skills_required: string[];
          client_id: string;
          status: 'open' | 'in_progress' | 'completed' | 'cancelled';
          level: 'beginner' | 'intermediate' | 'expert';
          proposals_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          category: string;
          budget_min: number;
          budget_max: number;
          duration: string;
          skills_required: string[];
          client_id: string;
          level: 'beginner' | 'intermediate' | 'expert';
        };
        Update: {
          title?: string;
          description?: string;
          category?: string;
          budget_min?: number;
          budget_max?: number;
          duration?: string;
          skills_required?: string[];
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
        };
      };
      proposals: {
        Row: {
          id: string;
          job_id: string;
          freelancer_id: string;
          cover_letter: string;
          proposed_budget: number;
          delivery_time: string;
          status: 'pending' | 'accepted' | 'rejected';
          created_at: string;
        };
        Insert: {
          job_id: string;
          freelancer_id: string;
          cover_letter: string;
          proposed_budget: number;
          delivery_time: string;
        };
        Update: {
          status?: 'pending' | 'accepted' | 'rejected';
        };
      };
      community_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          author_id: string;
          category: string;
          tags: string[];
          likes_count: number;
          replies_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          content: string;
          author_id: string;
          category: string;
          tags?: string[];
        };
        Update: {
          title?: string;
          content?: string;
          category?: string;
          tags?: string[];
        };
      };
    };
  };
}
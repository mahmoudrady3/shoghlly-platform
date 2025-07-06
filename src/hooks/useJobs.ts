import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Job {
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
  profiles?: {
    full_name: string;
    rating?: number;
  };
}

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async (filters?: {
    category?: string;
    level?: string;
    search?: string;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('jobs')
        .select(`
          *,
          profiles:client_id (
            full_name,
            rating
          )
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.level) {
        query = query.eq('level', filters.level);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setJobs(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: {
    title: string;
    description: string;
    category: string;
    budget_min: number;
    budget_max: number;
    duration: string;
    skills_required: string[];
    level: 'beginner' | 'intermediate' | 'expert';
    client_id: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    createJob,
    refetch: fetchJobs,
  };
};
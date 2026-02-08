import { useState, useEffect } from 'react';
import type { Project } from '../types';
import { mockApi } from '../lib/mockData';

// Set to true to use Supabase, false to use mock data
const USE_SUPABASE = false;

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);

            if (USE_SUPABASE) {
                // Supabase implementation (requires setup)
                const { supabase } = await import('../lib/supabase');
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setProjects(data || []);
            } else {
                // Mock data (works immediately)
                const data = await mockApi.getProjects();
                setProjects(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const getProjectById = async (id: string): Promise<Project | null> => {
        try {
            if (USE_SUPABASE) {
                const { supabase } = await import('../lib/supabase');
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                return data;
            } else {
                return await mockApi.getProjectById(id);
            }
        } catch (err) {
            console.error('Error fetching project:', err);
            return null;
        }
    };

    return { projects, loading, error, refetch: fetchProjects, getProjectById };
};

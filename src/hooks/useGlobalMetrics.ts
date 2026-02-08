import { useState, useEffect } from 'react';
import type { GlobalMetrics } from '../types';
import { mockApi } from '../lib/mockData';

// Set to true to use Supabase, false to use mock data
const USE_SUPABASE = false;

export const useGlobalMetrics = () => {
    const [metrics, setMetrics] = useState<GlobalMetrics>({
        totalCountries: 0,
        totalProjects: 0,
        totalVillages: 0,
        totalRaised: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            setLoading(true);

            if (USE_SUPABASE) {
                // Supabase implementation (requires setup)
                const { supabase } = await import('../lib/supabase');
                const { count: projectCount } = await supabase
                    .from('projects')
                    .select('*', { count: 'exact', head: true });

                const { data: projects } = await supabase
                    .from('projects')
                    .select('raised_amount');

                const totalRaised = projects?.reduce((sum, p) => sum + Number(p.raised_amount), 0) || 0;

                setMetrics({
                    totalCountries: 12,
                    totalProjects: projectCount || 500,
                    totalVillages: 1342,
                    totalRaised,
                });
            } else {
                // Mock data (works immediately)
                const data = await mockApi.getGlobalMetrics();
                setMetrics(data);
            }
        } catch (err) {
            console.error('Error fetching metrics:', err);
            // Fallback to default values
            setMetrics({
                totalCountries: 12,
                totalProjects: 524,
                totalVillages: 1342,
                totalRaised: 274500,
            });
        } finally {
            setLoading(false);
        }
    };

    return { metrics, loading, refetch: fetchMetrics };
};

import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Calendar, Share2, Heart, Users } from 'lucide-react';
import type { Project, Donation } from '../types';
import { formatCurrency, calculateProgress, formatDate } from '../utils/formatters';
import { DonationForm } from './DonationForm';
import { mockApi } from '../lib/mockData';

// Set to true to use Supabase, false to use mock data
const USE_SUPABASE = false;

interface ProjectDetailProps {
    project: Project;
    onBack: () => void;
}

export const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
    const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
    const [showDonationForm, setShowDonationForm] = useState(false);
    const progress = calculateProgress(project.raised_amount, project.goal_amount);

    useEffect(() => {
        fetchRecentDonations();
    }, [project.id]);

    const fetchRecentDonations = async () => {
        try {
            if (USE_SUPABASE) {
                const { supabase } = await import('../lib/supabase');
                const { data } = await supabase
                    .from('donations')
                    .select('*')
                    .eq('project_id', project.id)
                    .order('created_at', { ascending: false })
                    .limit(10);
                setRecentDonations(data || []);
            } else {
                const data = await mockApi.getDonationsByProjectId(project.id);
                setRecentDonations(data);
            }
        } catch (err) {
            console.error('Error fetching donations:', err);
        }
    };

    const handleDonationSuccess = () => {
        setShowDonationForm(false);
        fetchRecentDonations();
        // In a real app, we'd also refetch the project to update raised_amount
        alert('Thank you for your donation! 🎉');
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-semibold">Back to Projects</span>
                    </button>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                                <MapPin className="w-4 h-4" />
                                {project.location_type}
                            </span>
                            {project.status === 'Completed' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 rounded-full text-sm font-semibold">
                                    ✓ Completed
                                </span>
                            )}
                        </div>
                        <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
                        <div className="flex items-center gap-2 text-white/90">
                            <Calendar className="w-4 h-4" />
                            <span>Started {formatDate(project.created_at)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="card p-8">
                            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                        </div>

                        {/* Recent Donations */}
                        <div className="card p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Users className="w-6 h-6 text-primary-600" />
                                Recent Supporters
                            </h2>
                            {recentDonations.length > 0 ? (
                                <div className="space-y-4">
                                    {recentDonations.map((donation) => (
                                        <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {donation.donor_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{donation.donor_name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {formatDate(donation.created_at)}
                                                        {donation.is_recurring && (
                                                            <span className="ml-2 text-primary-600">• Monthly</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-lg font-bold text-primary-600">
                                                {formatCurrency(donation.amount)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">Be the first to support this project!</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Donation Card */}
                        <div className="card-glass p-6 sticky top-24">
                            <div className="mb-6">
                                <div className="text-4xl font-bold text-gray-900 mb-1">
                                    {formatCurrency(project.raised_amount)}
                                </div>
                                <div className="text-gray-600 mb-4">
                                    raised of {formatCurrency(project.goal_amount)} goal
                                </div>

                                <div className="progress-bar mb-2">
                                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                                </div>

                                <div className="text-sm text-gray-600">
                                    {progress.toFixed(0)}% funded
                                </div>
                            </div>

                            {showDonationForm ? (
                                <DonationForm projectId={project.id} onSuccess={handleDonationSuccess} />
                            ) : (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setShowDonationForm(true)}
                                        className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
                                    >
                                        <Heart className="w-5 h-5" />
                                        Donate Now
                                    </button>
                                    <button className="btn-secondary w-full flex items-center justify-center gap-2">
                                        <Share2 className="w-5 h-5" />
                                        Share Project
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

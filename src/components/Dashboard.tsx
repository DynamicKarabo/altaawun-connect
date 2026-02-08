import { useState } from 'react';
import { Heart, Share2, Users } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useGlobalMetrics } from '../hooks/useGlobalMetrics';
import { ImpactMetrics } from './ImpactMetrics';
import { ProjectCard } from './ProjectCard';
import { ProjectDetail } from './ProjectDetail';
import type { Project } from '../types';

export const Dashboard = () => {
    const { projects, loading: projectsLoading } = useProjects();
    const { metrics, loading: metricsLoading } = useGlobalMetrics();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    if (selectedProject) {
        return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-800 opacity-10" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                        <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                        <span className="text-sm font-semibold text-gray-700">Making Impact Together</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
                        Transform Lives Through
                        <br />
                        <span className="gradient-text">Altaawun-Impact Connect</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
                        Empowering communities in villages and slums worldwide through transparent,
                        impactful fundraising campaigns
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="btn-primary text-lg px-8 py-4">
                            Start a Campaign
                        </button>
                        <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                            <Share2 className="w-5 h-5" />
                            Explore Projects
                        </button>
                    </div>
                </div>
            </section>

            {/* Impact Metrics */}
            {!metricsLoading && (
                <ImpactMetrics
                    totalCountries={metrics.totalCountries}
                    totalProjects={metrics.totalProjects}
                    totalVillages={metrics.totalVillages}
                />
            )}

            {/* Featured Projects Section */}
            <section className="py-16 px-4 bg-white/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">
                                Featured <span className="gradient-text">Projects</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Support projects making real impact in communities
                            </p>
                        </div>
                        <button className="btn-secondary flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            View All
                        </button>
                    </div>

                    {projectsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="card animate-pulse">
                                    <div className="h-56 bg-gray-200" />
                                    <div className="p-6 space-y-4">
                                        <div className="h-6 bg-gray-200 rounded" />
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-2 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.slice(0, 6).map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card-glass p-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to Make a <span className="gradient-text">Difference?</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Every contribution, no matter the size, creates lasting change in communities that need it most.
                        </p>
                        <button className="btn-primary text-lg px-10 py-4">
                            Start Your Impact Journey
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

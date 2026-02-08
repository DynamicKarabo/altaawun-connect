import { MapPin, TrendingUp } from 'lucide-react';
import type { Project } from '../types';
import { formatCurrency, calculateProgress } from '../utils/formatters';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    const progress = calculateProgress(project.raised_amount, project.goal_amount);
    const remaining = project.goal_amount - project.raised_amount;

    return (
        <div
            className="card group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={onClick}
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
                        <MapPin className="w-4 h-4" />
                        {project.location_type}
                    </span>
                </div>

                {/* Status Badge */}
                {project.status === 'Completed' && (
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                            ✓ Completed
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Progress Section */}
                <div className="space-y-3">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <div>
                            <div className="font-bold text-lg text-gray-900">
                                {formatCurrency(project.raised_amount)}
                            </div>
                            <div className="text-gray-500">
                                raised of {formatCurrency(project.goal_amount)}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-primary-600 font-semibold">
                                <TrendingUp className="w-4 h-4" />
                                {progress.toFixed(0)}%
                            </div>
                            {remaining > 0 && (
                                <div className="text-gray-500 text-xs">
                                    {formatCurrency(remaining)} to go
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <button className="btn-primary w-full mt-4">
                    Donate Now
                </button>
            </div>
        </div>
    );
};

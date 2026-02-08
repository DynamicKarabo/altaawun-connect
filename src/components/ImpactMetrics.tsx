import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { formatNumber } from '../utils/formatters';

interface MetricCardProps {
    label: string;
    value: number;
    suffix?: string;
}

const MetricCard = ({ label, value, suffix = '' }: MetricCardProps) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="card-glass p-8 text-center hover-lift">
            <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full">
                    <TrendingUp className="w-8 h-8 text-white" />
                </div>
            </div>
            <div className="text-5xl font-bold gradient-text mb-2">
                {formatNumber(displayValue)}
                {suffix}
            </div>
            <div className="text-gray-600 font-medium text-lg">{label}</div>
        </div>
    );
};

interface ImpactMetricsProps {
    totalCountries: number;
    totalProjects: number;
    totalVillages: number;
}

export const ImpactMetrics = ({ totalCountries, totalProjects, totalVillages }: ImpactMetricsProps) => {
    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Live <span className="gradient-text">Global Impact</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Together, we're making a difference in communities around the world
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
                    <MetricCard label="Countries Reached" value={totalCountries} suffix="+" />
                    <MetricCard label="Active Projects" value={totalProjects} suffix="+" />
                    <MetricCard label="Villages Transformed" value={totalVillages} suffix="+" />
                </div>
            </div>
        </section>
    );
};

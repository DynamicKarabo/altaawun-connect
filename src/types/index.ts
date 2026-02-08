export type LocationType = 'Village' | 'Slum';
export type ProjectStatus = 'In-Progress' | 'Completed';

export interface Project {
    id: string;
    title: string;
    location_type: LocationType;
    description: string;
    goal_amount: number;
    raised_amount: number;
    status: ProjectStatus;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Campaign {
    id: string;
    owner_id: string;
    project_id: string;
    title: string;
    custom_message: string | null;
    goal: number;
    created_at: string;
    updated_at: string;
}

export interface Donation {
    id: string;
    amount: number;
    donor_name: string;
    campaign_id: string | null;
    project_id: string;
    is_recurring: boolean;
    created_at: string;
}

export interface GlobalMetrics {
    totalCountries: number;
    totalProjects: number;
    totalVillages: number;
    totalRaised: number;
}

export interface DonationFormData {
    amount: number;
    donor_name: string;
    is_recurring: boolean;
    campaign_id?: string;
}

import type { Project, Donation, GlobalMetrics } from '../types';

// Mock Projects Data
export const mockProjects: Project[] = [
    {
        id: '1',
        title: 'Clean Water Initiative',
        location_type: 'Village',
        description: 'Providing clean drinking water to 500 families in rural villages through well construction and water purification systems.',
        goal_amount: 50000,
        raised_amount: 32500,
        status: 'In-Progress',
        image_url: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-02-01T15:30:00Z',
    },
    {
        id: '2',
        title: 'Education Center',
        location_type: 'Slum',
        description: 'Building a community education center to provide free tutoring and skills training for children and adults.',
        goal_amount: 75000,
        raised_amount: 68000,
        status: 'In-Progress',
        image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
        created_at: '2024-01-10T08:00:00Z',
        updated_at: '2024-02-05T12:00:00Z',
    },
    {
        id: '3',
        title: 'Healthcare Clinic',
        location_type: 'Village',
        description: 'Establishing a primary healthcare clinic with essential medical supplies and trained staff.',
        goal_amount: 100000,
        raised_amount: 45000,
        status: 'In-Progress',
        image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        created_at: '2024-01-20T09:00:00Z',
        updated_at: '2024-02-03T14:00:00Z',
    },
    {
        id: '4',
        title: 'Solar Power Project',
        location_type: 'Village',
        description: 'Installing solar panels to provide sustainable electricity to 200 households.',
        goal_amount: 60000,
        raised_amount: 60000,
        status: 'Completed',
        image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
        created_at: '2023-11-01T10:00:00Z',
        updated_at: '2024-01-15T16:00:00Z',
    },
    {
        id: '5',
        title: 'Food Security Program',
        location_type: 'Slum',
        description: 'Creating community gardens and providing agricultural training to ensure food security.',
        goal_amount: 40000,
        raised_amount: 28000,
        status: 'In-Progress',
        image_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
        created_at: '2024-01-25T11:00:00Z',
        updated_at: '2024-02-06T10:00:00Z',
    },
    {
        id: '6',
        title: 'Women Empowerment Center',
        location_type: 'Slum',
        description: 'Establishing a center for vocational training and microfinance support for women entrepreneurs.',
        goal_amount: 55000,
        raised_amount: 41000,
        status: 'In-Progress',
        image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        created_at: '2024-01-12T13:00:00Z',
        updated_at: '2024-02-04T11:00:00Z',
    },
];

// Mock Donations Data
export const mockDonations: Donation[] = [
    {
        id: '1',
        amount: 500,
        donor_name: 'Sarah Johnson',
        campaign_id: null,
        project_id: '1',
        is_recurring: true,
        created_at: '2024-02-08T10:30:00Z',
    },
    {
        id: '2',
        amount: 250,
        donor_name: 'Michael Chen',
        campaign_id: null,
        project_id: '1',
        is_recurring: false,
        created_at: '2024-02-07T14:20:00Z',
    },
    {
        id: '3',
        amount: 1000,
        donor_name: 'Emily Rodriguez',
        campaign_id: null,
        project_id: '2',
        is_recurring: true,
        created_at: '2024-02-08T09:15:00Z',
    },
    {
        id: '4',
        amount: 100,
        donor_name: 'David Kim',
        campaign_id: null,
        project_id: '3',
        is_recurring: false,
        created_at: '2024-02-06T16:45:00Z',
    },
    {
        id: '5',
        amount: 750,
        donor_name: 'Lisa Anderson',
        campaign_id: null,
        project_id: '2',
        is_recurring: false,
        created_at: '2024-02-05T11:30:00Z',
    },
];

// Mock Global Metrics
export const mockGlobalMetrics: GlobalMetrics = {
    totalCountries: 12,
    totalProjects: 524,
    totalVillages: 1342,
    totalRaised: 274500,
};

// In-memory storage for new donations
let donationsStore = [...mockDonations];

// Mock API Functions
export const mockApi = {
    // Get all projects
    getProjects: async (): Promise<Project[]> => {
        await delay(500); // Simulate network delay
        return [...mockProjects];
    },

    // Get project by ID
    getProjectById: async (id: string): Promise<Project | null> => {
        await delay(300);
        return mockProjects.find(p => p.id === id) || null;
    },

    // Get donations for a project
    getDonationsByProjectId: async (projectId: string): Promise<Donation[]> => {
        await delay(300);
        return donationsStore.filter(d => d.project_id === projectId);
    },

    // Get global metrics
    getGlobalMetrics: async (): Promise<GlobalMetrics> => {
        await delay(400);
        return { ...mockGlobalMetrics };
    },

    // Create a donation
    createDonation: async (donation: Omit<Donation, 'id' | 'created_at'>): Promise<Donation> => {
        await delay(500);
        const newDonation: Donation = {
            ...donation,
            id: `donation-${Date.now()}`,
            created_at: new Date().toISOString(),
        };
        donationsStore.push(newDonation);

        // Update project raised amount
        const projectIndex = mockProjects.findIndex(p => p.id === donation.project_id);
        if (projectIndex !== -1) {
            mockProjects[projectIndex].raised_amount += donation.amount;
        }

        return newDonation;
    },
};

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

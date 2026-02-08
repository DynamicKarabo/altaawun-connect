-- Altaawun-Impact Connect Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE location_type AS ENUM ('Village', 'Slum');
CREATE TYPE project_status AS ENUM ('In-Progress', 'Completed');

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    location_type location_type NOT NULL,
    description TEXT NOT NULL,
    goal_amount DECIMAL(12, 2) NOT NULL CHECK (goal_amount > 0),
    raised_amount DECIMAL(12, 2) DEFAULT 0 CHECK (raised_amount >= 0),
    status project_status DEFAULT 'In-Progress',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    custom_message TEXT,
    goal DECIMAL(12, 2) NOT NULL CHECK (goal > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    donor_name VARCHAR(255) NOT NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    is_recurring BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_location_type ON projects(location_type);
CREATE INDEX idx_campaigns_project_id ON campaigns(project_id);
CREATE INDEX idx_campaigns_owner_id ON campaigns(owner_id);
CREATE INDEX idx_donations_project_id ON donations(project_id);
CREATE INDEX idx_donations_campaign_id ON donations(campaign_id);
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update project raised_amount when donation is added
CREATE OR REPLACE FUNCTION update_project_raised_amount()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE projects
    SET raised_amount = raised_amount + NEW.amount
    WHERE id = NEW.project_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update raised_amount
CREATE TRIGGER update_raised_amount_on_donation
    AFTER INSERT ON donations
    FOR EACH ROW
    EXECUTE FUNCTION update_project_raised_amount();

-- Insert sample data for testing
INSERT INTO projects (title, location_type, description, goal_amount, raised_amount, status, image_url) VALUES
('Clean Water Initiative', 'Village', 'Providing clean drinking water to 500 families in rural villages through well construction and water purification systems.', 50000.00, 32500.00, 'In-Progress', 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800'),
('Education Center', 'Slum', 'Building a community education center to provide free tutoring and skills training for children and adults.', 75000.00, 68000.00, 'In-Progress', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'),
('Healthcare Clinic', 'Village', 'Establishing a primary healthcare clinic with essential medical supplies and trained staff.', 100000.00, 45000.00, 'In-Progress', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'),
('Solar Power Project', 'Village', 'Installing solar panels to provide sustainable electricity to 200 households.', 60000.00, 60000.00, 'Completed', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800'),
('Food Security Program', 'Slum', 'Creating community gardens and providing agricultural training to ensure food security.', 40000.00, 28000.00, 'In-Progress', 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800'),
('Women Empowerment Center', 'Slum', 'Establishing a center for vocational training and microfinance support for women entrepreneurs.', 55000.00, 41000.00, 'In-Progress', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800');

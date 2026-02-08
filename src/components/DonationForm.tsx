import { useState } from 'react';
import type { DonationFormData } from '../types';
import { mockApi } from '../lib/mockData';

// Set to true to use Supabase, false to use mock data
const USE_SUPABASE = false;

interface DonationFormProps {
    projectId: string;
    onSuccess: () => void;
}

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export const DonationForm = ({ projectId, onSuccess }: DonationFormProps) => {
    const [formData, setFormData] = useState<DonationFormData>({
        amount: 0,
        donor_name: '',
        is_recurring: false,
    });
    const [customAmount, setCustomAmount] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePresetClick = (amount: number) => {
        setSelectedPreset(amount);
        setCustomAmount('');
        setFormData({ ...formData, amount });
    };

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
        setSelectedPreset(null);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0) {
            setFormData({ ...formData, amount: numValue });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.donor_name.trim()) {
            setError('Please enter your name');
            return;
        }

        if (formData.amount <= 0) {
            setError('Please select or enter a donation amount');
            return;
        }

        try {
            setLoading(true);

            if (USE_SUPABASE) {
                const { supabase } = await import('../lib/supabase');
                const { error: dbError } = await supabase.from('donations').insert({
                    amount: formData.amount,
                    donor_name: formData.donor_name,
                    project_id: projectId,
                    is_recurring: formData.is_recurring,
                });
                if (dbError) throw dbError;
            } else {
                await mockApi.createDonation({
                    amount: formData.amount,
                    donor_name: formData.donor_name,
                    project_id: projectId,
                    campaign_id: null,
                    is_recurring: formData.is_recurring,
                });
            }

            // Reset form
            setFormData({ amount: 0, donor_name: '', is_recurring: false });
            setCustomAmount('');
            setSelectedPreset(null);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to process donation');
            console.error('Donation error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Preset Amounts */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Amount
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {PRESET_AMOUNTS.map((amount) => (
                        <button
                            key={amount}
                            type="button"
                            onClick={() => handlePresetClick(amount)}
                            className={`py-3 px-4 rounded-lg font-semibold transition-all ${selectedPreset === amount
                                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            ${amount}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Amount */}
            <div>
                <label htmlFor="customAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Or Enter Custom Amount
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                        $
                    </span>
                    <input
                        id="customAmount"
                        type="number"
                        min="1"
                        step="0.01"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        placeholder="Enter amount"
                        className="input-field pl-8"
                    />
                </div>
            </div>

            {/* Donor Name */}
            <div>
                <label htmlFor="donorName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                </label>
                <input
                    id="donorName"
                    type="text"
                    required
                    value={formData.donor_name}
                    onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                    placeholder="Enter your name"
                    className="input-field"
                />
            </div>

            {/* Recurring Donation */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <input
                    id="recurring"
                    type="checkbox"
                    checked={formData.is_recurring}
                    onChange={(e) => setFormData({ ...formData, is_recurring: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                    Make this a monthly recurring donation
                </label>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Processing...' : `Donate $${formData.amount || 0}`}
            </button>

            <p className="text-xs text-gray-500 text-center">
                Your donation is secure and will directly support this project
            </p>
        </form>
    );
};

'use client';

import React, { useState } from 'react';

// Define the form data structure
interface CheckupFormData {
  emotional: number;
  mental: number;
  physical: number;
  spiritual: number;
  reflection: string;
}

// Create the component with both export styles
const CheckupForm = () => {
  // State for form values
  const [formData, setFormData] = useState<CheckupFormData>({
    emotional: 5,
    mental: 5,
    physical: 5,
    spiritual: 5,
    reflection: '',
  });
  
  // State for loading and submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'reflection' ? value : Number(value),
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/checkup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowResponse(true);
      } else {
        console.error('Failed to submit checkup');
      }
    } catch (error) {
      console.error('Error submitting checkup:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render rating labels
  const getRatingLabel = (value: number) => {
    if (value <= 2) return 'Low';
    if (value <= 4) return 'Below Average';
    if (value <= 6) return 'Average';
    if (value <= 8) return 'Above Average';
    return 'High';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Emotional Rating */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="emotional" className="block text-sm font-medium">
            Emotional State
          </label>
          <span className="text-sm text-[#B76E79]">
            {getRatingLabel(formData.emotional)}
          </span>
        </div>
        <input
          type="range"
          id="emotional"
          name="emotional"
          min="1"
          max="10"
          value={formData.emotional}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B76E79]"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      {/* Mental Rating */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="mental" className="block text-sm font-medium">
            Mental State
          </label>
          <span className="text-sm text-[#B76E79]">
            {getRatingLabel(formData.mental)}
          </span>
        </div>
        <input
          type="range"
          id="mental"
          name="mental"
          min="1"
          max="10"
          value={formData.mental}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B76E79]"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      {/* Physical Rating */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="physical" className="block text-sm font-medium">
            Physical State
          </label>
          <span className="text-sm text-[#B76E79]">
            {getRatingLabel(formData.physical)}
          </span>
        </div>
        <input
          type="range"
          id="physical"
          name="physical"
          min="1"
          max="10"
          value={formData.physical}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B76E79]"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      {/* Spiritual Rating */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="spiritual" className="block text-sm font-medium">
            Spiritual State
          </label>
          <span className="text-sm text-[#B76E79]">
            {getRatingLabel(formData.spiritual)}
          </span>
        </div>
        <input
          type="range"
          id="spiritual"
          name="spiritual"
          min="1"
          max="10"
          value={formData.spiritual}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B76E79]"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      {/* Reflection */}
      <div className="space-y-2">
        <label htmlFor="reflection" className="block text-sm font-medium">
          Your Reflection
        </label>
        <textarea
          id="reflection"
          name="reflection"
          rows={4}
          value={formData.reflection}
          onChange={handleChange}
          placeholder="Share your thoughts, feelings, and experiences from today..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-[#B76E79]"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-[#B76E79] text-white rounded-md hover:bg-[#A25D68] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Check-Up'}
      </button>
    </form>
  );
};

// Export both as default and named export for compatibility
export default CheckupForm;
export { CheckupForm };

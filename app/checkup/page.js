'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CheckupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const [formData, setFormData] = useState({
    emotional: 5,
    mental: 5,
    physical: 5,
    spiritual: 5,
    reflection: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackLoading(true);

    try {
      const response = await fetch('/api/generate-reflection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit check-up');
      }

      const data = await response.json();
      // Store the AI insight locally for immediate feedback
      setAiFeedback(data.insight || 'No insight returned');
    } catch (error) {
      console.error('Error submitting check-up:', error);
    } finally {
      setIsSubmitting(false);
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-rose-600 mb-2">Daily Check-up</h1>
        <p className="text-gray-600">Track your emotional, mental, physical, and spiritual states</p>
      </header>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="block mb-2 font-medium">
              Emotional State: {formData.emotional}
            </label>
            <input
              type="range"
              name="emotional"
              min="1"
              max="10"
              value={formData.emotional}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="block mb-2 font-medium">
              Mental State: {formData.mental}
            </label>
            <input
              type="range"
              name="mental"
              min="1"
              max="10"
              value={formData.mental}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="block mb-2 font-medium">
              Physical State: {formData.physical}
            </label>
            <input
              type="range"
              name="physical"
              min="1"
              max="10"
              value={formData.physical}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="block mb-2 font-medium">
              Spiritual State: {formData.spiritual}
            </label>
            <input
              type="range"
              name="spiritual"
              min="1"
              max="10"
              value={formData.spiritual}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <label className="block mb-2 font-medium">
            Reflection (optional)
          </label>
          <textarea
            name="reflection"
            value={formData.reflection}
            onChange={handleChange}
            rows="4"
            placeholder="Share your thoughts about how you're feeling today..."
            className="w-full p-3 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="flex gap-3 mt-6">
          <Link 
            href="/" 
            className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-md disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Check-Up'}
          </button>
        </div>
      </form>

      {/* AI Feedback Card */}
      {(feedbackLoading || aiFeedback) && (
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-gray-800 rounded-lg p-5 text-white shadow-md">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs uppercase tracking-wider text-gray-300">
                Your AI Reflection
              </span>
            </div>
            {feedbackLoading ? (
              <p className="text-sm text-gray-300 animate-pulse">
                Generating your personalised insight...
              </p>
            ) : (
              <p className="text-sm text-gray-200 whitespace-pre-wrap">
                {aiFeedback}
              </p>
            )}
          </div>
        </div>
      )}
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <Link href="/" className="text-rose-600 hover:underline">
          Return to Home
        </Link>
      </footer>
    </div>
  );
}

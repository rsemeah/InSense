'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckUps() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      
      // Redirect to reflections page or show success message
      router.push('/reflections');
    } catch (error) {
      console.error('Error submitting check-up:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Daily Check-Up</h1>
        <p className="text-gray-600">
          Track your emotional, mental, physical, and spiritual states.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
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
            <div className="flex justify-between text-xs mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div>
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
            <div className="flex justify-between text-xs mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div>
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
            <div className="flex justify-between text-xs mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div>
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
            <div className="flex justify-between text-xs mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Reflection (optional)
          </label>
          <textarea
            name="reflection"
            value={formData.reflection}
            onChange={handleChange}
            rows="4"
            placeholder="Share your thoughts about how you're feeling today..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link 
            href="/inner-pulse" 
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-center"
          >
            Back to Inner Pulse
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Check-Up'}
          </button>
        </div>
      </form>
    </div>
  );
}

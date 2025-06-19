'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Navigation } from '../../components/Navigation';
import { HeartIcon, BrainIcon, ActivityIcon, SparklesIcon } from 'lucide-react';

export default function CheckUps() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState('home');
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
    <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
      <Header />
      
      <main className="flex-1 px-5 py-4 overflow-y-auto pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-1">Daily Check-up</h1>
          <p className="text-[#1E1B2E]/60">Track your emotional, mental, physical, and spiritual states</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#F8EBDD] rounded-full flex items-center justify-center mr-3">
                  <HeartIcon size={18} className="text-[#B76E79]" />
                </div>
                <label className="font-medium">
                  Emotional State: {formData.emotional}
                </label>
              </div>
              <input
                type="range"
                name="emotional"
                min="1"
                max="10"
                value={formData.emotional}
                onChange={handleChange}
                className="w-full h-2 bg-[#F8EBDD] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs mt-1 text-[#1E1B2E]/60">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#F8EBDD] rounded-full flex items-center justify-center mr-3">
                  <BrainIcon size={18} className="text-[#1E1B2E]" />
                </div>
                <label className="font-medium">
                  Mental State: {formData.mental}
                </label>
              </div>
              <input
                type="range"
                name="mental"
                min="1"
                max="10"
                value={formData.mental}
                onChange={handleChange}
                className="w-full h-2 bg-[#F8EBDD] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs mt-1 text-[#1E1B2E]/60">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#F8EBDD] rounded-full flex items-center justify-center mr-3">
                  <ActivityIcon size={18} className="text-gray-600" />
                </div>
                <label className="font-medium">
                  Physical State: {formData.physical}
                </label>
              </div>
              <input
                type="range"
                name="physical"
                min="1"
                max="10"
                value={formData.physical}
                onChange={handleChange}
                className="w-full h-2 bg-[#F8EBDD] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs mt-1 text-[#1E1B2E]/60">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#F8EBDD] rounded-full flex items-center justify-center mr-3">
                  <SparklesIcon size={18} className="text-purple-600" />
                </div>
                <label className="font-medium">
                  Spiritual State: {formData.spiritual}
                </label>
              </div>
              <input
                type="range"
                name="spiritual"
                min="1"
                max="10"
                value={formData.spiritual}
                onChange={handleChange}
                className="w-full h-2 bg-[#F8EBDD] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs mt-1 text-[#1E1B2E]/60">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
            <label className="block mb-2 font-medium">
              Reflection (optional)
            </label>
            <textarea
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              rows="4"
              placeholder="Share your thoughts about how you're feeling today..."
              className="w-full p-3 border border-[#F8EBDD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
            ></textarea>
          </div>

          <div className="flex gap-3 mt-6">
            <Link 
              href="/inner-pulse" 
              className="flex-1 py-3 px-4 bg-[#F8EBDD] text-[#1E1B2E] rounded-lg hover:bg-[#F8EBDD]/80 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-[#B76E79] hover:bg-[#B76E79]/90 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Check-Up'}
            </button>
          </div>
        </form>
      </main>

      <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
}

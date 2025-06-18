'use client';

import { useState } from 'react';

export default function InnerPulse() {
  // State for form values
  const [emotional, setEmotional] = useState(5);
  const [mental, setMental] = useState(5);
  const [physical, setPhysical] = useState(5);
  const [spiritual, setSpiritual] = useState(5);
  const [reflection, setReflection] = useState('');
  
  // State for the AI response
  const [aiResponse, setAiResponse] = useState('');
  
  // State for loading status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // This is where you would normally make an API call to get AI insights
      setAiResponse(
        `Thank you for your reflection. Based on your ratings (Emotional: ${emotional}, Mental: ${mental}, Physical: ${physical}, Spiritual: ${spiritual}), here are some insights to consider...`
      );
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#B76E79] mb-6">Inner Pulse</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#F8EBDD] p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
        <p className="text-gray-600 mb-6">
          Rate your state across four dimensions and share a brief reflection.
        </p>
        
        <form onSubmit={handleSubmit}>
          {/* Emotional Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 flex justify-between">
              <span>Emotional</span>
              <span className="text-[#B76E79] font-semibold">{emotional}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={emotional}
              onChange={(e) => setEmotional(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          
          {/* Mental Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 flex justify-between">
              <span>Mental</span>
              <span className="text-[#B76E79] font-semibold">{mental}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={mental}
              onChange={(e) => setMental(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          
          {/* Physical Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 flex justify-between">
              <span>Physical</span>
              <span className="text-[#B76E79] font-semibold">{physical}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={physical}
              onChange={(e) => setPhysical(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          
          {/* Spiritual Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 flex justify-between">
              <span>Spiritual</span>
              <span className="text-[#B76E79] font-semibold">{spiritual}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={spiritual}
              onChange={(e) => setSpiritual(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          
          {/* Reflection Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Your Reflection
            </label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Share your thoughts, feelings, or experiences today..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent"
              rows="4"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#B76E79] text-white py-3 px-6 rounded-md hover:bg-[#a25c67] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Processing...' : 'Generate Insights'}
          </button>
        </form>
      </div>
      
      {/* AI Response Section */}
      {aiResponse && (
        <div className="bg-[#F8EBDD] rounded-xl p-6 border border-[#E6D5C3] shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Insights from Within</h3>
          <p className="text-[#1E1B2E]/80 whitespace-pre-line">{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

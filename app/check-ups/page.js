'use client';

import React, { useState } from 'react';
import SimplePage from '../components/SimplePage.js';

export default function CheckUpsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
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
      [name]: name === 'reflection' ? value : Number(value)
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
        throw new Error('Failed to submit');
      }

      const data = await response.json();
      setAiResponse(data.insight || 'No insight available');
    } catch (error) {
      console.error('Error:', error);
      setAiResponse('Error generating insight. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SimplePage
      title="Daily Check-Up"
      activeRoute="/check-ups"
      backPath="/inner-pulse"
    >
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #F8EBDD', borderRadius: '8px', backgroundColor: 'white' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Emotional: {formData.emotional}
            <input
              type="range"
              name="emotional"
              min="1"
              max="10"
              value={formData.emotional}
              onChange={handleChange}
              style={{ width: '100%', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Mental: {formData.mental}
            <input
              type="range"
              name="mental"
              min="1"
              max="10"
              value={formData.mental}
              onChange={handleChange}
              style={{ width: '100%', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Physical: {formData.physical}
            <input
              type="range"
              name="physical"
              min="1"
              max="10"
              value={formData.physical}
              onChange={handleChange}
              style={{ width: '100%', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Spiritual: {formData.spiritual}
            <input
              type="range"
              name="spiritual"
              min="1"
              max="10"
              value={formData.spiritual}
              onChange={handleChange}
              style={{ width: '100%', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Reflection (optional):
            <textarea
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              rows="4"
              style={{ width: '100%', marginTop: '5px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              placeholder="Share your thoughts about how you're feeling today..."
            ></textarea>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ 
            width: '100%',
            padding: '10px', 
            backgroundColor: '#B76E79', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Check-Up'}
        </button>
      </form>

      {aiResponse && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#1E1B2E', 
          color: 'white', 
          borderRadius: '8px' 
        }}>
          <h3 style={{ marginBottom: '10px' }}>Your Reflection</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{aiResponse}</p>
        </div>
      )}
    </SimplePage>
  );
}

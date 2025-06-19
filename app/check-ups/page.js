'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CheckUps() {
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Daily Check-Up</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>
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

        <div style={{ marginBottom: '20px' }}>
          <label>
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

        <div style={{ marginBottom: '20px' }}>
          <label>
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

        <div style={{ marginBottom: '20px' }}>
          <label>
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
          <label>
            Reflection (optional):
            <textarea
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              rows="4"
              style={{ width: '100%', marginTop: '5px', padding: '8px' }}
              placeholder="Share your thoughts about how you're feeling today..."
            ></textarea>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link 
            href="/" 
            style={{ 
              flex: 1, 
              padding: '10px', 
              backgroundColor: '#f0f0f0', 
              textAlign: 'center', 
              borderRadius: '4px',
              textDecoration: 'none',
              color: '#333'
            }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ 
              flex: 1, 
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
        </div>
      </form>

      {aiResponse && (
        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          backgroundColor: '#1E1B2E', 
          color: 'white', 
          borderRadius: '8px' 
        }}>
          <h3 style={{ marginBottom: '10px' }}>Your Reflection</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{aiResponse}</p>
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link 
          href="/inner-pulse" 
          style={{ color: '#B76E79', textDecoration: 'none' }}
        >
          Back to Inner Pulse
        </Link>
      </div>
    </div>
  );
}

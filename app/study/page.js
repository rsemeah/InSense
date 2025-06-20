'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Study() {
  const [loading, setLoading] = useState(true);
  const [studyPlans, setStudyPlans] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      // Mock study plans
      const mockStudyPlans = [
        {
          id: 1,
          title: 'Learn Meditation Basics',
          description: 'Master fundamental meditation techniques for daily practice',
          category: 'meditation',
          progress: 60,
          target_date: '2025-08-15'
        },
        {
          id: 2,
          title: 'Understand Chakra System',
          description: 'Study the seven main chakras and their influence on well-being',
          category: 'energy_work',
          progress: 40,
          target_date: '2025-09-20'
        },
        {
          id: 3,
          title: 'Daily Mindfulness Practice',
          description: 'Establish a consistent mindfulness routine',
          category: 'mindfulness',
          progress: 75,
          target_date: '2025-07-30'
        }
      ];
      
      // Mock resources
      const mockResources = [
        {
          id: 1,
          title: 'The Power of Now',
          type: 'book',
          url: 'https://example.com/power-of-now',
          notes: 'Essential reading for understanding presence and mindfulness'
        },
        {
          id: 2,
          title: 'Introduction to Meditation',
          type: 'course',
          url: 'https://example.com/meditation-course',
          notes: 'Comprehensive beginner course with guided sessions'
        },
        {
          id: 3,
          title: 'Understanding Your Energy',
          type: 'video',
          url: 'https://example.com/energy-video',
          notes: 'Visual guide to working with personal energy'
        }
      ];
      
      setStudyPlans(mockStudyPlans);
      setResources(mockResources);
      setLoading(false);
    }, 1000);
  }, []);

  // Helper function to render a progress bar
  const renderProgressBar = (progress) => {
    return (
      <div style={{ 
        width: '100%', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '4px',
        height: '8px',
        marginTop: '8px'
      }}>
        <div style={{ 
          width: `${progress}%`, 
          backgroundColor: '#B76E79', 
          height: '100%', 
          borderRadius: '4px' 
        }}></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Spiritual Study</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading your study plans and resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Spiritual Study</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Set goals, track resources, and monitor your spiritual learning journey
      </p>
      
      {/* Learning Goals Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '15px' }}>Learning Goals</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {studyPlans.map(plan => (
            <div key={plan.id} style={{ 
              padding: '20px', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #F8EBDD'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontWeight: '600' }}>{plan.title}</h3>
                <span style={{ 
                  backgroundColor: '#F8EBDD', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.8rem' 
                }}>
                  {plan.category.replace('_', ' ')}
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: '15px' }}>{plan.description}</p>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>Progress: {plan.progress}%</span>
                  <span>Target: {new Date(plan.target_date).toLocaleDateString()}</span>
                </div>
                {renderProgressBar(plan.progress)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Study Resources Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '15px' }}>Study Resources</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {resources.map(resource => (
            <div key={resource.id} style={{ 
              padding: '20px', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #F8EBDD'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontWeight: '600' }}>{resource.title}</h3>
                <span style={{ 
                  backgroundColor: '#F8EBDD', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.8rem',
                  color: '#1E1B2E'
                }}>
                  {resource.type}
                </span>
              </div>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#B76E79', textDecoration: 'none', display: 'block', marginBottom: '8px' }}
              >
                {resource.url}
              </a>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{resource.notes}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Action Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Link 
          href="/inner-pulse" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#B76E79', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Back to Inner Pulse
        </Link>
      </div>
    </div>
  );
}

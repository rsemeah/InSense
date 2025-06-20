'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkups, setCheckups] = useState([]);
  const [averages, setAverages] = useState({
    emotional: 0,
    mental: 0,
    physical: 0,
    spiritual: 0
  });

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      try {
        // Mock data - in a real app this would come from Supabase
        const mockData = [
          { 
            id: 1, 
            emotional: 7, 
            mental: 6, 
            physical: 8, 
            spiritual: 5, 
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() 
          },
          { 
            id: 2, 
            emotional: 6, 
            mental: 7, 
            physical: 6, 
            spiritual: 7, 
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() 
          },
          { 
            id: 3, 
            emotional: 8, 
            mental: 7, 
            physical: 7, 
            spiritual: 8, 
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() 
          },
          { 
            id: 4, 
            emotional: 7, 
            mental: 8, 
            physical: 7, 
            spiritual: 8, 
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() 
          }
        ];
        
        setCheckups(mockData);
        
        // Calculate averages
        const avg = {
          emotional: 0,
          mental: 0,
          physical: 0,
          spiritual: 0
        };
        
        mockData.forEach(entry => {
          avg.emotional += entry.emotional;
          avg.mental += entry.mental;
          avg.physical += entry.physical;
          avg.spiritual += entry.spiritual;
        });
        
        const count = mockData.length;
        setAverages({
          emotional: (avg.emotional / count).toFixed(1),
          mental: (avg.mental / count).toFixed(1),
          physical: (avg.physical / count).toFixed(1),
          spiritual: (avg.spiritual / count).toFixed(1)
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    }, 1000);
  }, []);

  // Helper function to create a simple bar chart
  const renderBar = (value, max = 10, color = '#B76E79') => {
    const percentage = (value / max) * 100;
    return (
      <div style={{ 
        width: '100%', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '4px',
        height: '12px',
        marginTop: '4px'
      }}>
        <div style={{ 
          width: `${percentage}%`, 
          backgroundColor: color, 
          height: '100%', 
          borderRadius: '4px' 
        }}></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Dashboard</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading your data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Dashboard</h1>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#FEE2E2', 
          border: '1px solid #FECACA',
          borderRadius: '8px',
          color: '#B91C1C'
        }}>
          <p>{error}</p>
          <p style={{ marginTop: '10px' }}>
            <Link href="/" style={{ color: '#B76E79', textDecoration: 'none' }}>
              Return to Home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Dashboard</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Track your progress and visualize your journey
      </p>
      
      {/* Summary Statistics */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '15px' }}>Overview</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px' 
        }}>
          <div style={{ 
            padding: '15px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #F8EBDD'
          }}>
            <h3 style={{ fontSize: '0.9rem', color: '#B76E79', marginBottom: '5px' }}>Emotional</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '5px' }}>{averages.emotional}</p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>Average Rating</p>
          </div>
          
          <div style={{ 
            padding: '15px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #F8EBDD'
          }}>
            <h3 style={{ fontSize: '0.9rem', color: '#1E1B2E', marginBottom: '5px' }}>Mental</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '5px' }}>{averages.mental}</p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>Average Rating</p>
          </div>
          
          <div style={{ 
            padding: '15px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #F8EBDD'
          }}>
            <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Physical</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '5px' }}>{averages.physical}</p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>Average Rating</p>
          </div>
          
          <div style={{ 
            padding: '15px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #F8EBDD'
          }}>
            <h3 style={{ fontSize: '0.9rem', color: '#8B5CF6', marginBottom: '5px' }}>Spiritual</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '5px' }}>{averages.spiritual}</p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>Average Rating</p>
          </div>
        </div>
      </div>
      
      {/* Simple Trend Visualization */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '15px' }}>Progress</h2>
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #F8EBDD'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#B76E79', marginBottom: '5px' }}>Emotional Trend</h3>
            {renderBar(averages.emotional, 10, '#B76E79')}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#1E1B2E', marginBottom: '5px' }}>Mental Trend</h3>
            {renderBar(averages.mental, 10, '#1E1B2E')}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Physical Trend</h3>
            {renderBar(averages.physical, 10, '#666')}
          </div>
          
          <div>
            <h3 style={{ fontSize: '0.9rem', color: '#8B5CF6', marginBottom: '5px' }}>Spiritual Trend</h3>
            {renderBar(averages.spiritual, 10, '#8B5CF6')}
          </div>
        </div>
      </div>
      
      {/* Recent Check-ups */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '15px' }}>Recent Check-ups</h2>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #F8EBDD',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#F8EBDD50' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#B76E79' }}>E</th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#1E1B2E' }}>M</th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>P</th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#8B5CF6' }}>S</th>
              </tr>
            </thead>
            <tbody>
              {checkups.map((entry) => (
                <tr key={entry.id} style={{ borderTop: '1px solid #F8EBDD50' }}>
                  <td style={{ padding: '12px', fontSize: '0.9rem', color: '#666' }}>
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: '500', color: '#B76E79' }}>
                    {entry.emotional}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: '500', color: '#1E1B2E' }}>
                    {entry.mental}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: '500', color: '#666' }}>
                    {entry.physical}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: '500', color: '#8B5CF6' }}>
                    {entry.spiritual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Link 
          href="/check-ups" 
          style={{ 
            flex: 1, 
            padding: '10px', 
            backgroundColor: '#B76E79', 
            color: 'white', 
            textAlign: 'center', 
            borderRadius: '4px',
            textDecoration: 'none'
          }}
        >
          New Check-up
        </Link>
        <Link 
          href="/reflections" 
          style={{ 
            flex: 1, 
            padding: '10px', 
            backgroundColor: '#1E1B2E', 
            color: 'white', 
            textAlign: 'center', 
            borderRadius: '4px',
            textDecoration: 'none'
          }}
        >
          View Reflections
        </Link>
      </div>
      
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

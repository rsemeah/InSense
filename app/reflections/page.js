'use client';

import React, { useState, useEffect } from 'react';
import SimplePage from '../components/SimplePage.js';

export default function ReflectionsPage() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [regenLoadingId, setRegenLoadingId] = useState(null);

  useEffect(() => {
    // Mock data for reflections (replacing Supabase fetch)
    setTimeout(() => {
      const mockReflections = [
        {
          id: '1',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          emotional: 7,
          mental: 6,
          physical: 8,
          spiritual: 7,
          reflection: 'Felt a strong sense of peace after meditation. Energy levels were good.',
          ai_response: 'Your recent meditation practice seems to be positively impacting your emotional and spiritual well-being. Continue to nurture this inner peace. Perhaps explore new meditation techniques to deepen your practice. Remember, stillness is a powerful guide.'
        },
        {
          id: '2',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          emotional: 5,
          mental: 5,
          physical: 6,
          spiritual: 5,
          reflection: 'A bit stressed with work, but managed to get some exercise in. Feeling neutral.',
          ai_response: 'It sounds like you\'re navigating some work-related stress, yet you found balance through physical activity. This resilience is a strength. Consider incorporating short mindfulness breaks during your workday to manage mental tension. Affirmation: "I am capable of finding calm amidst chaos."'
        },
        {
          id: '3',
          created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
          emotional: 8,
          mental: 8,
          physical: 7,
          spiritual: 9,
          reflection: 'Had a profound spiritual experience during a nature walk. Feeling very connected.',
          ai_response: 'What a beautiful experience! Your connection with nature clearly resonates deeply with your spiritual self. Continue to seek out environments that uplift and inspire you. Perhaps journaling about these experiences could further integrate their lessons. Affirmation: "My spirit is boundless and deeply connected to all life."'
        },
      ];
      
      setReflections(mockReflections);
      setLoading(false);
    }, 1000); // Simulate 1 second loading time
  }, []);

  const handleRegenerateInsight = async (entry) => {
    setRegenLoadingId(entry.id);
    try {
      const res = await fetch('/api/generate-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emotional: entry.emotional,
          mental: entry.mental,
          physical: entry.physical,
          spiritual: entry.spiritual,
          reflection: entry.reflection || '',
        }),
      });
      const data = await res.json();
      // Update local state with new AI response
      setReflections((prev) =>
        prev.map((r) =>
          r.id === entry.id
            ? { ...r, ai_response: data.insight || r.ai_response }
            : r
        )
      );
      // Note: Supabase persistence is removed as per instructions
    } catch (err) {
      console.error('Regenerate error', err);
      alert('Failed to regenerate insight. Please try again.');
    } finally {
      setRegenLoadingId(null);
    }
  };

  if (loading) {
    return (
      <SimplePage title="Your Inner Pulse Journal" activeRoute="/reflections" backPath="/inner-pulse">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666' }}>Loading your reflections...</p>
        </div>
      </SimplePage>
    );
  }

  if (error) {
    return (
      <SimplePage title="Your Inner Pulse Journal" activeRoute="/reflections" backPath="/inner-pulse">
        <div style={{ padding: '20px', backgroundColor: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', color: '#B91C1C' }}>
          <p>{error}</p>
        </div>
      </SimplePage>
    );
  }

  return (
    <SimplePage title="Your Inner Pulse Journal" activeRoute="/reflections" backPath="/inner-pulse">
      {reflections.length === 0 ? (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #F8EBDD', padding: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>No reflections found yet.</p>
          <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '8px' }}>Start your journey by completing an Inner Pulse check-in!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {reflections.map((entry) => (
            <div
              key={entry.id}
              style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #F8EBDD', padding: '20px', cursor: 'pointer' }}
              onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1E1B2E', margin: 0 }}>
                  {new Date(entry.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h2>
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#666' }}>
                  <span>E:{entry.emotional}</span>
                  <span>M:{entry.mental}</span>
                  <span>P:{entry.physical}</span>
                  <span>S:{entry.spiritual}</span>
                </div>
              </div>

              {expandedId === entry.id ? (
                <>
                  <p style={{ color: '#1E1B2E80', whiteSpace: 'pre-wrap', marginBottom: '15px' }}>
                    {entry.ai_response || 'No AI insight available.'}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#B76E79',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        opacity: regenLoadingId === entry.id ? 0.7 : 1
                      }}
                      disabled={regenLoadingId === entry.id}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent parent div click
                        handleRegenerateInsight(entry);
                      }}
                    >
                      {regenLoadingId === entry.id ? (
                        'Regenerating...'
                      ) : (
                        <>
                          ↻ Regenerate
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ color: '#1E1B2E80', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {entry.ai_response || 'No AI insight available.'}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#B76E79', fontWeight: '500' }}>
                    Click for full details
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </SimplePage>
  );
}

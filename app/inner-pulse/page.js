'use client';

import React, { useState, useEffect } from 'react';
import SimplePage from '../../components/SimplePage';

export default function InnerPulsePage() {
  const [insight, setInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(true);
  const [errorInsight, setErrorInsight] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchInsight(attempt = 1) {
      try {
        const res = await fetch('/api/generate-reflection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emotional: 5,
            mental: 5,
            physical: 5,
            spiritual: 5,
            reflection: '',
          }),
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setInsight(data.insight || '');
          setErrorInsight(false);
        }
      } catch (err) {
        console.error(`[InnerPulse] insight attempt ${attempt} failed:`, err);
        if (attempt < 3) {
          setTimeout(() => fetchInsight(attempt + 1), attempt * 500);
        } else if (!cancelled) {
          setErrorInsight(true);
          setInsight(
            'Take a deep breath and allow stillness to guide your next step. Trust that clarity will follow.'
          );
        }
      } finally {
        if (!cancelled) setLoadingInsight(false);
      }
    }
    fetchInsight();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SimplePage title="Inner Pulse" activeRoute="/inner-pulse">
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #F8EBDD', borderRadius: '8px', backgroundColor: 'white' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#1E1B2E' }}>Today's Insight</h2>
        {loadingInsight ? (
          <p style={{ color: '#666' }}>Fetching your personalized insight...</p>
        ) : errorInsight ? (
          <p style={{ color: 'red' }}>{insight}</p>
        ) : (
          <p style={{ whiteSpace: 'pre-wrap', color: '#333' }}>{insight}</p>
        )}
      </div>
      <p>Explore tools and rituals for your spiritual journey.</p>
    </SimplePage>
  );
}

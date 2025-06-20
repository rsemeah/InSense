'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Header } from '../../components/Header';
import { Navigation } from '../../components/Navigation';
import { RefreshCwIcon } from 'lucide-react';

export default function ReflectionsPage() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('journal');
  const [expandedId, setExpandedId] = useState(null);
  const [regenLoadingId, setRegenLoadingId] = useState(null);

  useEffect(() => {
    async function fetchReflections() {
      try {
        // Fetch reflections from Supabase, ordered by creation date descending
        const { data, error } = await supabase
          .from('inner_pulse_entries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setReflections(data);
      } catch (err) {
        console.error('Error fetching reflections:', err);
        setError('Failed to load reflections. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchReflections();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-lg text-gray-600">Loading your reflections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-600">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
      <Header />

      <main className="flex-1 px-5 py-6 overflow-y-auto pb-20 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-medium text-[#B76E79] mb-6">
          Your Inner Pulse Journal
        </h1>

      {reflections.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#F8EBDD] p-6 text-center">
          <p className="text-lg text-gray-600">No reflections found yet.</p>
          <p className="text-md text-gray-500 mt-2">Start your journey by completing an Inner Pulse check-in!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reflections.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl shadow-sm border border-[#F8EBDD] p-6 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() =>
                setExpandedId(expandedId === entry.id ? null : entry.id)
              }
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-[#1E1B2E]">
                  {new Date(entry.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h2>
                <div className="flex space-x-2 text-sm text-gray-600">
                  <span>E:{entry.emotional}</span>
                  <span>M:{entry.mental}</span>
                  <span>P:{entry.physical}</span>
                  <span>S:{entry.spiritual}</span>
                </div>
              </div>

              {/* Insight preview / full */}
              {expandedId === entry.id ? (
                <>
                  <p className="text-[#1E1B2E]/80 whitespace-pre-wrap mb-4">
                    {entry.ai_response || 'No AI insight available.'}
                  </p>

                  <div className="flex justify-end">
                    <button
                      className="flex items-center gap-2 btn-primary disabled:opacity-60"
                      disabled={regenLoadingId === entry.id}
                      onClick={async (e) => {
                        e.stopPropagation();
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
                          // update local state
                          setReflections((prev) =>
                            prev.map((r) =>
                              r.id === entry.id
                                ? { ...r, ai_response: data.insight || r.ai_response }
                                : r
                            )
                          );
                          // optional: persist
                          await supabase
                            .from('inner_pulse_entries')
                            .update({ ai_response: data.insight })
                            .eq('id', entry.id);
                        } catch (err) {
                          console.error('Regenerate error', err);
                          alert('Failed to regenerate insight.');
                        } finally {
                          setRegenLoadingId(null);
                        }
                      }}
                    >
                      {regenLoadingId === entry.id ? (
                        'Regenerating...'
                      ) : (
                        <>
                          <RefreshCwIcon size={16} /> Regenerate
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[#1E1B2E]/80 mb-3 line-clamp-2">
                    {entry.ai_response || 'No AI insight available.'}
                  </p>
                  <p className="text-sm text-[#B76E79] font-medium">
                    Click for full details
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      </main>

      <Navigation
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    </div>
  );
}

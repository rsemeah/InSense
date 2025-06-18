'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // Use relative path

export default function ReflectionsPage() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#B76E79] mb-8">Your Inner Pulse Journal</h1>

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
              // In a full implementation, this would link to a detail page
              onClick={() => alert(`Viewing full details for entry from ${new Date(entry.created_at).toLocaleDateString()}`)}
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
              <p className="text-[#1E1B2E]/80 mb-3 line-clamp-2">
                {entry.ai_response || 'No AI insight available.'}
              </p>
              <p className="text-sm text-[#B76E79] font-medium">Click for full details</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

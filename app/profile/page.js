'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error('Missing Supabase environment variables');
        }
        
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        // Get the user session
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Fetch the user's profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) throw error;
        
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Your Spiritual Profile</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Your Spiritual Profile</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Unable to load your profile: {error}</p>
          <p className="mt-2">
            <Link href="/inner-pulse" className="text-blue-600 hover:underline">
              Return to Inner Pulse
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Spiritual Profile</h1>
        <p className="text-gray-600">
          Insights into your astrological, numerological, and human design patterns.
        </p>
      </header>

      {profile ? (
        <div className="space-y-8">
          {/* Human Design Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Human Design</h2>
            <div className="prose max-w-none">
              {profile.human_design ? (
                <div dangerouslySetInnerHTML={{ __html: profile.human_design }} />
              ) : (
                <p className="text-gray-500 italic">Human design information not available</p>
              )}
            </div>
          </section>

          {/* Astrology Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Astrological Insights</h2>
            <div className="prose max-w-none">
              {profile.astrology ? (
                <div dangerouslySetInnerHTML={{ __html: profile.astrology }} />
              ) : (
                <p className="text-gray-500 italic">Astrological information not available</p>
              )}
            </div>
          </section>

          {/* Numerology Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Numerology</h2>
            <div className="prose max-w-none">
              {profile.numerology ? (
                <div dangerouslySetInnerHTML={{ __html: profile.numerology }} />
              ) : (
                <p className="text-gray-500 italic">Numerology information not available</p>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          <p>No profile data found. Would you like to generate your spiritual profile?</p>
          <Link 
            href="/profile-generator" 
            className="mt-4 inline-block py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Generate My Profile
          </Link>
        </div>
      )}

      <div className="mt-8">
        <Link 
          href="/inner-pulse" 
          className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md inline-block"
        >
          Back to Inner Pulse
        </Link>
      </div>
    </div>
  );
}

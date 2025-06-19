'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulate loading profile data
    setTimeout(() => {
      // Mock profile data instead of fetching from Supabase
      const mockProfile = {
        human_design: `<p>You are a Generator with Emotional Authority.</p>
        <p>Your energy is designed to respond rather than initiate. When you follow your strategy of waiting to respond, you access your powerful, sustainable energy for the things that matter to you.</p>
        <p>With Emotional Authority, decisions are best made after riding the emotional wave. Give yourself time to experience the highs and lows before making important choices.</p>`,
        
        astrology: `<p>Sun in Pisces, Moon in Taurus, Rising in Libra</p>
        <p>Your Pisces Sun gives you deep intuition and creative imagination. You're naturally empathetic and spiritually inclined.</p>
        <p>Your Taurus Moon grounds your emotions, providing stability and practicality to balance your dreamy Pisces nature.</p>
        <p>With Libra Rising, you present yourself as balanced, diplomatic, and aesthetically aware. You value harmony in your surroundings and relationships.</p>`,
        
        numerology: `<p>Life Path Number: 7</p>
        <p>As a Life Path 7, you're a natural seeker of truth and wisdom. You have a deeply analytical mind and are drawn to understanding the mysteries of life.</p>
        <p>Your challenge is to balance your intellectual pursuits with practical application and human connection.</p>
        <p>Your Expression Number 4 brings structure to your spiritual insights, helping you build solid foundations for your ideas.</p>`
      };
      
      setProfile(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Spiritual Blueprint</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading your spiritual profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Spiritual Blueprint</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Insights into your astrological, numerological, and human design patterns
      </p>
      
      {/* Human Design Section */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #F8EBDD'
      }}>
        <h2 style={{ marginBottom: '15px', color: '#B76E79' }}>Human Design</h2>
        <div dangerouslySetInnerHTML={{ __html: profile.human_design }} />
      </div>
      
      {/* Astrology Section */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #F8EBDD'
      }}>
        <h2 style={{ marginBottom: '15px', color: '#1E1B2E' }}>Astrological Insights</h2>
        <div dangerouslySetInnerHTML={{ __html: profile.astrology }} />
      </div>
      
      {/* Numerology Section */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #F8EBDD'
      }}>
        <h2 style={{ marginBottom: '15px', color: '#8B5CF6' }}>Numerology</h2>
        <div dangerouslySetInnerHTML={{ __html: profile.numerology }} />
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
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

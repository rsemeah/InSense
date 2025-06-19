'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Navigation } from '../../components/Navigation';
import { 
  BarChart3Icon, 
  BookOpenIcon, 
  CalendarIcon, 
  FlameIcon, 
  MoonIcon, 
  SparklesIcon, 
  StarIcon, 
  SunIcon 
} from 'lucide-react';

export default function InnerPulsePage() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [insight, setInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(true);
  const [errorInsight, setErrorInsight] = useState(false);

  // ------------------------------------------------------------------
  // Fetch an AI-generated reflection when the page mounts
  // ------------------------------------------------------------------
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
          // simple back-off retry
          setTimeout(() => fetchInsight(attempt + 1), attempt * 500);
        } else if (!cancelled) {
          setErrorInsight(true);
          // Static fallback content
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

  const tools = [
    {
      id: 'check-ups',
      name: 'Daily Check-up',
      description: 'Track your emotional, mental, physical, and spiritual states',
      icon: <BarChart3Icon size={24} />,
      color: 'bg-[#F8EBDD]',
      textColor: 'text-[#B76E79]',
      link: '/check-ups'
    },
    {
      id: 'reflections',
      name: 'Reflections',
      description: 'Review your AI-generated insights and past reflections',
      icon: <BookOpenIcon size={24} />,
      color: 'bg-[#F8EBDD]',
      textColor: 'text-[#1E1B2E]',
      link: '/reflections'
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Visualize your progress and patterns over time',
      icon: <BarChart3Icon size={24} />,
      color: 'bg-[#F8EBDD]',
      textColor: 'text-[#1E1B2E]',
      link: '/dashboard'
    },
    {
      id: 'profile',
      name: 'Spiritual Blueprint',
      description: 'Discover your human design, astrology, and numerology profile',
      icon: <StarIcon size={24} />,
      color: 'bg-[#F8EBDD]',
      textColor: 'text-[#1E1B2E]',
      link: '/profile'
    }
  ];

  const rituals = [
    {
      id: 'morning',
      name: 'Morning Ritual',
      description: 'Start your day with intention and clarity',
      icon: <SunIcon size={24} />,
      color: 'bg-[#F8EBDD]',
      textColor: 'text-[#1E1B2E]',
      link: '/rituals/morning'
    },
    {
      id: 'evening',
      name: 'Evening Reflection',
      description: 'Wind down and process your day',
      icon: <MoonIcon size={24} />,
      color: 'bg-[#F8EBDD]',
      textColor: 'text-[#1E1B2E]',
      link: '/rituals/evening'
    },
    {
      id: 'study',
      name: 'Study Path',
      description: 'Deepen your spiritual knowledge and practice',
      icon: <SparklesIcon size={24} />,
      color: 'bg-[#F8EBDD]',
      textColor: 'text-[#1E1B2E]',
      link: '/study'
    },
    {
      id: 'calendar',
      name: 'Sacred Calendar',
      description: 'Track cosmic events and plan your spiritual practice',
      icon: <CalendarIcon size={24} />,
      color: 'bg-[#F8EBDD]',
      textColor: 'text-[#1E1B2E]',
      link: '/calendar'
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
      <Header />
      
      <main className="flex-1 px-5 py-4 overflow-y-auto pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-1">Inner Pulse</h1>
          <p className="text-[#1E1B2E]/60">Tools and rituals for your spiritual journey</p>
        </div>

        {/* Tools Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Your Tools</h2>
            <div className="w-8 h-8 rounded-full bg-[#F8EBDD] flex items-center justify-center">
              <FlameIcon size={18} className="text-[#B76E79]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {tools.map(tool => (
              <Link key={tool.id} href={tool.link}>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD] flex items-center">
                  <div className={`w-10 h-10 ${tool.color} rounded-full flex items-center justify-center mr-4`}>
                    <span className={tool.textColor}>{tool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{tool.name}</h3>
                    <p className="text-sm text-[#1E1B2E]/60">{tool.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Rituals Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Daily Rituals</h2>
            <div className="w-8 h-8 rounded-full bg-[#F8EBDD] flex items-center justify-center">
              <SparklesIcon size={18} className="text-[#1E1B2E]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {rituals.map(ritual => (
              <Link key={ritual.id} href={ritual.link}>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD] flex items-center">
                  <div className={`w-10 h-10 ${ritual.color} rounded-full flex items-center justify-center mr-4`}>
                    <span className={ritual.textColor}>{ritual.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{ritual.name}</h3>
                    <p className="text-sm text-[#1E1B2E]/60">{ritual.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Insight */}
        <section className="mb-6">
          <div className="bg-gradient-to-br from-[#1E1B2E] to-[#2d2a3d] rounded-2xl p-5 text-[#FCFCFC] shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#FCFCFC]/70">
                  Today's Insight
                </span>
                {!loadingInsight && (
                  <h3 className="text-xl font-medium mt-2 mb-3">
                    Personal Reflection
                  </h3>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-[#B76E79]/20 flex items-center justify-center">
                <MoonIcon size={20} className="text-[#B76E79]" />
              </div>
            </div>
            <p className="text-sm text-[#FCFCFC]/80 mb-4 whitespace-pre-wrap">
              {loadingInsight
                ? 'Fetching your personalised insight...'
                : insight}
            </p>
            {errorInsight && (
              <p className="text-xs text-red-300">
                Unable to reach AI service, showing fallback message.
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-[#FCFCFC]/60">
              <span>Daily Wisdom</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </section>
      </main>

      <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
}

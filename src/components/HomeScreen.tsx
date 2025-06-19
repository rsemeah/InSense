import React from 'react';
import { InsightCard } from './InsightCard';
import { StarIcon, MoonIcon, SunIcon, HeartIcon } from 'lucide-react';
export const HomeScreen = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  return <div className="px-5 py-4">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-1">Welcome back, Soul</h2>
        <p className="text-[#1E1B2E]/60">{currentDate}</p>
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Today's Essence</h3>
          <button className="text-xs text-[#B76E79]">View All</button>
        </div>
        <div className="bg-gradient-to-br from-[#1E1B2E] to-[#2d2a3d] rounded-2xl p-5 text-[#FCFCFC] shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#FCFCFC]/70">
                Daily Reflection
              </span>
              <h3 className="text-xl font-medium mt-2 mb-3">Inner Stillness</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#B76E79]/20 flex items-center justify-center">
              <MoonIcon size={20} className="text-[#B76E79]" />
            </div>
          </div>
          <p className="text-sm text-[#FCFCFC]/80 mb-4">
            Today invites you to find moments of quiet contemplation. Your inner
            wisdom speaks clearest in silence.
          </p>
          <div className="flex items-center justify-between text-xs text-[#FCFCFC]/60">
            <span>Qur'anic Wisdom</span>
            <span>13.28</span>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Your Insights</h3>
        <InsightCard title="Emotional Blueprint" description="Your sensitivity is heightened today. Honor your emotional responses as messengers of deeper truths." category="Human Design" icon={<HeartIcon size={18} />} color="bg-[#F8EBDD]" />
        <InsightCard title="Celestial Alignment" description="Venus enters your 7th house, illuminating relationships and harmonious connections." category="Astrology" icon={<StarIcon size={18} />} color="bg-[#F8EBDD]" />
        <InsightCard title="Numerical Vibration" description="You're in a personal day 7. Introspection and spiritual connection are highlighted." category="Numerology" icon={<SunIcon size={18} />} color="bg-[#F8EBDD]" />
      </div>
    </div>;
};
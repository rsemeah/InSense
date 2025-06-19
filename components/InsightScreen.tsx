import React, { useState } from 'react';
import { InsightCard } from './InsightCard';
import { StarIcon, HashIcon, BookOpenIcon, HeartIcon } from 'lucide-react';
export const InsightScreen = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [{
    id: 'all',
    label: 'All'
  }, {
    id: 'astrology',
    label: 'Astrology'
  }, {
    id: 'humanDesign',
    label: 'Human Design'
  }, {
    id: 'numerology',
    label: 'Numerology'
  }, {
    id: 'divine',
    label: 'Divine Wisdom'
  }];
  return <div className="px-5 py-4">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-1">Insights</h2>
        <p className="text-[#1E1B2E]/60">
          Explore your multidimensional wisdom
        </p>
      </div>
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => <button key={category.id} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeCategory === category.id ? 'bg-[#B76E79] text-white' : 'bg-[#F8EBDD] text-[#1E1B2E]'}`} onClick={() => setActiveCategory(category.id)}>
              {category.label}
            </button>)}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <InsightCard title="Mercury Retrograde Guidance" description="Communication challenges offer opportunities for deeper understanding. Review and revise with patience." category="Astrology" icon={<StarIcon size={18} />} color="bg-gradient-to-r from-[#F8EBDD] to-[#F8EBDD]/70" />
        <InsightCard title="Your Life Path Number" description="As a Life Path 4, you're building foundations for the future. Focus on stability and methodical progress." category="Numerology" icon={<HashIcon size={18} />} color="bg-gradient-to-r from-[#F8EBDD] to-[#F8EBDD]/70" />
        <InsightCard title="Divine Remembrance" description="'And We have already created man and know what his soul whispers to him.' - Qaf 50:16" category="Divine Wisdom" icon={<BookOpenIcon size={18} />} color="bg-gradient-to-r from-[#F8EBDD] to-[#F8EBDD]/70" />
        <InsightCard title="Authority Type: Emotional" description="Your decisions are best made after riding the emotional wave. Clarity comes with time." category="Human Design" icon={<HeartIcon size={18} />} color="bg-gradient-to-r from-[#F8EBDD] to-[#F8EBDD]/70" />
      </div>
    </div>;
};
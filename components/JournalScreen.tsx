import React from 'react';
import { BookIcon, PenIcon, SearchIcon, FilterIcon } from 'lucide-react';
export const JournalScreen = () => {
  const journalEntries = [{
    id: 1,
    date: 'Oct 15, 2023',
    title: 'Inner Reflection',
    preview: 'Today I felt a deep connection with...',
    mood: 'Contemplative',
    color: 'bg-[#B76E79]/20'
  }, {
    id: 2,
    date: 'Oct 12, 2023',
    title: 'Breakthrough Moment',
    preview: "I finally understood why I, ve, been, ...'",
    mood: 'Enlightened',
    color: 'bg-[#1E1B2E]/20'
  }, {
    id: 3,
    date: 'Oct 8, 2023',
    title: 'Dream Analysis',
    preview: "Last night, s, dream, featured, symbols, of, ...'",
    mood: 'Curious',
    color: 'bg-[#F8EBDD]'
  }];
  return <div className="px-5 py-4">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-1">Soul Journal</h2>
        <p className="text-[#1E1B2E]/60">Record your spiritual journey</p>
      </div>
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1E1B2E]/40" />
            <input type="text" placeholder="Search entries..." className="w-full pl-10 pr-4 py-2.5 bg-[#F8EBDD]/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B76E79]" />
          </div>
          <button className="p-2.5 bg-[#F8EBDD]/50 rounded-lg">
            <FilterIcon size={20} className="text-[#1E1B2E]/70" />
          </button>
        </div>
      </div>
      <div className="mb-6">
        {journalEntries.map(entry => <div key={entry.id} className={`${entry.color} rounded-2xl p-5 mb-4 shadow-sm`}>
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-[#1E1B2E]/60">{entry.date}</span>
              <span className="text-xs px-2 py-1 bg-[#FCFCFC]/60 rounded-full">
                {entry.mood}
              </span>
            </div>
            <h3 className="text-lg font-medium mb-2">{entry.title}</h3>
            <p className="text-sm text-[#1E1B2E]/80">{entry.preview}</p>
          </div>)}
      </div>
      <button className="fixed bottom-20 right-5 w-14 h-14 rounded-full bg-[#B76E79] text-white flex items-center justify-center shadow-lg">
        <PenIcon size={24} />
      </button>
    </div>;
};
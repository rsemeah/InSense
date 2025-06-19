'use client';

import { useState } from 'react';
import { Header } from '../src/components/Header';
import { Navigation } from '../src/components/Navigation';
import { HomeScreen } from '../src/components/HomeScreen';
import { InsightScreen } from '../src/components/InsightScreen';
import { ProfileScreen } from '../src/components/ProfileScreen';
import { JournalScreen } from '../src/components/JournalScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'insight':
        return <InsightScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'journal':
        return <JournalScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
      <Header />
      <main className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </main>
      <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
}

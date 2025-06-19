import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { InsightScreen } from './components/InsightScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { JournalScreen } from './components/JournalScreen';
export function App() {
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
  return <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
      <Header />
      <main className="flex-1 overflow-y-auto pb-20">{renderScreen()}</main>
      <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>;
}
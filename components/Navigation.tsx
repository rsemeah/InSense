import React, { Component } from 'react';
import { HomeIcon, SparklesIcon, UserIcon, BookIcon } from 'lucide-react';
interface NavigationProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}
export const Navigation = ({
  currentScreen,
  setCurrentScreen
}: NavigationProps) => {
  const navItems = [{
    id: 'home',
    label: 'Home',
    icon: HomeIcon
  }, {
    id: 'insight',
    label: 'Insights',
    icon: SparklesIcon
  }, {
    id: 'profile',
    label: 'Blueprint',
    icon: UserIcon
  }, {
    id: 'journal',
    label: 'Journal',
    icon: BookIcon
  }];
  return <nav className="fixed bottom-0 left-0 right-0 bg-[#FCFCFC] border-t border-[#F8EBDD] px-2 py-3">
      <div className="flex justify-around items-center">
        {navItems.map(item => {
        const isActive = currentScreen === item.id;
        const IconComponent = item.icon;
        return <button key={item.id} className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-all ${isActive ? 'text-[#B76E79]' : 'text-[#1E1B2E]/60'}`} onClick={() => setCurrentScreen(item.id)}>
              <IconComponent size={20} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && <div className="w-1 h-1 rounded-full bg-[#B76E79] mt-1" />}
            </button>;
      })}
      </div>
    </nav>;
};
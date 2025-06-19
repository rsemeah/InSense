'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
      {/* Top App Bar */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1 px-5 py-8 overflow-y-auto pb-20">
        <section className="mb-12 text-center">
          <h1 className="text-3xl font-medium mb-3">
            Welcome to <span className="text-[#B76E79]">InSense</span>
          </h1>
          <p className="text-[#1E1B2E]/60 mb-6">
            Explore your inner world and discover insights about yourself through our
            thoughtfully designed experiences.
          </p>
          
          <div className="mt-8 flex flex-col items-center">
            <Link 
              href="/inner-pulse" 
              className="px-6 py-3 bg-[#B76E79] text-white rounded-lg hover:bg-[#B76E79]/90 transition-colors"
            >
              Explore Inner Pulse ✨
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Our new feature to help you reflect on your daily state
            </p>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white p-8 text-gray-800">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#B76E79] mb-2">InSense</h1>
        <p className="text-lg">Your journey to self-discovery</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to InSense</h2>
          <p className="mb-6">
            Explore your inner world and discover insights about yourself through our
            thoughtfully designed experiences.
          </p>
          
          <div className="mt-8 flex flex-col items-center">
            <Link 
              href="/inner-pulse" 
              className="px-6 py-3 bg-[#B76E79] text-white rounded-lg hover:bg-[#a25c67] transition-colors"
            >
              Explore Inner Pulse ✨
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Our new feature to help you reflect on your daily state
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© 2025 InSense. All rights reserved.</p>
      </footer>
    </div>
  );
}

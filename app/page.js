'use client';

import React from 'react';
import SimplePage from './components/SimplePage';

export default function HomePage() {
  return (
    <SimplePage title="Home" activeRoute="/">
      <p>Welcome to InSense! This is the home page.</p>
      <p>Navigate using the links above or below.</p>
    </SimplePage>
  );
}

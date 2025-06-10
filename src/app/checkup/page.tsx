'use client';

import React from 'react';
import CheckupForm from '@/components/CheckupForm'; // ✅ MUST be default import (no curly braces)

export default function CheckupPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Daily Checkup</h1>
      <CheckupForm />
    </div>
  );
}

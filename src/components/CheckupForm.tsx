'use client';

import { useState } from 'react';

export default function CheckupForm() {
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/generate-reflection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResponse(data.feedback || 'Something went wrong. Please try again.');
  };

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          rows={5}
          placeholder="How are you feeling today?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reflect
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold">Your Reflection:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

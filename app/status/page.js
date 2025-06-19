'use client';

import React, { useState, useEffect } from 'react';

export default function StatusPage() {
  const [routeStatuses, setRouteStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRoutes = async () => {
      const routes = [
        '/',
        '/inner-pulse',
        '/check-ups',
        '/reflections',
        '/dashboard',
        '/profile',
        '/study',
        '/checkup', // Include the singular checkup page as well
        '/auth/login',
        '/auth/signup',
      ];
      const baseUrl = 'https://insense-app.vercel.app'; // Your deployed app URL

      const statuses = [];
      for (const route of routes) {
        try {
          const response = await fetch(`${baseUrl}${route}`, { method: 'HEAD' });
          statuses.push({ route, status: response.status });
        } catch (error) {
          statuses.push({ route, status: 'Error' });
        }
      }
      setRouteStatuses(statuses);
      setLoading(false);
    };

    checkRoutes();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Application Status</h1>
      
      {loading ? (
        <p style={{ textAlign: 'center', color: '#555' }}>Loading route statuses...</p>
      ) : (
        <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#333', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Route Statuses:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {routeStatuses.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px', padding: '8px 0', borderBottom: index < routeStatuses.length - 1 ? '1px dashed #eee' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#555' }}>{item.route}</span>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: item.status === 200 ? '#d4edda' : '#f8d7da', 
                  color: item.status === 200 ? '#155724' : '#721c24',
                  fontSize: '0.9em'
                }}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9em', color: '#777' }}>
        <p>Statuses are fetched from: https://insense-app.vercel.app</p>
        <p>A 200 status indicates the page loaded successfully.</p>
        <p>A 404 status indicates the page was not found.</p>
      </div>
    </div>
  );
}

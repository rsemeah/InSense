'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [checkups, setCheckups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averages, setAverages] = useState({
    emotional: 0,
    mental: 0,
    physical: 0,
    spiritual: 0,
  });

  useEffect(() => {
    async function fetchCheckups() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error('Missing Supabase environment variables');
        }
        
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        // Get the user session
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Fetch the user's checkup data, ordered by date
        const { data, error } = await supabase
          .from('daily_checkups')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        
        setCheckups(data || []);
        
        // Calculate averages if data exists
        if (data && data.length > 0) {
          const avg = {
            emotional: 0,
            mental: 0,
            physical: 0,
            spiritual: 0,
          };
          
          data.forEach(entry => {
            avg.emotional += entry.emotional || 0;
            avg.mental += entry.mental || 0;
            avg.physical += entry.physical || 0;
            avg.spiritual += entry.spiritual || 0;
          });
          
          const count = data.length;
          setAverages({
            emotional: (avg.emotional / count).toFixed(1),
            mental: (avg.mental / count).toFixed(1),
            physical: (avg.physical / count).toFixed(1),
            spiritual: (avg.spiritual / count).toFixed(1),
          });
        }
      } catch (err) {
        console.error('Error fetching checkups:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCheckups();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: checkups.map(entry => {
      const date = new Date(entry.created_at);
      return date.toLocaleDateString();
    }),
    datasets: [
      {
        label: 'Emotional',
        data: checkups.map(entry => entry.emotional),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Mental',
        data: checkups.map(entry => entry.mental),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Physical',
        data: checkups.map(entry => entry.physical),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Spiritual',
        data: checkups.map(entry => entry.spiritual),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your State Over Time',
      },
    },
    scales: {
      y: {
        min: 1,
        max: 10,
        title: {
          display: true,
          text: 'Rating',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Unable to load your data: {error}</p>
          <p className="mt-2">
            <Link href="/inner-pulse" className="text-blue-600 hover:underline">
              Return to Inner Pulse
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
        <p className="text-gray-600">
          Track your progress and visualize your journey.
        </p>
      </header>

      {checkups.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-8">
          <p>You haven't recorded any check-ups yet. Start tracking your daily states to see your progress here.</p>
          <Link 
            href="/check-ups" 
            className="mt-4 inline-block py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Record Your First Check-up
          </Link>
        </div>
      ) : (
        <>
          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-pink-600">Emotional</h3>
              <p className="text-3xl font-bold">{averages.emotional}</p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-blue-600">Mental</h3>
              <p className="text-3xl font-bold">{averages.mental}</p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-teal-600">Physical</h3>
              <p className="text-3xl font-bold">{averages.physical}</p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-purple-600">Spiritual</h3>
              <p className="text-3xl font-bold">{averages.spiritual}</p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Line options={chartOptions} data={chartData} />
          </div>

          {/* Recent Check-ups */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Check-ups</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emotional</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mental</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Physical</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spiritual</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {checkups.slice(-5).reverse().map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.emotional}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.mental}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.physical}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.spiritual}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/inner-pulse" 
          className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-center"
        >
          Back to Inner Pulse
        </Link>
        <Link 
          href="/check-ups" 
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center"
        >
          New Check-up
        </Link>
        <Link 
          href="/reflections" 
          className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-center"
        >
          View Reflections
        </Link>
      </div>
    </div>
  );
}

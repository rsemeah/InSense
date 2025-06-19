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
import { Header } from '../../components/Header';
import { Navigation } from '../../components/Navigation';
import { BarChart3Icon, TrendingUpIcon, CalendarIcon } from 'lucide-react';

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
  const [currentScreen, setCurrentScreen] = useState('home');

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
          // For demo purposes, fetch all data if no user is authenticated
          const { data, error } = await supabase
            .from('daily_checkups')
            .select('*')
            .order('created_at', { ascending: true });
            
          if (error) throw error;
          
          setCheckups(data || []);
          calculateAverages(data || []);
        } else {
          // Fetch the user's checkup data, ordered by date
          const { data, error } = await supabase
            .from('daily_checkups')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });
            
          if (error) throw error;
          
          setCheckups(data || []);
          calculateAverages(data || []);
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

  const calculateAverages = (data) => {
    if (data.length === 0) return;
    
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
  };

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
        borderColor: '#B76E79',
        backgroundColor: 'rgba(183, 110, 121, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Mental',
        data: checkups.map(entry => entry.mental),
        borderColor: '#1E1B2E',
        backgroundColor: 'rgba(30, 27, 46, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Physical',
        data: checkups.map(entry => entry.physical),
        borderColor: '#6B7280',
        backgroundColor: 'rgba(107, 114, 128, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Spiritual',
        data: checkups.map(entry => entry.spiritual),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
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
        color: '#1E1B2E',
        font: {
          size: 16,
          weight: 'medium',
        }
      },
    },
    scales: {
      y: {
        min: 1,
        max: 10,
        title: {
          display: true,
          text: 'Rating',
          color: '#1E1B2E',
        },
        grid: {
          color: 'rgba(248, 235, 221, 0.5)',
        },
        ticks: {
          color: '#1E1B2E',
        }
      },
      x: {
        grid: {
          color: 'rgba(248, 235, 221, 0.5)',
        },
        ticks: {
          color: '#1E1B2E',
        }
      }
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
        <Header />
        <main className="flex-1 px-5 py-4 overflow-y-auto pb-20">
          <h1 className="text-2xl font-medium mb-6">Your Dashboard</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B76E79]"></div>
          </div>
        </main>
        <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
        <Header />
        <main className="flex-1 px-5 py-4 overflow-y-auto pb-20">
          <h1 className="text-2xl font-medium mb-6">Your Dashboard</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Unable to load your data: {error}</p>
            <p className="mt-2">
              <Link href="/inner-pulse" className="text-[#B76E79] hover:underline">
                Return to Inner Pulse
              </Link>
            </p>
          </div>
        </main>
        <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
      <Header />
      <main className="flex-1 px-5 py-4 overflow-y-auto pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-1">Your Dashboard</h1>
          <p className="text-[#1E1B2E]/60">Track your progress and visualize your journey</p>
        </div>

        {checkups.length === 0 ? (
          <div className="bg-[#F8EBDD]/50 border border-[#F8EBDD] text-[#1E1B2E] px-4 py-5 rounded-2xl mb-8">
            <p className="mb-4">You haven't recorded any check-ups yet. Start tracking your daily states to see your progress here.</p>
            <Link 
              href="/check-ups" 
              className="inline-block py-2 px-4 bg-[#B76E79] text-white rounded-lg hover:bg-[#B76E79]/90 transition-colors"
            >
              Record Your First Check-up
            </Link>
          </div>
        ) : (
          <>
            {/* Summary Statistics */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Overview</h2>
                <div className="w-8 h-8 rounded-full bg-[#F8EBDD] flex items-center justify-center">
                  <BarChart3Icon size={18} className="text-[#1E1B2E]" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
                  <h3 className="text-sm font-medium text-[#B76E79]">Emotional</h3>
                  <p className="text-2xl font-semibold mt-1">{averages.emotional}</p>
                  <p className="text-xs text-[#1E1B2E]/60 mt-1">Average Rating</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
                  <h3 className="text-sm font-medium text-[#1E1B2E]">Mental</h3>
                  <p className="text-2xl font-semibold mt-1">{averages.mental}</p>
                  <p className="text-xs text-[#1E1B2E]/60 mt-1">Average Rating</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
                  <h3 className="text-sm font-medium text-gray-600">Physical</h3>
                  <p className="text-2xl font-semibold mt-1">{averages.physical}</p>
                  <p className="text-xs text-[#1E1B2E]/60 mt-1">Average Rating</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
                  <h3 className="text-sm font-medium text-purple-600">Spiritual</h3>
                  <p className="text-2xl font-semibold mt-1">{averages.spiritual}</p>
                  <p className="text-xs text-[#1E1B2E]/60 mt-1">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Progress</h2>
                <div className="w-8 h-8 rounded-full bg-[#F8EBDD] flex items-center justify-center">
                  <TrendingUpIcon size={18} className="text-[#1E1B2E]" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F8EBDD]">
                <Line options={chartOptions} data={chartData} />
              </div>
            </div>

            {/* Recent Check-ups */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Recent Check-ups</h2>
                <div className="w-8 h-8 rounded-full bg-[#F8EBDD] flex items-center justify-center">
                  <CalendarIcon size={18} className="text-[#1E1B2E]" />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-[#F8EBDD] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-[#F8EBDD]/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#1E1B2E]/70 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-[#B76E79]/90 uppercase tracking-wider">E</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-[#1E1B2E]/70 uppercase tracking-wider">M</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-600/70 uppercase tracking-wider">P</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-purple-600/70 uppercase tracking-wider">S</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F8EBDD]/50">
                      {checkups.slice(-5).reverse().map((entry, index) => (
                        <tr key={index} className="hover:bg-[#F8EBDD]/20">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-[#1E1B2E]/70">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center font-medium text-[#B76E79]">
                            {entry.emotional}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center font-medium text-[#1E1B2E]">
                            {entry.mental}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center font-medium text-gray-600">
                            {entry.physical}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center font-medium text-purple-600">
                            {entry.spiritual}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Link 
                href="/check-ups" 
                className="flex-1 py-2 px-4 bg-[#B76E79] text-white rounded-lg hover:bg-[#B76E79]/90 transition-colors text-center"
              >
                New Check-up
              </Link>
              <Link 
                href="/reflections" 
                className="flex-1 py-2 px-4 bg-[#1E1B2E] text-white rounded-lg hover:bg-[#1E1B2E]/90 transition-colors text-center"
              >
                View Reflections
              </Link>
            </div>
          </>
        )}
      </main>
      <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
}

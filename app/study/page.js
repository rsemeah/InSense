'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default function Study() {
  const [studyPlans, setStudyPlans] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target_date: '',
    category: 'meditation',
  });
  const [newResource, setNewResource] = useState({
    title: '',
    url: '',
    type: 'book',
    notes: '',
  });
  const [activeTab, setActiveTab] = useState('goals');

  useEffect(() => {
    async function fetchStudyData() {
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
        
        // Fetch the user's study plans
        const { data: plansData, error: plansError } = await supabase
          .from('study_plans')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (plansError) throw plansError;
        
        // Fetch the user's study resources
        const { data: resourcesData, error: resourcesError } = await supabase
          .from('study_resources')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (resourcesError) throw resourcesError;
        
        setStudyPlans(plansData || []);
        setResources(resourcesData || []);
      } catch (err) {
        console.error('Error fetching study data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStudyData();
  }, []);

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setNewResource(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addGoal = async (e) => {
    e.preventDefault();
    
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
      
      const { data, error } = await supabase
        .from('study_plans')
        .insert([
          { 
            user_id: user.id,
            title: newGoal.title,
            description: newGoal.description,
            target_date: newGoal.target_date,
            category: newGoal.category,
            progress: 0
          }
        ])
        .select();
        
      if (error) throw error;
      
      setStudyPlans([data[0], ...studyPlans]);
      setNewGoal({
        title: '',
        description: '',
        target_date: '',
        category: 'meditation',
      });
    } catch (err) {
      console.error('Error adding goal:', err);
      setError(err.message);
    }
  };

  const addResource = async (e) => {
    e.preventDefault();
    
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
      
      const { data, error } = await supabase
        .from('study_resources')
        .insert([
          { 
            user_id: user.id,
            title: newResource.title,
            url: newResource.url,
            type: newResource.type,
            notes: newResource.notes
          }
        ])
        .select();
        
      if (error) throw error;
      
      setResources([data[0], ...resources]);
      setNewResource({
        title: '',
        url: '',
        type: 'book',
        notes: '',
      });
    } catch (err) {
      console.error('Error adding resource:', err);
      setError(err.message);
    }
  };

  const updateGoalProgress = async (id, progress) => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
      }
      
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      const { error } = await supabase
        .from('study_plans')
        .update({ progress })
        .eq('id', id);
        
      if (error) throw error;
      
      setStudyPlans(studyPlans.map(plan => 
        plan.id === id ? { ...plan, progress } : plan
      ));
    } catch (err) {
      console.error('Error updating progress:', err);
      setError(err.message);
    }
  };

  const deleteGoal = async (id) => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
      }
      
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      const { error } = await supabase
        .from('study_plans')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setStudyPlans(studyPlans.filter(plan => plan.id !== id));
    } catch (err) {
      console.error('Error deleting goal:', err);
      setError(err.message);
    }
  };

  const deleteResource = async (id) => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
      }
      
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      const { error } = await supabase
        .from('study_resources')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setResources(resources.filter(resource => resource.id !== id));
    } catch (err) {
      console.error('Error deleting resource:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Spiritual Study</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Spiritual Study</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Unable to load your study plans: {error}</p>
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
        <h1 className="text-3xl font-bold mb-2">Spiritual Study</h1>
        <p className="text-gray-600">
          Set goals, track resources, and monitor your spiritual learning journey.
        </p>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('goals')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'goals'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Learning Goals
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'resources'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Study Resources
          </button>
        </nav>
      </div>

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div>
          <form onSubmit={addGoal} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Learning Goal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newGoal.title}
                  onChange={handleGoalChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Learn meditation basics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={newGoal.category}
                  onChange={handleGoalChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="meditation">Meditation</option>
                  <option value="yoga">Yoga</option>
                  <option value="breathwork">Breathwork</option>
                  <option value="astrology">Astrology</option>
                  <option value="tarot">Tarot</option>
                  <option value="energy_work">Energy Work</option>
                  <option value="mindfulness">Mindfulness</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newGoal.description}
                onChange={handleGoalChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your learning goal..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Date
              </label>
              <input
                type="date"
                name="target_date"
                value={newGoal.target_date}
                onChange={handleGoalChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Add Goal
            </button>
          </form>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Learning Goals</h2>
            
            {studyPlans.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
                <p>You haven't set any learning goals yet. Add your first goal above.</p>
              </div>
            ) : (
              studyPlans.map(plan => (
                <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{plan.title}</h3>
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mt-1">
                        {plan.category.replace('_', ' ')}
                      </span>
                      {plan.target_date && (
                        <p className="text-sm text-gray-500 mt-1">
                          Target: {new Date(plan.target_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteGoal(plan.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Progress: {plan.progress}%
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <button 
                        onClick={() => updateGoalProgress(plan.id, Math.max(0, plan.progress - 10))}
                        className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                      >
                        -10%
                      </button>
                      <button 
                        onClick={() => updateGoalProgress(plan.id, Math.min(100, plan.progress + 10))}
                        className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                      >
                        +10%
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div>
          <form onSubmit={addResource} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Study Resource</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newResource.title}
                  onChange={handleResourceChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="The Power of Now"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={newResource.type}
                  onChange={handleResourceChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="book">Book</option>
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="course">Course</option>
                  <option value="podcast">Podcast</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL / Reference
              </label>
              <input
                type="text"
                name="url"
                value={newResource.url}
                onChange={handleResourceChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com or ISBN or reference"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={newResource.notes}
                onChange={handleResourceChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Any notes about this resource..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Add Resource
            </button>
          </form>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Study Resources</h2>
            
            {resources.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
                <p>You haven't added any study resources yet. Add your first resource above.</p>
              </div>
            ) : (
              resources.map(resource => (
                <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{resource.title}</h3>
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mt-1">
                        {resource.type}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteResource(resource.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  {resource.url && (
                    <a 
                      href={resource.url.startsWith('http') ? resource.url : `https://${resource.url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm block mt-1"
                    >
                      {resource.url}
                    </a>
                  )}
                  
                  {resource.notes && (
                    <p className="mt-2 text-gray-600 text-sm">{resource.notes}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link 
          href="/inner-pulse" 
          className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md inline-block"
        >
          Back to Inner Pulse
        </Link>
      </div>
    </div>
  );
}

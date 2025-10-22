import React, { useState, useEffect, useCallback } from 'react';
import { School, Users, GraduationCap, Shield, TrendingUp, Activity } from 'lucide-react';

// Define the API endpoints
const API_BASE_URL = 'http://localhost:3000/admin';
const API_ENDPOINTS = {
  schools: `${API_BASE_URL}/listOfSchools`,
  teachers: `${API_BASE_URL}/listOfTeachers`,
  students: `${API_BASE_URL}/listOfStudents`,
  admins: `${API_BASE_URL}/listOfAdmins`,
};

// Removed API_ACTION_ENDPOINTS as Quick Actions are removed.

// --- IN-MEMORY RECENT ACTIVITY MANAGEMENT (NO localStorage) ---

/**
 * The activity log is now managed entirely within the component's state,
 * as requested, preventing storage in localStorage.
 * * Note: These helper functions are simplified to just return/update the array.
 * The actual state management will happen in the component's useEffect/useState.
 */
const getInitialActivity = () => {
    // Initial activity to show when the dashboard loads for the first time
    return [{
        event: 'System Initialized',
        detail: `Dashboard loaded on ${new Date().toLocaleDateString()}`,
        time: new Date().toLocaleTimeString(),
        color: 'blue'
    }];
};

/**
 * Function to format and prepend a new activity.
 * This function no longer interacts with localStorage.
 */
const createNewActivity = (event, detail, color, currentActivities) => {
    const newActivity = {
        event: event,
        detail: detail,
        time: new Date().toLocaleTimeString(),
        color: color
    };
    // Return the new activity list (new activity first)
    return [newActivity, ...currentActivities];
};


// --- OVERVIEW COMPONENT ---

const Overview = () => {
  const [statsData, setStatsData] = useState({
    totalSchools: '...',
    totalTeachers: '...',
    totalStudents: '...',
    systemAdmins: '...',
  });
  // Initialize activity state with the welcome message
  const [recentActivity, setRecentActivity] = useState(getInitialActivity()); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Helper function to fetch data with authorization (Slightly cleaner error handling)
  const fetchWithAuth = async (url, method = 'GET', body = null) => {
    let authToken = localStorage.getItem('token') || 
                    localStorage.getItem('jwt') || 
                    localStorage.getItem('accessToken') || 
                    localStorage.getItem('authToken'); 

    if (!authToken) {
      throw new Error('Authentication token not found in storage. Please log in.');
    }

    const config = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
        let errorDetails = response.statusText;
        
        // Attempt to read JSON or fall back to text error
        try {
            const errorBody = await response.clone().json(); // Use .clone() to read the body again
            errorDetails = errorBody.message || JSON.stringify(errorBody);
        } catch (e) {
            errorDetails = await response.text(); 
            if (errorDetails.includes('Cannot POST')) {
                 errorDetails = 'API Route Not Found (404). Check server path.';
            } else if (response.status === 401) {
                 errorDetails = 'Unauthorized (401). Invalid or expired token.';
            }
        }

        throw new Error(`Failed to fetch ${url.split('/').pop()} (${response.status}): ${errorDetails}`);
    }

    const contentType = response.headers.get("content-type");
    if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
        return {}; 
    }
    return response.json();
  };


  // Function to fetch data from all endpoints and update stats
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [schools, teachers, students, admins] = await Promise.all([
        fetchWithAuth(API_ENDPOINTS.schools),
        fetchWithAuth(API_ENDPOINTS.teachers),
        fetchWithAuth(API_ENDPOINTS.students),
        fetchWithAuth(API_ENDPOINTS.admins),
      ]);

      // Counting logic is correct: checks for array and gets length
      setStatsData({
        totalSchools: Array.isArray(schools) ? schools.length.toString() : '0',
        totalTeachers: Array.isArray(teachers) ? teachers.length.toString() : '0',
        totalStudents: Array.isArray(students) ? students.length.toString() : '0',
        systemAdmins: Array.isArray(admins) ? admins.length.toString() : '0',
      });

    } catch (err) {
      console.error("Error fetching overview data:", err.message);
      
      // Log error to Recent Activity without using localStorage
      setRecentActivity(prevActivities => createNewActivity(
        'Data Fetch Failed', 
        `Error: ${err.message.substring(0, 70)}...`, 
        'red', 
        prevActivities
      ));
      
      setError(`Failed to load data: ${err.message.substring(0, 100)}...`); 
      setStatsData({
        totalSchools: 'N/A',
        totalTeachers: 'N/A',
        totalStudents: 'N/A',
        systemAdmins: 'N/A',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Removed handleQuickAction function as Quick Actions are removed.


  // Prepare the stats array with dynamic data (Unchanged)
  const stats = [
    { title: 'Total Schools', value: statsData.totalSchools, icon: School, color: 'blue', change: '+0%', gradient: 'from-blue-500 to-blue-600' },
    { title: 'Total Teachers', value: statsData.totalTeachers, icon: GraduationCap, color: 'green', change: '+0%', gradient: 'from-green-500 to-green-600' },
    { title: 'Total Students', value: statsData.totalStudents, icon: Users, color: 'purple', change: '+0%', gradient: 'from-purple-500 to-purple-600' },
    { title: 'System Admins', value: statsData.systemAdmins, icon: Shield, color: 'gray', change: '+0%', gradient: 'from-gray-600 to-gray-700' }
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl"></div>
        <div className="relative p-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Welcome to your School CRM admin panel</p>
          <div className="flex items-center space-x-2 mt-4">
            <Activity className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-600 font-medium">System Status: Online</span>
            {loading && <span className="text-sm text-yellow-600 ml-4">Loading data...</span>}
            {error && <span className="text-sm text-red-600 ml-4 font-semibold">⚠️ {error}</span>}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="group bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-3">{stat.value}</p>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Recent Activity Section Only --- */}
      <div className="grid grid-cols-1 gap-8">
        {/* Recent Activity Section (Now takes up full width on large screens) */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden lg:col-span-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">Recent Activity (Session Log)</h3>
          <div className="space-y-4 relative z-10">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-4 p-4 bg-gradient-to-r from-${activity.color}-50 to-${activity.color}-100 rounded-xl border border-${activity.color}-200`}
                >
                  <div className={`w-3 h-3 bg-${activity.color}-500 rounded-full mt-2 shadow-lg`}></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{activity.event}</p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                    <p className={`text-xs text-gray-500 font-medium mt-1`}>{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic p-4 border rounded-xl">No activities logged yet for this session.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;
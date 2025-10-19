import React, { useState, useEffect } from 'react';
import { School, Users, GraduationCap, Shield, TrendingUp, Activity } from 'lucide-react';

// Define the API endpoints
const API_BASE_URL = 'http://localhost:3000/admin';
const API_ENDPOINTS = {
  schools: `${API_BASE_URL}/listOfSchools`,
  teachers: `${API_BASE_URL}/listOfTeachers`,
  students: `${API_BASE_URL}/listOfStudents`,
  admins: `${API_BASE_URL}/listOfAdmins`,
};

// --- CLIENT-SIDE RECENT ACTIVITY MANAGEMENT ---

const ACTIVITY_STORAGE_KEY = 'adminRecentActivities';

/**
 * Retrieves activities from localStorage and checks if they were logged today.
 * If the stored date is not today, the list is cleared.
 */
const getDailyActivities = () => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const storedData = localStorage.getItem(ACTIVITY_STORAGE_KEY);
  
  if (storedData) {
    try {
      const { date, activities } = JSON.parse(storedData);
      
      // If the stored date is TODAY, return the activities.
      if (date === today) {
        return activities;
      } else {
        // If the date is different, clear the list for the new day (daily refresh)
        localStorage.removeItem(ACTIVITY_STORAGE_KEY);
      }
    } catch (e) {
      // Handle potential JSON parsing errors by clearing storage
      localStorage.removeItem(ACTIVITY_STORAGE_KEY);
    }
  }
  
  // Return empty array if not found or cleared
  return [];
};

/**
 * Function to log a new activity (to be called after successful POST/PUT requests).
 * This function is returned by the component to be used in event handlers.
 */
const logActivity = (newActivity) => {
    const today = new Date().toISOString().slice(0, 10);
    const storedActivities = getDailyActivities();
    
    // Add the new activity to the start of the list
    const updatedActivities = [newActivity, ...storedActivities];
    
    // Store the updated list and today's date
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify({
        date: today,
        activities: updatedActivities
    }));

    return updatedActivities;
};

// --- OVERVIEW COMPONENT ---

const Overview = () => {
  const [statsData, setStatsData] = useState({
    totalSchools: '...',
    totalTeachers: '...',
    totalStudents: '...',
    systemAdmins: '...',
  });
  const [recentActivity, setRecentActivity] = useState(getDailyActivities()); // Initial load from storage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to fetch data with authorization
  const fetchWithAuth = async (url) => {
    let authToken = localStorage.getItem('token') || 
                    localStorage.getItem('jwt') || 
                    localStorage.getItem('accessToken') || 
                    localStorage.getItem('authToken'); 

    if (!authToken) {
      throw new Error('Authentication token not found in storage. Please log in.');
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized (401). Invalid or expired token.');
      }
      throw new Error(`Failed to fetch ${url.split('/').pop()}: ${response.statusText}`);
    }

    // Response is OK, parse the JSON
    return response.json();
  };

  // Function to fetch data from all endpoints
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const schoolReq = fetchWithAuth(API_ENDPOINTS.schools);
        const teacherReq = fetchWithAuth(API_ENDPOINTS.teachers);
        const studentReq = fetchWithAuth(API_ENDPOINTS.students);
        const adminReq = fetchWithAuth(API_ENDPOINTS.admins);

        const [schools, teachers, students, admins] = await Promise.all([
          schoolReq,
          teacherReq,
          studentReq,
          adminReq,
        ]);

        // FIX: Ensure correct counting by checking if the response is an array
        setStatsData({
          totalSchools: Array.isArray(schools) ? schools.length.toString() : '0',
          totalTeachers: Array.isArray(teachers) ? teachers.length.toString() : '0',
          totalStudents: Array.isArray(students) ? students.length.toString() : '0',
          systemAdmins: Array.isArray(admins) ? admins.length.toString() : '0',
        });
        
        // Load initial activities. If cleared (new day), seed a welcome message.
        let activities = getDailyActivities();
        if (activities.length === 0) {
            activities = logActivity({
                event: 'System Initialized',
                detail: `Dashboard loaded on ${new Date().toLocaleDateString()}`,
                time: new Date().toLocaleTimeString(),
                color: 'blue'
            });
        }
        setRecentActivity(activities);

      } catch (err) {
        console.error("Error fetching overview data:", err.message);
        setError(`Failed to load data: ${err.message}`);
        
        setStatsData({
          totalSchools: 'N/A',
          totalTeachers: 'N/A',
          totalStudents: 'N/A',
          systemAdmins: 'N/A',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // DEMONSTRATION: Function to be used by Quick Action buttons to log activity
  // In a real application, this would be called inside the POST request handler.
  const handleQuickAction = (action, endpoint) => {
    // 1. Perform POST request to endpoint (omitted for brevity)
    // 2. If POST is successful:
    const newActivity = {
        event: action,
        detail: `New entry added via ${action} POST request.`,
        time: new Date().toLocaleTimeString(),
        color: 'green' // Use a success color
    };
    // 3. Update local state and local storage
    setRecentActivity(logActivity(newActivity));

    // Optional: Alert the user or provide UI feedback
    console.log(`${action} successfully logged!`);
  };


  // Prepare the stats array with dynamic data
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

      {/* --- Recent Activity and Quick Actions --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Section (Dynamically populated with current day's data) */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">Recent Activity (Today's Log)</h3>
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
              <p className="text-gray-500 text-sm italic p-4 border rounded-xl">No activities logged yet for today.</p>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">Quick Actions (Demo Log)</h3>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <button 
                onClick={() => handleQuickAction('Add School', 'addNewSchool')}
                className="group p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <School className="w-8 h-8 text-blue-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-semibold text-gray-900">Add School</p>
            </button>
            <button 
                onClick={() => handleQuickAction('Add Teacher', 'addNewTeacher')}
                className="group p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <GraduationCap className="w-8 h-8 text-green-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-semibold text-gray-900">Add Teacher</p>
            </button>
            <button 
                onClick={() => handleQuickAction('Add Student', 'addNewStudent')}
                className="group p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <Users className="w-8 h-8 text-purple-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-semibold text-gray-900">Add Student</p>
            </button>
            <button 
                onClick={() => handleQuickAction('Add Admin', 'addNewAdmin')}
                className="group p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <Shield className="w-8 h-8 text-gray-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-semibold text-gray-900">Add Admin</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
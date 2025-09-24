import React from 'react';
import { School, Users, GraduationCap, BookOpen, Shield, TrendingUp, Activity } from 'lucide-react';

const Overview = () => {
  const stats = [
    { title: 'Total Schools', value: '1', icon: School, color: 'blue', change: '+0%', gradient: 'from-blue-500 to-blue-600' },
    { title: 'Total Teachers', value: '1', icon: GraduationCap, color: 'green', change: '+0%', gradient: 'from-green-500 to-green-600' },
    { title: 'Total Students', value: '1', icon: Users, color: 'purple', change: '+0%', gradient: 'from-purple-500 to-purple-600' },
    { title: 'System Admins', value: '1', icon: Shield, color: 'gray', change: '+0%', gradient: 'from-gray-600 to-gray-700' }
  ];


  return (
    <div className="space-y-8">
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
          </div>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">Recent Activity</h3>
          <div className="space-y-4 relative z-10">
            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 shadow-lg"></div>
              <div>
                <p className="text-sm font-semibold text-gray-900">New school registered</p>
                <p className="text-sm text-gray-600">Springfield Elementary added to system</p>
                <p className="text-xs text-green-600 font-medium mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <button className="group p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <School className="w-8 h-8 text-blue-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-semibold text-gray-900">Add School</p>
            </button>
            <button className="group p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <GraduationCap className="w-8 h-8 text-green-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-semibold text-gray-900">Add Teacher</p>
            </button>
            <button className="group p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <Users className="w-8 h-8 text-purple-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-semibold text-gray-900">Add Student</p>
            </button>
            <button className="group p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
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
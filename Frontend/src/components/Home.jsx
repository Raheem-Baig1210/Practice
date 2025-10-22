import React from 'react';
import { Shield, Building, GraduationCap, User, BarChart3, Users, Calendar, FileText } from 'lucide-react';
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate();

  const features = [
    { icon: BarChart3, title: 'Analytics', description: 'Comprehensive reporting and insights' },
    { icon: Users, title: 'User Management', description: 'Streamlined user administration' },
    { icon: Calendar, title: 'Scheduling', description: 'Integrated calendar and events' },
    { icon: FileText, title: 'Documentation', description: 'Complete record management' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">EduCRM</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-gray-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">EduCRM</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Streamline your educational institution's operations with our comprehensive Customer Relationship Management system. 
            Designed for administrators, schools, teachers, and students.
          </p>
        </div>

        {/* Login Buttons */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">Choose Your Login Portal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Admin Login Button */}
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="bg-blue-50 p-6 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white mb-4 transition-all duration-300 group-hover:scale-110">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Admin</h4>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">System administration and management</p>
                  <button onClick={()=>navigate("/signin")} className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
                    Login as Admin
                  </button>
                </div>
              </div>
            </div>

            {/* School Login Button */}
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="bg-green-50 p-6 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white mb-4 transition-all duration-300 group-hover:scale-110">
                    <Building className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">School</h4>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">Institution management and oversight</p>
                  <button onClick={()=> navigate("/login")} className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
                    Login as School
                  </button>
                </div>
              </div>
            </div>

            {/* Teacher Login Button */}
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="bg-purple-50 p-6 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white mb-4 transition-all duration-300 group-hover:scale-110">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Teacher</h4>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">Educator tools and class management</p>
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
                    Login as Teacher
                  </button>
                </div>
              </div>
            </div>

            {/* Student Login Button */}
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="bg-orange-50 p-6 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white mb-4 transition-all duration-300 group-hover:scale-110">
                    <User className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Student</h4>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">Learning dashboard and resources</p>
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
                    Login as Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the powerful tools that make EduCRM the perfect solution for educational institutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of educational institutions already using EduCRM to streamline their operations and improve student outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Request Demo
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 EduCRM. All rights reserved. Built with care for educational excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut,
  School,
  GraduationCap,
  BookMarked,
  BarChart3,
  Wallet,
  Sliders
} from 'lucide-react';

const menuItems = [
  { name: 'Overview', path: '/school/overview', icon: LayoutDashboard },
  { name: 'Students', path: '/school/students', icon: GraduationCap },
  { name: 'Teachers', path: '/school/teachers', icon: Users },
  { name: 'Classes', path: '/school/classes', icon: BookOpen },
  { name: 'Attendance', path: '/school/attendance', icon: Calendar },
  { name: 'Exams', path: '/school/exams', icon: FileText },
  { name: 'Fees', path: '/school/fees', icon: Wallet },
  { name: 'Settings', path: '/school/settings', icon: Sliders },
];

const SchoolSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth token from localStorage
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white flex flex-col overflow-hidden">
      {/* Logo and School Name - Fixed at the top */}
      <div className="p-6 flex items-center space-x-3 border-b border-indigo-800 flex-shrink-0">
        <div className="p-2 bg-white/10 rounded-lg">
          <School className="w-6 h-6 text-indigo-300" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">EduManage Pro</h2>
          <p className="text-xs text-indigo-300">School Admin Panel</p>
        </div>
      </div>

      {/* Navigation - Scrollable area */}
      <div className="flex-1 flex flex-col">
        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-indigo-900 hover:scrollbar-thumb-indigo-600">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} className="px-2">
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-white/10 text-white shadow-lg'
                        : 'text-indigo-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg mr-3 ${isActive ? 'bg-indigo-500' : 'group-hover:bg-indigo-500/30'}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button - Fixed at the bottom */}
        <div className="p-4 border-t border-indigo-800 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-3 text-red-300 hover:text-white hover:bg-red-900/30 rounded-xl transition-colors group"
          >
            <div className="flex items-center">
              <div className="p-1.5 rounded-lg mr-3 bg-red-900/30 group-hover:bg-red-900/50">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">Logout</span>
            </div>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              Ctrl + L
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolSidebar;

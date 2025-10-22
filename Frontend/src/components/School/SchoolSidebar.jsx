import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Calendar, FileText, CreditCard, Settings, LogOut } from 'lucide-react';

const menuItems = [
  { name: 'Overview', path: '/school/overview', icon: LayoutDashboard },
  { name: 'Students', path: '/school/students', icon: Users },
  { name: 'Teachers', path: '/school/teachers', icon: Users },
  { name: 'Classes', path: '/school/classes', icon: BookOpen },
  { name: 'Attendance', path: '/school/attendance', icon: Calendar },
  { name: 'Exams', path: '/school/exams', icon: FileText },
  { name: 'Fees', path: '/school/fees', icon: CreditCard },
  { name: 'Settings', path: '/school/settings', icon: Settings },
];

const SchoolSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">School Admin</h2>
        <p className="text-sm text-gray-500">Welcome back!</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button className="flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SchoolSidebar;

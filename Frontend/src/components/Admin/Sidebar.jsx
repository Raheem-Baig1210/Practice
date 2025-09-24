import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  School, 
  Users, 
  GraduationCap, 
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Plus,
  List,
  Shield,
  UserCog
} from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [schoolsOpen, setSchoolsOpen] = useState(false);
  const [teachersOpen, setTeachersOpen] = useState(false);
  const [adminsOpen, setAdminsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate('/')
}
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, hasDropdown: false, gradient: 'from-blue-500 to-purple-600' },
    { 
      id: 'schools', 
      label: 'Schools', 
      icon: School, 
      hasDropdown: true,
      gradient: 'from-emerald-500 to-teal-600',
      isOpen: schoolsOpen,
      onToggle: () => setSchoolsOpen(!schoolsOpen),
      subItems: [
        { id: 'add-school', label: 'Add New School', icon: Plus },
        { id: 'schools-list', label: 'Schools', icon: List }
      ]
    },
    { 
      id: 'teachers', 
      label: 'Teachers', 
      icon: GraduationCap, 
      hasDropdown: true,
      gradient: 'from-orange-500 to-red-500',
      isOpen: teachersOpen,
      onToggle: () => setTeachersOpen(!teachersOpen),
      subItems: [
        { id: 'add-teacher', label: 'Add New Teacher', icon: Plus },
        { id: 'teachers-list', label: 'Teachers', icon: List }
      ]
    },
    { id: 'students', label: 'Students', icon: Users, hasDropdown: false, gradient: 'from-purple-500 to-pink-500' },
    { 
      id: 'admins', 
      label: 'Admins', 
      icon: Shield, 
      hasDropdown: true,
      gradient: 'from-gray-600 to-gray-800',
      isOpen: adminsOpen,
      onToggle: () => setAdminsOpen(!adminsOpen),
      subItems: [
        { id: 'add-admin', label: 'Add New Admin', icon: Plus },
        { id: 'admins-list', label: 'Admins', icon: List }
      ]
    },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="p-6 border-b border-slate-700/50 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">School CRM</h2>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-1">Admin Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4 relative z-10">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <div>
                <button
                  onClick={() => {
                    if (item.hasDropdown) {
                      item.onToggle?.();
                    } else {
                      onSectionChange(item.id);
                    }
                  }}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-blue-500/25`
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'bg-white/20' 
                        : 'group-hover:bg-slate-700/50'
                    }`}>
                      <item.icon size={18} />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.hasDropdown && (
                    <div className={`transition-all duration-300 ${
                      activeSection === item.id ? 'text-white/80' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {item.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  )}
                </button>
                
                {item.hasDropdown && (
                  <ul className={`mt-2 ml-4 space-y-1 transition-all duration-300 overflow-hidden ${
                    item.isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {item.subItems?.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          onClick={() => onSectionChange(subItem.id)}
                          className={`group w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-all duration-300 transform hover:translate-x-1 ${
                            activeSection === subItem.id
                              ? 'bg-slate-700/50 text-white shadow-md'
                              : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200'
                          }`}
                        >
                          <div className={`p-1 rounded transition-all duration-300 ${
                            activeSection === subItem.id 
                              ? 'bg-slate-600/50' 
                              : 'group-hover:bg-slate-700/30'
                          }`}>
                            <subItem.icon size={14} />
                          </div>
                          <span>{subItem.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer with user info */}
      <div className="p-4 border-t border-slate-700/50 relative z-10">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <UserCog className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <button className='from-blue-500 text-white to-purple-600' onClick={handleLogout} >Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { Shield, Mail, Phone, Calendar, UserCog, Key, Settings } from 'lucide-react';

const AdminSection = ({ section }) => {
  const dummyAdmin = {
    id: 1,
    name: 'John Smith',
    role: 'Super Administrator',
    email: 'john.smith@schoolcrm.edu',
    phone: '(555) 123-0000',
    joinDate: '2022-01-15',
    permissions: ['Full Access', 'User Management', 'System Settings', 'Reports'],
    lastLogin: '2024-01-15T10:30:00Z',
    status: 'Active'
  };

  if (section === 'add-admin') {
    return (
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-800/10 rounded-2xl"></div>
          <div className="relative p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Add New Administrator
            </h1>
            <p className="text-gray-600 mt-2">Create a new admin account with system permissions</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-500/10 to-gray-700/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <form className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                  placeholder="Enter administrator's full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Role</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50/50">
                  <option value="">Select admin role</option>
                  <option value="super-admin">Super Administrator</option>
                  <option value="admin">Administrator</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                  placeholder="Administrator's email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Permissions</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['User Management', 'System Settings', 'Reports', 'Full Access'].map((permission) => (
                  <label key={permission} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <input type="checkbox" className="rounded text-gray-600 focus:ring-gray-500" />
                    <span className="text-sm text-gray-700">{permission}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button type="button" className="px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium">
                Cancel
              </button>
              <button type="submit" className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Add Administrator
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-800/10 rounded-2xl"></div>
        <div className="relative p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
            System Administrators
          </h1>
          <p className="text-gray-600 mt-2">Manage all administrators in the system</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Administrator Profile</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">1 Admin Total</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                dummyAdmin.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {dummyAdmin.status}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
              <UserCog className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h4 className="text-2xl font-bold text-gray-900">{dummyAdmin.name}</h4>
                <span className="px-3 py-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white text-sm font-medium rounded-full">
                  {dummyAdmin.role}
                </span>
              </div>
              <p className="text-gray-600 mb-6">System administrator with full access privileges</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{dummyAdmin.email}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{dummyAdmin.phone}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Joined {new Date(dummyAdmin.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Key className="w-5 h-h text-gray-600" />
                  <span className="text-gray-700">Last login: {new Date(dummyAdmin.lastLogin).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <Settings className="w-8 h-8 text-blue-600" />
                    <span className="text-3xl font-bold text-blue-600">{dummyAdmin.permissions.length}</span>
                  </div>
                  <p className="text-blue-700 font-medium">Active Permissions</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <Shield className="w-8 h-8 text-green-600" />
                    <span className="text-3xl font-bold text-green-600">100%</span>
                  </div>
                  <p className="text-green-700 font-medium">System Access</p>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">Permissions & Access</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dummyAdmin.permissions.map((permission, index) => (
                    <div 
                      key={index}
                      className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-sm font-medium rounded-xl border border-gray-300 text-center hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
                    >
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
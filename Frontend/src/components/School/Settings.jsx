import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Globe, Bell, CreditCard, Shield, LogOut } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'School Admin',
    email: 'admin@school.edu',
    phone: '+91 9876543210',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    schoolName: 'ABC Public School',
    address: '123 Education Street, Learning City, 560001',
    website: 'www.abcpublicschool.edu',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'school', name: 'School Info', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
              <p className="mt-1 text-sm text-gray-500">Update your account's profile information and email address.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Update Password</h3>
              <p className="mt-1 text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Current password"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="New password"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'school':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">School Information</h3>
              <p className="mt-1 text-sm text-gray-500">Update your school's information and contact details.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
                  School Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="schoolName"
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Globe className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="www.example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Asia/Kolkata">(GMT+5:30) India Standard Time</option>
                  <option value="America/New_York">(GMT-5:00) Eastern Time</option>
                  <option value="America/Chicago">(GMT-6:00) Central Time</option>
                  <option value="America/Denver">(GMT-7:00) Mountain Time</option>
                  <option value="America/Los_Angeles">(GMT-8:00) Pacific Time</option>
                  <option value="Europe/London">(GMT+0:00) Greenwich Mean Time</option>
                </select>
              </div>
              <div>
                <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                  Date Format
                </label>
                <select
                  id="dateFormat"
                  name="dateFormat"
                  value={formData.dateFormat}
                  onChange={handleChange}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD-MMM-YYYY">DD-MMM-YYYY</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Preferences</h3>
              <p className="mt-1 text-sm text-gray-500">Choose how you receive notifications.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="email-notifications"
                    name="notifications.email"
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email-notifications" className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-gray-500">Get notified via email about important updates and announcements.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="sms-notifications"
                    name="notifications.sms"
                    type="checkbox"
                    checked={formData.notifications.sms}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sms-notifications" className="font-medium text-gray-700">
                    SMS Notifications
                  </label>
                  <p className="text-gray-500">Receive important alerts via SMS.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="push-notifications"
                    name="notifications.push"
                    type="checkbox"
                    checked={formData.notifications.push}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="push-notifications" className="font-medium text-gray-700">
                    Push Notifications
                  </label>
                  <p className="text-gray-500">Get push notifications on your device.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'billing':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Billing Information</h3>
              <p className="mt-1 text-sm text-gray-500">Manage your subscription and payment methods.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Premium Plan</h4>
                  <p className="text-sm text-gray-500">Billed annually at ₹24,999/year</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700">Next Billing Date</h4>
                <p className="mt-1 text-sm text-gray-600">December 31, 2023</p>
              </div>
              <div className="mt-6">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Update Payment Method
                </button>
                <button className="px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Cancel Subscription
                </button>
              </div>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Billing History</h4>
              <div className="mt-4 overflow-hidden border border-gray-200 rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                        Amount
                      </th>
                      <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 1, date: 'Nov 1, 2023', description: 'Annual Subscription', amount: '₹24,999.00', status: 'Paid' },
                      { id: 2, date: 'Nov 1, 2022', description: 'Annual Subscription', amount: '₹24,999.00', status: 'Paid' },
                      { id: 3, date: 'Nov 1, 2021', description: 'Annual Subscription', amount: '₹24,999.00', status: 'Paid' },
                    ].map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                          {item.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 whitespace-nowrap">
                          {item.amount}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        {/* Sidebar */}
        <aside className="py-6 lg:col-span-3">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700'
                    : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon
                  className={`flex-shrink-0 w-6 h-6 mr-3 ${
                    activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate">{tab.name}</span>
              </button>
            ))}
            <button
              className="flex items-center w-full px-3 py-2 mt-6 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
            >
              <LogOut className="flex-shrink-0 w-6 h-6 mr-3 text-red-400" />
              <span className="truncate">Sign out</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-9">
          <div className="bg-white shadow sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              {renderTabContent()}
              {activeTab !== 'billing' && (
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

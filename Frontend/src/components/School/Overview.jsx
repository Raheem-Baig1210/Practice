import React from 'react';
import { Users, BookOpen, Calendar, FileText, CreditCard } from 'lucide-react';

const stats = [
  { name: 'Total Students', value: '1,234', icon: Users, change: '+12%', changeType: 'increase' },
  { name: 'Total Teachers', value: '45', icon: Users, change: '+5%', changeType: 'increase' },
  { name: 'Classes', value: '24', icon: BookOpen, change: '+2', changeType: 'increase' },
  { name: 'Attendance Today', value: '92%', icon: Calendar, change: '+3%', changeType: 'increase' },
  { name: 'Pending Fees', value: '₹1,24,500', icon: CreditCard, change: '-8%', changeType: 'decrease' },
  { name: 'Upcoming Exams', value: '3', icon: FileText, change: 'Next week', changeType: 'neutral' },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome to your school management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-blue-50">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span 
                    className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'increase' 
                        ? 'text-green-600' 
                        : stat.changeType === 'decrease' 
                        ? 'text-red-600' 
                        : 'text-gray-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {[
              { id: 1, user: 'Rahul Sharma', action: 'submitted homework', time: '2 minutes ago' },
              { id: 2, user: 'Priya Patel', action: 'marked attendance', time: '1 hour ago' },
              { id: 3, user: 'Amit Kumar', action: 'uploaded exam results', time: '3 hours ago' },
              { id: 4, user: 'Neha Gupta', action: 'updated class schedule', time: '5 hours ago' },
            ].map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user} <span className="text-gray-500">{activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
          <div className="mt-4 space-y-4">
            {[
              { id: 1, title: 'Parent-Teacher Meeting', date: 'Oct 25, 2023', time: '10:00 AM' },
              { id: 2, title: 'Science Fair', date: 'Oct 28, 2023', time: '9:00 AM' },
              { id: 3, title: 'Quarterly Exams Begin', date: 'Nov 1, 2023', time: '9:00 AM' },
              { id: 4, title: 'Sports Day', date: 'Nov 15, 2023', time: '8:00 AM' },
            ].map((event) => (
              <div key={event.id} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {event.date} • {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

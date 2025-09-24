import React from 'react';
import { GraduationCap, Mail, Phone, Calendar, BookOpen } from 'lucide-react';

const TeacherSection = ({ section }) => {
  const dummyTeacher = {
    id: 1,
    name: 'Sarah Johnson',
    subject: 'Mathematics',
    email: 'sarah.johnson@springfield-elementary.edu',
    phone: '(555) 987-6543',
    joinDate: '2020-08-15',
    classes: 4,
    students: 85,
    experience: '8 years'
  };

  if (section === 'add-teacher') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Teacher</h1>
          <p className="text-gray-600">Register a new teacher in the system</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter teacher's full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Select subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Teacher's email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Years of experience"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button type="button" className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <p className="text-gray-600">Manage all teachers in the system</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Teacher Profile</h3>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">1 Teacher Total</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-900">{dummyTeacher.name}</h4>
              <p className="text-green-600 font-medium mb-4">{dummyTeacher.subject} Teacher</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm">{dummyTeacher.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">{dummyTeacher.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">Joined {new Date(dummyTeacher.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <BookOpen size={16} />
                  <span className="text-sm">{dummyTeacher.experience} experience</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">{dummyTeacher.classes}</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">Classes</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-600">{dummyTeacher.students}</span>
                  </div>
                  <p className="text-sm text-purple-700 mt-1">Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSection;

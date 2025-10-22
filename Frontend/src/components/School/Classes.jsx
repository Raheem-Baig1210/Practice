import React, { useState } from 'react';
import { Search, Plus, Users, BookOpen, User, Clock, Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  // Sample class data
  const classes = [
    { 
      id: 1, 
      name: '10th A', 
      section: 'A', 
      classTeacher: 'Dr. Sunil Kumar',
      students: 42,
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
      schedule: [
        { day: 'Monday', time: '8:00 AM - 2:00 PM' },
        { day: 'Tuesday', time: '8:00 AM - 2:00 PM' },
        { day: 'Wednesday', time: '8:00 AM - 2:00 PM' },
        { day: 'Thursday', time: '8:00 AM - 2:00 PM' },
        { day: 'Friday', time: '8:00 AM - 1:00 PM' },
      ]
    },
    { 
      id: 2, 
      name: '9th B', 
      section: 'B', 
      classTeacher: 'Ms. Priya Sharma',
      students: 38,
      subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
      schedule: [
        { day: 'Monday', time: '8:00 AM - 2:00 PM' },
        { day: 'Tuesday', time: '8:00 AM - 2:00 PM' },
        { day: 'Wednesday', time: '8:00 AM - 2:00 PM' },
        { day: 'Thursday', time: '8:00 AM - 2:00 PM' },
        { day: 'Friday', time: '8:00 AM - 1:00 PM' },
      ]
    },
    { 
      id: 3, 
      name: '11th Science', 
      section: 'Science', 
      classTeacher: 'Mr. Rajesh Patel',
      students: 35,
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
      schedule: [
        { day: 'Monday', time: '8:00 AM - 2:30 PM' },
        { day: 'Tuesday', time: '8:00 AM - 2:30 PM' },
        { day: 'Wednesday', time: '8:00 AM - 2:30 PM' },
        { day: 'Thursday', time: '8:00 AM - 2:30 PM' },
        { day: 'Friday', time: '8:00 AM - 1:30 PM' },
      ]
    },
    { 
      id: 4, 
      name: '12th Commerce', 
      section: 'Commerce', 
      classTeacher: 'Mrs. Anjali Desai',
      students: 28,
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'],
      schedule: [
        { day: 'Monday', time: '8:30 AM - 3:00 PM' },
        { day: 'Tuesday', time: '8:30 AM - 3:00 PM' },
        { day: 'Wednesday', time: '8:30 AM - 3:00 PM' },
        { day: 'Thursday', time: '8:30 AM - 3:00 PM' },
        { day: 'Friday', time: '8:30 AM - 2:00 PM' },
      ]
    },
  ];

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all class information and schedules</p>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full py-2 pl-10 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search classes by name or teacher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Class List */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Classes</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {filteredClasses.map((cls) => (
                <li 
                  key={cls.id}
                  className={`px-4 py-4 cursor-pointer hover:bg-gray-50 ${selectedClass?.id === cls.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedClass(cls)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{cls.name}</h4>
                      <p className="mt-1 text-sm text-gray-500">{cls.classTeacher}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{cls.students} students</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Class Details */}
        <div className="lg:col-span-2">
          {selectedClass ? (
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{selectedClass.name} Details</h3>
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 rounded-full hover:bg-blue-50">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-1 text-red-600 rounded-full hover:bg-red-50">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-1 text-gray-600 rounded-full hover:bg-gray-50">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">Class information and schedule</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Class Teacher</h4>
                    <p className="mt-1 text-sm text-gray-900">{selectedClass.classTeacher}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Total Students</h4>
                    <p className="mt-1 text-sm text-gray-900">{selectedClass.students} students</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500">Subjects</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedClass.subjects.map((subject, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-500">Class Schedule</h4>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Day
                          </th>
                          <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedClass.schedule.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                              {item.day}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                              {item.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-lg shadow">
              <BookOpen className="w-12 h-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
              <p className="mt-1 text-sm text-gray-500">Select a class to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;

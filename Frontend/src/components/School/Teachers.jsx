import React, { useState } from 'react';
import { Search, Plus, Filter, Download, MoreVertical, Edit, Trash2, UserPlus, Mail, Phone } from 'lucide-react';

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample teacher data
  const teachers = [
    { 
      id: 1, 
      name: 'Dr. Sunil Kumar', 
      subject: 'Mathematics', 
      employeeId: 'TEA001', 
      email: 'sunil.kumar@school.edu', 
      phone: '9876543210', 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Ms. Priya Sharma', 
      subject: 'Physics', 
      employeeId: 'TEA002', 
      email: 'priya.sharma@school.edu', 
      phone: '8765432109', 
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Mr. Rajesh Patel', 
      subject: 'Chemistry', 
      employeeId: 'TEA003', 
      email: 'rajesh.patel@school.edu', 
      phone: '7654321098', 
      status: 'On Leave' 
    },
    { 
      id: 4, 
      name: 'Mrs. Anjali Desai', 
      subject: 'Biology', 
      employeeId: 'TEA004', 
      email: 'anjali.desai@school.edu', 
      phone: '6543210987', 
      status: 'Active' 
    },
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all teacher records and information</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Teacher
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full py-2 pl-10 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search teachers by name, ID, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white bg-blue-600 rounded-full">
                    {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.subject} Teacher</p>
                  <span className={`inline-flex mt-1 px-2 text-xs font-semibold leading-5 rounded-full ${
                    teacher.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {teacher.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {teacher.email}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {teacher.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 mr-2">ID:</span>
                  {teacher.employeeId}
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button className="p-2 text-blue-600 rounded-full hover:bg-blue-50">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 rounded-full hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 rounded-full hover:bg-gray-50">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between flex-1 sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
              <span className="font-medium">4</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 bg-blue-50">
                1
              </button>
              <button className="relative items-center hidden px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 md:inline-flex">
                2
              </button>
              <button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;

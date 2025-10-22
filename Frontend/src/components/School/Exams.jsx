import React, { useState } from 'react';
import { Search, Plus, Calendar, BookOpen, Clock, Edit, Trash2 } from 'lucide-react';

const Exams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample exam data
  const exams = [
    { 
      id: 1, 
      name: 'First Term Examination', 
      class: '10th A', 
      subject: 'Mathematics',
      date: '2023-11-15',
      startTime: '09:00',
      endTime: '12:00',
      maxMarks: 100,
      status: 'Upcoming'
    },
    { 
      id: 2, 
      name: 'First Term Examination', 
      class: '10th A', 
      subject: 'Science',
      date: '2023-11-17',
      startTime: '09:00',
      endTime: '12:00',
      maxMarks: 100,
      status: 'Upcoming'
    },
    { 
      id: 3, 
      name: 'Mid Term Examination', 
      class: '9th B', 
      subject: 'English',
      date: '2023-10-25',
      startTime: '10:00',
      endTime: '13:00',
      maxMarks: 100,
      status: 'Completed'
    },
  ];

  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Management</h1>
          <p className="mt-1 text-sm text-gray-500">Schedule and manage all examinations</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Exam
          </button>
        </div>
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
            placeholder="Search exams by name, class, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Exams Table */}
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Exam Name
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Max Marks
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{exam.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {exam.date}
                      <Clock className="w-4 h-4 ml-3 mr-1 text-gray-400" />
                      {exam.startTime} - {exam.endTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.maxMarks}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      exam.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : exam.status === 'Ongoing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {exam.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-2xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Schedule New Exam
                </h3>
                <button
                  className="float-right p-1 ml-auto text-2xl font-semibold leading-none text-gray-400 bg-transparent border-0 outline-none focus:outline-none"
                  onClick={() => setShowAddModal(false)}
                >
                  <span className="block w-6 h-6 text-2xl text-gray-500 outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* Modal body */}
              <div className="relative flex-auto p-6">
                <p className="my-4 text-sm leading-relaxed text-gray-600">
                  Exam scheduling form will go here.
                </p>
              </div>
              {/* Modal footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="px-6 py-2 mb-1 mr-2 text-sm font-bold text-gray-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-600 rounded shadow outline-none active:bg-blue-700 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => {
                    // Handle form submission
                    setShowAddModal(false);
                  }}
                >
                  Schedule Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exams;

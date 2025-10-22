import React, { useState } from 'react';
import { Search, Calendar as CalendarIcon, Filter, Download, Check, X, Clock, User, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10th A');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Sample data
  const classes = ['10th A', '10th B', '9th A', '9th B', '11th Science', '12th Commerce'];
  
  const students = [
    { id: 1, name: 'Rahul Sharma', rollNumber: 'STU001' },
    { id: 2, name: 'Priya Patel', rollNumber: 'STU002' },
    { id: 3, name: 'Amit Kumar', rollNumber: 'STU003' },
    { id: 4, name: 'Neha Gupta', rollNumber: 'STU004' },
    { id: 5, name: 'Suresh Nair', rollNumber: 'STU005' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getStatusIcon = (studentId) => {
    const status = attendanceStatus[studentId];
    switch(status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'late':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
        <p className="mt-1 text-sm text-gray-500">Record and manage student attendance</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded-lg shadow sm:grid-cols-3">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="date"
              name="date"
              id="date"
              className="block w-full py-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <select
            id="class"
            name="class"
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View Attendance
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full py-2 pl-10 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search students by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Attendance Table */}
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="flex items-center justify-center w-10 h-10 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                          {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.rollNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      {getStatusIcon(student.id) || (
                        <span className="text-sm text-gray-500">Not marked</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={`p-1.5 rounded-full ${
                          attendanceStatus[student.id] === 'present'
                            ? 'bg-green-100 text-green-600'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title="Present"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className={`p-1.5 rounded-full ${
                          attendanceStatus[student.id] === 'absent'
                            ? 'bg-red-100 text-red-600'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title="Absent"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'late')}
                        className={`p-1.5 rounded-full ${
                          attendanceStatus[student.id] === 'late'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title="Late"
                      >
                        <Clock className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Reset
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Attendance
        </button>
      </div>

      {/* Attendance Summary */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Attendance Summary - {selectedDate}</h3>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Present</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.values(attendanceStatus).filter(status => status === 'present').length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Absent</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.values(attendanceStatus).filter(status => status === 'absent').length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-full">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Late</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.values(attendanceStatus).filter(status => status === 'late').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

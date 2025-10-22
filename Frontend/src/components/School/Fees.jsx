import React, { useState } from 'react';
import { Search, Plus, DollarSign, CheckCircle, XCircle, Clock, Calendar, Edit, Trash2 } from 'lucide-react';

const Fees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample fees data
  const fees = [
    { 
      id: 1, 
      studentName: 'Rahul Sharma', 
      class: '10th A', 
      rollNumber: 'STU001',
      feeType: 'Tuition Fee',
      amount: 5000,
      paidAmount: 5000,
      dueDate: '2023-11-15',
      status: 'Paid',
      paymentDate: '2023-11-10'
    },
    { 
      id: 2, 
      studentName: 'Priya Patel', 
      class: '9th B', 
      rollNumber: 'STU002',
      feeType: 'Tuition Fee',
      amount: 4500,
      paidAmount: 3000,
      dueDate: '2023-11-15',
      status: 'Partial',
      paymentDate: '2023-11-05'
    },
    { 
      id: 3, 
      studentName: 'Amit Kumar', 
      class: '11th A', 
      rollNumber: 'STU003',
      feeType: 'Tuition Fee',
      amount: 5500,
      paidAmount: 0,
      dueDate: '2023-11-15',
      status: 'Pending',
      paymentDate: null
    },
  ];

  const filteredFees = fees.filter(fee =>
    fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Partial':
        return 'bg-blue-100 text-blue-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage student fees and payments</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
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
            placeholder="Search by student name, ID, or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Fees Summary Cards */}
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 truncate">Total Fees</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">₹15,000</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-md">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 truncate">Paid</p>
              <p className="mt-1 text-2xl font-semibold text-green-600">₹8,000</p>
            </div>
            <div className="p-3 bg-green-100 rounded-md">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 truncate">Pending</p>
              <p className="mt-1 text-2xl font-semibold text-yellow-600">₹5,500</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-md">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 truncate">Overdue</p>
              <p className="mt-1 text-2xl font-semibold text-red-600">₹1,500</p>
            </div>
            <div className="p-3 bg-red-100 rounded-md">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Fees Table */}
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Fee Type
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Paid
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Due Date
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
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{fee.studentName}</div>
                    <div className="text-sm text-gray-500">{fee.rollNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fee.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fee.feeType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{fee.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{fee.paidAmount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {fee.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(fee.status)}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
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

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-2xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Record Fee Payment
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
                  Fee payment form will go here.
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
                  Record Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;

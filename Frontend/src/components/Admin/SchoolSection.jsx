
import React, { useState, useEffect } from 'react';
import { School, MapPin, Users, Phone, Mail, Search, Plus, Eye, Edit, Trash2, ChevronDown, X, Calendar, Building } from 'lucide-react';

const SchoolSection = ({ section }) => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Schools');
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewingSchool, setViewingSchool] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token){
            throw new Error('Unauthorized User is trying to access...!!!')
        }
        
        const response = await fetch('http://localhost:3000/admin/listOfSchools',{
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSchools(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (section !== 'add-school' && !showAddForm) {
      fetchSchools();
    }
  }, [section, showAddForm]);

  // Form state for adding new school
  const [form, setForm] = useState({
    name: '',
    estyear: '',
    location: '',
    phno: '',
    email: ''
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    const payload = {
      ...form,
      password: 'school123'
    };

    try {
        const token = localStorage.getItem('token')
        if(!token){
            throw new Error('Unauthorized User is trying to access...!!!')
        }
      const response = await fetch('http://localhost:3000/admin/addNewSchool', {
        method: 'POST',
        headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add school');
      }

      setFormStatus({ loading: false, success: true, error: null });
      setForm({
        name: '',
        estyear: '',
        location: '',
        phno: '',
        email: ''
      });
      setShowAddForm(false);
      // Refresh the schools list
      const fetchResponse = await fetch('http://localhost:3000/admin/listOfSchools',{
        method: "GET",
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
      });
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        setSchools(data.data);
      }
      console.log('School added successfully!');
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: err.message });
      console.error('Failed to add school:', err);
    }
  };

  // Filter schools based on search term
  let filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply status filter
  if (filterStatus === 'Active Schools') {
    filteredSchools = filteredSchools.filter(school => school.status !== 'inactive');
  } else if (filterStatus === 'Inactive Schools') {
    filteredSchools = filteredSchools.filter(school => school.status === 'inactive');
  }

  // Action handlers
  const handleView = (school) => {
    setViewingSchool(school);
    setShowViewModal(true);
    console.log('View school:', school);
  };

  const handleEdit = (school) => {
    alert(`Editing school: ${school.name}`);
    console.log('Edit school:', school);
  };

  const handleDelete = (school) => {
    if (window.confirm(`Are you sure you want to delete ${school.name}?`)) {
      alert(`Deleting school: ${school.name}`);
      console.log('Delete school:', school);
    }
  };

  // Statistics
  const totalSchools = schools.length;
  const activeSchools = schools.filter(school => school.status !== 'inactive').length;
  const inactiveSchools = totalSchools - activeSchools;

  // View Modal Component
  const ViewModal = () => {
    if (!showViewModal || !viewingSchool) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{viewingSchool.name}</h2>
                <p className="text-blue-100">School Details</p>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white hover:bg-blue-700 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* School Icon and Basic Info */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <School className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{viewingSchool.name}</h3>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>Established: {viewingSchool.estyear || 'Not specified'}</span>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    viewingSchool.status === 'inactive' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {viewingSchool.status === 'inactive' ? 'Inactive' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{viewingSchool.phno}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{viewingSchool.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Location
              </h4>
              <p className="text-gray-700">{viewingSchool.location || 'No location specified'}</p>
            </div>

            {/* Statistics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                School Statistics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{viewingSchool.student || '0'}</div>
                  <div className="text-sm text-green-700">Students</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{viewingSchool.teacher || '0'}</div>
                  <div className="text-sm text-blue-700">Teachers</div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Additional Information
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">School ID:</span> {viewingSchool.id}</p>
                <p><span className="font-medium">Registration Date:</span> {viewingSchool.createdAt ? new Date(viewingSchool.createdAt).toLocaleDateString() : 'Not available'}</p>
                <p><span className="font-medium">Last Updated:</span> {viewingSchool.updatedAt ? new Date(viewingSchool.updatedAt).toLocaleDateString() : 'Not available'}</p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
            <button
              onClick={() => setShowViewModal(false)}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowViewModal(false);
                handleEdit(viewingSchool);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit School</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (section === 'add-school' || showAddForm) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New School</h1>
          <p className="text-gray-600">Register a new school in the system</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter school name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                <input 
                  type="number" 
                  name="estyear"
                  value={form.estyear}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Year established"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea 
                name="location"
                value={form.location}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter full address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  name="phno"
                  value={form.phno}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Admin email"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" 
                disabled={formStatus.loading}
              >
                {formStatus.loading ? 'Adding...' : 'Add School'}
              </button>
            </div>
            {formStatus.success && <p className="text-green-500 text-sm mt-2">School added successfully!</p>}
            {formStatus.error && <p className="text-red-500 text-sm mt-2">Error: {formStatus.error}</p>}
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading schools...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Blue Gradient Header with Statistics */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">School Management</h1>
            <p className="text-blue-100 text-lg">Manage all schools, their profiles, and assignments</p>
          </div>
          <div className="flex items-center space-x-8">
            {/* Statistics */}
            <div className="text-center">
              <div className="text-3xl font-bold">{totalSchools}</div>
              <div className="text-blue-200 text-sm">Total Schools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">{activeSchools}</div>
              <div className="text-blue-200 text-sm">Active Schools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-300">{inactiveSchools}</div>
              <div className="text-blue-200 text-sm">Inactive Schools</div>
            </div>
            {/* Add School Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add School</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="text-gray-700">{filterStatus}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  {['All Schools', 'Active Schools', 'Inactive Schools'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilterStatus(option);
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schools Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Phone</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Email</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Location</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Actions</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{school.name}</div>
                        <div className="text-sm text-gray-500">Est. {school.estyear || 'N/A'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{school.phno}</td>
                    <td className="px-6 py-4 text-gray-700">{school.email}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {school.location || 'No location marked'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(school)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(school)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(school)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        school.status === 'inactive' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {school.status === 'inactive' ? 'Inactive' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? 'No schools found matching your search.' : 'No schools found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <ViewModal />
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <SchoolSection section="schools" />
    </div>
  );
}

export default App;
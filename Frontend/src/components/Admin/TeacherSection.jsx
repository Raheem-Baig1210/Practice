import React, { useState, useEffect } from 'react';
import { User, MapPin, Users, Phone, Mail, Search, Plus, Eye, Edit, Trash2, ChevronDown, X, Calendar, Building, GraduationCap } from 'lucide-react';

const TeacherSection = ({ section }) => {
  const [teachers, setTeachers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Teachers');
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewingTeacher, setViewingTeacher] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token){
            throw new Error('Unauthorized User is trying to access...!!!')
        }
        
        const response = await fetch('http://localhost:3000/admin/listOfteachers',{
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
        setTeachers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (section !== 'add-teacher' && !showAddForm) {
      fetchTeachers();
    }
  }, [section, showAddForm]);

  // Fetch schools when add form is shown
  useEffect(() => {
    const fetchSchools = async () => {
      if (section === 'add-teacher' || showAddForm) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Unauthorized User is trying to access...!!!');
          }

          const response = await fetch('http://localhost:3000/admin/listOfSchools', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch schools');
          }

          const data = await response.json();
          setSchools(data.data || data);
        } catch (err) {
          console.error('Failed to fetch schools:', err);
          setSchools([]);
        }
      }
    };

    fetchSchools();
  }, [section, showAddForm]);

  // Form state for adding new teacher
  const [form, setForm] = useState({
    name: '',
    email: '',
    phno: '',
    subject: '',
    experience: '',
    qualification: '',
    school: ''
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
      password: 'teacher123'
    };

    try {
        const token = localStorage.getItem('token')
        if(!token){
            throw new Error('Unauthorized User is trying to access...!!!')
        }
        console.log(payload )
      const response = await fetch('http://localhost:3000/admin/addNewTeacher', {
        method: 'POST',
        headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add teacher');
      }

      setFormStatus({ loading: false, success: true, error: null });
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        experience: '',
        qualification: '',
        school: ''
      });
      setShowAddForm(false);
      // Refresh the teachers list
      const fetchResponse = await fetch('http://localhost:3000/admin/listOfteachers',{
        method: "GET",
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
      });
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        setTeachers(data.data);
        console.log(data.data)
      }
      console.log('Teacher added successfully!');
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: err.message });
      console.error('Failed to add teacher:', err);
    }
  };

  // Filter teachers based on search term
  let filteredTeachers = teachers.filter(teacher =>
    teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply status filter
  if (filterStatus === 'Active Teachers') {
    filteredTeachers = filteredTeachers.filter(teacher => teacher.status !== 'inactive');
  } else if (filterStatus === 'Inactive Teachers') {
    filteredTeachers = filteredTeachers.filter(teacher => teacher.status === 'inactive');
  }

  // Action handlers
  const handleView = (teacher) => {
    setViewingTeacher(teacher);
    setShowViewModal(true);
    console.log('View teacher:', teacher);
  };

  const handleEdit = (teacher) => {
    alert(`Editing teacher: ${teacher.name}`);
    console.log('Edit teacher:', teacher);
  };

  const handleDelete = (teacher) => {
    if (window.confirm(`Are you sure you want to delete ${teacher.name}?`)) {
      alert(`Deleting teacher: ${teacher.name}`);
      console.log('Delete teacher:', teacher);
    }
  };

  // Statistics
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(teacher => teacher.status !== 'inactive').length;
  const inactiveTeachers = totalTeachers - activeTeachers;

  // View Modal Component
  const ViewModal = () => {
    if (!showViewModal || !viewingTeacher) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{viewingTeacher.name}</h2>
                <p className="text-purple-100">Teacher Details</p>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white hover:bg-purple-700 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Teacher Icon and Basic Info */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{viewingTeacher.name}</h3>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>Subject: {viewingTeacher.subject || 'Not specified'}</span>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    viewingTeacher.status === 'inactive' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {viewingTeacher.status === 'inactive' ? 'Inactive' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-purple-600" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{viewingTeacher.phno || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{viewingTeacher.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                Professional Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{viewingTeacher.subject || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{viewingTeacher.experience || 'Not specified'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="font-medium">{viewingTeacher.qualification || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Building className="w-5 h-5 mr-2 text-purple-600" />
                Additional Information
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Teacher ID:</span> {viewingTeacher.id}</p>
                <p><span className="font-medium">Registration Date:</span> {viewingTeacher.createdAt ? new Date(viewingTeacher.createdAt).toLocaleDateString() : 'Not available'}</p>
                <p><span className="font-medium">Last Updated:</span> {viewingTeacher.updatedAt ? new Date(viewingTeacher.updatedAt).toLocaleDateString() : 'Not available'}</p>
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
                handleEdit(viewingTeacher);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Teacher</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (section === 'add-teacher' || showAddForm) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Teacher</h1>
          <p className="text-gray-600">Register a new teacher in the system</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter teacher name"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Teacher email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={form.subject}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Teaching subject"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input 
                  type="text" 
                  name="experience"
                  value={form.experience}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Years of experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <input 
                  type="text" 
                  name="qualification"
                  value={form.qualification}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Educational qualification"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Assign to School
                </label>
                <select 
                  name="schoolId"
                  value={form.schoolId}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select a school</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name || school.schoolName || `School ${school.id}`}
                    </option>
                  ))}
                </select>
                {schools.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">Loading schools...</p>
                )}
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
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors" 
                disabled={formStatus.loading}
              >
                {formStatus.loading ? 'Adding...' : 'Add Teacher'}
              </button>
            </div>
            {formStatus.success && <p className="text-green-500 text-sm mt-2">Teacher added successfully!</p>}
            {formStatus.error && <p className="text-red-500 text-sm mt-2">Error: {formStatus.error}</p>}
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading teachers...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Purple Gradient Header with Statistics */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Teacher Management</h1>
            <p className="text-purple-100 text-lg">Manage all teachers, their profiles, and assignments</p>
          </div>
          <div className="flex items-center space-x-8">
            {/* Statistics */}
            <div className="text-center">
              <div className="text-3xl font-bold">{totalTeachers}</div>
              <div className="text-purple-200 text-sm">Total Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">{activeTeachers}</div>
              <div className="text-purple-200 text-sm">Active Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-300">{inactiveTeachers}</div>
              <div className="text-purple-200 text-sm">Inactive Teachers</div>
            </div>
            {/* Add Teacher Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Teacher</span>
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
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <span className="text-gray-700">{filterStatus}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  {['All Teachers', 'Active Teachers', 'Inactive Teachers'].map((option) => (
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

      {/* Teachers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Phone</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Email</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Subject</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Actions</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{teacher.name}</div>
                        <div className="text-sm text-gray-500">{teacher.qualification || 'No qualification listed'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{teacher.phno || 'Not provided'}</td>
                    <td className="px-6 py-4 text-gray-700">{teacher.email}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {teacher.subject || 'Not specified'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(teacher)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(teacher)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(teacher)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        teacher.status === 'inactive' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {teacher.status === 'inactive' ? 'Inactive' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? 'No teachers found matching your search.' : 'No teachers found.'}
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

export default TeacherSection;
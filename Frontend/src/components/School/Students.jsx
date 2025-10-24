import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Download, Edit, Trash2, UserPlus, Loader, AlertCircle, Eye, X, BookOpen, Phone } from 'lucide-react';

// Define the API Base URL
const API_BASE_URL = 'http://localhost:3000';

// --- MODAL PLACEHOLDERS (Restored to SOLID WHITE Body) ---

// Base Modal component with blue header style
const Modal = ({ children, onClose, title, size = 'lg' }) => {
    const maxWidthClass = size === 'lg' ? 'md:max-w-xl' : 'md:max-w-2xl';
    
    return (
        // Backdrop background (Darkened and Blurred background behind the modal)
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
            {/* Modal content container (Solid White background matching the form in the image) */}
            <div className={`bg-white rounded-xl shadow-2xl w-full max-w-lg ${maxWidthClass} overflow-hidden transition-all transform duration-300 scale-100`} onClick={e => e.stopPropagation()}>
                {/* Blue Header Section */}
                <div className="flex justify-between items-center p-5 bg-blue-600 rounded-t-xl">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <button onClick={onClose} className="text-white hover:text-blue-200">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                {/* Content Section - SOLID WHITE background from the container above */}
                <div className="p-6"> 
                    {children}
                </div>
            </div>
        </div>
    );
};

// Add Student Form 
const AddStudentModal = ({ isVisible, onClose, onStudentAdded }) => {
    if (!isVisible) return null;

    const [formData, setFormData] = useState({
        name: '',
        dateOfBith: '',
        gender: 'Male',
        class: '',
        section: '',
        gardianPhno: '',
        isActive: true, 
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: (name === 'class' || name === 'gardianPhno') ? (value === '' ? '' : Number(value)) : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        
        const schoolId = localStorage.getItem('schoolId');
        const authToken = localStorage.getItem('authToken');

        if (!schoolId || !authToken) {
            setSubmitError("Authentication details missing. Please re-login.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/school/addNewStudent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ ...formData, schoolId: schoolId }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP status ${response.status}` }));
                throw new Error(errorData.message || `Failed to add student with status: ${response.status}`);
            }

            onClose();
            onStudentAdded();

        } catch (e) {
            console.error("Error adding student:", e);
            setSubmitError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal onClose={onClose} title="Add New Student">
            <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && <div className="p-3 bg-red-100 text-red-700 rounded text-sm">{submitError}</div>}
                <div className="grid grid-cols-2 gap-4">
                    {/* Labels and inputs are now optimized for a solid white background */}
                    <div><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" name="dateOfBith" value={formData.dateOfBith} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
                            <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                        </select>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700">Class</label><input type="number" name="class" value={formData.class} onChange={handleChange} required min="1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Section</label><input type="text" name="section" value={formData.section} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Guardian Phone No.</label><input type="number" name="gardianPhno" value={formData.gardianPhno} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                </div>
                
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 mt-4">
                    {isSubmitting ? <Loader className="w-5 h-5 animate-spin mr-2" /> : 'Add Student'}
                </button>
            </form>
        </Modal>
    );
};

// View Student Details (Inner blocks restored to WHITE with subtle shadow/border)
const ViewStudentModal = ({ isVisible, onClose, student }) => {
    if (!isVisible || !student) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch {
            return dateString;
        }
    };

    return (
        <Modal onClose={onClose} title={`Details for ${student.name}`}>
            <div className="space-y-4"> 
                
                {/* Basic Info Section (Inner white block for visual grouping) */}
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600"><BookOpen className="w-6 h-6" /></div>
                        <div>
                            <p className="text-xl font-semibold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">Roll Number: {student.rollNumber || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center space-x-3">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium leading-5 rounded-full ${student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            Status: {student.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-sm text-gray-600">Gender: {student.gender || 'N/A'}</span>
                    </div>
                </div>

                {/* Academic Information (Inner white block) */}
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3 flex items-center"><BookOpen className="w-4 h-4 mr-2" /> Academic Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Class</p>
                            <p className="font-medium text-gray-900">{student.class}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Section</p>
                            <p className="font-medium text-gray-900">{student.section || 'N/A'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-500">Date of Birth</p>
                            <p className="font-medium text-gray-900">{formatDate(student.dateOfBith)}</p>
                        </div>
                    </div>
                </div>

                {/* Guardian Contact Information (Inner white block) */}
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3 flex items-center"><Phone className="w-4 h-4 mr-2" /> Guardian Contact</h4>
                    <div className="flex items-center space-x-3 text-sm">
                        <div className='flex items-center space-x-1'>
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium text-gray-900">{student.gardianPhno || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button footer - uses a neutral white button style */}
                <div className="mt-4 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Close</button>
                </div>
            </div>
        </Modal>
    );
};

// **EDIT STUDENT MODAL (Functional with PUT request and solid white background)**
const EditStudentModal = ({ isVisible, onClose, student, onStudentUpdated }) => {
    if (!isVisible || !student) return null;

    const [formData, setFormData] = useState(() => ({
        ...student,
        dateOfBith: student.dateOfBith ? student.dateOfBith.split('T')[0] : '',
    }));
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : (name === 'class' || name === 'gardianPhno' ? (value === '' ? '' : Number(value)) : value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            setSubmitError("Authentication details missing. Please re-login.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/school/updateStudent/${student._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP status ${response.status}` }));
                throw new Error(errorData.message || `Failed to update student with status: ${response.status}`);
            }

            onClose();
            onStudentUpdated();

        } catch (e) {
            console.error("Error updating student:", e);
            setSubmitError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal onClose={onClose} title={`Edit Details for ${student.name}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && <div className="p-3 bg-red-100 text-red-700 rounded text-sm mb-4">{submitError}</div>}
                
                {/* Form Fields - Directly on white background */}
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" name="dateOfBith" value={formData.dateOfBith} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
                            <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                        </select>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700">Class</label><input type="number" name="class" value={formData.class} onChange={handleChange} required min="1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Section</label><input type="text" name="section" value={formData.section} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Guardian Phone No.</label><input type="number" name="gardianPhno" value={formData.gardianPhno} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white" /></div>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center pt-2">
                    <input id="editIsActive" name="isActive" type="checkbox" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor="editIsActive" className="ml-2 block text-sm font-medium text-gray-700">
                        Student is Active
                    </label>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3 border-t pt-4"> 
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
                        {isSubmitting ? <Loader className="w-4 h-4 animate-spin mr-2" /> : 'Save Changes'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// Placeholder for Status Confirmation
const ConfirmStatusChangeModal = ({ isVisible, onClose, student, onConfirm }) => {
    if (!isVisible || !student) return null;
    const newStatus = student.isActive ? 'Inactive' : 'Active';
    const actionColor = student.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';

    return (
        <Modal onClose={onClose} title="Confirm Status Change">
            <div className="p-2">
                <div className="text-gray-700 p-2">
                    Are you sure you want to change the status of <span className="font-semibold">{student.name}</span> to <span className="font-bold">{newStatus}</span>? This action is reversible.
                </div>
                <div className="mt-4 flex justify-end space-x-3 border-t pt-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                    <button onClick={onConfirm} className={`px-4 py-2 text-sm font-medium text-white ${actionColor} rounded-md`}>
                        Confirm {newStatus}
                    </button>
                </div>
            </div>
        </Modal>
    );
};


// --- MAIN STUDENTS COMPONENT ---

const Students = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmStatusModal, setShowConfirmStatusModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); 

  // Filtering state
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); 

  // Memoized fetch function using useCallback for stability
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const schoolId = localStorage.getItem('schoolId');
    const authToken = localStorage.getItem('authToken'); 

    if (!schoolId || !authToken) {
      setError("School ID or Auth Token not found in local storage. Please log in again.");
      setLoading(false);
      return;
    }

    const apiUrl = `${API_BASE_URL}/school/studentsAtSchool/${schoolId}`;

    try {
      const response = await fetch(apiUrl, {
          headers: {
              'Authorization': `Bearer ${authToken}`
          }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP status ${response.status}` }));
        throw new Error(errorData.message || `Failed to fetch data with status: ${response.status}`);
      }

      const data = await response.json();

      setStudents(data.students || []); 
      setTotalStudents(data.total || (data.students ? data.students.length : 0));

    } catch (e) {
      console.error("Error fetching students:", e);
      setError(`Failed to fetch student data. ${e.message}.`);
      setStudents([]);
      setTotalStudents(0);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]); 

  // --- API: Toggle Student Status ---
  const handleStatusToggle = async () => {
    if (!selectedStudent) return;
    
    setShowConfirmStatusModal(false); 
    
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        setError("Authentication details missing. Cannot change status.");
        return;
    }
    
    const apiUrl = `${API_BASE_URL}/school/inActiveStudent/${selectedStudent._id}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`, 
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `HTTP status ${response.status}` }));
            throw new Error(errorData.message || `Failed to update status with status: ${response.status}`);
        }

        fetchStudents();
        setSelectedStudent(null); 

    } catch (e) {
        console.error("Error updating student status:", e);
        setError(`Failed to update status for ${selectedStudent.name}. ${e.message}.`);
    }
  };


  // --- Filtering Logic (Combined Search and Filters) ---
  const filteredStudents = students.filter(student => {
    const rollNumberString = student.rollNumber ? String(student.rollNumber).toLowerCase() : '';
    const classString = student.class ? String(student.class).toLowerCase() : '';
    const nameString = student.name ? student.name.toLowerCase() : '';
    
    const searchMatch = (
        nameString.includes(searchTerm.toLowerCase()) ||
        rollNumberString.includes(searchTerm.toLowerCase()) ||
        classString.includes(searchTerm.toLowerCase())
    );

    const classMatch = filterClass === '' || String(student.class) === filterClass;
    
    const studentStatus = student.isActive ? 'Active' : 'Inactive';
    const statusMatch = filterStatus === '' || studentStatus === filterStatus;

    return searchMatch && classMatch && statusMatch;
  });

  // --- Helper for Status Badge Styling ---
  const getStatusStyle = (isActive) => {
    const status = isActive ? 'Active' : 'Inactive';
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handlers for Modals
  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };
  
  const handleEdit = (student) => {
      setSelectedStudent(student);
      setShowEditModal(true);
  };
  
  const handleConfirmStatus = (student) => {
      setSelectedStudent(student);
      setShowConfirmStatusModal(true);
  };
  
  // Get unique classes for filter dropdown
  const uniqueClasses = [...new Set(students.map(s => s.class).filter(c => c !== undefined && c !== null && c !== ''))].sort((a, b) => a - b);
  
  // --- Render Content ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500">
          <Loader className="w-8 h-8 animate-spin text-blue-500" />
          <p className="mt-4 text-lg">Loading student data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-6 h-6 mr-3" />
          <p className="font-medium">{error}</p>
        </div>
      );
    }

    if (students.length === 0) {
      return (
        <div className="p-12 text-center text-gray-500">
          <UserPlus className="w-10 h-10 mx-auto text-gray-400" />
          <p className="mt-4 text-lg font-bold text-gray-800">No Students Enrolled</p>
          <p className="text-sm">There are no student records for this school yet. Use the 'Add New Student' button to begin.</p>
        </div>
      );
    }
    
    if (filteredStudents.length === 0 && (searchTerm || filterClass || filterStatus)) {
        return (
            <div className="p-12 text-center text-gray-500">
                <Search className="w-10 h-10 mx-auto text-gray-400" />
                <p className="mt-4 text-lg font-bold text-gray-800">No results found</p>
                <p className="text-sm">Try clearing your search or checking the filters.</p>
            </div>
        );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Class
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Roll Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Guardian Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredStudents.map((student) => {
              const statusToggleIcon = student.isActive ? <Trash2 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />;
              const statusToggleTitle = student.isActive ? 'Mark Inactive' : 'Mark Active';
              const statusToggleColor = student.isActive ? 'text-red-600 hover:text-red-800 hover:bg-red-100' : 'text-green-600 hover:text-green-800 hover:bg-green-100';

              return (
              <tr key={student.id || student._id} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <div className="flex items-center justify-center w-10 h-10 text-base font-semibold text-blue-700 bg-blue-100 rounded-full border border-blue-200">
                        {student.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.class} {student.section ? `(${student.section})` : ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700 font-mono">{student.rollNumber}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {student.gardianPhno}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium leading-5 rounded-full ${getStatusStyle(student.isActive)}`}>
                    {student.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-2">
                    {/* View Button */}
                    <button 
                        title="View Details" 
                        className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => handleView(student)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {/* Edit Button */}
                    <button 
                        title="Edit Student" 
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
                        onClick={() => handleEdit(student)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {/* Status Toggle Button */}
                    <button 
                        title={statusToggleTitle} 
                        className={`p-1.5 rounded-full transition-colors ${statusToggleColor}`}
                        onClick={() => handleConfirmStatus(student)}
                    >
                        {statusToggleIcon}
                    </button>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    );
  };

  const isModalOpen = showAddModal || showEditModal || showViewModal || showConfirmStatusModal;

  return (
    <> 
      {/* Main dashboard content. The 'filter blur-sm' applies the blur to the background when a modal is open. */}
      <div className={`p-6 md:p-10 bg-gray-50 min-h-screen ${isModalOpen ? 'filter blur-sm pointer-events-none' : ''}`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Student Management </h1>
            </div>
            {/* Add New Student Button */}
            <button
              className="flex items-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => setShowAddModal(true)}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add New Student
            </button>
          </div>

          <hr className="border-gray-200" />

          {/* Search and Action Bar (Improved Filter UI) */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full py-3 pl-10 pr-4 text-base bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="Search by name, roll number, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filter Dropdowns with clear spacing */}
            <div className="flex space-x-3 flex-wrap gap-2 sm:flex-nowrap sm:gap-4">
              <div className="relative flex-1 min-w-[120px]">
                  <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="block appearance-none w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                      <option value="">Status: All</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <Filter className="w-4 h-4" />
                  </div>
              </div>

              <div className="relative flex-1 min-w-[120px]">
                  <select
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="block appearance-none w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                      <option value="">Class: All</option>
                      {uniqueClasses.map(c => <option key={c} value={String(c)}>Class {c}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <BookOpen className="w-4 h-4" />
                  </div>
              </div>

              <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Students Table Container */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {renderContent()}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-semibold">1</span> to <span className="font-semibold">{filteredStudents.length}</span> of{' '}
                  <span className="font-semibold">{totalStudents}</span> total students
                  {searchTerm || filterClass || filterStatus ? <span className="ml-2 text-gray-500">(Filtered from {students.length} students)</span> : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* MODALS - Rendered outside the blur container */}
      
      <AddStudentModal 
          isVisible={showAddModal} 
          onClose={() => setShowAddModal(false)} 
          onStudentAdded={fetchStudents} 
      />
      
      <ViewStudentModal 
          isVisible={showViewModal} 
          onClose={() => setShowViewModal(false)} 
          student={selectedStudent} 
      />
      
      <EditStudentModal 
          isVisible={showEditModal} 
          onClose={() => setShowEditModal(false)} 
          student={selectedStudent} 
          onStudentUpdated={fetchStudents} 
      />
      
      <ConfirmStatusChangeModal
          isVisible={showConfirmStatusModal}
          onClose={() => setShowConfirmStatusModal(false)}
          student={selectedStudent}
          onConfirm={handleStatusToggle}
      />
    </>
  );
};

export default Students;
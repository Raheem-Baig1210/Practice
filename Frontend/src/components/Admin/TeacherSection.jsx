import React, { useState, useEffect } from 'react';
import { User, MapPin, Users, Phone, Mail, Search, Plus, Eye, EyeOff, Edit, Trash2, ChevronDown, X, Calendar, Building, GraduationCap, CheckCircle, AlertTriangle } from 'lucide-react';


const NotificationToast = ({ notification, setNotification }) => {
    if (!notification) return null;

    const isSuccess = notification.type === 'success';
    
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    const borderColor = isSuccess ? 'border-green-700' : 'border-red-700';
    const Icon = isSuccess ? CheckCircle : AlertTriangle;

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification(null);
        }, 5000); // Notification disappears after 5 seconds
        return () => clearTimeout(timer);
    }, [notification, setNotification]);

    return (
        <div 
            className={`fixed top-5 right-5 z-[100] max-w-sm w-full 
                        shadow-xl rounded-lg border-l-4 p-4 
                        transition-all duration-500 ease-out 
                        ${borderColor} ${notification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} 
                        bg-white text-gray-900`}
        >
            <div className="flex items-start">
                {/* Icon */}
                <div className={`flex-shrink-0 pt-0.5 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div className="ml-3 flex-1 pt-0.5">
                    <p className="text-sm font-semibold leading-5">
                        {isSuccess ? 'Success' : 'Error'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                    </p>
                </div>
                
                {/* Close Button */}
                <div className="ml-4 flex-shrink-0 flex">
                    <button
                        onClick={() => setNotification(null)}
                        className="inline-flex text-gray-400 hover:text-gray-500 p-1 rounded-md transition-colors"
                        aria-label="Close notification"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};





const EditModal = ({ showEditModal, editingTeacher, schools, handleEditFormChange, handleEditSubmit, setShowEditModal, editFormStatus }) => {
    const [showPassword, setShowPassword] = useState(false);

    if (!showEditModal || !editingTeacher) return null;

    const { name, email, phno, subject, experience, qualification, schoolId, password, status } = editingTeacher;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                        backdrop-filter backdrop-blur-sm bg-gray-800 bg-opacity-30"> {/* MODIFIED: Added backdrop-filter and adjusted background */}
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Edit Teacher: {name}</h2>
                            <p className="text-indigo-100">Update the teacher's profile information</p>
                        </div>
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="text-white hover:bg-indigo-700 p-2 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Modal Content - Edit Form */}
                <div className="p-6">
                    <form className="space-y-6" onSubmit={handleEditSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter teacher name"
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Teacher email"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phno"
                                    value={phno || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Phone number"
                                    autoComplete="tel"
                                    required
                                />
                            </div>
                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={subject || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Teaching subject"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={experience || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Years of experience"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            {/* Qualification */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                                <input
                                    type="text"
                                    name="qualification"
                                    value={qualification || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Educational qualification"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Assign to School Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Building className="w-4 h-4 inline mr-2" />
                                    Assign to School
                                </label>
                                <select
                                    name="schoolId"
                                    value={schoolId || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    autoComplete="organization"
                                    required
                                >
                                    <option value="">Select a school</option>
                                    {schools.map((school) => (
                                        <option
                                            key={school.id}
                                            value={school.id}
                                        >
                                            {school.displayName}
                                        </option>
                                    ))}
                                </select>
                                {schools.length === 0 && (
                                    <p className="text-sm text-gray-500 mt-1">Loading schools or no schools found.</p>
                                )}
                            </div>
                            {/* Status Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={status || 'active'}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Password Field (Optional on update) */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password (Optional)</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password || ''}
                                    onChange={handleEditFormChange}
                                    autoComplete="new-password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                                    placeholder="Leave blank to keep current password"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Form Actions and Status */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowEditModal(false)}
                                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                disabled={editFormStatus.loading}
                            >
                                {editFormStatus.loading ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                        {editFormStatus.error && <p className="text-red-600 text-sm mt-2 font-medium">Error: {editFormStatus.error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};




const ViewModal = ({ showViewModal, viewingTeacher, setShowViewModal, handleEdit }) => {
    if (!showViewModal || !viewingTeacher) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                        backdrop-filter backdrop-blur-sm bg-gray-800 bg-opacity-30"> {/* MODIFIED: Added backdrop-filter and adjusted background */}
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



const TeacherSection = ({ section }) => {
    const [teachers, setTeachers] = useState([]);
    const [schools, setSchools] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Teachers');
    const [showDropdown, setShowDropdown] = useState(false);
    const [viewingTeacher, setViewingTeacher] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // State for Edit
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormStatus, setEditFormStatus] = useState({
        loading: false,
        error: null,
    });
    // State for Notifications
    const [notification, setNotification] = useState(null);

    // Helper to display transient notifications
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    // RE-USABLE FUNCTION TO FETCH TEACHERS
    const fetchTeachers = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Unauthorized User is trying to access...!!!');
        }

        const response = await fetch('http://localhost:3000/admin/listOfteachers', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data || [];
    };

    // Effect to fetch all teachers
    useEffect(() => {
        const loadTeachers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchTeachers();
                setTeachers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (section !== 'add-teacher' && !showAddForm && !showEditModal) {
            loadTeachers();
        }
    }, [section, showAddForm, showEditModal]);

    // Fetch schools when add/edit form is shown
    useEffect(() => {
        const fetchSchools = async () => {
            if (section === 'add-teacher' || showAddForm || showEditModal) {
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
                    const schoolsData = data.data && Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);

                    const standardizedSchools = schoolsData.map(school => ({
                        ...school,
                        id: school.id || school._id?.toString() || school._id,
                        displayName: school.name || school.schoolName || `School ID: ${school.id || school._id}`
                    }));

                    setSchools(standardizedSchools);

                } catch (err) {
                    console.error('Failed to fetch schools:', err);
                    setSchools([]);
                }
            }
        };

        fetchSchools();
    }, [section, showAddForm, showEditModal]);

    // Form state for adding new teacher
    const [form, setForm] = useState({
        name: '', email: '', phno: '', subject: '', experience: '',
        qualification: '', schoolId: '', password: '',
    });
    const [formStatus, setFormStatus] = useState({
        loading: false, success: false, error: null
    });

    // Handler for Add Teacher Form
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handler for Edit Teacher Form
    const handleEditFormChange = (e) => {
        if (!editingTeacher) return;
        setEditingTeacher(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, success: false, error: null });

        if (!form.schoolId) {
            setFormStatus({ loading: false, success: false, error: "Please select a school." });
            return;
        }

        const payload = {
            ...form,
            phno: Number(form.phno),
            experience: Number(form.experience),
        };

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('Unauthorized User is trying to access...!!!')
            }

            const response = await fetch('http://localhost:3000/admin/addNewTeacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to add teacher due to an unknown server error.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    console.log("error while getting the response from the backend", e)
                }
                throw new Error(errorMessage);
            }

            setFormStatus({ loading: false, success: true, error: null });
            setForm({
                name: '', email: '', phno: '', subject: '', experience: '',
                qualification: '', schoolId: '', password: ''
            });
            setShowAddForm(false);

            const refreshedTeachers = await fetchTeachers();
            setTeachers(refreshedTeachers);
            showNotification('Teacher added successfully!', 'success');

        } catch (err) {
            setFormStatus({ loading: false, success: false, error: err.message });
            showNotification(`Error adding teacher: ${err.message}`, 'error');
            console.error('Failed to add teacher:', err);
        }
    };


    // Handle Edit Submission
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingTeacher || !editingTeacher.id) return;

        setEditFormStatus({ loading: true, error: null });

        const payload = {
            ...editingTeacher,
            phno: Number(editingTeacher.phno),
            experience: Number(editingTeacher.experience),
        };

        let finalSchoolId = editingTeacher.schoolId;
        if (typeof finalSchoolId === 'object' && finalSchoolId !== null && finalSchoolId._id) {
            finalSchoolId = finalSchoolId._id;
        }

        if (typeof finalSchoolId === 'object' && finalSchoolId !== null) {
            finalSchoolId = finalSchoolId.id || finalSchoolId._id?.toString() || '';
        }

        if (!finalSchoolId || finalSchoolId.length < 10) {
            setEditFormStatus({ loading: false, error: "Invalid school selection. Please re-select a school." });
            return;
        }

        payload.schoolId = finalSchoolId;

        // Clean up data before sending
        delete payload.school;
        delete payload.createdAt;
        delete payload.updatedAt;
        if (!payload.password) {
            delete payload.password; // Don't send empty password string
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Unauthorized User is trying to access...!!!');
            }

            const response = await fetch(`http://localhost:3000/admin/updateTeacher/${editingTeacher.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to update teacher due to an unknown server error.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    console.log("Error parsing update response:", e);
                }
                throw new Error(errorMessage);
            }

            // Success: Close modal, show notification, and refresh list
            setShowEditModal(false);
            setEditingTeacher(null);
            setEditFormStatus({ loading: false, error: null });
            showNotification('Teacher information Updated Successfully', 'success');

            const refreshedTeachers = await fetchTeachers();
            setTeachers(refreshedTeachers);

        } catch (err) {
            setEditFormStatus({ loading: false, error: err.message });
            showNotification(`Error updating teacher: ${err.message}`, 'error');
            console.error('Failed to update teacher:', err);
        }
    };


    // Filter teachers based on search term and status (unchanged)
    let filteredTeachers = teachers.filter(teacher =>
        teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.phno?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus === 'Active Teachers') {
        filteredTeachers = filteredTeachers.filter(teacher => teacher.status !== 'inactive');
    } else if (filterStatus === 'Inactive Teachers') {
        filteredTeachers = filteredTeachers.filter(teacher => teacher.status === 'inactive');
    }

    // Action handlers
    const handleView = (teacher) => {
        const viewableTeacher = {
            ...teacher,
            id: teacher.id || teacher._id?.toString(),
            schoolId: teacher.schoolId?.toString() || (teacher.school && typeof teacher.school === 'object' ? teacher.school._id?.toString() : '')
        };
        setViewingTeacher(viewableTeacher);
        setShowViewModal(true);
    };

    const handleEdit = (teacher) => {
        const teacherForEdit = {
            ...teacher,
            id: teacher.id || teacher._id?.toString(),
            schoolId: teacher.schoolId?.toString() || (teacher.school && typeof teacher.school === 'object' ? teacher.school._id?.toString() : teacher.schoolId || ''),
            phno: teacher.phno?.toString() || '',
            experience: teacher.experience?.toString() || '',
            password: '',
        };

        setEditingTeacher(teacherForEdit);
        setShowEditModal(true);
        setShowAddForm(false);
        setShowViewModal(false);
        setEditFormStatus({ loading: false, error: null }); // Reset form status on open
    };

    const handleDelete = (teacher) => {
        if (window.confirm(`Are you sure you want to delete ${teacher.name}?`)) {
            // Placeholder for actual delete logic
            alert(`Deleting teacher: ${teacher.name}`);
        }
    };

    // Statistics (unchanged)
    const totalTeachers = teachers.length;
    const activeTeachers = teachers.filter(teacher => teacher.status !== 'inactive').length;
    const inactiveTeachers = totalTeachers - activeTeachers;

    // Render Add Teacher Form
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
                                <input type="text" name="name" value={form.name} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter teacher name" autoComplete="name" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" name="email" value={form.email} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Teacher email" autoComplete="email" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input type="tel" name="phno" value={form.phno} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Phone number" autoComplete="tel" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input type="text" name="subject" value={form.subject} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Teaching subject" autoComplete="off" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                                <input type="number" name="experience" value={form.experience} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Years of experience" autoComplete="off" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                                <input type="text" name="qualification" value={form.qualification} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Educational qualification" autoComplete="off" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    autoComplete="organization"
                                    required
                                >
                                    <option value="">Select a school</option>
                                    {schools.map((school) => (
                                        <option
                                            key={school.id}
                                            value={school.id}
                                        >
                                            {school.displayName}
                                        </option>
                                    ))}
                                </select>
                                {schools.length === 0 && (
                                    <p className="text-sm text-gray-500 mt-1">Loading schools or no schools found.</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleFormChange}
                                        autoComplete="new-password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                                        placeholder="Password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        title={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
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
                        {formStatus.error && <p className="text-red-600 text-sm mt-2 font-medium">Error: {formStatus.error}</p>}
                    </form>
                </div>
                <NotificationToast notification={notification} setNotification={setNotification} />
            </div>
        );
    }

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Loading teachers...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    }

    // Main Teacher List View
    return (
        <div className="space-y-6">
            {/* Header and Stats (unchanged) */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Teacher Management</h1>
                        <p className="text-purple-100 text-lg">Manage all teachers, their profiles, and assignments</p>
                    </div>
                    <div className="flex items-center space-x-8">
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
            {/* Search and Filter Section (unchanged) */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
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

            {/* Teachers Table (unchanged) */}
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
                                    <tr key={teacher.id || teacher._id} className="hover:bg-gray-50 transition-colors">
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

            {/* Modals and Notifications */}
            <ViewModal 
                showViewModal={showViewModal}
                viewingTeacher={viewingTeacher}
                setShowViewModal={setShowViewModal}
                handleEdit={handleEdit}
            />
            <EditModal 
                showEditModal={showEditModal}
                editingTeacher={editingTeacher}
                schools={schools}
                handleEditFormChange={handleEditFormChange}
                handleEditSubmit={handleEditSubmit}
                setShowEditModal={setShowEditModal}
                editFormStatus={editFormStatus}
            />
            <NotificationToast notification={notification} setNotification={setNotification} />
        </div>
    );
};

export default TeacherSection;
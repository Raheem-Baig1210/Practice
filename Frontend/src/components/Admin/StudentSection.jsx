import React, { useState, useEffect, useCallback } from 'react';
import { User, BookOpen, Users, Phone, Search, Plus, Eye, EyeOff, Edit, ChevronDown, X, Calendar, Building, CheckCircle, AlertTriangle, Loader2, Power, Layers } from 'lucide-react';

// --- Reusable API CALLER (Helper) ---

const apiCall = async (url, method, payload = null) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Unauthorized User is trying to access...!!!');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const config = {
        method: method,
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
        throw new Error(errorData.message || 'An unknown error occurred');
    }

    return response.json();
};


// --- NotificationToast Component (Bright Mode) ---

const NotificationToast = ({ notification, setNotification }) => {
    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => {
            setNotification(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [notification, setNotification]);

    if (!notification) return null;

    const isSuccess = notification.type === 'success';
    const borderColor = isSuccess ? 'border-green-600' : 'border-red-600';
    const Icon = isSuccess ? CheckCircle : AlertTriangle;

    return (
        <div 
            className={`fixed top-5 right-5 z-[100] max-w-sm w-full 
                        shadow-xl rounded-lg border-l-4 p-4 
                        transition-all duration-500 ease-out 
                        ${borderColor} ${notification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} 
                        bg-white text-gray-900`} // Bright background, dark text
        >
            <div className="flex items-start">
                <div className={`flex-shrink-0 pt-0.5 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                
                <div className="ml-3 flex-1 pt-0.5">
                    <p className="text-sm font-semibold leading-5">
                        {isSuccess ? 'Success' : 'Error'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                    </p>
                </div>
                
                <div className="ml-4 flex-shrink-0 flex">
                    <button
                        onClick={() => setNotification(null)}
                        className="inline-flex text-gray-400 hover:text-gray-700 p-1 rounded-md transition-colors"
                        aria-label="Close notification"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- BlurredModalContainer Component (Used for StatusConfirmationModal, EditModal, ViewModal) ---
// Now used by all modals for standardized blurred background
const BlurredModalContainer = React.memo(({ show, onClose, children, title }) => {
    if (!show) return null;

    // CHANGED: backdrop-blur-sm to backdrop-blur-md and bg-opacity-70 to bg-opacity-80 for a slightly blurred dashboard background
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-filter backdrop-blur-md bg-gray-900 bg-opacity-80"
        >
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100">
                <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-teal-600 p-2 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
});


// --- StatusConfirmationModal Component (Bright Mode) ---

const StatusConfirmationModal = React.memo(({ student, onConfirm, onCancel, status }) => {
    if (!student) return null;

    const isCurrentlyInactive = student.status === 'inactive';
    const currentStatus = isCurrentlyInactive ? 'Inactive' : 'Active';
    const newStatusAction = isCurrentlyInactive ? 'Activate' : 'Deactivate';
    const newStatusText = isCurrentlyInactive ? 'Active' : 'Inactive';
    
    const newStatusStyle = isCurrentlyInactive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
    const newStatusTextColor = isCurrentlyInactive ? 'text-green-600' : 'text-red-600';
    const currentStatusTextColor = isCurrentlyInactive ? 'text-red-600' : 'text-green-600';

    return (
        <BlurredModalContainer 
            show={!!student} 
            onClose={onCancel} 
            title={`${newStatusAction} Student`}
        >
            <div className="p-6 text-center bg-white rounded-b-lg">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Confirm Status Change for {student.name}
                </h3>
                <p className="text-gray-700 mb-6">
                    Are you sure you want to change the status of <strong>{student.name}</strong> from 
                    <span className={`font-bold mx-1 ${currentStatusTextColor}`}>
                        {currentStatus}
                    </span> 
                    to 
                    <span className={`font-bold mx-1 ${newStatusTextColor}`}>
                        {newStatusText}
                    </span>?
                </p>

                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={onCancel}
                        className="px-6 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                        disabled={status.loading}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onConfirm(student)}
                        className={`px-6 py-2 text-white rounded-md transition-colors flex items-center justify-center space-x-2 ${newStatusStyle}`}
                        disabled={status.loading}
                    >
                        {status.loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>{newStatusAction}ing...</span>
                            </>
                        ) : (
                            <span>{newStatusAction}</span>
                        )}
                    </button>
                 </div>
                 {status.error && (
                    <div className="px-6 pt-4 text-sm text-red-600">Error: {status.error}</div>
                )}
            </div>
        </BlurredModalContainer>
    );
});


// --- EditModal Component (Bright Mode, Student Fields) ---

const EditModal = ({ showEditModal, editingStudent, schools, handleEditFormChange, handleEditSubmit, setShowEditModal, editFormStatus }) => {
    // const [showPassword, setShowPassword] = useState(false); // REMOVED PASSWORD FIELD

    if (!showEditModal || !editingStudent) return null;

    // Removed rollNumber and password from destructuring
    const { name, gardianPhno, dateOfBirth, class: studentClass, section, gender, schoolId, status } = editingStudent;

    return (
        // Standardized blurred background by using BlurredModalContainer
        <BlurredModalContainer 
            show={showEditModal} 
            onClose={() => setShowEditModal(false)} 
            title={`Edit Student: ${name}`}
        >
            <div className="p-6">
                <form className="space-y-6" onSubmit={handleEditSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name || ''}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                placeholder="Enter student name"
                                required
                            />
                        </div>
                        {/* Class (Promoted to fill rollNumber's spot) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                            <input
                                type="number"
                                name="class"
                                value={studentClass || ''}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                placeholder="e.g., 10"
                                required
                            />
                        </div>
                        {/* NOTE: rollNumber field is removed here */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Section (New Field) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                            <input
                                type="text"
                                name="section"
                                value={section || ''}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                placeholder="e.g., A or Science"
                            />
                        </div>
                        {/* Guardian Phone (New Field) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone</label>
                            <input
                                type="tel"
                                name="gardianPhno"
                                value={gardianPhno || ''}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                placeholder="Guardian phone number"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={dateOfBirth ? (new Date(dateOfBirth).toISOString().split('T')[0]) : ''}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                            />
                        </div>
                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                            <select
                                name="gender"
                                value={gender || ''}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                required
                            >
                                <option value="" className="text-gray-500">Select Gender</option>
                                <option value="Male" className="text-gray-900">Male</option>
                                <option value="Female" className="text-gray-900">Female</option>
                                <option value="Other" className="text-gray-900">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Status Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={status || 'active'}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                required
                            >
                                <option value="active" className="text-gray-900">Active</option>
                                <option value="inactive" className="text-gray-900">Inactive</option>
                            </select>
                        </div>
                        {/* Assign to School Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Building className="w-4 h-4 inline mr-2 text-teal-600" />
                                Assign to School
                            </label>
                            <select
                                name="schoolId"
                                value={schoolId || ''}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                required
                            >
                                <option value="" className="text-gray-500">Select a school</option>
                                {schools.map((school) => (
                                    <option
                                        key={school.id}
                                        value={school.id}
                                        className="text-gray-900"
                                    >
                                        {school.displayName}
                                    </option>
                                ))}
                            </select>
                            {schools.length === 0 && (
                                <p className="text-sm text-gray-500 mt-1">Loading schools or no schools found.</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Password Field REMOVED */}

                    {/* Form Actions and Status */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowEditModal(false)}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                            disabled={editFormStatus.loading}
                        >
                            {editFormStatus.loading ? (
                                <div className="flex items-center space-x-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                    {editFormStatus.error && <p className="text-red-600 text-sm mt-2 font-medium">Error: {editFormStatus.error}</p>}
                </form>
            </div>
        </BlurredModalContainer>
    );
};


// --- ViewModal Component (Bright Mode, Student Fields) ---

const ViewModal = ({ showViewModal, viewingStudent, setShowViewModal, handleEdit, schools }) => {
    if (!showViewModal || !viewingStudent) return null;
    
    // Helper to find school name
    const getSchoolName = (schoolId) => {
        if (!schoolId) return '-';
        const school = schools.find(s => s.id === schoolId);
        return school ? school.displayName : '-';
    };

    // Format Date of Birth (checking against null/undefined)
    const dob = viewingStudent.dateOfBirth ? new Date(viewingStudent.dateOfBirth).toLocaleDateString() : '-';
    const createdAt = viewingStudent.createdAt ? new Date(viewingStudent.createdAt).toLocaleDateString() : '-';
    const updatedAt = viewingStudent.updatedAt ? new Date(viewingStudent.updatedAt).toLocaleDateString() : '-';
    
    // School Name Lookup
    const schoolIdForLookup = viewingStudent.schoolId || viewingStudent.school?._id?.toString() || viewingStudent.school?.id;
    const schoolName = getSchoolName(schoolIdForLookup);


    return (
        // Standardized blurred background by using BlurredModalContainer
        <BlurredModalContainer 
            show={showViewModal} 
            onClose={() => setShowViewModal(false)} 
            title={`Student Details: ${viewingStudent.name}`}
        >
            {/* Modal Content - starts after the header provided by BlurredModalContainer */}
            <div className="p-6 space-y-6">
                {/* Student Icon and Basic Info */}
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{viewingStudent.name}</h3>
                        <div className="flex items-center space-x-2 text-gray-600 mt-1">
                            <Users className="w-4 h-4" />
                            {/* Display Roll Number (It's autogenerated but still displayed here) */}
                            <span>Roll No: {viewingStudent.rollNumber || '-'}</span>
                        </div>
                        <div className="mt-2">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                viewingStudent.status === 'inactive'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                {viewingStudent.status === 'inactive' ? 'Inactive' : 'Active'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Guardian Contact & School Information */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-teal-600" />
                        Guardian & School Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600">Guardian Phone</p>
                                <p className="font-medium text-gray-900">{viewingStudent.gardianPhno || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Building className="w-4 h-4 text-gray-500 mt-1" />
                            <div>
                                <p className="text-sm text-gray-600">School Name</p>
                                <p className="font-medium text-gray-900">{schoolName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal & Academic Information */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-teal-600" />
                        Academic & Personal Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Class</p>
                            <p className="font-medium text-gray-900">{viewingStudent.class || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Section</p>
                            <p className="font-medium text-gray-900">{viewingStudent.section || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Roll Number</p>
                            <p className="font-medium text-gray-900">{viewingStudent.rollNumber || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date of Birth</p>
                            <p className="font-medium text-gray-900">{dob}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Gender</p>
                            <p className="font-medium text-gray-900">{viewingStudent.gender || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* System Information */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Layers className="w-5 h-5 mr-2 text-teal-600" />
                        System Information
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium text-gray-800">Student ID:</span> {viewingStudent.id}</p>
                        <p><span className="font-medium text-gray-800">Registration Date:</span> {createdAt}</p>
                        <p><span className="font-medium text-gray-800">Last Updated:</span> {updatedAt}</p>
                    </div>
                </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 px-6 py-4 rounded-b-lg flex justify-end space-x-3 border-t border-gray-200">
                <button
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Close
                </button>
                <button
                    onClick={() => {
                        setShowViewModal(false);
                        handleEdit(viewingStudent);
                    }}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center space-x-2"
                >
                    <Edit className="w-4 h-4" />
                    <span>Edit Student</span>
                </button>
            </div>
        </BlurredModalContainer>
    );
};


// --- Main StudentSection Component ---

const StudentSection = ({ section }) => {
    const [students, setStudents] = useState([]);
    const [schools, setSchools] = useState([]);
    // const [showPassword, setShowPassword] = useState(false); // REMOVED PASSWORD STATE
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Students');
    const [showDropdown, setShowDropdown] = useState(false);
    const [viewingStudent, setViewingStudent] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // State for Edit
    const [editingStudent, setEditingStudent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormStatus, setEditFormStatus] = useState({
        loading: false,
        error: null,
    });
    // State for Notifications
    const [notification, setNotification] = useState(null);

    // State for status change
    const [studentToConfirmStatus, setStudentToConfirmStatus] = useState(null);
    const [statusChangeRequest, setStatusChangeRequest] = useState({ loading: false, error: null });

    // Helper to display transient notifications
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    // RE-USABLE FUNCTION TO FETCH STUDENTS
    const fetchStudents = useCallback(async () => {
        try {
            const data = await apiCall('http://localhost:3000/admin/listOfStudents', 'GET');
            
            // --- START: Status/isActive Logic (Functionality preserved) ---
            const studentsWithId = (data.data || []).map(s => ({
                ...s,
                id: s.id || s._id?.toString(),
                // Derive string status ('active'/'inactive') from boolean isActive for UI consumption
                status: s.isActive === false ? 'inactive' : 'active',
                // Keep isActive boolean for backend payload consistency
                isActive: s.isActive !== undefined ? s.isActive : true // Default to true if missing
            }));
            // --- END: Status/isActive Logic ---

            return studentsWithId;
        } catch (err) {
            // Rethrow the error so the caller can handle loading/error state
            throw new Error(err.message);
        }
    }, []);

    // RE-USABLE FUNCTION TO FETCH SCHOOLS
    const fetchSchools = useCallback(async () => {
        try {
            const data = await apiCall('http://localhost:3000/admin/listOfSchools', 'GET');
            const schoolsData = data.data && Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);

            const standardizedSchools = schoolsData.map(school => ({
                ...school,
                id: school.id || school._id?.toString() || school._id,
                displayName: school.name || school.schoolName || `School ID: ${school.id || school._id}`
            }));

            return standardizedSchools;
        } catch (err) {
            console.error('Failed to fetch schools:', err);
            return [];
        }
    }, []);


    // Effect to fetch all students AND schools initially (MODIFIED LOGIC)
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch schools first or concurrently to have school names ready for the list
                const schoolsData = await fetchSchools();
                setSchools(schoolsData);
                
                // Then fetch students
                const studentsData = await fetchStudents();
                setStudents(studentsData);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (section !== 'add-student' && !showAddForm && !showEditModal) {
            loadData();
        }
    }, [section, showAddForm, showEditModal, fetchStudents, fetchSchools]); // Added fetchSchools

    // Fetch schools when add/edit form is shown (Secondary load, primarily needed if state reset)
    // Kept this for robustness, though initial load should cover it.
    useEffect(() => {
        const loadSchools = async () => {
            if ((section === 'add-student' || showAddForm || showEditModal) && schools.length === 0) {
                const schoolsData = await fetchSchools();
                setSchools(schoolsData);
            }
        };

        loadSchools();
    }, [section, showAddForm, showEditModal, fetchSchools, schools.length]);

    // Form state for adding new student (password REMOVED)
    const [form, setForm] = useState({
        name: '', 
        dateOfBirth: '', // Using common spelling (was dateOfBith in schema)
        class: '', 
        section: '',
        gender: '', 
        gardianPhno: '', 
        schoolId: '', 
        // password: '', // REMOVED PASSWORD
    });
    const [formStatus, setFormStatus] = useState({
        loading: false, success: false, error: null
    });

    // Handler for Add Student Form
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handler for Edit Student Form
    const handleEditFormChange = (e) => {
        if (!editingStudent) return;
        setEditingStudent(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, success: false, error: null });

        if (!form.schoolId) {
            setFormStatus({ loading: false, success: false, error: "Please select a school." });
            return;
        }

        // rollNumber and password are removed from the payload
        const payload = {
            name: form.name,
            dateOfBirth: form.dateOfBirth,
            class: Number(form.class),
            section: form.section,
            gender: form.gender,
            gardianPhno: Number(form.gardianPhno),
            schoolId: form.schoolId,
            isActive: true 
        };

        try {
            await apiCall('http://localhost:3000/admin/addNewStudent', 'POST', payload);

            setFormStatus({ loading: false, success: true, error: null });
            // Reset form (password removed from state reset)
            setForm({
                name: '', dateOfBirth: '', class: '', section: '',
                gender: '', gardianPhno: '', schoolId: '', // password is gone
            });
            setShowAddForm(false);

            const refreshedStudents = await fetchStudents();
            setStudents(refreshedStudents);
            showNotification('Student added successfully!', 'success');

        } catch (err) {
            setFormStatus({ loading: false, success: false, error: err.message });
            showNotification(`Error adding student: ${err.message}`, 'error');
            console.error('Failed to add student:', err);
        }
    };


    // Handle Edit Submission
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingStudent || !editingStudent.id) return;

        setEditFormStatus({ loading: true, error: null });

        // Convert the UI string status back to the boolean isActive
        const newIsActive = editingStudent.status === 'active';

        // PAYLOAD FIELDS: rollNumber and password are excluded
        const payload = {
            name: editingStudent.name,
            dateOfBirth: editingStudent.dateOfBirth,
            class: Number(editingStudent.class),
            section: editingStudent.section,
            gender: editingStudent.gender,
            gardianPhno: Number(editingStudent.gardianPhno),
            schoolId: editingStudent.schoolId,
            isActive: newIsActive
        };

        // Standardize schoolId before sending
        let finalSchoolId = payload.schoolId;
        if (typeof finalSchoolId === 'object' && finalSchoolId !== null) {
            finalSchoolId = finalSchoolId.id || finalSchoolId._id?.toString() || '';
        }

        if (!finalSchoolId || finalSchoolId.length < 10) {
            setEditFormStatus({ loading: false, error: "Invalid school selection. Please re-select a school." });
            return;
        }

        payload.schoolId = finalSchoolId;

        try {
            await apiCall(`http://localhost:3000/admin/updateStudent/${editingStudent.id}`, 'PUT', payload);

            // Success: Close modal, show notification, and refresh list
            setShowEditModal(false);
            setEditingStudent(null);
            setEditFormStatus({ loading: false, error: null });
            showNotification('Student information Updated Successfully', 'success');

            const refreshedStudents = await fetchStudents();
            setStudents(refreshedStudents); 

        } catch (err) {
            setEditFormStatus({ loading: false, error: err.message });
            showNotification(`Error updating student: ${err.message}`, 'error');
            console.error('Failed to update student:', err);
        }
    };


    // Filter students based on search term and status (UPDATED FIELDS)
    let filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || // Roll number still searchable
        student.class?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.gardianPhno?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus === 'Active Students') {
        filteredStudents = filteredStudents.filter(student => student.status !== 'inactive');
    } else if (filterStatus === 'Inactive Students') {
        filteredStudents = filteredStudents.filter(student => student.status === 'inactive');
    }

    // Helper to find school name
    const getSchoolName = (schoolId) => {
        if (!schoolId) return '-';
        const school = schools.find(s => s.id === schoolId);
        return school ? school.displayName : '-';
    };

    // Action handlers
    const handleView = (student) => {
        const viewableStudent = {
            ...student,
            id: student.id || student._id?.toString(),
            schoolId: student.schoolId?.toString() || (student.school && typeof student.school === 'object' ? student.school._id?.toString() : '')
        };
        setViewingStudent(viewableStudent);
        setShowViewModal(true);
    };

    const handleEdit = (student) => {
        const studentForEdit = {
            ...student,
            id: student.id || student._id?.toString(),
            schoolId: student.schoolId?.toString() || (student.school && typeof student.school === 'object' ? student.school._id?.toString() : student.schoolId || ''),
            
            // rollNumber is kept here only for potential display/debugging, but NOT rendered in form
            rollNumber: student.rollNumber || '', 
            class: student.class?.toString() || '', // Ensure it's a string for form input
            section: student.section || '',
            gardianPhno: student.gardianPhno?.toString() || '', // Changed phone field

            dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '', // Format for input type="date"
            // password: '', // REMOVED PASSWORD
            status: student.status || 'active'
        };

        setEditingStudent(studentForEdit);
        setShowEditModal(true);
        setShowAddForm(false);
        setShowViewModal(false);
        setEditFormStatus({ loading: false, error: null }); // Reset form status on open
    };


    // --- STATUS TOGGLE LOGIC ---

    // 1. Request to show the confirmation modal
    const handleStatusToggleRequest = (student) => {
        if (student.id) {
            setStudentToConfirmStatus(student);
            setStatusChangeRequest({ loading: false, error: null });
        } else {
            showNotification("Student ID is missing for status change.", 'error');
        }
    };

    // 2. Confirmed status change - sends PUT request to specified API (MODIFIED API)
    const handleStatusToggleConfirm = async (student) => {
        const currentIsActive = student.status === 'active'; 
        const newIsActive = !currentIsActive; 
        
        setStatusChangeRequest({ loading: true, error: null });

        try {
            const studentId = student.id || student._id?.toString();
            
            // Hitting the user-specified API endpoint: http://localhost:3000/admin/deleteStudent/:id
            await apiCall(`http://localhost:3000/admin/deleteStudent/${studentId}`, 'PUT', { isActive: newIsActive });

            setStatusChangeRequest({ loading: false, error: null });
            setStudentToConfirmStatus(null);
            showNotification(`Student status changed to ${newIsActive ? 'ACTIVE' : 'INACTIVE'}.`, 'success');

            // Refresh the student list to show the change
            const refreshedStudents = await fetchStudents();
            setStudents(refreshedStudents);
        } catch (err) {
            setStatusChangeRequest({ loading: false, error: err.message });
            showNotification(`Error changing status: ${err.message}`, 'error');
        }
    };
    
    // 3. Cancel the status change
    const handleStatusToggleCancel = () => {
        setStudentToConfirmStatus(null);
    };

    // Statistics
    const totalStudents = students.length;
    const activeStudents = students.filter(student => student.status !== 'inactive').length;
    const inactiveStudents = totalStudents - activeStudents;

    // Render Add Student Form (password REMOVED)
    if (section === 'add-student' || showAddForm) {
        return (
            <div className="space-y-6 bg-gray-100 min-h-screen p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
                    <p className="text-gray-600">Register a new student in the system</p>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="Enter student name" 
                                    required 
                                />
                            </div>
                            {/* Class (Promoted to fill rollNumber's spot) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                                <input 
                                    type="number" 
                                    name="class" 
                                    value={form.class} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="e.g., 10" 
                                    required 
                                />
                            </div>
                            {/* NOTE: rollNumber field REMOVED from add form */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Section (New Field) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Section (Optional)</label>
                                <input 
                                    type="text" 
                                    name="section" 
                                    value={form.section} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="e.g., A or Science" 
                                />
                            </div>
                            {/* Guardian Phone (New Field) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone</label>
                                <input 
                                    type="tel" 
                                    name="gardianPhno" 
                                    value={form.gardianPhno} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="Guardian phone number" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth (Optional)</label>
                                <input 
                                    type="date" 
                                    name="dateOfBirth" 
                                    value={form.dateOfBirth} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                />
                            </div>
                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                    required
                                >
                                    <option value="" className="text-gray-500">Select Gender</option>
                                    <option value="Male" className="text-gray-900">Male</option>
                                    <option value="Female" className="text-gray-900">Female</option>
                                    <option value="Other" className="text-gray-900">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Assign to School Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Building className="w-4 h-4 inline mr-2 text-teal-600" />
                                    Assign to School
                                </label>
                                <select
                                    name="schoolId"
                                    value={form.schoolId}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                    required
                                >
                                    <option value="" className="text-gray-500">Select a school</option>
                                    {schools.map((school) => (
                                        <option
                                            key={school.id}
                                            value={school.id}
                                            className="text-gray-900"
                                        >
                                            {school.displayName}
                                        </option>
                                    ))}
                                </select>
                                {schools.length === 0 && (
                                    <p className="text-sm text-gray-500 mt-1">Loading schools or no schools found.</p>
                                )}
                            </div>
                            {/* Password field REMOVED */}
                        </div>


                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                                disabled={formStatus.loading}
                            >
                                {formStatus.loading ? (
                                    <div className="flex items-center space-x-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Adding...</span>
                                    </div>
                                ) : (
                                    'Add Student'
                                )}
                            </button>
                        </div>
                        {formStatus.success && <p className="text-green-600 text-sm mt-2">Student added successfully!</p>}
                        {formStatus.error && <p className="text-red-600 text-sm mt-2 font-medium">Error: {formStatus.error}</p>}
                    </form>
                </div>
                <NotificationToast notification={notification} setNotification={setNotification} />
            </div>
        );
    }

    if (loading) {
        return <div className="p-6 text-center text-teal-600 bg-gray-100 min-h-screen">Loading students...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600 bg-gray-100 min-h-screen">Error: {error}</div>;
    }

    // Main Student List View
    return (
        <div className="space-y-6 bg-gray-100 min-h-screen p-6">
            {/* Header and Stats */}
            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Student Management</h1>
                        <p className="text-indigo-100 text-lg">Manage all students, their profiles, and class assignments</p>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold">{totalStudents}</div>
                            <div className="text-indigo-200 text-sm">Total Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-300">{activeStudents}</div>
                            <div className="text-indigo-200 text-sm">Active Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-300">{inactiveStudents}</div>
                            <div className="text-indigo-200 text-sm">Inactive Students</div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center space-x-2 shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Student</span>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, roll number, class, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white transition-colors"
                        >
                            <span className="text-gray-700">{filterStatus}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                                <div className="py-1">
                                    {['All Students', 'Active Students', 'Inactive Students'].map((option) => (
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

            {/* Students Table (UPDATED COLUMNS) */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Roll Number</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Class/Section</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Guardian Phone</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">School</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id || student._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-semibold text-gray-900">{student.name}</div>
                                                <div className="text-sm text-gray-500">{student.gender || '-'}</div>
                                            </div>
                                        </td>
                                        {/* Roll Number */}
                                        <td className="px-6 py-4 text-gray-700">{student.rollNumber || '-'}</td>
                                        {/* Class/Section */}
                                        <td className="px-6 py-4 text-gray-700">
                                            {/* Combine class and section, showing '-' if class is missing */}
                                            {(student.class || '-') + (student.section ? ` / ${student.section}` : '')}
                                        </td>
                                        {/* Guardian Phone */}
                                        <td className="px-6 py-4 text-gray-700">{student.gardianPhno || '-'}</td>
                                        
                                        {/* School Name (NOW SHOULD APPEAR DUE TO INITIAL SCHOOL FETCH) */}
                                        <td className="px-6 py-4 text-gray-700">
                                            {getSchoolName(student.schoolId || student.school?._id?.toString() || student.school?.id)}
                                        </td>

                                        {/* Status Badge Column */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                                student.status === 'inactive'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {student.status === 'inactive' ? 'Inactive' : 'Active'}
                                            </span>
                                        </td>
                                        
                                        {/* Actions Column (View, Edit, Status Toggle) */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleView(student)}
                                                    className="p-2 text-teal-600 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 hover:border-teal-500"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(student)}
                                                    className="p-2 text-blue-600 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 hover:border-blue-500"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                {/* Active/Inactive Toggle Button */}
                                                <button
                                                    onClick={() => handleStatusToggleRequest(student)}
                                                    className={`p-2 rounded-full transition-colors border border-gray-200 hover:scale-105 ${
                                                        student.status === 'inactive'
                                                            ? 'text-green-600 hover:border-green-500 hover:bg-gray-100'
                                                            : 'text-red-600 hover:border-red-500 hover:bg-gray-100'
                                                        }`}
                                                    title={`Click to ${student.status === 'inactive' ? 'activate' : 'deactivate'} student`}
                                                >
                                                    <Power className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                        {searchTerm ? 'No students found matching your search.' : 'No students found.'}
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
                viewingStudent={viewingStudent}
                setShowViewModal={setShowViewModal}
                handleEdit={handleEdit}
                schools={schools} // Pass schools for name lookup
            />
            <EditModal 
                showEditModal={showEditModal}
                editingStudent={editingStudent}
                schools={schools}
                handleEditFormChange={handleEditFormChange}
                handleEditSubmit={handleEditSubmit}
                setShowEditModal={setShowEditModal}
                editFormStatus={editFormStatus}
            />
            <StatusConfirmationModal
                student={studentToConfirmStatus}
                onConfirm={handleStatusToggleConfirm}
                onCancel={handleStatusToggleCancel}
                status={statusChangeRequest}
            />
            <NotificationToast notification={notification} setNotification={setNotification} />
        </div>
    );
};

export default StudentSection;
import React, { useState, useEffect } from 'react';
import { User, MapPin, Users, Phone, Mail, Search, Plus, Eye, EyeOff, Edit, ChevronDown, X, Calendar, Building, GraduationCap, CheckCircle, AlertTriangle, Loader2, Power } from 'lucide-react';


const NotificationToast = ({ notification, setNotification }) => {
    // Ensure hooks are never called conditionally
    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => {
            setNotification(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [notification, setNotification]);

    if (!notification) return null;

    const isSuccess = notification.type === 'success';
    // Colors adjusted for bright mode: green/red on white/light gray
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
                {/* Icon - Adjusted colors for bright mode */}
                <div className={`flex-shrink-0 pt-0.5 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div className="ml-3 flex-1 pt-0.5">
                    <p className="text-sm font-semibold leading-5">
                        {isSuccess ? 'Success' : 'Error'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500"> {/* Sub-text is medium gray */}
                        {notification.message}
                    </p>
                </div>
                
                {/* Close Button */}
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


const BlurredModalContainer = React.memo(({ show, onClose, children, title }) => {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            // Subtler semi-transparent dark overlay for backdrop in bright mode
            style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.4)' }} 
        >
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100">
                {/* Header with Blue/Teal Gradient (Lightened for professionalism) */}
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


const EditModal = ({ showEditModal, editingTeacher, schools, handleEditFormChange, handleEditSubmit, setShowEditModal, editFormStatus }) => {
    const [showPassword, setShowPassword] = useState(false);

    if (!showEditModal || !editingTeacher) return null;

    const { name, email, phno, subject, experience, qualification, schoolId, password, status } = editingTeacher;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                        backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-70">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"> {/* Bright card background */}
                {/* Modal Header - Professional Bright Theme */}
                <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Edit Teacher: {name}</h2>
                            <p className="text-teal-100">Update the teacher's profile information</p>
                        </div>
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="text-white hover:bg-teal-600 p-2 rounded-lg transition-colors"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
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
                                    <Building className="w-4 h-4 inline mr-2 text-teal-600" />
                                    Assign to School
                                </label>
                                <select
                                    name="schoolId"
                                    value={schoolId || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                                    autoComplete="organization"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10 bg-white text-gray-900"
                                    placeholder="Leave blank to keep current password"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-600 transition-colors"
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
            </div>
        </div>
    );
};


const ViewModal = ({ showViewModal, viewingTeacher, setShowViewModal, handleEdit }) => {
    if (!showViewModal || !viewingTeacher) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                        backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-70">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header - Professional Bright Theme */}
                <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{viewingTeacher.name}</h2>
                            <p className="text-teal-100">Teacher Details</p>
                        </div>
                        <button
                            onClick={() => setShowViewModal(false)}
                            className="text-white hover:bg-teal-600 p-2 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    {/* Teacher Icon and Basic Info */}
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 text-teal-600" />
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
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-green-100 text-green-700'
                                    }`}>
                                    {viewingTeacher.status === 'inactive' ? 'Inactive' : 'Active'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-teal-600" />
                            Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium text-gray-900">{viewingTeacher.phno || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium text-gray-900">{viewingTeacher.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <GraduationCap className="w-5 h-5 mr-2 text-teal-600" />
                            Professional Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Subject</p>
                                <p className="font-medium text-gray-900">{viewingTeacher.subject || 'Not specified'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Experience</p>
                                <p className="font-medium text-gray-900">{viewingTeacher.experience || 'Not specified'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-600">Qualification</p>
                                <p className="font-medium text-gray-900">{viewingTeacher.qualification || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Building className="w-5 h-5 mr-2 text-teal-600" />
                            Additional Information
                        </h4>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium text-gray-800">Teacher ID:</span> {viewingTeacher.id}</p>
                            <p><span className="font-medium text-gray-800">Registration Date:</span> {viewingTeacher.createdAt ? new Date(viewingTeacher.createdAt).toLocaleDateString() : 'Not available'}</p>
                            <p><span className="font-medium text-gray-800">Last Updated:</span> {viewingTeacher.updatedAt ? new Date(viewingTeacher.updatedAt).toLocaleDateString() : 'Not available'}</p>
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
                            handleEdit(viewingTeacher);
                        }}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center space-x-2"
                    >
                        <Edit className="w-4 h-4" />
                        <span>Edit Teacher</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal for Status Change Confirmation
const StatusConfirmationModal = React.memo(({ teacher, onConfirm, onCancel, status }) => {
    if (!teacher) return null;

    const isCurrentlyInactive = teacher.status === 'inactive';
    const currentStatus = isCurrentlyInactive ? 'Inactive' : 'Active';
    const newStatusAction = isCurrentlyInactive ? 'Activate' : 'Deactivate';
    const newStatusText = isCurrentlyInactive ? 'Active' : 'Inactive';
    
    // Colors adjusted for bright mode
    const newStatusStyle = isCurrentlyInactive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
    const newStatusTextColor = isCurrentlyInactive ? 'text-green-600' : 'text-red-600';
    const currentStatusTextColor = isCurrentlyInactive ? 'text-red-600' : 'text-green-600';

    return (
        // Reusing the BlurredModalContainer for background blur
        <BlurredModalContainer 
            show={!!teacher} 
            onClose={onCancel} 
            title={`${newStatusAction} Teacher`}
        >
            <div className="p-6 text-center bg-white rounded-b-lg"> {/* Bright background */}
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Confirm Status Change for {teacher.name}
                </h3>
                <p className="text-gray-700 mb-6">
                    Are you sure you want to change the status of <strong>{teacher.name}</strong> from 
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
                        onClick={() => onConfirm(teacher)}
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


const Teachers = ({ section }) => {
    const [teachers, setTeachers] = useState([]);
    const [schools, setSchools] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Teachers');
    const [showDropdown, setShowDropdown] = useState(false);

    // NEW STATE FOR SCHOOL FILTER
    const [filterSchoolId, setFilterSchoolId] = useState('All Schools');
    const [showSchoolDropdown, setShowSchoolDropdown] = useState(false); 

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

    // State for status change
    const [teacherToConfirmStatus, setTeacherToConfirmStatus] = useState(null);
    const [statusChangeRequest, setStatusChangeRequest] = useState({ loading: false, error: null });

    // Helper to display transient notifications
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    // Helper function to get school name from ID
    const getSchoolName = (schoolId) => {
        if (!schoolId) return 'N/A';
        // The teacher object might contain the full school object or just the ID.
        // We handle objects (which might come from the list API) or simple ID strings.
        const idToSearch = typeof schoolId === 'object' && schoolId !== null 
            ? schoolId._id?.toString() || schoolId.id 
            : schoolId;

        const school = schools.find(s => s.id === idToSearch);
        return school ? school.displayName : 'Unknown School';
    };


    // RE-USABLE FUNCTION TO FETCH TEACHERS
    const fetchTeachers = async () => {
        const token = localStorage.getItem('authToken');
        const schoolId = localStorage.getItem('schoolId'); // <-- NEW: Get schoolId

        if (!token) {
            // Throw error for unauthorized access
            throw new Error('Unauthorized User is trying to access...!!!');
        }

        // <-- NEW: Check for schoolId and set new URL
        if (!schoolId) {
             throw new Error('School ID is missing in localStorage. Cannot fetch teachers.');
        }

        // 🎯 CHANGED API URL to school-specific endpoint
        const apiUrl = `http://localhost:3000/school/teachersAtSchool/${schoolId}`;
        
        const response = await fetch(apiUrl, {
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
        
        // --- START: Status/isActive Logic (Functionality preserved) ---
        const teachersWithId = (data.teachers || []).map(t => ({
            ...t,
            id: t.id || t._id?.toString(),
            // Derive string status ('active'/'inactive') from boolean isActive for UI consumption
            status: t.isActive === false ? 'inactive' : 'active',
            // Keep isActive boolean for backend payload consistency
            isActive: t.isActive !== undefined ? t.isActive : true, // Default to true if missing
            // Standardize schoolId to be a string ID for consistency
            schoolId: t.schoolId?._id?.toString() || t.schoolId?.id || t.schoolId?.toString() // Handles ID or embedded object
        }));
        // --- END: Status/isActive Logic ---

        return teachersWithId;
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

    // Fetch schools when add/edit form is shown OR to populate the filter dropdown
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    // This is non-critical for the page load but needed for forms/filters
                    console.warn('No token found, cannot fetch schools.');
                    setSchools([]);
                    return;
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
        };

        // Fetch schools regardless of form state, as they are now needed for the filter
        fetchSchools();
    }, []); // Empty dependency array means this runs once on mount


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
            // Default new teacher to active (isActive: true)
            isActive: true 
        };

        try {
            const token = localStorage.getItem('authToken')
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


    // Handle Edit Submission (Functionality preserved)
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingTeacher || !editingTeacher.id) return;

        setEditFormStatus({ loading: true, error: null });

        // Convert the UI string status back to the boolean isActive
        const newIsActive = editingTeacher.status === 'active';

        const payload = {
            ...editingTeacher,
            phno: Number(editingTeacher.phno),
            experience: Number(editingTeacher.experience),
            // The schema field is isActive
            isActive: newIsActive
        };

        // Clean up UI-only/derived fields before sending
        delete payload.status; 
        
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

        // Clean up other data before sending
        delete payload.school;
        delete payload.createdAt;
        delete payload.updatedAt;
        if (!payload.password) {
            delete payload.password; // Don't send empty password string
        }   

        try {
            const token = localStorage.getItem('authToken');
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


    // Filter teachers based on search term, status, and SCHOOL ID
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

    // NEW SCHOOL FILTER LOGIC
    if (filterSchoolId !== 'All Schools') {
        filteredTeachers = filteredTeachers.filter(teacher => {
            // Match the standardized schoolId string
            return teacher.schoolId === filterSchoolId;
        });
    }


    // Action handlers (functionality preserved)
    const handleView = (teacher) => {
        const viewableTeacher = {
            ...teacher,
            id: teacher.id || teacher._id?.toString(),
            schoolId: teacher.schoolId?.toString() // Ensure schoolId is a string ID
        };
        setViewingTeacher(viewableTeacher);
        setShowViewModal(true);
    };

    const handleEdit = (teacher) => {
        const teacherForEdit = {
            ...teacher,
            id: teacher.id || teacher._id?.toString(),
            // Ensure schoolId is a string ID for the select box value
            schoolId: teacher.schoolId?.toString() || '', 
            phno: teacher.phno?.toString() || '',
            experience: teacher.experience?.toString() || '',
            password: '',
            // The string status is already derived in fetchTeachers, so we use it here for the select box
            status: teacher.status || 'active'
        };

        setEditingTeacher(teacherForEdit);
        setShowEditModal(true);
        setShowAddForm(false);
        setShowViewModal(false);
        setEditFormStatus({ loading: false, error: null }); // Reset form status on open
    };


    // --- STATUS TOGGLE LOGIC (Functionality preserved) ---

    // 1. Request to show the confirmation modal
    const handleStatusToggleRequest = (teacher) => {
        // Only show modal if the teacher has an ID
        if (teacher.id) {
            setTeacherToConfirmStatus(teacher);
            setStatusChangeRequest({ loading: false, error: null });
        } else {
            showNotification("Teacher ID is missing for status change.", 'error');
        }
    };

    // 2. Confirmed status change - sends PUT request to specified API
    const handleStatusToggleConfirm = async (teacher) => {
        // Determine the current boolean status from the derived string status
        const currentIsActive = teacher.status === 'active'; 
        // Determine the new boolean status
        const newIsActive = !currentIsActive; 
        
        setStatusChangeRequest({ loading: true, error: null });

        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('Unauthorized');

            const teacherId = teacher.id || teacher._id?.toString();
            
            // Hitting the user-specified API endpoint with PUT method
            const response = await fetch(`http://localhost:3000/admin/deleteTeacher/${teacherId}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // IMPORTANT: Send the boolean isActive field in the body
                body: JSON.stringify({ isActive: newIsActive }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to set status to ${newIsActive ? 'Active' : 'Inactive'}.`);
            }

            setStatusChangeRequest({ loading: false, error: null });
            setTeacherToConfirmStatus(null);
            showNotification(`Teacher status changed to ${newIsActive ? 'ACTIVE' : 'INACTIVE'}.`, 'success');

            // Refresh the teacher list to show the change
            const refreshedTeachers = await fetchTeachers();
            setTeachers(refreshedTeachers);
        } catch (err) {
            setStatusChangeRequest({ loading: false, error: err.message });
            showNotification(`Error changing status: ${err.message}`, 'error');
        }
    };
    
    // 3. Cancel the status change
    const handleStatusToggleCancel = () => {
        setTeacherToConfirmStatus(null);
    };

    // Statistics (functionality preserved)
    const totalTeachers = teachers.length;
    const activeTeachers = teachers.filter(teacher => teacher.status !== 'inactive').length;
    const inactiveTeachers = totalTeachers - activeTeachers;


    // FIX FOR ISSUE 3: Modals and Notifications are rendered unconditionally at the end of every return path.
    const modalsAndNotifications = (
        <>
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
            <StatusConfirmationModal
                teacher={teacherToConfirmStatus}
                onConfirm={handleStatusToggleConfirm}
                onCancel={handleStatusToggleCancel}
                status={statusChangeRequest}
            />
            <NotificationToast notification={notification} setNotification={setNotification} />
        </>
    );

    // Render Add Teacher Form
    if (section === 'add-teacher' || showAddForm) {
        return (
            <div className="space-y-6 bg-gray-100 min-h-screen p-6"> {/* Bright background for the whole section */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Teacher</h1>
                    <p className="text-gray-600">Register a new teacher in the system</p>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200"> {/* Bright card background */}
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="Enter teacher name" 
                                    autoComplete="name" 
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="Teacher email" 
                                    autoComplete="email" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input 
                                    type="tel" 
                                    name="phno" 
                                    value={form.phno} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="Phone number" 
                                    autoComplete="tel" 
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="Teaching subject" 
                                    autoComplete="off" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                                <input 
                                    type="number" 
                                    name="experience" 
                                    value={form.experience} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="Years of experience" 
                                    autoComplete="off" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                                <input 
                                    type="text" 
                                    name="qualification" 
                                    value={form.qualification} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900" 
                                    placeholder="Educational qualification" 
                                    autoComplete="off" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    autoComplete="organization"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleFormChange}
                                        autoComplete="new-password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10 bg-white text-gray-900"
                                        placeholder="Password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-600 transition-colors"
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
                                    'Add Teacher'
                                )}
                            </button>
                        </div>
                        {formStatus.success && <p className="text-green-600 text-sm mt-2">Teacher added successfully!</p>}
                        {formStatus.error && <p className="text-red-600 text-sm mt-2 font-medium">Error: {formStatus.error}</p>}
                    </form>
                </div>
                {modalsAndNotifications} {/* Render modals here (Fix for Issue 3) */}
            </div>
        );
    }

    if (loading) {
        return (
            <>
                <div className="p-6 text-center text-teal-600 bg-gray-100 min-h-screen">Loading teachers and schools...</div>
                {modalsAndNotifications} {/* Render modals here (Fix for Issue 3) */}
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="p-6 text-center text-red-600 bg-gray-100 min-h-screen">Error: {error}</div>
                {modalsAndNotifications} {/* Render modals here (Fix for Issue 3) */}
            </>
        );
    }

    // Main Teacher List View
    return (
        <div className="space-y-6 bg-gray-100 min-h-screen p-6">
            {/* Header and Stats - Professional Indigo/White Theme */}
            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Teacher Management</h1>
                        <p className="text-indigo-100 text-lg">Manage all teachers, their profiles, and assignments</p>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold">{totalTeachers}</div>
                            <div className="text-indigo-200 text-sm">Total Teachers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-300">{activeTeachers}</div>
                            <div className="text-indigo-200 text-sm">Active Teachers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-300">{inactiveTeachers}</div>
                            <div className="text-indigo-200 text-sm">Inactive Teachers</div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center space-x-2 shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Teacher</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Search and Filter Section - Bright Theme (MODIFIED) */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search teachers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800"
                        />
                    </div>
                    
                    {/* START: Filter Dropdowns Container (New layout for two filters) */}
                    <div className="flex space-x-4"> 
                        {/* 1. Status Filter (Existing) */}
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

                        {/* 2. School Filter (NEW DROPDOWN) */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white transition-colors"
                            >
                                <span className="text-gray-700 font-medium">
                                    {filterSchoolId === 'All Schools' 
                                        ? 'All Schools' 
                                        : schools.find(s => s.id === filterSchoolId)?.displayName || 'Select School'
                                    }
                                </span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>
                            {showSchoolDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                                    <div className="py-1 max-h-60 overflow-y-auto">
                                        {/* Option to view all schools */}
                                        <button
                                            onClick={() => {
                                                setFilterSchoolId('All Schools');
                                                setShowSchoolDropdown(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                                        >
                                            All Schools
                                        </button>
                                        {/* List of schools from state */}
                                        {schools.map((school) => (
                                            <button
                                                key={school.id}
                                                onClick={() => {
                                                    setFilterSchoolId(school.id);
                                                    setShowSchoolDropdown(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
                                                title={school.displayName}
                                            >
                                                {school.displayName}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* END: Filter Dropdowns Container */}
                </div>
            </div>

            {/* Teachers Table - Bright Theme (MODIFIED: ADDED SCHOOL COLUMN) */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Phone</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Email</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Subject</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">School</th> {/* NEW HEADER */}
                                {/* Status column uses the derived 'status' string */}
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredTeachers.length > 0 ? (
                                filteredTeachers.map((teacher) => (
                                    <tr 
                                        key={teacher.id} // Corrected to use standardized 'id' for stability.
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-semibold text-gray-900">{teacher.name}</div>
                                                <div className="text-sm text-gray-500">{teacher.qualification || 'No qualification listed'}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{teacher.phno || 'N/A'}</td>
                                        <td className="px-6 py-4 text-gray-700">{teacher.email}</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {teacher.subject || 'Not specified'}
                                        </td>
                                        {/* NEW SCHOOL COLUMN CELL */}
                                        <td className="px-6 py-4 text-gray-700">
                                            <div className="font-medium text-gray-900 truncate max-w-[150px]" title={getSchoolName(teacher.schoolId)}>
                                                {getSchoolName(teacher.schoolId)}
                                            </div>
                                        </td>
                                        {/* Status Badge Column */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                                teacher.status === 'inactive'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {teacher.status === 'inactive' ? 'Inactive' : 'Active'}
                                            </span>
                                        </td>
                                        {/* Actions Column (View, Edit, Status Toggle) */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleView(teacher)}
                                                    className="p-2 text-teal-600 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 hover:border-teal-500"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(teacher)}
                                                    className="p-2 text-blue-600 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 hover:border-blue-500"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                {/* Active/Inactive Toggle Button - Now in Actions column */}
                                                <button
                                                    onClick={() => handleStatusToggleRequest(teacher)}
                                                    className={`p-2 rounded-full transition-colors border border-gray-200 hover:scale-105 ${
                                                        teacher.status === 'inactive'
                                                            ? 'text-green-600 hover:border-green-500 hover:bg-gray-100'
                                                            : 'text-red-600 hover:border-red-500 hover:bg-gray-100'
                                                        }`}
                                                    title={`Click to ${teacher.status === 'inactive' ? 'activate' : 'deactivate'} teacher`}
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
                                        {searchTerm ? 'No teachers found matching your search.' : 'No teachers found.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals and Notifications (Fix for Issue 3) */}
            {modalsAndNotifications}
        </div>
    );
};

export default Teachers;
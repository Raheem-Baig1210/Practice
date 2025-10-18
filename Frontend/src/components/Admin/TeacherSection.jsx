import React, { useState, useEffect } from 'react';
import { User, MapPin, Users, Phone, Mail, Search, Plus, Eye, EyeOff, Edit, Trash2, ChevronDown, X, Calendar, Building, GraduationCap, CheckCircle, AlertTriangle, Loader2, Power } from 'lucide-react';


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
    // Changed colors to dark mode friendly: green/red on dark
    const borderColor = isSuccess ? 'border-green-500' : 'border-red-500';
    const Icon = isSuccess ? CheckCircle : AlertTriangle;

    return (
        <div 
            className={`fixed top-5 right-5 z-[100] max-w-sm w-full 
                        shadow-xl rounded-lg border-l-4 p-4 
                        transition-all duration-500 ease-out 
                        ${borderColor} ${notification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} 
                        bg-gray-800 text-gray-100`} // Dark background, light text
        >
            <div className="flex items-start">
                {/* Icon - Adjusted colors for dark mode */}
                <div className={`flex-shrink-0 pt-0.5 ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div className="ml-3 flex-1 pt-0.5">
                    <p className="text-sm font-semibold leading-5">
                        {isSuccess ? 'Success' : 'Error'}
                    </p>
                    <p className="mt-1 text-sm text-gray-400"> {/* Sub-text is lighter gray */}
                        {notification.message}
                    </p>
                </div>
                
                {/* Close Button */}
                <div className="ml-4 flex-shrink-0 flex">
                    <button
                        onClick={() => setNotification(null)}
                        className="inline-flex text-gray-400 hover:text-gray-300 p-1 rounded-md transition-colors"
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
            // Darker semi-transparent background and blur
            style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
            <div className="bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100">
                {/* Header with Teal/Blue Gradient */}
                <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-teal-700 p-2 rounded-lg transition-colors"
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
                        backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-70"> {/* Dark backdrop */}
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"> {/* Dark card background */}
                {/* Modal Header - Corporate Dark Theme */}
                <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Edit Teacher: {name}</h2>
                            <p className="text-teal-200">Update the teacher's profile information</p>
                        </div>
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="text-white hover:bg-teal-700 p-2 rounded-lg transition-colors"
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
                                <label className="block text-sm font-medium text-gray-300 mb-2">Teacher Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    placeholder="Enter teacher name"
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    placeholder="Teacher email"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phno"
                                    value={phno || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    placeholder="Phone number"
                                    autoComplete="tel"
                                    required
                                />
                            </div>
                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={subject || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    placeholder="Teaching subject"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Experience (Years)</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={experience || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    placeholder="Years of experience"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            {/* Qualification */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Qualification</label>
                                <input
                                    type="text"
                                    name="qualification"
                                    value={qualification || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    placeholder="Educational qualification"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Assign to School Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <Building className="w-4 h-4 inline mr-2 text-teal-400" />
                                    Assign to School
                                </label>
                                <select
                                    name="schoolId"
                                    value={schoolId || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    autoComplete="organization"
                                    required
                                >
                                    <option value="" className="bg-gray-700 text-gray-400">Select a school</option>
                                    {schools.map((school) => (
                                        <option
                                            key={school.id}
                                            value={school.id}
                                            className="bg-gray-700 text-white"
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
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={status || 'active'}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    required
                                >
                                    <option value="active" className="bg-gray-700 text-white">Active</option>
                                    <option value="inactive" className="bg-gray-700 text-white">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Password Field (Optional on update) */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-300 mb-2">New Password (Optional)</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password || ''}
                                    onChange={handleEditFormChange}
                                    autoComplete="new-password"
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10 bg-gray-700 text-white"
                                    placeholder="Leave blank to keep current password"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-400 transition-colors"
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
                                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
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
                        {editFormStatus.error && <p className="text-red-400 text-sm mt-2 font-medium">Error: {editFormStatus.error}</p>}
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
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header - Corporate Dark Theme */}
                <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{viewingTeacher.name}</h2>
                            <p className="text-teal-200">Teacher Details</p>
                        </div>
                        <button
                            onClick={() => setShowViewModal(false)}
                            className="text-white hover:bg-teal-700 p-2 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    {/* Teacher Icon and Basic Info */}
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-teal-800 rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 text-teal-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-100">{viewingTeacher.name}</h3>
                            <div className="flex items-center space-x-2 text-gray-400 mt-1">
                                <GraduationCap className="w-4 h-4" />
                                <span>Subject: {viewingTeacher.subject || 'Not specified'}</span>
                            </div>
                            <div className="mt-2">
                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                    viewingTeacher.status === 'inactive'
                                        ? 'bg-red-900 text-red-300'
                                        : 'bg-green-900 text-green-300'
                                    }`}>
                                    {viewingTeacher.status === 'inactive' ? 'Inactive' : 'Active'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-100 mb-3 flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-teal-400" />
                            Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Phone</p>
                                    <p className="font-medium text-white">{viewingTeacher.phno || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="font-medium text-white">{viewingTeacher.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-100 mb-3 flex items-center">
                            <GraduationCap className="w-5 h-5 mr-2 text-teal-400" />
                            Professional Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">Subject</p>
                                <p className="font-medium text-white">{viewingTeacher.subject || 'Not specified'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Experience</p>
                                <p className="font-medium text-white">{viewingTeacher.experience || 'Not specified'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-400">Qualification</p>
                                <p className="font-medium text-white">{viewingTeacher.qualification || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-100 mb-3 flex items-center">
                            <Building className="w-5 h-5 mr-2 text-teal-400" />
                            Additional Information
                        </h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p><span className="font-medium text-white">Teacher ID:</span> {viewingTeacher.id}</p>
                            <p><span className="font-medium text-white">Registration Date:</span> {viewingTeacher.createdAt ? new Date(viewingTeacher.createdAt).toLocaleDateString() : 'Not available'}</p>
                            <p><span className="font-medium text-white">Last Updated:</span> {viewingTeacher.updatedAt ? new Date(viewingTeacher.updatedAt).toLocaleDateString() : 'Not available'}</p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-700 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
                    <button
                        onClick={() => setShowViewModal(false)}
                        className="px-4 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-900 transition-colors"
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



const ConfirmDeleteModal = ({ showDeleteModal, deletingTeacher, onCancel, onConfirm, deleteStatus }) => {
    if (!showDeleteModal || !deletingTeacher) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                        backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-70">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-red-400">Confirm Deletion</h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Are you sure you want to delete <span className="font-medium text-white">{deletingTeacher.name}</span>?
                        This action cannot be undone.
                    </p>
                </div>
                <div className="px-6 py-4 bg-gray-700 rounded-b-lg flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-900 transition-colors"
                        disabled={deleteStatus.loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        disabled={deleteStatus.loading}
                    >
                        {deleteStatus.loading ? (
                            <div className="flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Deleting...</span>
                            </div>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
                {deleteStatus.error && (
                    <div className="px-6 pb-4 text-sm text-red-400">Error: {deleteStatus.error}</div>
                )}
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
    
    // Use green for activation, red for deactivation (dark mode friendly)
    const newStatusStyle = isCurrentlyInactive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
    const newStatusTextColor = isCurrentlyInactive ? 'text-green-400' : 'text-red-400';
    const currentStatusTextColor = isCurrentlyInactive ? 'text-red-400' : 'text-green-400';

    return (
        // Reusing the BlurredModalContainer for background blur
        <BlurredModalContainer 
            show={!!teacher} 
            onClose={onCancel} 
            title={`${newStatusAction} Teacher`}
        >
            <div className="p-6 text-center bg-gray-800 rounded-b-lg">
                <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    Confirm Status Change for {teacher.name}
                </h3>
                <p className="text-gray-300 mb-6">
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
                        className="px-6 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600 transition-colors"
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
                    <div className="px-6 pt-4 text-sm text-red-400">Error: {status.error}</div>
                )}
            </div>
        </BlurredModalContainer>
    );
});


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

    // Delete modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingTeacher, setDeletingTeacher] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState({ loading: false, error: null });

    // State for status change
    const [teacherToConfirmStatus, setTeacherToConfirmStatus] = useState(null);
    const [statusChangeRequest, setStatusChangeRequest] = useState({ loading: false, error: null });

    // RE-USABLE FUNCTION TO FETCH TEACHERS
    const fetchTeachers = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Throw error for unauthorized access
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
        // Ensure IDs are strings and fallback if necessary
        const teachersWithId = (data.data || []).map(t => ({
            ...t,
            id: t.id || t._id?.toString(),
            // Ensure status is present for robust UI display
            status: t.status || 'active' 
        }));
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

        // Standardize schoolId before sending
        let finalSchoolId = editingTeacher.schoolId;
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
        const targetTeacher = {
            ...teacher,
            id: teacher.id || teacher._id?.toString(),
        };
        setDeletingTeacher(targetTeacher);
        setDeleteStatus({ loading: false, error: null });
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!deletingTeacher || !deletingTeacher.id) return;
        setDeleteStatus({ loading: true, error: null });
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Unauthorized User is trying to access...!!!');
            }

            const response = await fetch(`http://localhost:3000/admin/deleteTeacher/${deletingTeacher.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                let errorMessage = 'Failed to delete teacher due to an unknown server error.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch {
                    // ignore parse error
                }
                throw new Error(errorMessage);
            }

            // Refresh list and notify
            const refreshedTeachers = await fetchTeachers();
            setTeachers(refreshedTeachers);
            showNotification('Teacher deleted successfully', 'success');

            setShowDeleteModal(false);
            setDeletingTeacher(null);
            setDeleteStatus({ loading: false, error: null });
        } catch (err) {
            setDeleteStatus({ loading: false, error: err.message });
            showNotification(`Error deleting teacher: ${err.message}`, 'error');
        }
    };

    // --- NEW/UPDATED STATUS TOGGLE LOGIC ---

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
        const newStatus = teacher.status === 'inactive' ? 'active' : 'inactive';
        setStatusChangeRequest({ loading: true, error: null });

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Unauthorized');

            const teacherId = teacher.id || teacher._id?.toString();
            
            // Hitting the user-specified API endpoint with PUT method
            const response = await fetch(`http://localhost:3000/admin/deleteTeacher/${teacherId}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Send the new status in the body
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to set status to ${newStatus}.`);
            }

            setStatusChangeRequest({ loading: false, error: null });
            setTeacherToConfirmStatus(null);
            showNotification(`Teacher status changed to ${newStatus.toUpperCase()}.`, 'success');

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

    // Statistics (unchanged)
    const totalTeachers = teachers.length;
    const activeTeachers = teachers.filter(teacher => teacher.status !== 'inactive').length;
    const inactiveTeachers = totalTeachers - activeTeachers;

    // Render Add Teacher Form
    if (section === 'add-teacher' || showAddForm) {
        return (
            <div className="space-y-6 bg-gray-900 min-h-screen p-6"> {/* Dark background for the whole section */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-100">Add New Teacher</h1>
                    <p className="text-gray-400">Register a new teacher in the system</p>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700"> {/* Dark card background */}
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Teacher Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white" 
                                    placeholder="Enter teacher name" 
                                    autoComplete="name" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={form.email} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white" 
                                    placeholder="Teacher email" 
                                    autoComplete="email" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                <input 
                                    type="tel" 
                                    name="phno" 
                                    value={form.phno} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white" 
                                    placeholder="Phone number" 
                                    autoComplete="tel" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                <input 
                                    type="text" 
                                    name="subject" 
                                    value={form.subject} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white" 
                                    placeholder="Teaching subject" 
                                    autoComplete="off" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Experience (Years)</label>
                                <input 
                                    type="number" 
                                    name="experience" 
                                    value={form.experience} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white" 
                                    placeholder="Years of experience" 
                                    autoComplete="off" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Qualification</label>
                                <input 
                                    type="text" 
                                    name="qualification" 
                                    value={form.qualification} 
                                    onChange={handleFormChange} 
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white" 
                                    placeholder="Educational qualification" 
                                    autoComplete="off" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <Building className="w-4 h-4 inline mr-2 text-teal-400" />
                                    Assign to School
                                </label>
                                <select
                                    name="schoolId"
                                    value={form.schoolId}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                                    autoComplete="organization"
                                    required
                                >
                                    <option value="" className="bg-gray-700 text-gray-400">Select a school</option>
                                    {schools.map((school) => (
                                        <option
                                            key={school.id}
                                            value={school.id}
                                            className="bg-gray-700 text-white"
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
                                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleFormChange}
                                        autoComplete="new-password"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10 bg-gray-700 text-white"
                                        placeholder="Password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-400 transition-colors"
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
                                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
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
                        {formStatus.success && <p className="text-green-400 text-sm mt-2">Teacher added successfully!</p>}
                        {formStatus.error && <p className="text-red-400 text-sm mt-2 font-medium">Error: {formStatus.error}</p>}
                    </form>
                </div>
                <NotificationToast notification={notification} setNotification={setNotification} />
            </div>
        );
    }

    if (loading) {
        return <div className="p-6 text-center text-teal-400 bg-gray-900 min-h-screen">Loading teachers...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500 bg-gray-900 min-h-screen">Error: {error}</div>;
    }

    // Main Teacher List View
    return (
        <div className="space-y-6 bg-gray-900 min-h-screen p-6">
            {/* Header and Stats - Corporate Dark Theme */}
            <div className="bg-gradient-to-r from-blue-700 to-teal-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Teacher Management</h1>
                        <p className="text-teal-200 text-lg">Manage all teachers, their profiles, and assignments</p>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold">{totalTeachers}</div>
                            <div className="text-teal-200 text-sm">Total Teachers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-300">{activeTeachers}</div>
                            <div className="text-teal-200 text-sm">Active Teachers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-300">{inactiveTeachers}</div>
                            <div className="text-teal-200 text-sm">Inactive Teachers</div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors flex items-center space-x-2 shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Teacher</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Search and Filter Section - Dark Theme */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search teachers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-700 text-white"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-300 bg-gray-700 transition-colors"
                        >
                            <span className="text-gray-300">{filterStatus}</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-xl border border-gray-600 z-10">
                                <div className="py-1">
                                    {['All Teachers', 'Active Teachers', 'Inactive Teachers'].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setFilterStatus(option);
                                                setShowDropdown(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
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

            {/* Teachers Table - Dark Theme */}
            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-700 border-b border-gray-600">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-200">Name</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-200">Phone</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-200">Email</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-200">Subject</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-200">Actions</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredTeachers.length > 0 ? (
                                filteredTeachers.map((teacher) => (
                                    <tr key={teacher.id || teacher._id} className="hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-semibold text-white">{teacher.name}</div>
                                                <div className="text-sm text-gray-400">{teacher.qualification || 'No qualification listed'}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{teacher.phno || 'Not provided'}</td>
                                        <td className="px-6 py-4 text-gray-300">{teacher.email}</td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {teacher.subject || 'Not specified'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleView(teacher)}
                                                    className="p-2 text-teal-400 hover:bg-gray-700 rounded-md transition-colors border border-gray-700 hover:border-teal-500"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(teacher)}
                                                    className="p-2 text-blue-400 hover:bg-gray-700 rounded-md transition-colors border border-gray-700 hover:border-blue-500"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(teacher)}
                                                    className="p-2 text-red-400 hover:bg-gray-700 rounded-md transition-colors border border-gray-700 hover:border-red-500"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Professional Active/Inactive Button */}
                                            <button
                                                onClick={() => handleStatusToggleRequest(teacher)}
                                                className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md ${
                                                    teacher.status === 'inactive'
                                                        ? 'bg-red-700 text-red-100 hover:bg-red-600'
                                                        : 'bg-green-700 text-green-100 hover:bg-green-600'
                                                    }`}
                                                title={`Click to ${teacher.status === 'inactive' ? 'activate' : 'deactivate'} teacher`}
                                            >
                                                <Power className="w-3 h-3 mr-1" />
                                                {teacher.status === 'inactive' ? 'Inactive' : 'Active'}
                                            </button>
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
            <ConfirmDeleteModal
                showDeleteModal={showDeleteModal}
                deletingTeacher={deletingTeacher}
                onCancel={() => { setShowDeleteModal(false); setDeletingTeacher(null); }}
                onConfirm={confirmDelete}
                deleteStatus={deleteStatus}
            />
            <StatusConfirmationModal
                teacher={teacherToConfirmStatus}
                onConfirm={handleStatusToggleConfirm}
                onCancel={handleStatusToggleCancel}
                status={statusChangeRequest}
            />
            <NotificationToast notification={notification} setNotification={setNotification} />
        </div>
    );
};

export default TeacherSection;

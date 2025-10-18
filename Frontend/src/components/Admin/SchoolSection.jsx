import React, { useState, useEffect, useCallback } from 'react';
import { School, MapPin, Users, Phone, Mail, Search, Plus, Eye, Edit, Power, ChevronDown, X, Calendar, Building, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

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

// Reusable Modal Container (Tailwind-based)
const BlurredModalContainer = React.memo(({ show, onClose, children, title, editMode = false }) => {
    if (!show) return null;
    
    const modalId = editMode ? 'edit-modal' : 'view-modal';

    return (
        <div 
            id={modalId}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-blue-700 p-2 rounded-lg transition-colors"
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

// MODAL COMPONENT FOR CONFIRMATION
const StatusConfirmationModal = React.memo(({ school, onConfirm, onCancel, isLoading }) => {
    if (!school) return null;

    const currentStatus = school.status === 'inactive' ? 'Inactive' : 'Active';
    const newStatusAction = school.status === 'inactive' ? 'Activate' : 'Deactivate';
    const newStatusStyle = school.status === 'inactive' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
    const newStatusText = school.status === 'inactive' ? 'Active' : 'Inactive';
    
    return (
        <BlurredModalContainer 
            show={!!school} 
            onClose={onCancel} 
            title={`${newStatusAction} School`} 
            editMode={false}
        >
            <div className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Confirm Status Change for {school.name}
                </h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to change the status of **{school.name}** from 
                    <span className={`font-bold mx-1 ${currentStatus === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {currentStatus}
                    </span> 
                    to 
                    <span className={`font-bold mx-1 ${newStatusText === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {newStatusText}
                    </span>?
                </p>

                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={onCancel}
                        className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onConfirm(school)}
                        className={`px-6 py-2 text-white rounded-md transition-colors flex items-center justify-center space-x-2 ${newStatusStyle}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>{newStatusAction}ing...</span>
                            </>
                        ) : (
                            <span>{newStatusAction}</span>
                        )}
                    </button>
                </div>
            </div>
        </BlurredModalContainer>
    );
});


const EditModal = React.memo(({ showEditModal, editingSchool, editForm, handleUpdateSchool, handleEditFormChange, setEditFormStatus, setShowEditModal, setEditingSchool, editFormStatus }) => {
    if (!editingSchool) return null;

    const onCloseHandler = () => {
        setShowEditModal(false);
        setEditingSchool(null);
        setEditFormStatus({ loading: false, success: false, error: null });
    };

    return (
        <BlurredModalContainer
            show={showEditModal}
            onClose={onCloseHandler}
            title={`Edit School: ${editingSchool.name}`}
            editMode={true}
        >
            <div className="p-6">
                <form className="space-y-6" onSubmit={handleUpdateSchool}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={editForm.name}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                            <input 
                                type="number" 
                                name="estyear"
                                value={editForm.estyear}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address / Location</label>
                        <textarea 
                            name="location"
                            value={editForm.location}
                            onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <input 
                                type="tel" 
                                name="phno"
                                value={editForm.phno}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={editForm.email}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    
                    {editFormStatus.error && <p className="text-red-500 text-sm mt-2">Error: {editFormStatus.error}</p>}
                    {editFormStatus.success && <p className="text-green-500 text-sm mt-2">School updated successfully! 👍</p>}

                    <div className="flex justify-end space-x-3 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                        <button 
                            type="button" 
                            onClick={onCloseHandler}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2" 
                            disabled={editFormStatus.loading}
                        >
                            {editFormStatus.loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </BlurredModalContainer>
    );
});

const ViewModal = React.memo(({ showViewModal, viewingSchool, setShowViewModal, handleEdit }) => {
    if (!viewingSchool) return null;

    return (
        <BlurredModalContainer 
            show={showViewModal} 
            onClose={() => setShowViewModal(false)}
            title={`${viewingSchool.name} Details`}
        >
            <div className="p-6 space-y-6">
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

                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        Location
                    </h4>
                    <p className="text-gray-700">{viewingSchool.location || 'No location specified'}</p>
                </div>

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

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
                <button
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Close
                </button>
                <button
                    onClick={() => handleEdit(viewingSchool)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                    <Edit className="w-4 h-4" />
                    <span>Edit School</span>
                </button>
            </div>
        </BlurredModalContainer>
    );
});

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
    
    const [editingSchool, setEditingSchool] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({
        id: '',
        name: '',
        estyear: '',
        location: '',
        phno: '',
        email: ''
    });
    const [editFormStatus, setEditFormStatus] = useState({
        loading: false,
        success: false,
        error: null
    });
    
    // NEW STATE FOR CONFIRMATION MODAL
    const [schoolToConfirmStatus, setSchoolToConfirmStatus] = useState(null);

    // State for delete/status toggling
    const [statusChangeLoadingId, setStatusChangeLoadingId] = useState(null);
    const [statusChangeErrorId, setStatusChangeErrorId] = useState(null);


    const fetchSchools = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiCall('http://localhost:3000/admin/listOfSchools', 'GET');

            const mappedData = data.data.map(school => ({
                ...school,
                id: school._id, 
                // Ensure the status is correctly mapped from the database's boolean
                status: school.isActive ? 'active' : 'inactive' 
            }));

            setSchools(mappedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (section !== 'add-school' && !showAddForm && !showEditModal) {
            fetchSchools();
        }
    }, [section, showAddForm, showEditModal, fetchSchools]);

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
    
    const handleEditFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, success: false, error: null });

        const payload = { ...form, password: 'school123' };

        try {
            await apiCall('http://localhost:3000/admin/addNewSchool', 'POST', payload);
            setFormStatus({ loading: false, success: true, error: null });
            setForm({ name: '', estyear: '', location: '', phno: '', email: '' });
            setShowAddForm(false);
            fetchSchools(); // Refresh the schools list
        } catch (err) {
            setFormStatus({ loading: false, success: false, error: err.message });
        }
    };
    
    const handleUpdateSchool = async (e) => {
        e.preventDefault();
        setEditFormStatus({ loading: true, success: false, error: null });

        const { id, name, estyear, location, phno, email } = editForm;
        const payload = { name, estyear, location, phno, email };
        const url = `http://localhost:3000/admin/updateSchool/${id}`;

        try {
            await apiCall(url, 'PUT', payload);
            setEditFormStatus({ loading: false, success: true, error: null });
            
            // Update the local state with the new data while preserving other fields like status
            setSchools(schools.map(s => (s.id === id ? { ...s, ...payload } : s)));
            
            setTimeout(() => {
                setShowEditModal(false);
                setEditingSchool(null);
                setEditFormStatus({ loading: false, success: false, error: null });
            }, 1000); // Close after 1 second of success
        } catch (err) {
            setEditFormStatus({ loading: false, success: false, error: err.message });
        }
    };

    // FUNCTION TO TRIGGER THE CONFIRMATION MODAL
    const handleStatusToggleRequest = (school) => {
        setStatusChangeErrorId(null);
        setSchoolToConfirmStatus(school);
    };

    // ⭐ THE CRITICAL FIX IS HERE: CALLING fetchSchools() AFTER API SUCCESS
    const handleStatusToggleConfirm = async (school) => {
        const isCurrentlyActive = school.status === 'active';
        const newStatus = isCurrentlyActive ? 'inactive' : 'active';
        
        setSchoolToConfirmStatus(null); // Close the modal
        setStatusChangeLoadingId(school.id);
        setStatusChangeErrorId(null);

        // We assume the backend updates the 'isActive' flag based on the payload.
        const url = `http://localhost:3000/admin/deleteSchool/${school.id}`;
        const payload = { isActive: newStatus === 'active' }; 

        try {
            await apiCall(url, 'PUT', payload); 

            // 💥 FIX: Re-fetch the entire list from the server to ensure the UI is in sync.
            await fetchSchools();
            
        } catch (err) {
            setStatusChangeErrorId(school.id);
            console.error(`Failed to change status for ${school.name}: ${err.message}`);
        } finally {
            setStatusChangeLoadingId(null);
        }
    };
    
    const handleStatusToggleCancel = () => {
        setSchoolToConfirmStatus(null);
    };
    // ---------------------------------------------


    let filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus === 'Active Schools') {
        filteredSchools = filteredSchools.filter(school => school.status === 'active');
    } else if (filterStatus === 'Inactive Schools') {
        filteredSchools = filteredSchools.filter(school => school.status === 'inactive');
    }

    const handleView = (school) => {
        setViewingSchool(school);
        setShowViewModal(true);
    };

    const handleEdit = (school) => {
        setEditingSchool(school);
        setEditForm({
            id: school.id || school._id,
            name: school.name,
            estyear: school.estyear,
            location: school.location,
            phno: school.phno,
            email: school.email
        });
        setEditFormStatus({ loading: false, success: false, error: null });
        setShowViewModal(false); // Close view modal if open
        setShowEditModal(true);
    };


    const totalSchools = schools.length;
    const activeSchools = schools.filter(school => school.status === 'active').length;
    const inactiveSchools = totalSchools - activeSchools;

    if (section === 'add-school' || showAddForm) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New School</h1>
                    <p className="text-gray-600">Register a new school in the system</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6"> {/* Changed: shadow-md to shadow-lg, removed border */}
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
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">School Management</h1>
                        <p className="text-blue-100 text-lg">Manage all schools, their profiles, and assignments</p>
                    </div>
                    <div className="flex items-center space-x-8">
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
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"> {/* Changed: Removed border */}
                <div className="relative flex items-center w-full max-w-md">
                    <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            <Building className="w-5 h-5 mr-2" />
                            {filterStatus}
                            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showDropdown ? 'transform rotate-180' : ''}`} />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                                {['All Schools', 'Active Schools', 'Inactive Schools'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setFilterStatus(status);
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add School
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden"> {/* Changed: Removed border */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSchools.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No schools found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredSchools.map((school) => (
                                <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <School className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{school.name}</div>
                                                <div className="text-xs text-gray-500">ID: {school.id.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 flex items-center"><Phone className="w-3 h-3 mr-1 text-gray-400"/> {school.phno}</div>
                                        <div className="text-sm text-gray-500 flex items-center"><Mail className="w-3 h-3 mr-1 text-gray-400"/> {school.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                            {school.location.substring(0, 30)}{school.location.length > 30 ? '...' : ''}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            school.status === 'active' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                            {school.status === 'active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button 
                                                onClick={() => handleView(school)}
                                                className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(school)}
                                                className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                                title="Edit School"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            {/* Changed: delete button to power button, adjusted colors */}
                                            <button 
                                                onClick={() => handleStatusToggleRequest(school)}
                                                className={`p-2 rounded-full transition-colors flex items-center space-x-1 
                                                    ${school.status === 'active' 
                                                        ? 'text-red-500 hover:bg-red-100 hover:text-red-700' 
                                                        : 'text-green-500 hover:bg-green-100 hover:text-green-700'
                                                    }`}
                                                title={school.status === 'active' ? 'Deactivate School' : 'Activate School'}
                                                disabled={statusChangeLoadingId === school.id}
                                            >
                                                {statusChangeLoadingId === school.id ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <Power className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                        {statusChangeErrorId === school.id && (
                                            <p className="text-xs text-red-500 mt-1">Failed to update</p>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            <ViewModal 
                showViewModal={showViewModal} 
                viewingSchool={viewingSchool} 
                setShowViewModal={setShowViewModal} 
                handleEdit={handleEdit}
            />

            {/* Edit Modal */}
            <EditModal
                showEditModal={showEditModal}
                editingSchool={editingSchool}
                editForm={editForm}
                handleUpdateSchool={handleUpdateSchool}
                handleEditFormChange={handleEditFormChange}
                setEditFormStatus={setEditFormStatus}
                setShowEditModal={setShowEditModal}
                setEditingSchool={setEditingSchool}
                editFormStatus={editFormStatus}
            />

            {/* Status Confirmation Modal */}
            <StatusConfirmationModal 
                school={schoolToConfirmStatus}
                onConfirm={handleStatusToggleConfirm}
                onCancel={handleStatusToggleCancel}
                isLoading={statusChangeLoadingId === schoolToConfirmStatus?.id}
            />
        </div>
    );
};

export default SchoolSection;
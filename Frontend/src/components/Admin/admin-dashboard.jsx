import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate =useNavigate();

  const handlelogout = ()=>{
    localStorage.removeItem("token");
    navigate("/signin")
  }
  // State to hold the list of schools
  const [schools, setSchools] = useState([]);
  // State to hold the selected school's details
  const [selectedSchool, setSelectedSchool] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  // useEffect to fetch the list of all schools from the backend
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        // TODO: Replace with your actual backend API endpoint to fetch all schools
        // const response = await fetch('YOUR_BACKEND_API_URL/schools');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch schools');
        // }
        // const data = await response.json();
        
        // Mock data for demonstration
        const data = [
          { _id: '1', name: 'Greenwood High School', location: 'Seattle', contact: 'Mr. Smith', students: 500, teachers: 45, courses: ['Math', 'Science'] },
          { _id: '2', name: 'Oakwood Academy', location: 'Portland', contact: 'Ms. Jones', students: 320, teachers: 30, courses: ['History', 'Art'] },
          { _id: '3', name: 'Maple Street Elementary', location: 'Denver', contact: 'Ms. Davis', students: 250, teachers: 20, courses: ['Reading', 'Writing'] },
        ];

        setSchools(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  // Function to fetch details for a single school
  const fetchSchoolDetails = async (schoolId) => {
    try {
      setLoading(true);
      // TODO: Replace with your actual backend API endpoint to fetch a single school by ID
      // const response = await fetch(`YOUR_BACKEND_API_URL/schools/${schoolId}`);
      // if (!response.ok) {
      //   throw new Error('Failed to fetch school details');
      // }
      // const data = await response.json();

      // Mock data for demonstration
      const data = schools.find(school => school._id === schoolId);
      setSelectedSchool(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedSchool(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-12">
        {!selectedSchool ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">List of All Schools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map(school => (
                <div 
                  key={school._id} 
                  className="bg-gray-50 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => fetchSchoolDetails(school._id)}
                >
                  <h3 className="text-xl font-semibold text-indigo-600 truncate">{school.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Location: {school.location}</p>
                </div>
              ))}
            </div>
            <button onClick={handlelogout}>Logout</button>
          </>
        ) : (
          <>
            <button 
              onClick={handleBackToList}
              className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-6 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to School List
            </button>

            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedSchool.name}</h1>
              <p className="text-lg text-gray-600 mb-6">Location: {selectedSchool.location}</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-700">Contact Information</h4>
                  <p className="text-sm text-gray-500 mt-1">Main Contact: {selectedSchool.contact}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-700">Key Statistics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <p className="text-sm text-gray-500">Students: <span className="font-medium text-gray-700">{selectedSchool.students}</span></p>
                    <p className="text-sm text-gray-500">Teachers: <span className="font-medium text-gray-700">{selectedSchool.teachers}</span></p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-700">Courses Offered</h4>
                  <ul className="list-disc list-inside mt-2 text-sm text-gray-500">
                    {selectedSchool.courses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
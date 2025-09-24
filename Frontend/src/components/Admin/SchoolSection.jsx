import React, { useState, useEffect } from 'react';
import { School, MapPin, Users, Phone, Mail } from 'lucide-react';

const SchoolSection = ({ section }) => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    if (section !== 'add-school') {
      fetchSchools();
    }
  }, [section]);

  if (section === 'add-school') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New School</h1>
          <p className="text-gray-600">Register a new school in the system</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter school name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Year established"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea 
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Admin email"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button type="button" className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Add School
              </button>
            </div>
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
        <p className="text-gray-600">Manage all schools in the system</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">School Details</h3>
            <div className="flex items-center space-x-2">
              <School className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">{schools.length} School{schools.length !== 1 ? 's' : ''} Total</span>
            </div>
          </div>
        </div>

        {schools.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {schools.map((school) => (
              <div key={school.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <School className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900">{school.name}</h4>
                    <p className="text-gray-600 mb-4">{school.estyear? school.estyear:"lll"}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin size={16} />
                        <span className="text-sm">{school.location? school.location:"No location marked"}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone size={16} />
                        <span className="text-sm">{school.phno}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail size={16} />
                        <span className="text-sm">{school.email}</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <Users className="w-6 h-6 text-green-600" />
                          <span className="text-2xl font-bold text-green-600">{school.student? school.student:"0"}</span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">Students</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <School className="w-6 h-6 text-blue-600" />
                          <span className="text-2xl font-bold text-blue-600">{school.teacher? school.teacher:"0"}</span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">Teachers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">No schools found.</div>
        )}
      </div>
    </div>
  );
};

export default SchoolSection;

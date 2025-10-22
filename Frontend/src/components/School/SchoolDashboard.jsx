import React from 'react';
import { Outlet } from 'react-router-dom';
import SchoolSidebar from './SchoolSidebar';

const SchoolDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SchoolSidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SchoolDashboard;

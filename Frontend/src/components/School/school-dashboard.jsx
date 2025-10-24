import React from 'react';
import { Outlet } from 'react-router-dom';
import SchoolSidebar from './SchoolSidebar';

const SchoolDashboard = () => {
    return (
      <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <SchoolSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

export default SchoolDashboard;
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Overview from './Overview';
import SchoolSection from './SchoolSection';
import TeacherSection from './TeacherSection';
import StudentSection from './StudentSection';
import AdminSection from './AdminSection';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'add-school':
      case 'schools-list':
        return <SchoolSection section={activeSection} />;
      case 'add-teacher':
      case 'teachers-list':
        return <TeacherSection section={activeSection} />;
      case 'students':
        return <StudentSection />;
      case 'add-admin':
      case 'admins-list':
        return <AdminSection section={activeSection} />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 min-h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

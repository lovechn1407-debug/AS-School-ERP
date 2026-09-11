import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SystemSettings from './pages/SuperAdmin/Settings';
import MarksMatrix from './pages/Teacher/MarksMatrix';
import Profile from './pages/Profile';

function MainLayout() {
  const { currentUser } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (!currentUser) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'settings':
        return <SystemSettings />;
      case 'marks':
      case 'my-marks':
      case 'tabulation':
      case 'report-card':
        return <MarksMatrix />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex flex-1">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

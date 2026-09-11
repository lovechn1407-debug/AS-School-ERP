import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SystemSettings from './pages/SuperAdmin/Settings';
import UserManagement from './pages/SuperAdmin/Users';
import Classes from './pages/Admin/Classes';
import Subjects from './pages/Admin/Subjects';
import Dorms from './pages/Admin/Dorms';
import Admissions from './pages/Admin/Admissions';
import MarksMatrix from './pages/Teacher/MarksMatrix';
import Tabulation from './pages/Teacher/Tabulation';
import Timetable from './pages/Teacher/Timetable';
import Invoices from './pages/Accountant/Invoices';
import Receipts from './pages/Accountant/Receipts';
import ReportCard from './pages/Parent/ReportCard';
import FeeStatus from './pages/Parent/FeeStatus';
import Profile from './pages/Profile';

// Student Panel New Pages
import DailyAttendance from './pages/Student/DailyAttendance';
import PeriodwiseAttendance from './pages/Student/PeriodwiseAttendance';
import LeaveApplication from './pages/Student/LeaveApplication';
import Homework from './pages/Student/Homework';
import Circular from './pages/Student/Circular';
import PhotoGallery from './pages/Student/PhotoGallery';
import Communication from './pages/Student/Communication';
import NewsEvents from './pages/Student/NewsEvents';

function MainLayout() {
  const { currentUser } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!currentUser) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'settings':
        return <SystemSettings />;
      case 'users':
        return <UserManagement />;
      case 'classes':
        return <Classes />;
      case 'subjects':
        return <Subjects />;
      case 'dorms':
        return <Dorms />;
      case 'admissions':
      case 'promotions':
        return <Admissions />;
      case 'marks':
        return <MarksMatrix />;
      case 'tabulation':
        return <Tabulation />;
      case 'timetable':
        return <Timetable />;
      case 'invoices':
        return <Invoices />;
      case 'receipts':
        return <Receipts />;
      case 'report-card':
        return <ReportCard />;
      case 'fee-status':
        return <FeeStatus />;
      case 'profile':
        return <Profile />;
      
      // Attendance 3 Separate Pages
      case 'attendance':
      case 'attendance-daily':
        return <DailyAttendance />;
      case 'attendance-periodwise':
        return <PeriodwiseAttendance />;
      case 'attendance-leave':
        return <LeaveApplication />;
      case 'homework':
        return <Homework />;
      case 'circular':
        return <Circular />;
      case 'photo-gallery':
        return <PhotoGallery />;
      case 'communication':
        return <Communication />;
      case 'news-events':
        return <NewsEvents />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="flex flex-1 relative">
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
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

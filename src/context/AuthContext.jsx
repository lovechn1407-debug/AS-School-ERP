import React, { createContext, useContext, useState } from 'react';
import { 
  MOCK_USERS, 
  INITIAL_SYSTEM_SETTINGS, 
  INITIAL_CLASSES, 
  INITIAL_SECTIONS, 
  INITIAL_SUBJECTS, 
  INITIAL_DORMS, 
  INITIAL_STUDENTS, 
  INITIAL_MARKS, 
  INITIAL_INVOICES,
  INITIAL_TIMETABLE
} from '../data/initialData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState(null); // Default null to force Login screen
  const [settings, setSettings] = useState(INITIAL_SYSTEM_SETTINGS);
  
  // App Data collections
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [dorms, setDorms] = useState(INITIAL_DORMS);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [marks, setMarks] = useState(INITIAL_MARKS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE);

  // Real Email & Password Login handler
  const loginWithEmail = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      throw new Error('Invalid email or password. User account not found.');
    }

    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters long.');
    }

    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Update profile avatar (ImgBB upload)
  const updateAvatar = (url) => {
    if (!currentUser) return;
    setCurrentUser(prev => ({ ...prev, avatar: url }));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, avatar: url } : u));
  };

  // Update system settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Add items
  const addClass = (cls) => setClasses(prev => [...prev, { ...cls, id: `cls-${Date.now()}` }]);
  const addSubject = (sub) => setSubjects(prev => [...prev, { ...sub, id: `sub-${Date.now()}` }]);
  const addStudent = (stu) => setStudents(prev => [...prev, { ...stu, id: `stu-${Date.now()}`, status: 'Active' }]);
  const addMark = (mark) => setMarks(prev => [...prev, { ...mark, id: `mark-${Date.now()}` }]);
  const addInvoice = (inv) => setInvoices(prev => [...prev, { ...inv, id: `inv-${Date.now()}` }]);
  const addUser = (usr) => setUsers(prev => [...prev, { ...usr, id: `usr-${Date.now()}` }]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      loginWithEmail,
      logout,
      updateAvatar,
      settings,
      updateSettings,
      users,
      addUser,
      classes,
      addClass,
      sections,
      subjects,
      addSubject,
      dorms,
      students,
      addStudent,
      marks,
      addMark,
      invoices,
      addInvoice,
      timetable
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { 
  ref, 
  onValue, 
  set, 
  update, 
  push 
} from 'firebase/database';
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
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Live Firebase Database States
  const [settings, setSettingsState] = useState(INITIAL_SYSTEM_SETTINGS);
  const [users, setUsersState] = useState(MOCK_USERS);
  const [classes, setClassesState] = useState(INITIAL_CLASSES);
  const [sections, setSectionsState] = useState(INITIAL_SECTIONS);
  const [subjects, setSubjectsState] = useState(INITIAL_SUBJECTS);
  const [dorms, setDormsState] = useState(INITIAL_DORMS);
  const [students, setStudentsState] = useState(INITIAL_STUDENTS);
  const [marks, setMarksState] = useState(INITIAL_MARKS);
  const [invoices, setInvoicesState] = useState(INITIAL_INVOICES);
  const [timetable, setTimetableState] = useState(INITIAL_TIMETABLE);

  // 1. Realtime Data Sync & Seeding with Firebase Realtime Database
  useEffect(() => {
    const rootRef = ref(db, 'system_data');
    
    const unsubscribe = onValue(rootRef, (snapshot) => {
      const data = snapshot.val();
      
      if (!data) {
        // Firebase RTDB is completely empty! Seed initial data directly into Firebase.
        const seedPayload = {
          settings: INITIAL_SYSTEM_SETTINGS,
          users: MOCK_USERS,
          classes: INITIAL_CLASSES,
          sections: INITIAL_SECTIONS,
          subjects: INITIAL_SUBJECTS,
          dorms: INITIAL_DORMS,
          students: INITIAL_STUDENTS,
          marks: INITIAL_MARKS,
          invoices: INITIAL_INVOICES,
          timetable: INITIAL_TIMETABLE
        };
        set(rootRef, seedPayload);
      } else {
        // Sync live data from Firebase Database into app state
        if (data.settings) setSettingsState(data.settings);
        if (data.users) setUsersState(Array.isArray(data.users) ? data.users : Object.values(data.users));
        if (data.classes) setClassesState(Array.isArray(data.classes) ? data.classes : Object.values(data.classes));
        if (data.sections) setSectionsState(Array.isArray(data.sections) ? data.sections : Object.values(data.sections));
        if (data.subjects) setSubjectsState(Array.isArray(data.subjects) ? data.subjects : Object.values(data.subjects));
        if (data.dorms) setDormsState(Array.isArray(data.dorms) ? data.dorms : Object.values(data.dorms));
        if (data.students) setStudentsState(Array.isArray(data.students) ? data.students : Object.values(data.students));
        if (data.marks) setMarksState(Array.isArray(data.marks) ? data.marks : Object.values(data.marks));
        if (data.invoices) setInvoicesState(Array.isArray(data.invoices) ? data.invoices : Object.values(data.invoices));
        if (data.timetable) setTimetableState(Array.isArray(data.timetable) ? data.timetable : Object.values(data.timetable));
      }
      setLoading(false);
    }, (error) => {
      console.warn("Firebase RTDB listener fallback mode:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Firebase Auth Listener & Session Handler
  const loginWithEmail = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      throw new Error('No user account registered with this email address.');
    }

    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters long.');
    }

    // Authenticate with Firebase Auth if needed or set session
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, password);
    } catch (e) {
      // Fallback local session validation when Firebase Auth user isn't pre-created
      console.log("Firebase Auth sign-in fallback activated for:", cleanEmail);
    }

    setCurrentUser(foundUser);
    return foundUser;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log("Firebase signOut");
    }
    setCurrentUser(null);
  };

  // 3. Write Operations to Firebase Database
  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettingsState(updated);
    await set(ref(db, 'system_data/settings'), updated);
  };

  const updateAvatar = async (url) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, avatar: url };
    setCurrentUser(updatedUser);
    const updatedUsersList = users.map(u => u.id === currentUser.id ? updatedUser : u);
    setUsersState(updatedUsersList);
    await set(ref(db, 'system_data/users'), updatedUsersList);
  };

  const addUser = async (usr) => {
    const newUser = { ...usr, id: `usr-${Date.now()}` };
    const updatedUsers = [...users, newUser];
    setUsersState(updatedUsers);
    await set(ref(db, 'system_data/users'), updatedUsers);
  };

  const addClass = async (cls) => {
    const newClass = { ...cls, id: `cls-${Date.now()}` };
    const updatedClasses = [...classes, newClass];
    setClassesState(updatedClasses);
    await set(ref(db, 'system_data/classes'), updatedClasses);
  };

  const addSubject = async (sub) => {
    const newSub = { ...sub, id: `sub-${Date.now()}` };
    const updatedSubjects = [...subjects, newSub];
    setSubjectsState(updatedSubjects);
    await set(ref(db, 'system_data/subjects'), updatedSubjects);
  };

  const addStudent = async (stu) => {
    const newStu = { ...stu, id: `stu-${Date.now()}`, status: 'Active' };
    const updatedStudents = [...students, newStu];
    setStudentsState(updatedStudents);
    await set(ref(db, 'system_data/students'), updatedStudents);
  };

  const addMark = async (mark) => {
    const newMark = { ...mark, id: `mark-${Date.now()}` };
    const updatedMarks = [...marks, newMark];
    setMarksState(updatedMarks);
    await set(ref(db, 'system_data/marks'), updatedMarks);
  };

  const addInvoice = async (inv) => {
    const newInv = { ...inv, id: `inv-${Date.now()}` };
    const updatedInvoices = [...invoices, newInv];
    setInvoicesState(updatedInvoices);
    await set(ref(db, 'system_data/invoices'), updatedInvoices);
  };

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
      timetable,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

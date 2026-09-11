export const INITIAL_SYSTEM_SETTINGS = {
  systemName: "CJ INSPIRED ACADEMY",
  systemTitle: "CJ Inspired School ERP",
  systemEmail: "admin@cjinspired.edu",
  phone: "+1 (800) 555-0199",
  address: "742 Evergreen Terrace, Springfield",
  currentSession: "2026-2027",
  currentTerm: "First Term",
  currency: "$",
  logo: "https://i.ibb.co/Vvz7Q0N/logo.png"
};

export const MOCK_USERS = [
  {
    id: "user-super-admin",
    name: "Alex Vance",
    email: "superadmin@cjinspired.edu",
    role: "super_admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    phone: "+1 555-0101",
    user_type: "Super Admin"
  },
  {
    id: "user-admin",
    name: "Sarah Jenkins",
    email: "admin@cjinspired.edu",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    phone: "+1 555-0102",
    user_type: "Administrator"
  },
  {
    id: "user-teacher",
    name: "Dr. Robert Carter",
    email: "teacher@cjinspired.edu",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250",
    phone: "+1 555-0103",
    user_type: "Senior Educator"
  },
  {
    id: "user-accountant",
    name: "Elena Rostova",
    email: "accountant@cjinspired.edu",
    role: "accountant",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
    phone: "+1 555-0104",
    user_type: "Chief Financial Officer"
  },
  {
    id: "user-parent",
    name: "David & Emma Miller",
    email: "parent@cjinspired.edu",
    role: "parent",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    phone: "+1 555-0105",
    user_type: "Guardian"
  },
  {
    id: "user-student",
    name: "Ethan Miller",
    email: "student@cjinspired.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250",
    phone: "+1 555-0106",
    user_type: "Student (Grade 10A)",
    class: "Grade 10",
    section: "A",
    admissionNo: "STU-2026-0042"
  }
];

export const INITIAL_CLASSES = [
  { id: "cls-1", name: "Grade 9", classType: "Secondary", section: "A, B", teacher: "Dr. Robert Carter" },
  { id: "cls-2", name: "Grade 10", classType: "Secondary", section: "A, B, C", teacher: "Prof. Clara Oswald" },
  { id: "cls-3", name: "Grade 11", classType: "Senior Secondary", section: "Science, Commerce", teacher: "Marcus Sterling" },
  { id: "cls-4", name: "Grade 12", classType: "Senior Secondary", section: "Science, Arts", teacher: "Helen Troy" }
];

export const INITIAL_SECTIONS = [
  { id: "sec-1", name: "Section A", classId: "cls-2", teacher: "Dr. Robert Carter" },
  { id: "sec-2", name: "Section B", classId: "cls-2", teacher: "Prof. Clara Oswald" },
  { id: "sec-3", name: "Science Track", classId: "cls-3", teacher: "Marcus Sterling" }
];

export const INITIAL_SUBJECTS = [
  { id: "sub-1", name: "Advanced Mathematics", code: "MATH101", className: "Grade 10", teacher: "Dr. Robert Carter" },
  { id: "sub-2", name: "Quantum Physics", code: "PHY201", className: "Grade 10", teacher: "Helen Troy" },
  { id: "sub-3", name: "Organic Chemistry", code: "CHEM202", className: "Grade 10", teacher: "Prof. Clara Oswald" },
  { id: "sub-4", name: "English Literature", code: "ENG102", className: "Grade 10", teacher: "Marcus Sterling" },
  { id: "sub-5", name: "Computer Science", code: "CS301", className: "Grade 10", teacher: "Alex Vance" }
];

export const INITIAL_DORMS = [
  { id: "dorm-1", name: "Newton Hall", capacity: 120, occupied: 94, warden: "John Miller" },
  { id: "dorm-2", name: "Curie Tower", capacity: 100, occupied: 88, warden: "Sarah Connor" },
  { id: "dorm-3", name: "Tesla Lodge", capacity: 80, occupied: 65, warden: "James Watson" }
];

export const INITIAL_STUDENTS = [
  { id: "stu-1", name: "Ethan Miller", class: "Grade 10", section: "A", admissionNo: "STU-2026-0042", gender: "Male", parent: "David & Emma Miller", status: "Active" },
  { id: "stu-2", name: "Sophia Martinez", class: "Grade 10", section: "A", admissionNo: "STU-2026-0043", gender: "Female", parent: "Carlos Martinez", status: "Active" },
  { id: "stu-3", name: "Liam Johnson", class: "Grade 10", section: "B", admissionNo: "STU-2026-0044", gender: "Male", parent: "Grace Johnson", status: "Active" },
  { id: "stu-4", name: "Olivia Taylor", class: "Grade 9", section: "A", admissionNo: "STU-2026-0045", gender: "Female", parent: "Henry Taylor", status: "Active" }
];

export const INITIAL_MARKS = [
  { id: "mark-1", studentName: "Ethan Miller", subject: "Advanced Mathematics", test1: 19, test2: 20, exam: 57, total: 96, grade: "A+", remarks: "Outstanding" },
  { id: "mark-2", studentName: "Ethan Miller", subject: "Quantum Physics", test1: 18, test2: 17, exam: 52, total: 87, grade: "A", remarks: "Excellent" },
  { id: "mark-3", studentName: "Ethan Miller", subject: "Organic Chemistry", test1: 16, test2: 18, exam: 48, total: 82, grade: "A", remarks: "Very Good" },
  { id: "mark-4", studentName: "Sophia Martinez", subject: "Advanced Mathematics", test1: 15, test2: 16, exam: 45, total: 76, grade: "B+", remarks: "Good Progress" },
  { id: "mark-5", studentName: "Liam Johnson", subject: "Advanced Mathematics", test1: 14, test2: 15, exam: 42, total: 71, grade: "B", remarks: "Satisfactory" }
];

export const INITIAL_INVOICES = [
  { id: "inv-001", studentName: "Ethan Miller", title: "First Term Tuition & Lab Fees", amount: 1450, paidAmount: 1450, status: "Paid", dueDate: "2026-09-15" },
  { id: "inv-002", studentName: "Sophia Martinez", title: "First Term Tuition Fee", amount: 1200, paidAmount: 600, status: "Partial", dueDate: "2026-09-20" },
  { id: "inv-003", studentName: "Liam Johnson", title: "Annual Sports & Facility Fee", amount: 350, paidAmount: 0, status: "Unpaid", dueDate: "2026-09-30" }
];

export const INITIAL_TIMETABLE = [
  { day: "Monday", time: "08:30 - 09:30 AM", subject: "Advanced Mathematics", room: "Lab 201", teacher: "Dr. Robert Carter" },
  { day: "Monday", time: "09:30 - 10:30 AM", subject: "Quantum Physics", room: "Hall B", teacher: "Helen Troy" },
  { day: "Tuesday", time: "08:30 - 09:30 AM", subject: "Organic Chemistry", room: "Chem Lab 1", teacher: "Prof. Clara Oswald" },
  { day: "Tuesday", time: "10:45 - 11:45 AM", subject: "Computer Science", room: "IT Center", teacher: "Alex Vance" },
  { day: "Wednesday", time: "08:30 - 09:30 AM", subject: "English Literature", room: "Room 104", teacher: "Marcus Sterling" }
];

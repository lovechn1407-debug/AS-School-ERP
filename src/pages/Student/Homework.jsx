import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BookOpenCheck, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Send,
  Award
} from 'lucide-react';

export default function Homework() {
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role !== 'student' && currentUser?.role !== 'parent';
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [homeworkList, setHomeworkList] = useState([
    {
      id: "HW-2026-101",
      subject: "Advanced Mathematics",
      title: "Calculus & Quadratic Differential Equations Problem Set #4",
      teacher: "Dr. Robert Carter",
      assignedDate: "2026-09-10",
      dueDate: "2026-09-14",
      status: "Pending",
      description: "Solve problems 1 through 15 on page 142 of the Advanced Engineering Mathematics textbook. Show all working steps.",
      attachment: "Math_ProblemSet4_Graded.pdf"
    },
    {
      id: "HW-2026-102",
      subject: "Quantum Physics",
      title: "Wave-Particle Duality Laboratory Experiment Analysis Report",
      teacher: "Helen Troy",
      assignedDate: "2026-09-08",
      dueDate: "2026-09-12",
      status: "Submitted",
      submittedDate: "2026-09-10",
      description: "Submit a 3-page typed PDF report documenting your double-slit interference observations and error rate calculations.",
      attachment: "Physics_LabManual_Exp3.pdf"
    },
    {
      id: "HW-2026-103",
      subject: "Organic Chemistry",
      title: "Hydrocarbon Reaction Mechanisms & Polymer Synthesis Diagram",
      teacher: "Prof. Clara Oswald",
      assignedDate: "2026-09-05",
      dueDate: "2026-09-09",
      status: "Evaluated",
      score: "98/100",
      description: "Draw complete arrow-pushing mechanisms for nucleophilic substitution reactions.",
      attachment: "Chem_Reaction_Notes.pdf"
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Advanced Mathematics',
    dueDate: '',
    description: ''
  });

  const handleAssignHomework = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate || !formData.description) return;

    const newHW = {
      id: `HW-2026-${100 + homeworkList.length + 1}`,
      subject: formData.subject,
      title: formData.title,
      teacher: currentUser?.name || "Teacher",
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: formData.dueDate,
      status: "Pending",
      description: formData.description,
      attachment: "Assignment_Brief.pdf"
    };

    setHomeworkList([newHW, ...homeworkList]);
    setShowAssignModal(false);
    setFormData({ title: '', subject: 'Advanced Mathematics', dueDate: '', description: '' });
  };

  const filteredList = selectedSubject === 'All' 
    ? homeworkList 
    : homeworkList.filter(hw => hw.subject === selectedSubject);

  return (
    <div className="space-y-6">
      
      {/* Clean Page Title (No Top Card Box) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Homework & Assignments</h1>
          <p className="text-slate-500 text-xs mt-0.5">Review assigned coursework, download resources, and track submission deadlines.</p>
        </div>

        {/* Controls: Filter & Create Homework Button */}
        <div className="flex items-center gap-2">
          <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 shadow-2xs">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="All">All Subjects</option>
              <option value="Advanced Mathematics">Advanced Mathematics</option>
              <option value="Quantum Physics">Quantum Physics</option>
              <option value="Organic Chemistry">Organic Chemistry</option>
            </select>
          </div>

          {isStaff && (
            <button
              onClick={() => setShowAssignModal(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4" /> Create Homework
            </button>
          )}
        </div>
      </div>

      {/* Homework Cards List */}
      <div className="space-y-4">
        {filteredList.map(hw => (
          <div key={hw.id} className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs hover:border-brand-200 transition-all space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-100">
                  {hw.subject}
                </span>
                <h2 className="text-base font-extrabold text-slate-900 mt-2">{hw.title}</h2>
                <div className="text-xs text-slate-500 mt-0.5">Assigned by: <strong>{hw.teacher}</strong></div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {hw.status === 'Pending' && (
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Due in 3 Days
                  </span>
                )}
                {hw.status === 'Submitted' && (
                  <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Submitted
                  </span>
                )}
                {hw.status === 'Evaluated' && (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Graded ({hw.score})
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {hw.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-500 font-medium">
                <span>Assigned: <strong>{hw.assignedDate}</strong></span>
                <span>Submission Due: <strong className="text-rose-600">{hw.dueDate}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-slate-500" /> Attachment ({hw.attachment})
                </button>
                {!isStaff && hw.status === 'Pending' && (
                  <button className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shadow-xs">
                    <Upload className="w-3.5 h-3.5" /> Submit Work
                  </button>
                )}
                {isStaff && (
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shadow-xs">
                    <Award className="w-3.5 h-3.5" /> Grade Submissions
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Assign Homework Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-slate-900">Create New Homework Assignment</h3>
              <button onClick={() => setShowAssignModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                Close
              </button>
            </div>

            <form onSubmit={handleAssignHomework} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-bold focus:outline-none focus:border-brand-600"
                >
                  <option value="Advanced Mathematics">Advanced Mathematics</option>
                  <option value="Quantum Physics">Quantum Physics</option>
                  <option value="Organic Chemistry">Organic Chemistry</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Calculus Problem Set #5"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Instructions / Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide instructions for students..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Publish Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

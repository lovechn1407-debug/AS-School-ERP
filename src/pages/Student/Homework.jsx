import React, { useState } from 'react';
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
  Filter
} from 'lucide-react';

export default function Homework() {
  const [selectedSubject, setSelectedSubject] = useState('All');

  const homeworkList = [
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
  ];

  const filteredList = selectedSubject === 'All' 
    ? homeworkList 
    : homeworkList.filter(hw => hw.subject === selectedSubject);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <BookOpenCheck className="w-4 h-4 text-brand-600" /> Academic Homework
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Class Assignments & Projects</h1>
          <p className="text-slate-500 text-xs mt-0.5">Review assigned coursework, download resources, and track submission deadlines.</p>
        </div>

        {/* Filter Dropdown */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2">
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
                {hw.status === 'Pending' && (
                  <button className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shadow-xs">
                    <Upload className="w-3.5 h-3.5" /> Submit Work
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

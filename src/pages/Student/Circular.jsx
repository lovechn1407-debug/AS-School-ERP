import React, { useState } from 'react';
import { 
  Megaphone, 
  Download, 
  Calendar, 
  FileText, 
  ShieldAlert, 
  Search,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function Circular() {
  const [searchTerm, setSearchTerm] = useState('');

  const circulars = [
    {
      id: "CIR-2026-089",
      title: "Annual Sports Meet & Inter-House Athletics Schedule 2026",
      category: "Sports & Athletics",
      date: "September 10, 2026",
      issuedBy: "Office of the Sports Director",
      priority: "High",
      summary: "All students from Grades 9 through 12 are hereby notified that the Annual Athletics Trial selections will commence on September 15th at the Main Stadium.",
      documentName: "Annual_Sports_Schedule_2026.pdf"
    },
    {
      id: "CIR-2026-085",
      title: "Mid-Term Examination Date Sheet & Guidelines",
      category: "Academic Exams",
      date: "September 05, 2026",
      issuedBy: "Controller of Examinations",
      priority: "Important",
      summary: "The formal Mid-Term Examination schedule has been finalized. Admit cards will be distributed via respective class tutors starting next Monday.",
      documentName: "MidTerm_Exam_DateSheet.pdf"
    },
    {
      id: "CIR-2026-081",
      title: "School Transport & Autumn Bus Route Revision Notice",
      category: "Transport & Facilities",
      date: "August 28, 2026",
      issuedBy: "Transport Officer",
      priority: "Normal",
      summary: "Revised timings and pickup points for Bus Route #4 and #7 due to city road maintenance works.",
      documentName: "Bus_Route_Notice_Autumn.pdf"
    }
  ];

  const filteredCirculars = circulars.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Megaphone className="w-4 h-4 text-brand-600" /> Official Circulars
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">School Notices & Directives</h1>
          <p className="text-slate-500 text-xs mt-0.5">Read administrative announcements and download official PDF notices.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search circulars..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-800 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Circulars List */}
      <div className="space-y-4">
        {filteredCirculars.map(cir => (
          <div key={cir.id} className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-3 hover:border-slate-300 transition-all">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-slate-400">{cir.id}</span>
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                    {cir.category}
                  </span>
                </div>
                <h2 className="text-base font-extrabold text-slate-900 mt-1">{cir.title}</h2>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {cir.date}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {cir.summary}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-50">
              <span className="text-slate-400 font-medium">Issued by: <strong className="text-slate-700">{cir.issuedBy}</strong></span>
              
              <button className="bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold px-3.5 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 border border-brand-200">
                <Download className="w-3.5 h-3.5 text-brand-600" /> Download {cir.documentName}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

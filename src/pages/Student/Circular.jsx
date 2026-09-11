import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Megaphone, 
  Download, 
  Calendar, 
  FileText, 
  ShieldAlert, 
  Search,
  CheckCircle2,
  Share2,
  Plus,
  Send,
  Trash2
} from 'lucide-react';

export default function Circular() {
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role !== 'student' && currentUser?.role !== 'parent';
  const [searchTerm, setSearchTerm] = useState('');
  const [showPublishModal, setShowPublishModal] = useState(false);

  const [circulars, setCirculars] = useState([
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
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic Exams',
    summary: '',
    issuedBy: 'School Administration'
  });

  const handlePublishCircular = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) return;

    const newCir = {
      id: `CIR-2026-0${90 + circulars.length + 1}`,
      title: formData.title,
      category: formData.category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      issuedBy: formData.issuedBy || (currentUser?.name || "School Administration"),
      priority: "High",
      summary: formData.summary,
      documentName: "Official_Notice.pdf"
    };

    setCirculars([newCir, ...circulars]);
    setShowPublishModal(false);
    setFormData({ title: '', category: 'Academic Exams', summary: '', issuedBy: 'School Administration' });
  };

  const handleDeleteCircular = (id) => {
    setCirculars(circulars.filter(c => c.id !== id));
  };

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

        {/* Search & Staff Action */}
        <div className="flex items-center gap-2">
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

          {isStaff && (
            <button
              onClick={() => setShowPublishModal(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4" /> Publish Circular
            </button>
          )}
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
                {isStaff && (
                  <button 
                    onClick={() => handleDeleteCircular(cir.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-all" 
                    title="Delete Circular"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
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

      {/* Publish Circular Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-slate-900">Publish Official Circular</h3>
              <button onClick={() => setShowPublishModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                Close
              </button>
            </div>

            <form onSubmit={handlePublishCircular} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Circular Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autumn Break & Holiday Notice"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-bold focus:outline-none focus:border-brand-600"
                >
                  <option value="Academic Exams">Academic Exams</option>
                  <option value="Sports & Athletics">Sports & Athletics</option>
                  <option value="Transport & Facilities">Transport & Facilities</option>
                  <option value="Administrative Directive">Administrative Directive</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Issued By Department / Officer</label>
                <input
                  type="text"
                  placeholder="e.g. Office of the Principal"
                  value={formData.issuedBy}
                  onChange={e => setFormData({ ...formData, issuedBy: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Circular Summary Content</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter notice text summary..."
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Publish Circular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

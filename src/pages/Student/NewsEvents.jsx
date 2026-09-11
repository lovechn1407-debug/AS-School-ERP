import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  Tag, 
  CheckCircle2,
  ChevronRight,
  Plus,
  Send
} from 'lucide-react';

export default function NewsEvents() {
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role !== 'student' && currentUser?.role !== 'parent';
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const [newsItems, setNewsItems] = useState([
    {
      id: "NEWS-1",
      title: "CJ Inspired Academy Ranked #1 STEM Secondary School in Region",
      date: "September 09, 2026",
      category: "Achievement",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      content: "We are thrilled to announce that CJ Inspired Academy has received top honors in the National STEM Innovation Benchmark for outstanding laboratory infrastructure and student academic research."
    },
    {
      id: "NEWS-2",
      title: "New AI & Robotics Learning Lab Inauguration Ceremony",
      date: "September 04, 2026",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      content: "The newly constructed AI Innovation Wing featuring state-of-the-art GPUs and 3D printing equipment was officially inaugurated by the Board of Trustees."
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: "EVT-1",
      title: "Annual Hackathon & Coding Challenge 2026",
      date: "September 25, 2026",
      time: "09:00 AM - 05:00 PM",
      location: "Main Auditorium & IT Lab 3",
      organizer: "Computer Science Dept"
    },
    {
      id: "EVT-2",
      title: "Parent-Teacher Academic Progress Conference",
      date: "October 02, 2026",
      time: "10:00 AM - 03:00 PM",
      location: "Senior Quadrangle",
      organizer: "Academic Affairs"
    },
    {
      id: "EVT-3",
      title: "Autumn Music Festival & Inter-House Symphony",
      date: "October 14, 2026",
      time: "04:30 PM - 08:00 PM",
      location: "Open Air Amphitheatre",
      organizer: "Cultural Committee"
    }
  ]);

  const [newsForm, setNewsForm] = useState({ title: '', category: 'Achievement', image: '', content: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', location: '' });

  const handlePostNews = (e) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.content) return;

    const newN = {
      id: `NEWS-${newsItems.length + 1}`,
      title: newsForm.title,
      category: newsForm.category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      image: newsForm.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      content: newsForm.content
    };

    setNewsItems([newN, ...newsItems]);
    setShowNewsModal(false);
    setNewsForm({ title: '', category: 'Achievement', image: '', content: '' });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) return;

    const newE = {
      id: `EVT-${upcomingEvents.length + 1}`,
      title: eventForm.title,
      date: eventForm.date,
      time: eventForm.time || "09:00 AM - 04:00 PM",
      location: eventForm.location || "School Campus",
      organizer: currentUser?.name || "School Office"
    };

    setUpcomingEvents([newE, ...upcomingEvents]);
    setShowEventModal(false);
    setEventForm({ title: '', date: '', time: '', location: '' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Newspaper className="w-4 h-4 text-brand-600" /> News & Events
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Campus Bulletins & Event Calendar</h1>
          <p className="text-slate-500 text-xs mt-0.5">Stay updated with official school press releases and upcoming campus events.</p>
        </div>
        {/* Staff Action Buttons */}
        {isStaff && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewsModal(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Post News
            </button>
            <button
              onClick={() => setShowEventModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: School News Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-brand-600" /> Top Stories & Campus Bulletins
          </h2>

          <div className="space-y-4">
            {newsItems.map(news => (
              <div key={news.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-all">
                <div className="h-52 overflow-hidden relative">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-brand-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                    {news.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {news.date}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{news.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{news.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Upcoming Events Widget */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-600" /> Upcoming Events
          </h2>

          <div className="space-y-3">
            {upcomingEvents.map(evt => (
              <div key={evt.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Upcoming Event
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">{evt.date}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{evt.title}</h4>

                <div className="space-y-1 text-xs text-slate-500 font-medium pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Post News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-slate-900">Post News Bulletin</h3>
              <button onClick={() => setShowNewsModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                Close
              </button>
            </div>

            <form onSubmit={handlePostNews} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Exhibition Winners"
                  value={newsForm.title}
                  onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newsForm.category}
                  onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-bold focus:outline-none focus:border-brand-600"
                >
                  <option value="Achievement">Achievement</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Academics">Academics</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Header Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newsForm.image}
                  onChange={e => setNewsForm({ ...newsForm, image: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">News Content</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write the news article text..."
                  value={newsForm.content}
                  onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-slate-900">Add Upcoming Campus Event</h3>
              <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                Close
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Sports Day 2026"
                  value={eventForm.title}
                  onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Date</label>
                <input
                  type="date"
                  required
                  value={eventForm.date}
                  onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Timing</label>
                <input
                  type="text"
                  placeholder="e.g. 09:00 AM - 04:00 PM"
                  value={eventForm.time}
                  onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / Venue</label>
                <input
                  type="text"
                  placeholder="e.g. Main Auditorium"
                  value={eventForm.location}
                  onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

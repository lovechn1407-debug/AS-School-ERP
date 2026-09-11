import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  Tag, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function NewsEvents() {
  const newsItems = [
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
  ];

  const upcomingEvents = [
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
  ];

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

    </div>
  );
}

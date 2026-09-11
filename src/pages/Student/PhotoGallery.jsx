import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Image as ImageIcon, 
  Calendar, 
  Eye, 
  Download, 
  Filter, 
  Sparkles,
  X,
  Plus,
  Send,
  Trash2
} from 'lucide-react';

export default function PhotoGallery() {
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role !== 'student' && currentUser?.role !== 'parent';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      title: "Annual Science Exhibition & Robotics Fair",
      category: "Academics",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      description: "Students showcasing quantum computing models and AI automation prototypes."
    },
    {
      id: 2,
      title: "Inter-School Basketball Championship Finals",
      category: "Sports",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
      description: "CJ Inspired Academy team securing 1st rank in state league finals."
    },
    {
      id: 3,
      title: "Cultural Music Fest & Drama Performance",
      category: "Cultural",
      date: "July 2026",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      description: "Symphony orchestra and theatrical drama performance by Senior Grade students."
    },
    {
      id: 4,
      title: "Grand Alumni Meet & Award Ceremony",
      category: "Campus Events",
      date: "June 2026",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
      description: "Honoring distinguished alumni and felicitating academic toppers."
    },
    {
      id: 5,
      title: "Clean Earth Community Plantation Drive",
      category: "Social Service",
      date: "May 2026",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      description: "Environmental awareness campaign with over 500 saplings planted across campus."
    },
    {
      id: 6,
      title: "Inter-House Debate & Elocution Contest",
      category: "Academics",
      date: "April 2026",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
      description: "Passionate debates on global economic policies and technological ethics."
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academics',
    image: '',
    description: ''
  });

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) return;

    const newPhoto = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      image: formData.image,
      description: formData.description || "School event photograph."
    };

    setGalleryItems([newPhoto, ...galleryItems]);
    setShowUploadModal(false);
    setFormData({ title: '', category: 'Academics', image: '', description: '' });
  };

  const handleDeletePhoto = (e, id) => {
    e.stopPropagation();
    setGalleryItems(galleryItems.filter(p => p.id !== id));
  };

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-brand-600" /> Photo Gallery
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Campus Events & Memories</h1>
          <p className="text-slate-500 text-xs mt-0.5">Explore high-resolution event photographs and school celebrations.</p>
        </div>

        {/* Category Filters & Staff Upload Action */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['All', 'Academics', 'Sports', 'Cultural', 'Campus Events'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isStaff && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Upload Photo
            </button>
          )}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map(photo => (
          <div 
            key={photo.id} 
            className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative"
            onClick={() => setActivePhoto(photo)}
          >
            <div className="h-48 relative overflow-hidden bg-slate-100">
              <img 
                src={photo.image} 
                alt={photo.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-bold inline-flex items-center gap-1">
                  <Eye className="w-4 h-4" /> Click to view full resolution
                </span>
              </div>
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                {photo.category}
              </span>
              {isStaff && (
                <button
                  onClick={(e) => handleDeletePhoto(e, photo.id)}
                  className="absolute top-3 left-3 bg-rose-600/90 hover:bg-rose-700 text-white p-1.5 rounded-lg backdrop-blur-xs transition-all shadow-xs"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1">{photo.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 font-medium">{photo.description}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {photo.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl space-y-0 relative">
            <button 
              onClick={() => setActivePhoto(null)} 
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full z-10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img src={activePhoto.image} alt={activePhoto.title} className="max-h-[65vh] w-auto object-contain" />
            </div>

            <div className="p-6 space-y-2 bg-white">
              <div className="flex justify-between items-center">
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-0.5 rounded-md">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{activePhoto.date}</span>
              </div>
              <h2 className="text-lg font-black text-slate-900">{activePhoto.title}</h2>
              <p className="text-xs text-slate-600 font-medium">{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-slate-900">Upload Campus Event Photo</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                Close
              </button>
            </div>

            <form onSubmit={handleUploadPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event / Photo Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Sports Athletics Finals"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Album Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-bold focus:outline-none focus:border-brand-600"
                >
                  <option value="Academics">Academics</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Campus Events">Campus Events</option>
                  <option value="Social Service">Social Service</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image Direct URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe the photograph event..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:outline-none focus:border-brand-600"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

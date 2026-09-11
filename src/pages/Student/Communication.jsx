import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  User, 
  Clock, 
  CheckCheck,
  Paperclip
} from 'lucide-react';

export default function Communication() {
  const [activeContact, setActiveContact] = useState({
    id: "teacher-1",
    name: "Dr. Robert Carter",
    role: "Class Tutor & Math Head",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250"
  });

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Robert Carter", text: "Hello Ethan! Remember to review chapter 4 for tomorrow's calculus workshop.", time: "10:15 AM", isMe: false },
    { id: 2, sender: "Ethan Miller", text: "Yes Dr. Carter, I have completed the preliminary practice problems.", time: "10:18 AM", isMe: true },
    { id: 3, sender: "Dr. Robert Carter", text: "Excellent work! Feel free to reach out if you need clarification on problem #12.", time: "10:20 AM", isMe: false }
  ]);

  const contacts = [
    {
      id: "teacher-1",
      name: "Dr. Robert Carter",
      role: "Class Tutor & Math Head",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250",
      lastMsg: "Feel free to reach out if you need...",
      time: "10:20 AM"
    },
    {
      id: "teacher-2",
      name: "Prof. Clara Oswald",
      role: "Chemistry Educator",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
      lastMsg: "Lab safety guidelines have been updated.",
      time: "Yesterday"
    },
    {
      id: "admin-office",
      name: "Academic Registrar",
      role: "School Admin Office",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      lastMsg: "Your transcript request is approved.",
      time: "Sep 08"
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "Ethan Miller",
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, newMsg]);
    setMessageInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Clean Page Title (No Top Card Box) */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Communication & Messages</h1>
        <p className="text-slate-500 text-xs mt-0.5">Direct messaging channel with class tutors and administrative offices.</p>
      </div>

      {/* Chat Layout Grid */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[550px]">
        
        {/* Contact List Sidebar */}
        <div className="border-r border-slate-200 bg-slate-50/50 p-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="bg-transparent text-xs font-medium focus:outline-none w-full"
            />
          </div>

          <div className="space-y-1">
            {contacts.map(c => (
              <div 
                key={c.id}
                onClick={() => setActiveContact(c)}
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                  activeContact.id === c.id 
                    ? 'bg-white border border-slate-200 shadow-xs' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-300" />
                <div className="overflow-hidden flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                    <span className="text-[10px] text-slate-400">{c.time}</span>
                  </div>
                  <span className="text-[11px] text-brand-600 font-semibold block">{c.role}</span>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{c.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Conversation Main */}
        <div className="md:col-span-2 flex flex-col justify-between p-4 sm:p-6 bg-white">
          
          {/* Active Contact Header */}
          <div className="border-b border-slate-100 pb-4 flex items-center gap-3">
            <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">{activeContact.name}</h3>
              <span className="text-xs text-brand-600 font-semibold">{activeContact.role}</span>
            </div>
          </div>

          {/* Messages History Area */}
          <div className="py-6 space-y-4 overflow-y-auto max-h-[380px] custom-scrollbar">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed font-medium ${
                    msg.isMe 
                      ? 'bg-brand-600 text-white rounded-br-none shadow-xs' 
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 px-1 flex items-center gap-1">
                  {msg.time} {msg.isMe && <CheckCheck className="w-3 h-3 text-brand-600" />}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="border-t border-slate-100 pt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Write a message to ${activeContact.name}...`}
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-brand-600"
            />
            <button 
              type="submit" 
              className="bg-brand-600 hover:bg-brand-700 text-white p-2.5 rounded-xl transition-all shadow-xs shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}

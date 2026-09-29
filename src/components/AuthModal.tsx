import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Building2, 
  Laptop, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { STATES_AND_DISTRICTS } from '../data/locations';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { loginUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'developer' | 'organizer' | 'admin'>('developer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    loginUser(email.trim(), role, name.trim() || undefined);
    onClose();
  };

  const handleQuickLogin = (demoEmail: string, demoRole: 'developer' | 'organizer' | 'admin', demoName: string) => {
    loginUser(demoEmail, demoRole, demoName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>HackZone Authentication</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {isSignUp ? 'Create your Account' : 'Welcome Back to HackZone'}
          </h3>
          <p className="text-xs text-slate-400">
            Discover and participate in district hackathons across India.
          </p>
        </div>

        {/* 1-Click Quick Testing Presets */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            ⚡ Quick 1-Click Test Personas
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => handleQuickLogin('harshinimolleti1001@gmail.com', 'developer', 'Harshini Molleti')}
              className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-600/50 text-xs transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-white group-hover:text-indigo-300">Harshini Molleti (Student/Dev)</span>
                <span className="text-[11px] text-slate-400 block">Visakhapatnam · AI/ML & Web3</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() => handleQuickLogin('au-organizer@andhrauniversity.edu.in', 'organizer', 'AU Tech Alliance')}
              className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-600/50 text-xs transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-white group-hover:text-indigo-300">AU Tech Alliance (Organizer)</span>
                <span className="text-[11px] text-slate-400 block">Host & Post University Challenges</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() => handleQuickLogin('admin@hackzone.io', 'admin', 'District Admin')}
              className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-600/50 text-xs transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-amber-300">District Administrator</span>
                <span className="text-[11px] text-slate-400 block">Verification & Crawler Management</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase">or continue with email</span>
          <div className="border-t border-slate-800 w-full" />
        </div>

        {/* Regular Login/Sign up form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {isSignUp && (
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required={isSignUp}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Harshini Molleti"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Primary Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-indigo-500"
            >
              <option value="developer">Developer / Student Innovator</option>
              <option value="organizer">College / Community Organizer</option>
              <option value="admin">Platform Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer active:scale-95"
          >
            {isSignUp ? 'Create Free Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-400 font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Users, 
  Trophy, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface RegistrationModalProps {
  hackathonId: string;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  hackathonId,
  onClose
}) => {
  const { hackathons, user, registerForHackathon, setOpenAuthModal } = useApp();

  const hackathon = hackathons.find(h => h.id === hackathonId);

  const [teamName, setTeamName] = useState('');
  const [memberCount, setMemberCount] = useState(hackathon?.minTeamSize || 2);
  const [selectedTrack, setSelectedTrack] = useState(hackathon?.problemStatements[0]?.track || 'General Track');
  const [college, setCollege] = useState(user?.college || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!hackathon) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Sign In Required</h3>
          <p className="text-xs text-slate-300">
            Please log in or create an account to register for "{hackathon.title}".
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                setOpenAuthModal(true);
              }}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white"
            >
              Sign In Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setErrorMsg('Please enter a team name');
      return;
    }

    if (memberCount < hackathon.minTeamSize || memberCount > hackathon.maxTeamSize) {
      setErrorMsg(`Team size must be between ${hackathon.minTeamSize} and ${hackathon.maxTeamSize} members`);
      return;
    }

    setIsSubmitting(true);
    const success = registerForHackathon(hackathon.id, teamName, memberCount);
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Event Registration</span>
          </div>
          <h3 className="text-xl font-bold text-white leading-tight">
            Register for {hackathon.title}
          </h3>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {hackathon.district} · {hackathon.mode} · Prize: <span className="text-amber-400 font-semibold">{hackathon.prizePool}</span>
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Team Leader</label>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 flex justify-between">
              <span>{user.name}</span>
              <span className="text-indigo-400 font-mono">{user.email}</span>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Team Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
                setErrorMsg('');
              }}
              placeholder="e.g. Vizag Coders, Neural Hackers"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Total Members ({hackathon.minTeamSize}-{hackathon.maxTeamSize})
              </label>
              <input
                type="number"
                min={hackathon.minTeamSize}
                max={hackathon.maxTeamSize}
                value={memberCount}
                onChange={(e) => setMemberCount(parseInt(e.target.value) || hackathon.minTeamSize)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                College / Organization
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Andhra University"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-indigo-500 text-xs"
              />
            </div>
          </div>

          {hackathon.problemStatements.length > 0 && (
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Preferred Challenge Track</label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-indigo-500 text-xs"
              >
                {hackathon.problemStatements.map(ps => (
                  <option key={ps.id} value={ps.track}>
                    {ps.track}: {ps.title.slice(0, 45)}...
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              Instant Free Confirmation
            </div>
            <p className="text-slate-400">
              By confirming, your team credentials and registered slot are saved to your HackZone dashboard. Organizer instructions will be notified via in-app alerts.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from 'react';
import { Hackathon } from '../types';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Trophy, 
  Users, 
  ShieldCheck, 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpRight,
  Sparkles,
  Layers,
  Laptop
} from 'lucide-react';

interface HackathonCardProps {
  hackathon: Hackathon;
  onOpenDetails: (id: string) => void;
  onRegister: (id: string) => void;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({
  hackathon,
  onOpenDetails,
  onRegister
}) => {
  const { user, toggleBookmark } = useApp();

  const isSaved = user?.savedHackathonIds.includes(hackathon.id);
  const isRegistered = user?.registeredHackathons.some(r => r.hackathonId === hackathon.id);

  // Status badge styling
  const getStatusBadge = () => {
    switch (hackathon.status) {
      case 'Registration Open':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Registration Closing Soon':
        return 'bg-rose-950/90 text-rose-300 border-rose-500/50 animate-pulse';
      case 'Upcoming':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40';
      case 'Ongoing':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'Completed':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Format deadline readable
  const deadlineDate = new Date(hackathon.registrationDeadline);
  const formattedDeadline = isNaN(deadlineDate.getTime()) 
    ? hackathon.registrationDeadline 
    : deadlineDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/40 shadow-xl hover:shadow-2xl hover:shadow-indigo-950/30 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Card Header Media & Badges */}
      <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-950">
        <img
          src={hackathon.bannerImage || '/src/assets/images/hackzone_hero_tech_1790658156890.jpg'}
          alt={hackathon.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border backdrop-blur-md ${getStatusBadge()}`}>
              {hackathon.status}
            </span>
            {hackathon.isVerified && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                Verified
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(hackathon.id);
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save hackathon'}
            className="pointer-events-auto p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-indigo-400 backdrop-blur-md transition-colors shadow-md"
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-indigo-400 fill-indigo-400/30" />
            ) : (
              <Bookmark className="w-4 h-4 text-slate-300" />
            )}
          </button>
        </div>

        {/* Mode Tag on Bottom Image corner */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-900/90 text-slate-200 border border-slate-700/80 backdrop-blur-sm">
            {hackathon.mode}
          </span>
          {hackathon.fee === 'Free' ? (
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
              Free Entry
            </span>
          ) : (
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-amber-950/80 text-amber-300 border border-amber-800/50">
              Paid (₹{hackathon.feeAmount || 200})
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Organizer & Location clean unboxed metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400 gap-2">
            <span className="truncate max-w-[55%] font-medium text-slate-300" title={hackathon.organizer}>
              {hackathon.organizer}
            </span>
            <div className="flex items-center gap-1 text-cyan-400 font-medium shrink-0">
              <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate max-w-[120px]">{hackathon.district}</span>
            </div>
          </div>

          {/* Hackathon Title */}
          <h3 
            onClick={() => onOpenDetails(hackathon.id)}
            className="text-base sm:text-lg font-bold text-white hover:text-indigo-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {hackathon.title}
          </h3>

          {/* College or Venue highlight if available */}
          {hackathon.collegeOrUniversity && (
            <p className="text-xs text-indigo-300/90 font-medium truncate flex items-center gap-1">
              <span>🏛️</span> {hackathon.collegeOrUniversity}
            </p>
          )}

          {/* Tagline / Snippet */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {hackathon.tagline}
          </p>

          {/* Technologies Required */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {hackathon.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-950 border border-slate-800 text-slate-300"
              >
                {tech}
              </span>
            ))}
            {hackathon.technologies.length > 4 && (
              <span className="text-[11px] text-slate-400 font-medium">
                +{hackathon.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Info Grid: Prize, Dates, Team Size */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-left">
          <div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> Prize
            </span>
            <span className="text-xs font-bold text-amber-300 truncate block">
              {hackathon.prizePool}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-400" /> Starts
            </span>
            <span className="text-xs font-semibold text-slate-200 truncate block">
              {hackathon.startDate}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Users className="w-3 h-3 text-indigo-400" /> Team
            </span>
            <span className="text-xs font-medium text-slate-300 truncate block">
              {hackathon.minTeamSize}-{hackathon.maxTeamSize} devs
            </span>
          </div>
        </div>

        {/* Deadline Notice */}
        <div className="text-[11px] text-slate-400 flex items-center justify-between bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/70">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-rose-400" /> Deadline:
          </span>
          <span className="font-semibold text-slate-300">{formattedDeadline}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onOpenDetails(hackathon.id)}
            className="w-full py-2 px-3 rounded-xl text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/60 transition-colors flex items-center justify-center gap-1 active:scale-95"
          >
            <span>View Details</span>
          </button>

          {isRegistered ? (
            <div className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center gap-1">
              <span>Registered ✓</span>
            </div>
          ) : (
            <button
              onClick={() => onRegister(hackathon.id)}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

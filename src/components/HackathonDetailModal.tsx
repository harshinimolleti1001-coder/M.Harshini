import React, { useState } from 'react';
import { Hackathon } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Trophy, 
  Users, 
  ShieldCheck, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Building2, 
  Laptop, 
  Check, 
  Copy,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface HackathonDetailModalProps {
  hackathonId: string;
  onClose: () => void;
  onOpenRegister: (id: string) => void;
}

export const HackathonDetailModal: React.FC<HackathonDetailModalProps> = ({
  hackathonId,
  onClose,
  onOpenRegister
}) => {
  const { hackathons, user, toggleBookmark, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'problems' | 'prizes' | 'schedule' | 'rules'>('overview');
  const [copied, setCopied] = useState(false);

  const hackathon = hackathons.find(h => h.id === hackathonId);
  if (!hackathon) return null;

  const isSaved = user?.savedHackathonIds.includes(hackathon.id);
  const isRegistered = user?.registeredHackathons.some(r => r.hackathonId === hackathon.id);

  const handleShare = () => {
    const url = window.location.origin + '?hackathon=' + hackathon.id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      showToast('Hackathon link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } else {
      showToast('Sharing link: ' + url, 'info');
    }
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(`Check out ${hackathon.title} happening in ${hackathon.district} with ${hackathon.prizePool} prizes! ${window.location.origin}?hackathon=${hackathon.id}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Hero Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={hackathon.bannerImage || '/src/assets/images/hackzone_hero_tech_1790658156890.jpg'}
            alt={hackathon.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-950/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors z-10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Overlay Meta */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-600 text-white">
                {hackathon.mode}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 flex items-center gap-1">
                {hackathon.status}
              </span>
              {hackathon.isVerified && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Verified Event
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              {hackathon.title}
            </h2>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
              <span>{hackathon.organizer}</span>
              <span>·</span>
              <span className="text-cyan-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {hackathon.district}, {hackathon.state}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Quick Action & Info Strip */}
        <div className="px-4 sm:px-6 py-3 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-slate-300">
            <div>
              <span className="text-slate-500 block text-[11px]">Prize Pool</span>
              <span className="text-amber-400 font-bold text-sm sm:text-base">{hackathon.prizePool}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Event Dates</span>
              <span className="font-semibold text-slate-200">{hackathon.startDate} to {hackathon.endDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Deadline</span>
              <span className="font-semibold text-rose-300">
                {new Date(hackathon.registrationDeadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Team Size</span>
              <span className="font-semibold text-slate-200">{hackathon.minTeamSize} - {hackathon.maxTeamSize} Members</span>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(hackathon.id)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors"
              title={isSaved ? 'Remove from saved' : 'Save hackathon'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-indigo-400" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShareWhatsapp}
              className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold items-center gap-1 transition-colors"
            >
              <span>WhatsApp</span>
            </button>

            {isRegistered ? (
              <span className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-600/50 text-emerald-300 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Registered
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenRegister(hackathon.id);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer"
              >
                Register Now
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 border-b border-slate-800 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-medium shrink-0 custom-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'problems', label: `Problems & Tracks (${hackathon.problemStatements.length})` },
            { id: 'prizes', label: 'Prizes & Rewards' },
            { id: 'schedule', label: 'Schedule' },
            { id: 'rules', label: 'Rules & Eligibility' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar text-sm leading-relaxed text-slate-300">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-base font-bold text-white">About the Hackathon</h4>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {hackathon.description}
                </p>
              </div>

              {/* Venue & Location Deep Info */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Venue & Geographical Zone
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Venue Name</span>
                    <span className="text-slate-200 font-medium">{hackathon.venueName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">District & State</span>
                    <span className="text-slate-200 font-medium">{hackathon.district}, {hackathon.state}</span>
                  </div>
                  {hackathon.collegeOrUniversity && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block">Host Institution</span>
                      <span className="text-indigo-300 font-medium">{hackathon.collegeOrUniversity}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block">Coordinates</span>
                    <span className="text-slate-400 font-mono">{hackathon.latitude.toFixed(4)}° N, {hackathon.longitude.toFixed(4)}° E</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Registration Fee</span>
                    <span className="text-emerald-400 font-bold">{hackathon.fee === 'Free' ? 'Free (₹ 0)' : `Paid: ₹${hackathon.feeAmount}`}</span>
                  </div>
                </div>
              </div>

              {/* Technologies Allowed */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-indigo-400" />
                  Technologies Allowed & Suggested Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hackathon.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-indigo-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">Organizer Contact</h4>
                <div className="flex flex-wrap gap-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <a href={`mailto:${hackathon.contactEmail}`} className="text-indigo-400 hover:underline">
                      {hackathon.contactEmail}
                    </a>
                  </div>
                  {hackathon.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{hackathon.contactPhone}</span>
                    </div>
                  )}
                  {hackathon.registrationUrl && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      <a 
                        href={hackathon.registrationUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-slate-400 hover:text-white underline truncate max-w-xs"
                      >
                        Official Website / Portal
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROBLEM STATEMENTS & TRACKS */}
          {activeTab === 'problems' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Challenge Tracks & Problem Statements</h4>
                <span className="text-xs text-slate-400">All tracks evaluate working prototypes</span>
              </div>

              {hackathon.problemStatements.map((ps, idx) => (
                <div 
                  key={ps.id || idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-semibold">
                      Track: {ps.track}
                    </span>
                    <span className="text-slate-500 font-mono">#{idx + 1}</span>
                  </div>
                  <h5 className="text-sm font-bold text-white pt-1">
                    {ps.title}
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {ps.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PRIZES & REWARDS */}
          {activeTab === 'prizes' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Prize Breakdown ({hackathon.prizePool})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/40 to-slate-950 border border-amber-600/40 text-center space-y-1">
                  <div className="text-2xl">🥇</div>
                  <div className="text-xs font-bold uppercase text-amber-400">First Place (Grand Winner)</div>
                  <div className="text-lg font-extrabold text-white">{hackathon.prizes.first}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-950 border border-slate-700 text-center space-y-1">
                  <div className="text-2xl">🥈</div>
                  <div className="text-xs font-bold uppercase text-slate-300">Second Place</div>
                  <div className="text-lg font-extrabold text-white">{hackathon.prizes.second}</div>
                </div>

                {hackathon.prizes.third && (
                  <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/20 to-slate-950 border border-amber-900/40 text-center space-y-1">
                    <div className="text-2xl">🥉</div>
                    <div className="text-xs font-bold uppercase text-amber-600">Third Place</div>
                    <div className="text-lg font-extrabold text-white">{hackathon.prizes.third}</div>
                  </div>
                )}
              </div>

              {hackathon.prizes.specialTracks && hackathon.prizes.specialTracks.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Special Category & Bounty Awards</h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {hackathon.prizes.specialTracks.map((tr, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{tr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                Hackathon Event Schedule
              </h4>

              {hackathon.schedule.map((dayGroup, idx) => (
                <div key={idx} className="space-y-2">
                  <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {dayGroup.day}
                  </h5>
                  <div className="space-y-2">
                    {dayGroup.items.map((item, itemIdx) => (
                      <div 
                        key={itemIdx}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs"
                      >
                        <span className="font-mono font-bold text-cyan-400 shrink-0 pt-0.5">{item.time}</span>
                        <div>
                          <div className="font-bold text-white">{item.title}</div>
                          <div className="text-slate-400">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: RULES & ELIGIBILITY */}
          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">Eligibility Criteria</h4>
                <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  {hackathon.eligibility}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">Rules & Guidelines</h4>
                <ul className="space-y-2 text-xs">
                  {hackathon.rules.map((rule, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar with Register Trigger */}
        <div className="px-4 sm:px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-400">
            {hackathon.status === 'Registration Open' ? (
              <span className="text-emerald-400 font-medium">● Registrations are live</span>
            ) : hackathon.status === 'Registration Closing Soon' ? (
              <span className="text-rose-400 font-semibold animate-pulse">● Closing very soon!</span>
            ) : (
              <span>Status: {hackathon.status}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            {isRegistered ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You're Registered!</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenRegister(hackathon.id);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Register for Event</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

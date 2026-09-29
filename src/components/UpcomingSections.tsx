import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Hackathon } from '../types';
import { HackathonCard } from './HackathonCard';
import { 
  Calendar, 
  Clock, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';

export const UpcomingSections: React.FC = () => {
  const { hackathons, setSelectedHackathonId, setOpenRegistrationModalForId } = useApp();

  // Pick marquee hackathon for live countdown
  const marqueeHackathon = hackathons.find(h => h.id === 'vizag-ai-nexus-2026') || hackathons[0];

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 11, hours: 14, minutes: 22, seconds: 40 });

  useEffect(() => {
    if (!marqueeHackathon) return;
    const targetDate = new Date(marqueeHackathon.startDate + 'T09:00:00');

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [marqueeHackathon]);

  const [activeSection, setActiveSection] = useState<'all' | 'today' | 'this_week' | 'this_month' | 'next_month'>('all');

  // Categorize hackathons
  // Sample reference time: late September / early October 2026
  const todayHackathons = hackathons.filter(h => h.startDate <= '2026-09-30' && h.endDate >= '2026-09-28');
  const thisWeekHackathons = hackathons.filter(h => h.startDate >= '2026-09-28' && h.startDate <= '2026-10-06');
  const thisMonthHackathons = hackathons.filter(h => h.startDate.startsWith('2026-10'));
  const nextMonthHackathons = hackathons.filter(h => h.startDate.startsWith('2026-11') || h.startDate.startsWith('2026-12'));

  const renderSectionCards = (items: Hackathon[]) => {
    if (items.length === 0) {
      return (
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-xs">
          No hackathons scheduled in this timeframe. Check out "This Month" or "Next Month"!
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(h => (
          <HackathonCard
            key={h.id}
            hackathon={h}
            onOpenDetails={(id) => setSelectedHackathonId(id)}
            onRegister={(id) => setOpenRegistrationModalForId(id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Live Countdown Showcase Banner */}
      {marqueeHackathon && (
        <div className="relative rounded-3xl overflow-hidden border border-indigo-500/40 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                <span>Next Flagship Hackathon Countdown</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {marqueeHackathon.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300">
                {marqueeHackathon.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1 text-cyan-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {marqueeHackathon.venueName || marqueeHackathon.district}
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  {marqueeHackathon.prizePool}
                </span>
              </div>
            </div>

            {/* Countdown Clock Unit */}
            <div className="flex flex-col sm:items-end gap-4">
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner min-w-[65px] sm:min-w-[78px]">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums block">
                    {timeLeft.days.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400">Days</span>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner min-w-[65px] sm:min-w-[78px]">
                  <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums block">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400">Hours</span>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner min-w-[65px] sm:min-w-[78px]">
                  <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono tabular-nums block">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400">Mins</span>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner min-w-[65px] sm:min-w-[78px]">
                  <span className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono tabular-nums block">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400">Secs</span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedHackathonId(marqueeHackathon.id)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  View Details & Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Segmented Timeline Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            Upcoming Hackathon Timeline
          </h3>
          <p className="text-xs text-slate-400">
            Browse hackathons categorized by event start schedule.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Upcoming' },
            { id: 'today', label: `Today (${todayHackathons.length})` },
            { id: 'this_week', label: `This Week (${thisWeekHackathons.length})` },
            { id: 'this_month', label: `This Month (${thisMonthHackathons.length})` },
            { id: 'next_month', label: `Next Month (${nextMonthHackathons.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeSection === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render according to active timeline tab */}
      {activeSection === 'all' ? (
        <div className="space-y-12">
          {/* TODAY */}
          {todayHackathons.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h4 className="text-lg font-bold text-white">Happening Today / Live</h4>
                <span className="text-xs text-slate-400 font-medium">Sprint is ongoing!</span>
              </div>
              {renderSectionCards(todayHackathons)}
            </div>
          )}

          {/* THIS WEEK */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                This Week (Closing Fast)
              </h4>
              <span className="text-xs text-slate-400 font-medium">Final slots available</span>
            </div>
            {renderSectionCards(thisWeekHackathons)}
          </div>

          {/* THIS MONTH */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                This Month (October 2026)
              </h4>
              <span className="text-xs text-slate-400 font-medium">{thisMonthHackathons.length} events scheduled</span>
            </div>
            {renderSectionCards(thisMonthHackathons)}
          </div>

          {/* NEXT MONTH */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Next Month & Beyond (November - December 2026)
              </h4>
              <span className="text-xs text-slate-400 font-medium">Prepare your ideas early</span>
            </div>
            {renderSectionCards(nextMonthHackathons)}
          </div>
        </div>
      ) : activeSection === 'today' ? (
        renderSectionCards(todayHackathons)
      ) : activeSection === 'this_week' ? (
        renderSectionCards(thisWeekHackathons)
      ) : activeSection === 'this_month' ? (
        renderSectionCards(thisMonthHackathons)
      ) : (
        renderSectionCards(nextMonthHackathons)
      )}
    </div>
  );
};

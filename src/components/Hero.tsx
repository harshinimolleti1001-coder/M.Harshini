import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Trophy, 
  Compass, 
  ShieldCheck, 
  Building2, 
  Wifi, 
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { STATES_AND_DISTRICTS } from '../data/locations';

export const Hero: React.FC = () => {
  const {
    setActiveTab,
    selectedDistrict,
    setSelectedDistrict,
    selectedState,
    setSelectedState,
    filterState,
    setFilterState,
    setOpenPostModal,
    hackathons,
    setSelectedHackathonId
  } = useApp();

  const [searchVal, setSearchVal] = useState('');
  const [tempState, setTempState] = useState(selectedState || 'Andhra Pradesh');
  const [tempDistrict, setTempDistrict] = useState(selectedDistrict || 'Visakhapatnam');
  const [modeFilter, setModeFilter] = useState<'All' | 'Offline' | 'Online' | 'Hybrid'>('All');

  // Next big flagship hackathon for countdown showcase
  const featuredHackathon = hackathons.find(h => h.id === 'vizag-ai-nexus-2026') || hackathons[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedState(tempState);
    setSelectedDistrict(tempDistrict);
    setFilterState(prev => ({
      ...prev,
      searchQuery: searchVal,
      state: tempState,
      district: tempDistrict,
      mode: modeFilter === 'All' ? '' : modeFilter
    }));
    setActiveTab('explore');
  };

  const handleQuickDistrictPick = (state: string, district: string) => {
    setTempState(state);
    setTempDistrict(district);
    setSelectedState(state);
    setSelectedDistrict(district);
    setFilterState(prev => ({
      ...prev,
      state,
      district
    }));
    setActiveTab('explore');
  };

  const currentDistricts = STATES_AND_DISTRICTS.find(s => s.name === tempState)?.districts || [];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background glow meshes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Subtitle, Search Box & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Discover Hackathons in Your District & Campus</span>
            </div>

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Find Hackathons <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Near You
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Discover upcoming hackathons, coding events, innovation challenges, and tech competitions in your area. Built for students, developers, innovators, and university clubs.
            </p>

            {/* Powerful Multi-Dimensional Search Box */}
            <form 
              onSubmit={handleSearchSubmit}
              className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-3"
            >
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search by tech (e.g. AI/ML, Web3), college, or event name..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Location Selectors: State, District, Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* State selector */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-400" /> State
                  </label>
                  <select
                    value={tempState}
                    onChange={(e) => {
                      setTempState(e.target.value);
                      const d = STATES_AND_DISTRICTS.find(s => s.name === e.target.value)?.districts[0]?.name || '';
                      setTempDistrict(d);
                    }}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700/80 text-slate-200 focus:border-indigo-500 focus:outline-none"
                  >
                    {STATES_AND_DISTRICTS.map(s => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* District selector */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-cyan-400" /> District / Zone
                  </label>
                  <select
                    value={tempDistrict}
                    onChange={(e) => setTempDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700/80 text-slate-200 focus:border-indigo-500 focus:outline-none font-medium text-indigo-300"
                  >
                    {currentDistricts.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mode selector */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-emerald-400" /> Format
                  </label>
                  <select
                    value={modeFilter}
                    onChange={(e) => setModeFilter(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700/80 text-slate-200 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="All">All Formats</option>
                    <option value="Offline">Offline (In-Person)</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online">Online (Virtual)</option>
                  </select>
                </div>
              </div>

              {/* Primary Search Trigger */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search District Hackathons</span>
              </button>
            </form>

            {/* Quick Pick District Tags */}
            <div className="flex items-center flex-wrap gap-2 text-xs">
              <span className="text-slate-400 font-medium">Popular Zones:</span>
              <button
                onClick={() => handleQuickDistrictPick('Andhra Pradesh', 'Visakhapatnam')}
                className="px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/60 transition-colors"
              >
                Visakhapatnam (AP)
              </button>
              <button
                onClick={() => handleQuickDistrictPick('Andhra Pradesh', 'NTR / Vijayawada')}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Vijayawada
              </button>
              <button
                onClick={() => handleQuickDistrictPick('Andhra Pradesh', 'Tirupati')}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Tirupati
              </button>
              <button
                onClick={() => handleQuickDistrictPick('Telangana', 'Hyderabad')}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Hyderabad
              </button>
              <button
                onClick={() => handleQuickDistrictPick('Karnataka', 'Bengaluru Urban')}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Bengaluru
              </button>
            </div>

            {/* Core Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('explore')}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 flex items-center gap-2 active:scale-95 transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Hackathons</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setOpenPostModal(true)}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 hover:text-white flex items-center gap-2 active:scale-95 transition-all"
              >
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Post a Hackathon</span>
              </button>
            </div>

            {/* Quantified Metrics Proof */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">₹ 35L+</div>
                <div className="text-xs text-slate-400">Total Prize Pool</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-400 tabular-nums">100%</div>
                <div className="text-xs text-slate-400">Verified Portals</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-indigo-400 tabular-nums">12+</div>
                <div className="text-xs text-slate-400">Active Districts</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Banner & Featured Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-indigo-950/40 group">
              {/* Visual Banner */}
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-950">
                <img
                  src={featuredHackathon.bannerImage || '/src/assets/images/hackzone_hero_tech_1790658156890.jpg'}
                  alt={featuredHackathon.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating mode & verified status */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-indigo-600/90 text-white backdrop-blur-md shadow-md">
                    Featured
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-md flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900/90 border border-slate-700 text-cyan-300 backdrop-blur-md">
                    {featuredHackathon.mode}
                  </span>
                </div>
              </div>

              {/* Spotlight Content Card */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="text-xs font-medium text-indigo-400 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{featuredHackathon.district}, {featuredHackathon.state}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white hover:text-indigo-300 transition-colors line-clamp-1">
                    {featuredHackathon.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {featuredHackathon.tagline}
                  </p>
                </div>

                {/* Key specs */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[11px] text-slate-400 block">Prize Pool</span>
                      <span className="font-bold text-amber-300">{featuredHackathon.prizePool}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[11px] text-slate-400 block">Date</span>
                      <span className="font-semibold text-slate-200">{featuredHackathon.startDate}</span>
                    </div>
                  </div>
                </div>

                {/* Organizer & Action */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-slate-400">
                    Organized by <span className="text-slate-200 font-medium block truncate max-w-[170px]">{featuredHackathon.organizer}</span>
                  </div>
                  <button
                    onClick={() => setSelectedHackathonId(featuredHackathon.id)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

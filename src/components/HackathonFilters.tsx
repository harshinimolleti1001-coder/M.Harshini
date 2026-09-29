import React from 'react';
import { useApp } from '../context/AppContext';
import { FilterOptions } from '../types';
import { STATES_AND_DISTRICTS, CATEGORIES_LIST } from '../data/locations';
import { 
  Filter, 
  RotateCcw, 
  MapPin, 
  Wifi, 
  Tag, 
  DollarSign, 
  GraduationCap, 
  Calendar, 
  ShieldCheck,
  Search,
  Check
} from 'lucide-react';

interface HackathonFiltersProps {
  totalCount: number;
}

export const HackathonFilters: React.FC<HackathonFiltersProps> = ({ totalCount }) => {
  const { filterState, setFilterState, resetFilters } = useApp();

  const handleStateChange = (stateName: string) => {
    setFilterState(prev => ({
      ...prev,
      state: stateName,
      district: '' // reset district when state changes
    }));
  };

  const currentDistricts = STATES_AND_DISTRICTS.find(s => s.name === filterState.state)?.districts || [];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 space-y-4 shadow-xl backdrop-blur-md">
      {/* Top Header with Active Count & Reset */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-bold text-white uppercase tracking-wider">Filters & Location</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60 tabular-nums">
            {totalCount} found
          </span>
        </div>

        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={filterState.searchQuery}
          onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
          placeholder="Filter by name, organizer, technology..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Grid of Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        
        {/* State */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-400" /> State
          </label>
          <select
            value={filterState.state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All States</option>
            {STATES_AND_DISTRICTS.map(s => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" /> District / Zone
          </label>
          <select
            value={filterState.district}
            onChange={(e) => setFilterState(prev => ({ ...prev, district: e.target.value }))}
            disabled={!filterState.state}
            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
          >
            <option value="">All Districts in {filterState.state || 'Selected State'}</option>
            {currentDistricts.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Mode */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Wifi className="w-3 h-3 text-emerald-400" /> Format
          </label>
          <select
            value={filterState.mode}
            onChange={(e) => setFilterState(prev => ({ ...prev, mode: e.target.value }))}
            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All Formats</option>
            <option value="Offline">Offline (In-Person)</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Online">Online (Virtual)</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Tag className="w-3 h-3 text-amber-400" /> Domain / Tech
          </label>
          <select
            value={filterState.category}
            onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES_LIST.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Pricing / Fee */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-green-400" /> Entry Fee
          </label>
          <select
            value={filterState.fee}
            onChange={(e) => setFilterState(prev => ({ ...prev, fee: e.target.value }))}
            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All (Free & Paid)</option>
            <option value="Free">Free Entry Only</option>
            <option value="Paid">Paid Only</option>
          </select>
        </div>

        {/* Experience Level */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-purple-400" /> Experience Level
          </label>
          <select
            value={filterState.experienceLevel}
            onChange={(e) => setFilterState(prev => ({ ...prev, experienceLevel: e.target.value }))}
            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner Friendly</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced / DeepTech</option>
          </select>
        </div>

        {/* Status */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-cyan-400" /> Status
          </label>
          <select
            value={filterState.status}
            onChange={(e) => setFilterState(prev => ({ ...prev, status: e.target.value }))}
            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="Registration Open">Registration Open</option>
            <option value="Registration Closing Soon">Registration Closing Soon</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Date Filter Segment */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-rose-400" /> Timeframe
          </label>
          <select
            value={filterState.dateFilter}
            onChange={(e) => setFilterState(prev => ({ ...prev, dateFilter: e.target.value as any }))}
            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">Anytime</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="next_month">Next Month</option>
          </select>
        </div>
      </div>

      {/* Verified Only Toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300 select-none">
          <input
            type="checkbox"
            checked={filterState.verifiedOnly}
            onChange={(e) => setFilterState(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0 focus:outline-none cursor-pointer"
          />
          <span className="flex items-center gap-1 text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Show Verified Events Only
          </span>
        </label>

        {filterState.district && (
          <span className="text-xs text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/50">
            District: <strong className="text-white">{filterState.district}</strong>
          </span>
        )}
      </div>
    </div>
  );
};

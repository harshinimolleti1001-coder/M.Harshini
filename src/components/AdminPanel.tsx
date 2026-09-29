import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hackathon } from '../types';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Check, 
  X, 
  Trash2, 
  Edit3, 
  Plus, 
  RefreshCw, 
  Download, 
  Users, 
  Trophy, 
  Building2, 
  MapPin, 
  Calendar,
  Layers,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    hackathons,
    user,
    approveHackathon,
    rejectHackathon,
    toggleVerifyHackathon,
    deleteHackathon,
    triggerDataCrawler,
    setOpenPostModal,
    setSelectedHackathonId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'registrations' | 'crawler'>('pending');
  const [searchFilter, setSearchFilter] = useState('');
  const [isCrawling, setIsCrawling] = useState(false);

  // Statistics
  const totalCount = hackathons.length;
  const pendingCount = hackathons.filter(h => !h.approved).length;
  const verifiedCount = hackathons.filter(h => h.isVerified).length;
  const totalRegistrations = hackathons.reduce((acc, h) => {
    // Collect all registered users for these events
    return acc + (user?.registeredHackathons.filter(r => r.hackathonId === h.id).length || 0);
  }, 0) + 128; // Sample base count

  const pendingHackathons = hackathons.filter(h => !h.approved);
  const filteredHackathons = hackathons.filter(h =>
    h.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    h.organizer.toLowerCase().includes(searchFilter.toLowerCase()) ||
    h.district.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleRunCrawler = () => {
    setIsCrawling(true);
    setTimeout(() => {
      triggerDataCrawler();
      setIsCrawling(false);
      setActiveTab('pending');
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Admin Title & Key Metrics Cards */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Platform Administration & Security</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              HackZone Admin Dashboard
            </h2>
            <p className="text-xs text-slate-400">
              Review organizer submissions, run automated feed crawlers, audit verification badges, and manage registrations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunCrawler}
              disabled={isCrawling}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/50 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isCrawling ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isCrawling ? 'Crawling Portals...' : 'Run Auto-Crawler'}</span>
            </button>

            <button
              onClick={() => setOpenPostModal(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Hackathon</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Hackathons
            </span>
            <span className="text-2xl font-bold text-white tabular-nums">{totalCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Pending Approvals
            </span>
            <span className="text-2xl font-bold text-amber-300 tabular-nums">{pendingCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Events
            </span>
            <span className="text-2xl font-bold text-emerald-300 tabular-nums">{verifiedCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40">
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider block">
              Registrations
            </span>
            <span className="text-2xl font-bold text-indigo-300 tabular-nums">{totalRegistrations}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'pending'
              ? 'bg-amber-600 text-white font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <span>Pending Submissions</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-amber-950 text-amber-200 border border-amber-400/50">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <span>All Hackathons ({totalCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('crawler')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'crawler'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Automated Data Crawler</span>
        </button>
      </div>

      {/* TAB 1: PENDING SUBMISSIONS */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Organizer submissions and crawler items awaiting admin approval & verification</span>
            <span className="font-semibold text-amber-400">{pendingHackathons.length} Items</span>
          </div>

          {pendingHackathons.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">No Pending Submissions</h4>
              <p className="text-xs text-slate-400">
                All submitted and crawled hackathons have been reviewed. Use the "Run Auto-Crawler" button to test discovering new events!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingHackathons.map(h => (
                <div
                  key={h.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        Pending Review
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950 text-slate-400 border border-slate-800">
                        Source: {h.source}
                      </span>
                      <span className="text-cyan-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {h.district}, {h.state}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">{h.title}</h4>
                    <p className="text-slate-400 line-clamp-2">{h.description}</p>

                    <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                      <span>Organizer: <strong className="text-slate-200">{h.organizer}</strong></span>
                      <span>Prize: <strong className="text-amber-400">{h.prizePool}</strong></span>
                      <span>Dates: <strong className="text-slate-200">{h.startDate}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedHackathonId(h.id)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => approveHackathon(h.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve & Verify</span>
                    </button>
                    <button
                      onClick={() => rejectHackathon(h.id)}
                      className="px-3 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-medium transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ALL HACKATHONS */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search database..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
            </div>
            <span className="text-xs text-slate-400">Showing {filteredHackathons.length} of {totalCount} records</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
              <thead className="bg-slate-950/80 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Hackathon Name</th>
                  <th className="p-3.5">District / State</th>
                  <th className="p-3.5">Organizer</th>
                  <th className="p-3.5">Prize</th>
                  <th className="p-3.5">Verified</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHackathons.map(h => (
                  <tr key={h.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white hover:text-indigo-400 cursor-pointer" onClick={() => setSelectedHackathonId(h.id)}>
                        {h.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">{h.id}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="text-cyan-400 font-medium">{h.district}</span>
                      <span className="block text-[11px] text-slate-400">{h.state}</span>
                    </td>
                    <td className="p-3.5 max-w-[140px] truncate">{h.organizer}</td>
                    <td className="p-3.5 font-bold text-amber-400">{h.prizePool}</td>
                    <td className="p-3.5">
                      <button
                        onClick={() => toggleVerifyHackathon(h.id)}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold border flex items-center gap-1 transition-colors ${
                          h.isVerified
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                        title="Click to toggle verified badge"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {h.isVerified ? 'Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-950 border border-slate-800 text-slate-300">
                        {h.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedHackathonId(h.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Inspect"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteHackathon(h.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMATIC DATA CRAWLER */}
      {activeTab === 'crawler' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-xs">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Automated Data Collection & Feeds Engine
            </h3>
            <p className="text-slate-400 mt-1">
              HackZone continuously discovers hackathon announcements from approved public sources: university event calendars, state innovation boards, and developer portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-white">1. University Portals</div>
              <p className="text-slate-400 text-[11px]">
                Crawls Andhra University, GITAM, GVPCE, IIIT-H, and SRM AP academic event feeds.
              </p>
              <span className="inline-block text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Active Feeds</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-white">2. Innovation Societies</div>
              <p className="text-slate-400 text-[11px]">
                Monitors AP Innovation Society, Fintech Valley Vizag, and T-Hub challenge releases.
              </p>
              <span className="inline-block text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Sync Enabled</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-white">3. Verification Pipeline</div>
              <p className="text-slate-400 text-[11px]">
                All automatically collected events stay in "Pending" until admin checks legitimacy and awards "Verified".
              </p>
              <span className="inline-block text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">Shield Protection</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 flex items-center justify-between">
            <div>
              <div className="font-bold text-indigo-300">Simulate Crawler Run</div>
              <div className="text-slate-400">Fetch latest unlisted hackathons from Visakhapatnam portals into review queue.</div>
            </div>

            <button
              onClick={handleRunCrawler}
              disabled={isCrawling}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              <RefreshCw className={`w-4 h-4 ${isCrawling ? 'animate-spin' : ''}`} />
              <span>{isCrawling ? 'Scraping Portals...' : 'Trigger Crawler Now'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

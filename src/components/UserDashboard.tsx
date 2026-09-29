import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HackathonCard } from './HackathonCard';
import { STATES_AND_DISTRICTS, CATEGORIES_LIST } from '../data/locations';
import { Category } from '../types';
import { 
  User, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  Bell, 
  Settings, 
  MapPin, 
  Shield, 
  GraduationCap, 
  Laptop, 
  LogOut,
  ChevronRight,
  Trophy,
  ArrowRight
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    user,
    hackathons,
    logoutUser,
    updateUserProfile,
    switchUserRole,
    getPersonalizedHackathons,
    setSelectedHackathonId,
    setOpenRegistrationModalForId,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'recommended' | 'saved' | 'registered' | 'profile'>('recommended');
  
  // Profile edit form state
  const [name, setName] = useState(user?.name || '');
  const [college, setCollege] = useState(user?.college || '');
  const [district, setDistrict] = useState(user?.district || 'Visakhapatnam');
  const [stateName, setStateName] = useState(user?.state || 'Andhra Pradesh');
  const [skillInput, setSkillInput] = useState(user?.skills.join(', ') || '');
  const [interests, setInterests] = useState<Category[]>(user?.interests || []);

  if (!user) {
    return (
      <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 max-w-lg mx-auto space-y-4">
        <h3 className="text-xl font-bold text-white">Sign In to Access Your Dashboard</h3>
        <p className="text-xs text-slate-400">
          Track saved hackathons, view your registrations, and get personalized recommendations for your district.
        </p>
      </div>
    );
  }

  const savedHackathons = hackathons.filter(h => user.savedHackathonIds.includes(h.id));
  const registeredList = user.registeredHackathons;
  const personalizedList = getPersonalizedHackathons();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillInput.split(',').map(s => s.trim()).filter(Boolean);
    updateUserProfile({
      name,
      college,
      state: stateName,
      district,
      skills: skillsArray,
      interests
    });
  };

  const handleInterestToggle = (cat: Category) => {
    if (interests.includes(cat)) {
      setInterests(interests.filter(c => c !== cat));
    } else {
      setInterests([...interests, cat]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard User Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-indigo-600/30">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase tracking-wider">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            <p className="text-xs text-cyan-400 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>{user.district}, {user.state}</span>
              {user.college && <span className="text-slate-400">· {user.college}</span>}
            </p>
          </div>
        </div>

        {/* Quick Role Switcher for hands-on evaluation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-400 font-semibold px-2">Role:</span>
            <button
              onClick={() => switchUserRole('developer')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                user.role === 'developer' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Developer
            </button>
            <button
              onClick={() => switchUserRole('organizer')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                user.role === 'organizer' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Organizer
            </button>
            <button
              onClick={() => switchUserRole('admin')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                user.role === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>

          <button
            onClick={logoutUser}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs sm:text-sm font-semibold overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveSubTab('recommended')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeSubTab === 'recommended'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Recommended For You</span>
        </button>

        <button
          onClick={() => setActiveSubTab('registered')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeSubTab === 'registered'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Registered Events ({registeredList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeSubTab === 'saved'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Bookmark className="w-4 h-4 text-amber-400" />
          <span>Wishlist & Saved ({savedHackathons.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeSubTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Profile & Preferences</span>
        </button>
      </div>

      {/* Subtab Content: RECOMMENDED */}
      {activeSubTab === 'recommended' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Personalized Algorithm Matching
              </span>
              <p className="text-slate-300">
                Prioritizing events in <strong>{user.district}</strong> matching your skills (
                {user.skills.slice(0, 3).join(', ')}) and interests ({user.interests.slice(0, 2).join(', ')}).
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('profile')}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shrink-0"
            >
              Tune Interests
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalizedList.map(h => (
              <HackathonCard
                key={h.id}
                hackathon={h}
                onOpenDetails={(id) => setSelectedHackathonId(id)}
                onRegister={(id) => setOpenRegistrationModalForId(id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Subtab Content: REGISTERED */}
      {activeSubTab === 'registered' && (
        <div className="space-y-4">
          {registeredList.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No Registered Hackathons Yet</h4>
              <p className="text-xs text-slate-400">
                Browse upcoming events in your district and register your team today!
              </p>
              <button
                onClick={() => setActiveTab('explore')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white"
              >
                Explore Hackathons
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registeredList.map(reg => {
                const h = hackathons.find(item => item.id === reg.hackathonId);
                if (!h) return null;

                return (
                  <div
                    key={reg.hackathonId}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-md font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Confirmed Registration ✓
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        Registered on {new Date(reg.registeredAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white">{h.title}</h4>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Team Name</span>
                        <span className="text-indigo-300 font-bold">{reg.teamName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Team Size</span>
                        <span className="text-slate-200 font-semibold">{reg.membersCount} Developers</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Dates</span>
                        <span className="text-slate-200 font-semibold">{h.startDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Venue</span>
                        <span className="text-cyan-400 font-medium truncate block">{h.venueName || h.district}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => setSelectedHackathonId(h.id)}
                        className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <span>View Event Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Subtab Content: SAVED */}
      {activeSubTab === 'saved' && (
        <div>
          {savedHackathons.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">Your Wishlist is Empty</h4>
              <p className="text-xs text-slate-400">
                Click the bookmark icon on any hackathon card to save it for later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedHackathons.map(h => (
                <HackathonCard
                  key={h.id}
                  hackathon={h}
                  onOpenDetails={(id) => setSelectedHackathonId(id)}
                  onRegister={(id) => setOpenRegistrationModalForId(id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subtab Content: PROFILE SETTINGS */}
      {activeSubTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 max-w-2xl text-xs">
          <div>
            <h3 className="text-base font-bold text-white">Profile & Geographical Preferences</h3>
            <p className="text-slate-400">HackZone tailors recommendations and notifications to your choices.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">College / University</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Andhra University"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Preferred State</label>
              <select
                value={stateName}
                onChange={(e) => {
                  setStateName(e.target.value);
                  const d = STATES_AND_DISTRICTS.find(s => s.name === e.target.value)?.districts[0]?.name || '';
                  setDistrict(d);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200"
              >
                {STATES_AND_DISTRICTS.map(s => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Preferred District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-indigo-300 font-semibold"
              >
                {STATES_AND_DISTRICTS.find(s => s.name === stateName)?.districts.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-slate-300 font-semibold block mb-1">
                Your Technical Skills (comma separated)
              </label>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Python, React, PyTorch, Docker, Solidity"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100"
              />
            </div>
          </div>

          {/* Interests selector */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-slate-300 font-semibold block">Technology Interests</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES_LIST.map(cat => {
                const isSelected = interests.includes(cat.name as any);
                return (
                  <button
                    type="button"
                    key={cat.name}
                    onClick={() => handleInterestToggle(cat.name as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Save Profile & Preferences
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

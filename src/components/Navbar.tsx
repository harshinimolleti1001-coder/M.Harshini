import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  PlusCircle, 
  User, 
  Shield, 
  MapPin, 
  Moon, 
  Sun, 
  Menu, 
  X,
  Compass,
  Map as MapIcon,
  Calendar,
  Layers,
  LayoutDashboard
} from 'lucide-react';
import { STATES_AND_DISTRICTS } from '../data/locations';

interface NavbarProps {
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications }) => {
  const {
    user,
    activeTab,
    setActiveTab,
    selectedDistrict,
    setSelectedDistrict,
    setSelectedState,
    setFilterState,
    theme,
    toggleTheme,
    setOpenPostModal,
    setOpenAuthModal,
    notifications
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleDistrictChange = (stateName: string, districtName: string) => {
    setSelectedState(stateName);
    setSelectedDistrict(districtName);
    setFilterState(prev => ({
      ...prev,
      state: stateName,
      district: districtName
    }));
    setDistrictDropdownOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'map', label: 'Map View' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'categories', label: 'Categories' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="text-2xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors flex items-center gap-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white text-base shadow-lg shadow-indigo-500/20 font-mono">
            HZ
          </span>
          <span>HackZone</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative py-1 transition-colors hover:text-white ${
                  isActive ? 'text-indigo-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}

          {user && (
            <button
              onClick={() => setActiveTab(user.role === 'admin' ? 'admin' : 'dashboard')}
              className={`py-1 transition-colors hover:text-white flex items-center gap-1.5 ${
                activeTab === 'dashboard' || activeTab === 'admin'
                  ? 'text-indigo-400 font-semibold'
                  : 'text-slate-300'
              }`}
            >
              {user.role === 'admin' ? <Shield className="w-3.5 h-3.5 text-amber-400" /> : <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />}
              {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
            </button>
          )}
        </nav>

        {/* Zone 3: Primary actions & utility tools */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick District Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800 transition-colors"
              title="Change your geographical zone / district"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="max-w-[110px] sm:max-w-[140px] truncate">{selectedDistrict}</span>
            </button>

            {districtDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Select Geographical Zone
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {STATES_AND_DISTRICTS.map(st => (
                    <div key={st.name} className="space-y-0.5">
                      <div className="px-2 pt-2 pb-0.5 text-[11px] font-semibold text-indigo-400/90">
                        {st.name}
                      </div>
                      {st.districts.map(d => (
                        <button
                          key={d.name}
                          onClick={() => handleDistrictChange(st.name, d.name)}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                            selectedDistrict === d.name
                              ? 'bg-indigo-600/20 text-indigo-300 font-medium'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span>{d.name}</span>
                          {selectedDistrict === d.name && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Open notifications"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {/* Post Hackathon Primary Button */}
          <button
            onClick={() => setOpenPostModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-lg shadow-md shadow-indigo-600/25 transition-all whitespace-nowrap active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post Hackathon</span>
          </button>

          {/* User Account / Auth */}
          {user ? (
            <button
              onClick={() => setActiveTab(user.role === 'admin' ? 'admin' : 'dashboard')}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline max-w-[85px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={() => setOpenAuthModal(true)}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900 border border-slate-700/80 hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg ${
                  activeTab === link.id
                    ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setOpenPostModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
            >
              <PlusCircle className="w-4 h-4" />
              Post a Hackathon
            </button>

            {user ? (
              <button
                onClick={() => {
                  setActiveTab(user.role === 'admin' ? 'admin' : 'dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-medium text-slate-300 bg-slate-900 rounded-lg border border-slate-800 text-center"
              >
                Go to {user.role === 'admin' ? 'Admin Panel' : 'User Dashboard'}
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenAuthModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-medium text-indigo-300 bg-indigo-950/40 border border-indigo-800/50 rounded-lg text-center"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

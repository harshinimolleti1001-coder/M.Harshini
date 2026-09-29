import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HackathonCard } from './components/HackathonCard';
import { HackathonFilters } from './components/HackathonFilters';
import { HackathonDetailModal } from './components/HackathonDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { PostHackathonModal } from './components/PostHackathonModal';
import { InteractiveMap } from './components/InteractiveMap';
import { UpcomingSections } from './components/UpcomingSections';
import { CategoriesSection } from './components/CategoriesSection';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Calendar, 
  Trophy, 
  ShieldCheck, 
  Layers,
  Search,
  FilterX
} from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    hackathons,
    activeTab,
    setActiveTab,
    selectedDistrict,
    selectedState,
    setSelectedDistrict,
    filterState,
    setFilterState,
    resetFilters,
    selectedHackathonId,
    setSelectedHackathonId,
    openPostModal,
    setOpenPostModal,
    openAuthModal,
    setOpenAuthModal,
    openRegistrationModalForId,
    setOpenRegistrationModalForId
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Filter hackathons according to active filter options
  const filteredHackathons = hackathons.filter(h => {
    // Only approved hackathons appear on public explorer (unapproved stay in admin review)
    if (!h.approved) return false;

    // Search query match
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const matchName = h.title.toLowerCase().includes(q);
      const matchOrg = h.organizer.toLowerCase().includes(q);
      const matchDesc = h.description.toLowerCase().includes(q);
      const matchTech = h.technologies.some(t => t.toLowerCase().includes(q));
      const matchLoc = h.district.toLowerCase().includes(q) || h.state.toLowerCase().includes(q);
      const matchCollege = h.collegeOrUniversity?.toLowerCase().includes(q);
      if (!matchName && !matchOrg && !matchDesc && !matchTech && !matchLoc && !matchCollege) {
        return false;
      }
    }

    // State filter
    if (filterState.state && h.state.toLowerCase() !== filterState.state.toLowerCase()) {
      return false;
    }

    // District filter
    if (filterState.district && h.district.toLowerCase() !== filterState.district.toLowerCase()) {
      return false;
    }

    // Mode filter
    if (filterState.mode && h.mode.toLowerCase() !== filterState.mode.toLowerCase()) {
      return false;
    }

    // Category filter
    if (filterState.category && !h.categories.some(c => c.toLowerCase() === filterState.category.toLowerCase())) {
      return false;
    }

    // Fee filter
    if (filterState.fee && h.fee.toLowerCase() !== filterState.fee.toLowerCase()) {
      return false;
    }

    // Experience level
    if (filterState.experienceLevel && h.experienceLevel.toLowerCase() !== filterState.experienceLevel.toLowerCase() && h.experienceLevel !== 'All Levels') {
      return false;
    }

    // Status filter
    if (filterState.status && h.status !== filterState.status) {
      return false;
    }

    // Verified only filter
    if (filterState.verifiedOnly && !h.isVerified) {
      return false;
    }

    // Date filter
    if (filterState.dateFilter === 'today') {
      if (!(h.startDate <= '2026-09-30' && h.endDate >= '2026-09-28')) return false;
    } else if (filterState.dateFilter === 'this_week') {
      if (!(h.startDate >= '2026-09-28' && h.startDate <= '2026-10-06')) return false;
    } else if (filterState.dateFilter === 'this_month') {
      if (!h.startDate.startsWith('2026-10')) return false;
    } else if (filterState.dateFilter === 'next_month') {
      if (!h.startDate.startsWith('2026-11') && !h.startDate.startsWith('2026-12')) return false;
    }

    return true;
  });

  // Featured hackathons for home page
  const featuredHackathons = hackathons
    .filter(h => h.approved)
    .slice(0, 6);

  // Hackathons happening in selected district
  const districtHackathons = hackathons
    .filter(h => h.approved && h.district.toLowerCase() === selectedDistrict.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar onOpenNotifications={() => setNotificationsOpen(true)} />

      {/* Main Page Content based on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <Hero />

            {/* Selected District Spotlight Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>Selected Zone Discovery</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Hackathons in {selectedDistrict} ({districtHackathons.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    Discover local student hackathons, university maker challenges, and coastal tech events in {selectedDistrict}, {selectedState}.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setFilterState(prev => ({ ...prev, district: selectedDistrict, state: selectedState }));
                      setActiveTab('explore');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
                  >
                    <span>View All {selectedDistrict} Hackathons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
                  >
                    Open Map
                  </button>
                </div>
              </div>

              {/* District Hackathon Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {districtHackathons.slice(0, 3).map(h => (
                  <HackathonCard
                    key={h.id}
                    hackathon={h}
                    onOpenDetails={(id) => setSelectedHackathonId(id)}
                    onRegister={(id) => setOpenRegistrationModalForId(id)}
                  />
                ))}
              </div>
            </section>

            {/* Featured & Upcoming Hackathons Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Top Picks Across Zones</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Featured Hackathons & Sprints
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Hand-picked competitive challenges with verified prizes and premier mentorship.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  <span>Explore all {hackathons.filter(h => h.approved).length} hackathons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredHackathons.map(h => (
                  <HackathonCard
                    key={h.id}
                    hackathon={h}
                    onOpenDetails={(id) => setSelectedHackathonId(id)}
                    onRegister={(id) => setOpenRegistrationModalForId(id)}
                  />
                ))}
              </div>
            </section>

            {/* Category Quick Browser */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CategoriesSection />
            </section>
          </div>
        )}

        {/* EXPLORE LISTING TAB */}
        {activeTab === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Compass className="w-4 h-4" />
                <span>Discovery Directory</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">
                Discover Hackathons Across Districts
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Filter by district, state, domain, experience level, mode, and registration status.
              </p>
            </div>

            {/* Filters */}
            <HackathonFilters totalCount={filteredHackathons.length} />

            {/* Hackathons Grid or Empty State */}
            {filteredHackathons.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3 max-w-md mx-auto">
                <FilterX className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Hackathons Match Your Filters</h3>
                <p className="text-xs text-slate-400">
                  Try changing your district, widening the technology domain, or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHackathons.map(h => (
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

        {/* MAP VIEW TAB */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InteractiveMap />
          </div>
        )}

        {/* UPCOMING & COUNTDOWN TAB */}
        {activeTab === 'upcoming' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <UpcomingSections />
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CategoriesSection />
          </div>
        )}

        {/* USER DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <UserDashboard />
          </div>
        )}

        {/* ADMIN PANEL TAB */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminPanel />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* MODALS */}
      {selectedHackathonId && (
        <HackathonDetailModal
          hackathonId={selectedHackathonId}
          onClose={() => setSelectedHackathonId(null)}
          onOpenRegister={(id) => setOpenRegistrationModalForId(id)}
        />
      )}

      {openRegistrationModalForId && (
        <RegistrationModal
          hackathonId={openRegistrationModalForId}
          onClose={() => setOpenRegistrationModalForId(null)}
        />
      )}

      {openPostModal && (
        <PostHackathonModal
          onClose={() => setOpenPostModal(false)}
        />
      )}

      {openAuthModal && (
        <AuthModal
          onClose={() => setOpenAuthModal(false)}
        />
      )}

      {notificationsOpen && (
        <NotificationsModal
          onClose={() => setNotificationsOpen(false)}
        />
      )}

      {/* Toast Feedback Alerts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

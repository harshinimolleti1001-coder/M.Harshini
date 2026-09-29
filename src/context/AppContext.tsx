import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hackathon, UserProfile, AppNotification, FilterOptions, Category } from '../types';
import { INITIAL_HACKATHONS, INITIAL_USER, INITIAL_NOTIFICATIONS } from '../data/sampleHackathons';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  hackathons: Hackathon[];
  user: UserProfile | null;
  notifications: AppNotification[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedHackathonId: string | null;
  setSelectedHackathonId: (id: string | null) => void;
  filterState: FilterOptions;
  setFilterState: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  toggleBookmark: (hackathonId: string) => void;
  registerForHackathon: (hackathonId: string, teamName: string, membersCount: number) => boolean;
  submitHackathon: (hackathonData: Partial<Hackathon>) => void;
  updateHackathon: (id: string, updatedData: Partial<Hackathon>) => void;
  approveHackathon: (hackathonId: string) => void;
  rejectHackathon: (hackathonId: string) => void;
  toggleVerifyHackathon: (hackathonId: string) => void;
  deleteHackathon: (hackathonId: string) => void;
  triggerDataCrawler: () => number;
  loginUser: (email: string, role?: 'developer' | 'organizer' | 'admin', name?: string) => void;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  switchUserRole: (role: 'developer' | 'organizer' | 'admin') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  openPostModal: boolean;
  setOpenPostModal: (open: boolean) => void;
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
  openRegistrationModalForId: string | null;
  setOpenRegistrationModalForId: (id: string | null) => void;
  getPersonalizedHackathons: () => Hackathon[];
}

const defaultFilters: FilterOptions = {
  searchQuery: '',
  state: '',
  district: '',
  mode: '',
  category: '',
  fee: '',
  experienceLevel: '',
  status: '',
  verifiedOnly: false,
  dateFilter: 'all'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hackathons, setHackathons] = useState<Hackathon[]>(() => {
    try {
      const saved = localStorage.getItem('hackzone_hackathons');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_HACKATHONS;
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('hackzone_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USER;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('hackzone_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedState, setSelectedState] = useState<string>('Andhra Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Visakhapatnam');
  const [selectedHackathonId, setSelectedHackathonId] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterOptions>(defaultFilters);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [openRegistrationModalForId, setOpenRegistrationModalForId] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('hackzone_hackathons', JSON.stringify(hackathons));
    } catch (e) {
      console.error(e);
    }
  }, [hackathons]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('hackzone_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('hackzone_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('hackzone_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const resetFilters = () => {
    setFilterState(defaultFilters);
  };

  const toggleBookmark = (hackathonId: string) => {
    if (!user) {
      setOpenAuthModal(true);
      showToast('Please sign in to save hackathons', 'warning');
      return;
    }
    const isSaved = user.savedHackathonIds.includes(hackathonId);
    const newSaved = isSaved
      ? user.savedHackathonIds.filter(id => id !== hackathonId)
      : [...user.savedHackathonIds, hackathonId];
    
    setUser({ ...user, savedHackathonIds: newSaved });
    showToast(isSaved ? 'Removed from saved hackathons' : 'Saved to your wishlist!', 'success');
  };

  const registerForHackathon = (hackathonId: string, teamName: string, membersCount: number) => {
    if (!user) {
      setOpenAuthModal(true);
      showToast('Please sign in to register for hackathons', 'warning');
      return false;
    }

    const alreadyRegistered = user.registeredHackathons.some(r => r.hackathonId === hackathonId);
    if (alreadyRegistered) {
      showToast('You are already registered for this hackathon!', 'warning');
      return false;
    }

    const newRegistration = {
      hackathonId,
      teamName: teamName.trim() || `${user.name}'s Team`,
      registeredAt: new Date().toISOString(),
      membersCount: Math.max(1, membersCount)
    };

    const targetHackathon = hackathons.find(h => h.id === hackathonId);

    setUser({
      ...user,
      registeredHackathons: [...user.registeredHackathons, newRegistration]
    });

    // Add confirmation notification
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'Registration Confirmed!',
      message: `You are confirmed for "${targetHackathon?.title || 'Hackathon'}" with team "${newRegistration.teamName}".`,
      type: 'system',
      timestamp: 'Just now',
      read: false,
      hackathonId
    };

    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Successfully registered team "${newRegistration.teamName}"!`, 'success');
    return true;
  };

  const submitHackathon = (hackathonData: Partial<Hackathon>) => {
    const newId = (hackathonData.title || 'hackathon')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);

    const fullHackathon: Hackathon = {
      id: newId,
      title: hackathonData.title || 'Untitled Hackathon',
      tagline: hackathonData.tagline || 'Collaborative coding competition',
      organizer: hackathonData.organizer || (user?.name ? `${user.name}'s Organization` : 'Independent Organizer'),
      organizerLogo: hackathonData.organizerLogo,
      bannerImage: hackathonData.bannerImage || '/src/assets/images/hackzone_hero_tech_1790658156890.jpg',
      mode: hackathonData.mode || 'Offline',
      state: hackathonData.state || 'Andhra Pradesh',
      district: hackathonData.district || 'Visakhapatnam',
      city: hackathonData.city || 'Visakhapatnam',
      collegeOrUniversity: hackathonData.collegeOrUniversity || '',
      venueName: hackathonData.venueName || `${hackathonData.city || 'Visakhapatnam'} Innovation Hub`,
      latitude: hackathonData.latitude || 17.6868,
      longitude: hackathonData.longitude || 83.2185,
      startDate: hackathonData.startDate || '2026-11-01',
      endDate: hackathonData.endDate || '2026-11-02',
      registrationDeadline: hackathonData.registrationDeadline || '2026-10-25T23:59:59',
      prizePool: hackathonData.prizePool || '₹ 1,00,000',
      currency: hackathonData.currency || 'INR',
      fee: hackathonData.fee || 'Free',
      feeAmount: hackathonData.feeAmount,
      minTeamSize: hackathonData.minTeamSize || 1,
      maxTeamSize: hackathonData.maxTeamSize || 4,
      experienceLevel: hackathonData.experienceLevel || 'All Levels',
      categories: hackathonData.categories && hackathonData.categories.length > 0 ? hackathonData.categories : ['Open Innovation'],
      technologies: hackathonData.technologies && hackathonData.technologies.length > 0 ? hackathonData.technologies : ['Web', 'Mobile'],
      status: 'Upcoming',
      isVerified: false,
      isFeatured: false,
      source: user?.role === 'organizer' ? 'Organizer' : 'User',
      approved: false, // Requires admin verification
      description: hackathonData.description || 'Join us for this exciting hackathon challenge.',
      eligibility: hackathonData.eligibility || 'Open to all students and developers.',
      rules: hackathonData.rules || ['Fair play and original code required.'],
      prizes: hackathonData.prizes || {
        first: hackathonData.prizePool || '₹ 1,00,000',
        second: 'Runner-up rewards'
      },
      schedule: hackathonData.schedule || [
        {
          day: 'Day 1',
          items: [{ time: '09:00 AM', title: 'Opening ceremony', description: 'Rules briefing and track kickoff' }]
        }
      ],
      problemStatements: hackathonData.problemStatements || [
        {
          id: 'ps-' + Date.now(),
          track: 'Open Track',
          title: 'Innovative solution to regional challenge',
          description: 'Build any product that solves an urgent district or community problem.'
        }
      ],
      contactEmail: hackathonData.contactEmail || user?.email || 'contact@hackzone.io',
      contactPhone: hackathonData.contactPhone,
      registrationUrl: hackathonData.registrationUrl || `https://hackzone.io/register/${newId}`,
      createdAt: new Date().toISOString()
    };

    setHackathons(prev => [fullHackathon, ...prev]);

    // Add alert notification for admin review
    const adminNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'New Hackathon Submitted for Review',
      message: `"${fullHackathon.title}" in ${fullHackathon.district} is awaiting admin verification.`,
      type: 'approval',
      timestamp: 'Just now',
      read: false,
      hackathonId: newId
    };
    setNotifications(prev => [adminNotif, ...prev]);

    showToast('Hackathon submitted successfully! It will be reviewed by admin.', 'success');
  };

  const updateHackathon = (id: string, updatedData: Partial<Hackathon>) => {
    setHackathons(prev =>
      prev.map(h => (h.id === id ? { ...h, ...updatedData } : h))
    );
    showToast('Hackathon details updated', 'success');
  };

  const approveHackathon = (hackathonId: string) => {
    setHackathons(prev =>
      prev.map(h => (h.id === hackathonId ? { ...h, approved: true, isVerified: true } : h))
    );
    showToast('Hackathon approved and verified for public listing!', 'success');
  };

  const rejectHackathon = (hackathonId: string) => {
    setHackathons(prev => prev.filter(h => h.id !== hackathonId));
    showToast('Hackathon submission rejected', 'info');
  };

  const toggleVerifyHackathon = (hackathonId: string) => {
    setHackathons(prev =>
      prev.map(h => (h.id === hackathonId ? { ...h, isVerified: !h.isVerified } : h))
    );
    showToast('Verification status updated', 'success');
  };

  const deleteHackathon = (hackathonId: string) => {
    setHackathons(prev => prev.filter(h => h.id !== hackathonId));
    showToast('Hackathon deleted', 'info');
  };

  // Automatic Data Collection Crawler simulation
  const triggerDataCrawler = (): number => {
    const crawledSamples: Hackathon[] = [
      {
        id: 'crawled-auce-codecraft-' + Date.now(),
        title: 'AUCE CodeCraft 2026: Eastern Coastal Sprint',
        tagline: 'Crawled from Andhra University Engineering Portal public events schedule.',
        organizer: 'Andhra University Department of Computer Science',
        bannerImage: '/src/assets/images/hackathon_vizag_ai_1790658174737.jpg',
        mode: 'Offline',
        state: 'Andhra Pradesh',
        district: 'Visakhapatnam',
        city: 'Visakhapatnam',
        collegeOrUniversity: 'Andhra University College of Engineering (AUCE)',
        venueName: 'CS & SE Labs, AUCE Campus, Visakhapatnam',
        latitude: 17.7240,
        longitude: 83.3210,
        startDate: '2026-11-28',
        endDate: '2026-11-29',
        registrationDeadline: '2026-11-20T23:59:59',
        prizePool: '₹ 1,50,000',
        currency: 'INR',
        fee: 'Free',
        minTeamSize: 2,
        maxTeamSize: 4,
        experienceLevel: 'All Levels',
        categories: ['Web Development', 'Machine Learning', 'Open Innovation'],
        technologies: ['React', 'Python', 'Docker', 'PostgreSQL'],
        status: 'Upcoming',
        isVerified: false,
        isFeatured: false,
        source: 'Aggregator',
        approved: false, // Crawled items must go through verification before appearing as Verified
        description: 'Discovered through automated crawler indexing university hackathon calendar. Focuses on fullstack and machine learning applications for regional development.',
        eligibility: 'Open to university students across Andhra Pradesh.',
        rules: ['Original code written during 24 hours.'],
        prizes: { first: '₹ 80,000', second: '₹ 50,000', third: '₹ 20,000' },
        schedule: [{ day: 'Day 1', items: [{ time: '10:00 AM', title: 'Sprint Opening', description: 'Keynote and problems' }] }],
        problemStatements: [
          {
            id: 'crawl-ps-1',
            track: 'Open Web',
            title: 'Decentralized Student Skill & Hackathon Portfolio Exchange',
            description: 'Enable district colleges to share collaborative research projects.'
          }
        ],
        contactEmail: 'csse@andhrauniversity.edu.in',
        registrationUrl: 'https://andhrauniversity.edu.in/events/codecraft2026',
        createdAt: new Date().toISOString()
      },
      {
        id: 'crawled-vizag-fintech-sandbox-' + Date.now(),
        title: 'AP Fintech Sandbox Micro-InsurTech Hackathon',
        tagline: 'Discovered from AP Innovation Society public competition bulletin.',
        organizer: 'AP Innovation Society & Millennium Tower Incubator',
        bannerImage: '/src/assets/images/hackathon_cyber_summit_1790658190326.jpg',
        mode: 'Hybrid',
        state: 'Andhra Pradesh',
        district: 'Visakhapatnam',
        city: 'Visakhapatnam',
        venueName: 'Fintech Tower 2, Rushikonda, Visakhapatnam',
        latitude: 17.7950,
        longitude: 83.3860,
        startDate: '2026-12-05',
        endDate: '2026-12-06',
        registrationDeadline: '2026-11-25T23:59:59',
        prizePool: '₹ 3,00,000',
        currency: 'INR',
        fee: 'Free',
        minTeamSize: 2,
        maxTeamSize: 4,
        experienceLevel: 'Intermediate',
        categories: ['FinTech', 'Data Science', 'Cybersecurity'],
        technologies: ['Python', 'Kafka', 'React', 'AWS'],
        status: 'Upcoming',
        isVerified: false,
        isFeatured: false,
        source: 'Aggregator',
        approved: false,
        description: 'Crawled automatically from government innovation portal. Solves parametric micro-insurance payouts for coastal weather incidents.',
        eligibility: 'College seniors, developers, and fintech founders.',
        rules: ['Use open banking mock APIs provided in sandbox.'],
        prizes: { first: '₹ 1,80,000', second: '₹ 80,000', third: '₹ 40,000' },
        schedule: [{ day: 'Day 1', items: [{ time: '09:00 AM', title: 'Sandbox Launch', description: 'API walkthrough' }] }],
        problemStatements: [
          {
            id: 'crawl-ps-2',
            track: 'InsurTech',
            title: 'Automated Parametric Rain and Storm Surge Compensation Model',
            description: 'Instant claims settlement triggered by verifiable meteorological data.'
          }
        ],
        contactEmail: 'sandbox@apis.gov.in',
        registrationUrl: 'https://apis.gov.in/hackathons/insurtech-2026',
        createdAt: new Date().toISOString()
      }
    ];

    setHackathons(prev => [...crawledSamples, ...prev]);

    const crawlNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'Automated Data Crawler Completed',
      message: `Crawled ${crawledSamples.length} new hackathons from public portals in Visakhapatnam. Awaiting verification!`,
      type: 'approval',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [crawlNotif, ...prev]);
    showToast(`Crawler collected ${crawledSamples.length} hackathons into admin verification queue!`, 'success');
    return crawledSamples.length;
  };

  const loginUser = (email: string, role: 'developer' | 'organizer' | 'admin' = 'developer', name?: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
      email,
      role,
      college: role === 'developer' ? 'Andhra University College of Engineering' : undefined,
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      city: 'Visakhapatnam',
      interests: ['Artificial Intelligence', 'Machine Learning', 'Cybersecurity'],
      skills: ['Python', 'TypeScript', 'React'],
      savedHackathonIds: ['vizag-ai-nexus-2026'],
      registeredHackathons: [],
      notificationPreferences: {
        districtAlerts: true,
        deadlineAlerts: true,
        interestAlerts: true,
        newsletter: true
      }
    };
    setUser(newUser);
    setOpenAuthModal(false);
    showToast(`Welcome back, ${newUser.name}! Logged in as ${role}.`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
    showToast('Profile updated successfully', 'success');
  };

  const switchUserRole = (role: 'developer' | 'organizer' | 'admin') => {
    if (!user) return;
    setUser({ ...user, role });
    showToast(`Switched active view to ${role.toUpperCase()}`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Personalized Recommendation Engine
  const getPersonalizedHackathons = (): Hackathon[] => {
    if (!user) return hackathons.filter(h => h.approved);

    const userDistrict = user.district.toLowerCase();
    const userInterests = user.interests || [];
    const userSkills = user.skills || [];
    const savedIds = user.savedHackathonIds || [];

    return [...hackathons]
      .filter(h => h.approved)
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        // Score location matching
        if (a.district.toLowerCase() === userDistrict) scoreA += 10;
        if (b.district.toLowerCase() === userDistrict) scoreB += 10;

        // Score interest category overlap
        const aCategoryOverlap = a.categories.filter(c => userInterests.includes(c)).length;
        const bCategoryOverlap = b.categories.filter(c => userInterests.includes(c)).length;
        scoreA += aCategoryOverlap * 5;
        scoreB += bCategoryOverlap * 5;

        // Score technology match
        const aTechOverlap = a.technologies.filter(t =>
          userSkills.some(s => s.toLowerCase() === t.toLowerCase())
        ).length;
        const bTechOverlap = b.technologies.filter(t =>
          userSkills.some(s => s.toLowerCase() === t.toLowerCase())
        ).length;
        scoreA += aTechOverlap * 3;
        scoreB += bTechOverlap * 3;

        // Saved boosts
        if (savedIds.includes(a.id)) scoreA += 4;
        if (savedIds.includes(b.id)) scoreB += 4;

        return scoreB - scoreA;
      });
  };

  return (
    <AppContext.Provider
      value={{
        hackathons,
        user,
        notifications,
        activeTab,
        setActiveTab,
        selectedState,
        setSelectedState,
        selectedDistrict,
        setSelectedDistrict,
        selectedHackathonId,
        setSelectedHackathonId,
        filterState,
        setFilterState,
        resetFilters,
        toggleBookmark,
        registerForHackathon,
        submitHackathon,
        updateHackathon,
        approveHackathon,
        rejectHackathon,
        toggleVerifyHackathon,
        deleteHackathon,
        triggerDataCrawler,
        loginUser,
        logoutUser,
        updateUserProfile,
        switchUserRole,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        showToast,
        theme,
        toggleTheme,
        openPostModal,
        setOpenPostModal,
        openAuthModal,
        setOpenAuthModal,
        openRegistrationModalForId,
        setOpenRegistrationModalForId,
        getPersonalizedHackathons
      }}
    >
      <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

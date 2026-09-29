export type HackathonMode = 'Online' | 'Offline' | 'Hybrid';

export type RegistrationStatus = 
  | 'Registration Open' 
  | 'Registration Closing Soon' 
  | 'Upcoming' 
  | 'Ongoing' 
  | 'Completed';

export type ExperienceLevel = 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';

export type Category = 
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Web Development'
  | 'App Development'
  | 'Cybersecurity'
  | 'Blockchain'
  | 'IoT'
  | 'Cloud Computing'
  | 'Data Science'
  | 'Robotics'
  | 'Healthcare'
  | 'FinTech'
  | 'Sustainability'
  | 'Open Innovation';

export interface HackathonScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface ProblemStatement {
  id: string;
  track: string;
  title: string;
  description: string;
}

export interface Hackathon {
  id: string;
  title: string;
  tagline: string;
  organizer: string;
  organizerLogo?: string;
  bannerImage: string;
  mode: HackathonMode;
  state: string;
  district: string;
  city: string;
  venueName: string;
  collegeOrUniversity?: string;
  latitude: number;
  longitude: number;
  startDate: string; // ISO date e.g. "2026-10-15"
  endDate: string;
  registrationDeadline: string; // ISO datetime
  prizePool: string;
  currency: string;
  fee: 'Free' | 'Paid';
  feeAmount?: number;
  minTeamSize: number;
  maxTeamSize: number;
  experienceLevel: ExperienceLevel;
  categories: Category[];
  technologies: string[];
  status: RegistrationStatus;
  isVerified: boolean;
  isFeatured?: boolean;
  source: 'User' | 'Organizer' | 'Aggregator' | 'Admin';
  approved: boolean;
  description: string;
  eligibility: string;
  rules: string[];
  prizes: {
    first: string;
    second: string;
    third?: string;
    specialTracks?: string[];
  };
  schedule: {
    day: string;
    items: HackathonScheduleItem[];
  }[];
  problemStatements: ProblemStatement[];
  contactEmail: string;
  contactPhone?: string;
  registrationUrl: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'organizer' | 'admin';
  college?: string;
  state: string;
  district: string;
  city: string;
  interests: Category[];
  skills: string[];
  savedHackathonIds: string[];
  registeredHackathons: {
    hackathonId: string;
    teamName: string;
    registeredAt: string;
    membersCount: number;
  }[];
  notificationPreferences: {
    districtAlerts: boolean;
    deadlineAlerts: boolean;
    interestAlerts: boolean;
    newsletter: boolean;
  };
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'district' | 'deadline' | 'interest' | 'system' | 'approval';
  timestamp: string;
  read: boolean;
  hackathonId?: string;
}

export interface FilterOptions {
  searchQuery: string;
  state: string;
  district: string;
  mode: string;
  category: string;
  fee: string;
  experienceLevel: string;
  status: string;
  verifiedOnly: boolean;
  dateFilter: 'all' | 'today' | 'this_week' | 'this_month' | 'next_month';
}

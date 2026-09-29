export interface DistrictInfo {
  name: string;
  state: string;
  popularColleges: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface StateInfo {
  name: string;
  districts: DistrictInfo[];
}

export const STATES_AND_DISTRICTS: StateInfo[] = [
  {
    name: 'Andhra Pradesh',
    districts: [
      {
        name: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        coordinates: { lat: 17.6868, lng: 83.2185 },
        popularColleges: [
          'Andhra University College of Engineering (AUCE)',
          'GITAM Deemed to be University',
          'Gayatri Vidya Parishad College of Engineering (GVPCE)',
          'Vignan’s Institute of Information Technology (VIIT)',
          'ANITS (Anil Neerukonda Institute of Technology)',
          'Raghu Engineering College',
          'Indian Institute of Management Visakhapatnam (IIMV)',
          'Indian Institute of Petroleum and Energy (IIPE)'
        ]
      },
      {
        name: 'NTR / Vijayawada',
        state: 'Andhra Pradesh',
        coordinates: { lat: 16.5062, lng: 80.6480 },
        popularColleges: [
          'SRM University AP',
          'VIT-AP University',
          'VR Siddhartha Engineering College',
          'K L Deemed to be University'
        ]
      },
      {
        name: 'Tirupati',
        state: 'Andhra Pradesh',
        coordinates: { lat: 13.6288, lng: 79.4192 },
        popularColleges: [
          'IIT Tirupati',
          'Sri Venkateswara University College of Engineering (SVUCE)',
          'IISER Tirupati'
        ]
      },
      {
        name: 'Guntur',
        state: 'Andhra Pradesh',
        coordinates: { lat: 16.3067, lng: 80.4365 },
        popularColleges: [
          'RVR & JC College of Engineering',
          'Vignan University Vadlamudi',
          'Acharya Nagarjuna University'
        ]
      },
      {
        name: 'East Godavari / Kakinada',
        state: 'Andhra Pradesh',
        coordinates: { lat: 16.9891, lng: 82.2475 },
        popularColleges: [
          'JNTUK Kakinada',
          'Aditya Engineering College'
        ]
      }
    ]
  },
  {
    name: 'Telangana',
    districts: [
      {
        name: 'Hyderabad',
        state: 'Telangana',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        popularColleges: [
          'IIIT Hyderabad',
          'IIT Hyderabad',
          'BITS Pilani Hyderabad Campus',
          'Osmania University College of Engineering',
          'CBIT Hyderabad',
          'VNR VJIET'
        ]
      },
      {
        name: 'Warangal',
        state: 'Telangana',
        coordinates: { lat: 17.9689, lng: 79.5941 },
        popularColleges: [
          'NIT Warangal',
          'Kakatiya Institute of Technology & Science'
        ]
      }
    ]
  },
  {
    name: 'Karnataka',
    districts: [
      {
        name: 'Bengaluru Urban',
        state: 'Karnataka',
        coordinates: { lat: 12.9716, lng: 77.5946 },
        popularColleges: [
          'IISc Bangalore',
          'IIIT Bangalore',
          'RV College of Engineering',
          'PES University',
          'BMS College of Engineering'
        ]
      }
    ]
  },
  {
    name: 'Tamil Nadu',
    districts: [
      {
        name: 'Chennai',
        state: 'Tamil Nadu',
        coordinates: { lat: 13.0827, lng: 80.2707 },
        popularColleges: [
          'IIT Madras',
          'Anna University CEG',
          'SRM Institute of Science and Technology',
          'SSN College of Engineering'
        ]
      }
    ]
  },
  {
    name: 'Maharashtra',
    districts: [
      {
        name: 'Pune',
        state: 'Maharashtra',
        coordinates: { lat: 18.5204, lng: 73.8567 },
        popularColleges: [
          'COEP Technological University',
          'MIT World Peace University',
          'PICT Pune'
        ]
      }
    ]
  },
  {
    name: 'Delhi NCR',
    districts: [
      {
        name: 'New Delhi',
        state: 'Delhi NCR',
        coordinates: { lat: 28.6139, lng: 77.2090 },
        popularColleges: [
          'IIT Delhi',
          'Delhi Technological University (DTU)',
          'NSUT Delhi',
          'IIIT Delhi'
        ]
      }
    ]
  }
];

export const CATEGORIES_LIST = [
  { name: 'Artificial Intelligence', icon: 'Brain', color: 'from-indigo-500 to-cyan-400', count: 12 },
  { name: 'Machine Learning', icon: 'Cpu', color: 'from-blue-600 to-indigo-500', count: 9 },
  { name: 'Web Development', icon: 'Globe', color: 'from-emerald-500 to-teal-400', count: 15 },
  { name: 'App Development', icon: 'Smartphone', color: 'from-violet-500 to-purple-600', count: 8 },
  { name: 'Cybersecurity', icon: 'Shield', color: 'from-rose-500 to-amber-500', count: 6 },
  { name: 'Blockchain', icon: 'Boxes', color: 'from-amber-500 to-yellow-400', count: 5 },
  { name: 'IoT', icon: 'Wifi', color: 'from-teal-500 to-emerald-400', count: 7 },
  { name: 'Cloud Computing', icon: 'Cloud', color: 'from-sky-500 to-blue-500', count: 6 },
  { name: 'Data Science', icon: 'Database', color: 'from-cyan-500 to-blue-600', count: 8 },
  { name: 'Robotics', icon: 'Bot', color: 'from-orange-500 to-red-500', count: 4 },
  { name: 'Healthcare', icon: 'Activity', color: 'from-pink-500 to-rose-400', count: 5 },
  { name: 'FinTech', icon: 'CreditCard', color: 'from-emerald-600 to-green-400', count: 7 },
  { name: 'Sustainability', icon: 'Leaf', color: 'from-lime-500 to-emerald-500', count: 6 },
  { name: 'Open Innovation', icon: 'Sparkles', color: 'from-purple-500 to-pink-500', count: 11 }
] as const;

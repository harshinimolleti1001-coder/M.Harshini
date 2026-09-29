import { Hackathon } from '../types';

export const INITIAL_HACKATHONS: Hackathon[] = [
  {
    id: 'vizag-ai-nexus-2026',
    title: 'Vizag AI & Quantum Nexus Hackathon 2026',
    tagline: 'Build next-generation Generative AI, Multimodal Agents & Vision models for coastal economy and healthcare.',
    organizer: 'Andhra University & Tech Vizag Alliance',
    organizerLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=faces',
    bannerImage: '/src/assets/images/hackathon_vizag_ai_1790658174737.jpg',
    mode: 'Offline',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    collegeOrUniversity: 'Andhra University College of Engineering (AUCE)',
    venueName: 'Dr. B.R. Ambedkar Assembly Hall, AUCE Campus, Waltair Uplands, Visakhapatnam',
    latitude: 17.7226,
    longitude: 83.3195,
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    registrationDeadline: '2026-10-06T23:59:59',
    prizePool: '₹ 5,00,000',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 2,
    maxTeamSize: 4,
    experienceLevel: 'All Levels',
    categories: ['Artificial Intelligence', 'Machine Learning', 'Healthcare', 'Data Science'],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'Gemini API', 'Next.js', 'FastAPI'],
    status: 'Registration Open',
    isVerified: true,
    isFeatured: true,
    source: 'Organizer',
    approved: true,
    description: 'Vizag AI & Quantum Nexus is the premier flagship hackathon hosted in the historic port city of Visakhapatnam. Convening over 500 top engineers, students, and researchers across the nation, this 36-hour challenge pushes the frontier in multimodal reasoning, coastal logistics AI, and automated medical diagnostics.',
    eligibility: 'Open to all undergraduate & postgraduate students, working professionals, research scholars, and independent builders.',
    rules: [
      'Teams must consist of 2 to 4 members.',
      'All code and solution artifacts must be created during the official 36-hour hackathon window.',
      'Pre-existing libraries, open-source packages, and foundational APIs are permitted with clear attribution.',
      'Plagiarism or submission of pre-built commercial products results in immediate disqualification.',
      'Every team must present a working prototype and a 4-minute live pitch to the judging committee.'
    ],
    prizes: {
      first: '₹ 2,50,000 + Incubation Grant at AU T-Hub',
      second: '₹ 1,50,000 + Cloud Credits',
      third: '₹ 75,000 + Mentorship Vouchers',
      specialTracks: [
        'Best Marine & Coastal AI Solution: ₹ 25,000',
        'Top Women in Tech Team: ₹ 20,000',
        'Best Use of Real-Time Vision: ₹ 15,000'
      ]
    },
    schedule: [
      {
        day: 'Day 1 - Oct 10, 2026',
        items: [
          { time: '08:30 AM', title: 'Check-in & Kit Distribution', description: 'Participant badges, Wi-Fi access, and team setup.' },
          { time: '10:00 AM', title: 'Keynote & Problem Statement Release', description: 'Opening address by State IT Secretary and industry mentors.' },
          { time: '11:00 AM', title: 'Hacking Commences', description: '36-hour sprint begins across all challenge tracks.' },
          { time: '04:00 PM', title: 'Mentorship Checkpoint 1', description: 'Technical architecture feedback with principal AI architects.' }
        ]
      },
      {
        day: 'Day 2 - Oct 11, 2026',
        items: [
          { time: '12:00 AM', title: 'Midnight Snack & Mini Gaming Jam', description: 'Unwind and recharge with fun mini-games.' },
          { time: '10:00 AM', title: 'Mentorship Checkpoint 2', description: 'Pitch rehearsal and deployment verification.' },
          { time: '07:00 PM', title: 'Code Freeze & Submission', description: 'Submit repository links and demo screencasts.' }
        ]
      },
      {
        day: 'Day 3 - Oct 12, 2026',
        items: [
          { time: '09:30 AM', title: 'Final Demo Showcase', description: 'Top 15 teams present live in front of the grand jury.' },
          { time: '02:00 PM', title: 'Award Ceremony & Networking', description: 'Distribution of prizes, certificates, and job offers.' }
        ]
      }
    ],
    problemStatements: [
      {
        id: 'ps-1',
        track: 'Coastal Logistics & Smart Ports',
        title: 'Predictive Vessel Turnaround & Berth Allocation with Computer Vision',
        description: 'Design an automated maritime coordination agent that estimates turnaround delays and weather impact at Vizag Port.'
      },
      {
        id: 'ps-2',
        track: 'Decentralized Healthcare',
        title: 'Offline-First Rural Telemedicine Triage for Eastern Ghats Tribal Belts',
        description: 'Create an intelligent edge-device diagnostic tool that assists rural health workers without active internet.'
      },
      {
        id: 'ps-3',
        track: 'Sustainable Urban Living',
        title: 'Urban Heat Island Mitigation & Coastal Flood Early Warning System',
        description: 'Combine GIS satellite data and IoT rainfall sensors to forecast urban inundation in Visakhapatnam neighborhoods.'
      }
    ],
    contactEmail: 'organizers@vizaghacks.org',
    contactPhone: '+91 891 284 4000',
    registrationUrl: 'https://hackzone.io/register/vizag-ai-nexus-2026',
    createdAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'gitam-cyber-shield-2026',
    title: 'CyberShield AP & DefHack 2026',
    tagline: 'National Defense, Zero-Trust Systems & Threat Intelligence Capture The Flag + Solution Sprint.',
    organizer: 'GITAM Deemed to be University & Cyber Intelligence Forum',
    bannerImage: '/src/assets/images/hackathon_cyber_summit_1790658190326.jpg',
    mode: 'Hybrid',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    collegeOrUniversity: 'GITAM Deemed to be University',
    venueName: 'KRC Auditorium & Cyber Range Lab, Rushikonda, Visakhapatnam',
    latitude: 17.7816,
    longitude: 83.3778,
    startDate: '2026-10-02',
    endDate: '2026-10-03',
    registrationDeadline: '2026-09-30T18:00:00',
    prizePool: '₹ 3,50,000',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 1,
    maxTeamSize: 4,
    experienceLevel: 'Intermediate',
    categories: ['Cybersecurity', 'Cloud Computing', 'Web Development'],
    technologies: ['Rust', 'Go', 'Linux Kernel', 'Wireshark', 'Docker', 'Kubernetes'],
    status: 'Registration Closing Soon',
    isVerified: true,
    isFeatured: true,
    source: 'Organizer',
    approved: true,
    description: 'CyberShield AP brings together ethical hackers, security researchers, and systems programmers to tackle high-consequence infrastructure threats, cryptographic vulnerabilities, and critical defense systems.',
    eligibility: 'Open to college students and infosec enthusiasts across India.',
    rules: [
      'Strict adherence to ethical hacking rules of engagement.',
      'No testing against infrastructure outside designated target subnets.',
      'Automated scanners that degrade shared network capacity are prohibited.'
    ],
    prizes: {
      first: '₹ 1,75,000 + Security Audit Tools License',
      second: '₹ 1,00,000',
      third: '₹ 50,000',
      specialTracks: ['Fastest CTF Root: ₹ 25,000']
    },
    schedule: [
      {
        day: 'Day 1 - Oct 02, 2026',
        items: [
          { time: '09:00 AM', title: 'Rules Briefing & Target Network Launch', description: 'Secure VPN configurations and scoring engine.' },
          { time: '10:00 AM', title: 'CTF + Defense Sandbox Open', description: 'Continuous 24-hour challenge.' }
        ]
      },
      {
        day: 'Day 2 - Oct 03, 2026',
        items: [
          { time: '10:00 AM', title: 'Scoreboard Freeze & Final Exploits Verification', description: 'Jury validation of submitted writeups.' },
          { time: '01:00 PM', title: 'Winner Announcement', description: 'Shield trophies and cash award presentation.' }
        ]
      }
    ],
    problemStatements: [
      {
        id: 'cs-1',
        track: 'Critical Infrastructure',
        title: 'SCADA Protocol Anomalous Command Detection Engine',
        description: 'Build a low-latency packet inspector identifying unauthorized Modbus commands in regional power grids.'
      },
      {
        id: 'cs-2',
        track: 'Zero-Trust Cloud',
        title: 'Microsegmentation Policy Generator via eBPF',
        description: 'Auto-generate and enforce least-privilege security policies for Kubernetes pods dynamically.'
      }
    ],
    contactEmail: 'cybershield@gitam.edu',
    contactPhone: '+91 891 286 6444',
    registrationUrl: 'https://hackzone.io/register/gitam-cyber-shield-2026',
    createdAt: '2026-09-18T14:30:00Z'
  },
  {
    id: 'gvpce-green-iot-2026',
    title: 'Smart Coast Green IoT & Robotics Challenge',
    tagline: 'Engineering low-power hardware, drone telematics, and eco-sensors for Andhra coastal conservation.',
    organizer: 'Gayatri Vidya Parishad College of Engineering & AP Innovation Society',
    bannerImage: '/src/assets/images/hackathon_iot_green_1790658203405.jpg',
    mode: 'Offline',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    collegeOrUniversity: 'Gayatri Vidya Parishad College of Engineering (GVPCE)',
    venueName: 'Centre for Innovation & Robotics Lab, GVPCE Campus, Madhurawada, Visakhapatnam',
    latitude: 17.8211,
    longitude: 83.3421,
    startDate: '2026-10-24',
    endDate: '2026-10-25',
    registrationDeadline: '2026-10-18T23:59:59',
    prizePool: '₹ 2,75,000',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 2,
    maxTeamSize: 5,
    experienceLevel: 'All Levels',
    categories: ['IoT', 'Robotics', 'Sustainability', 'Open Innovation'],
    technologies: ['ESP32', 'Raspberry Pi', 'ROS2', 'MQTT', 'C++', 'Python'],
    status: 'Registration Open',
    isVerified: true,
    isFeatured: true,
    source: 'Organizer',
    approved: true,
    description: 'Smart Coast Green IoT brings robotics, renewable electronics, and environmental telemetry together. Teams will receive hardware starter kits (microcontrollers, sensors, communication shields) and access to 3D printers and laser cutters.',
    eligibility: 'Engineering undergraduates, diploma students, and hardware makers.',
    rules: [
      'Teams must showcase physical hardware demonstration or working prototype.',
      'Safety protocols must be followed inside the mechanical fabrication lab.'
    ],
    prizes: {
      first: '₹ 1,50,000 + MakerLab Pro Pass',
      second: '₹ 80,000',
      third: '₹ 45,000'
    },
    schedule: [
      {
        day: 'Day 1 - Oct 24, 2026',
        items: [
          { time: '09:00 AM', title: 'Hardware Kit Allotment', description: 'Sensor distribution and workstation setup.' },
          { time: '11:00 AM', title: 'Sprint Begins', description: 'Fabrication and code integration.' }
        ]
      },
      {
        day: 'Day 2 - Oct 25, 2026',
        items: [
          { time: '03:00 PM', title: 'Live Testing & Track Trials', description: 'Autonomous testing on simulated terrain.' },
          { time: '06:00 PM', title: 'Prize Giving & Exhibition', description: 'Public exhibition for college students and faculty.' }
        ]
      }
    ],
    problemStatements: [
      {
        id: 'iot-1',
        track: 'Marine Health',
        title: 'Solar-Powered Low-Cost Sea Water Salinity & Microplastic Sensor Buoy',
        description: 'Deployable floating telemetry buoy reporting marine pollution indicators via LoRaWAN to cloud.'
      },
      {
        id: 'iot-2',
        track: 'Smart Agriculture',
        title: 'Autonomous Drone Precision Spraying for Hill Tract Horticulture',
        description: 'Vision-based selective pest sprayer saving 60% water and chemical run-off.'
      }
    ],
    contactEmail: 'iot-hack@gvpce.ac.in',
    contactPhone: '+91 891 273 9507',
    registrationUrl: 'https://hackzone.io/register/gvpce-green-iot-2026',
    createdAt: '2026-09-20T11:00:00Z'
  },
  {
    id: 'fintech-valley-hack-2026',
    title: 'FinTech Wave: Next-Gen Payments & Smart Contracts',
    tagline: 'Pioneering programmable money, fraud detection, and financial inclusion apps in India’s Eastern Fintech Capital.',
    organizer: 'Fintech Valley Vizag & AP E-Governance Council',
    bannerImage: '/src/assets/images/hackzone_hero_tech_1790658156890.jpg',
    mode: 'Hybrid',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    venueName: 'Millennium Tower B, IT SEZ, Rushikonda, Visakhapatnam',
    latitude: 17.7942,
    longitude: 83.3850,
    startDate: '2026-11-06',
    endDate: '2026-11-08',
    registrationDeadline: '2026-10-28T23:59:59',
    prizePool: '₹ 7,50,000',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 2,
    maxTeamSize: 4,
    experienceLevel: 'Intermediate',
    categories: ['FinTech', 'Blockchain', 'Web Development', 'Artificial Intelligence'],
    technologies: ['Solidity', 'Go', 'React', 'Node.js', 'PostgreSQL', 'Web3.js'],
    status: 'Upcoming',
    isVerified: true,
    isFeatured: true,
    source: 'Organizer',
    approved: true,
    description: 'Set at the scenic Rushikonda IT corridor in Millennium Tower, FinTech Wave unites tier-1 financial institutions, venture funds, and young builders to reimagine micro-credit, fraud mitigation, and next-gen UPI flows.',
    eligibility: 'Developers, fintech startups, college seniors, and finance tech professionals.',
    rules: [
      'Teams must build using approved sandbox payment APIs or mock blockchain testnets.',
      'Solutions must address financial data privacy standards.'
    ],
    prizes: {
      first: '₹ 4,00,000 + Fast-track seed funding interview',
      second: '₹ 2,00,000',
      third: '₹ 1,00,000',
      specialTracks: ['Best Financial Inclusion UI: ₹ 50,000']
    },
    schedule: [
      {
        day: 'Day 1 - Nov 06, 2026',
        items: [
          { time: '10:00 AM', title: 'Inauguration & Sandbox API Access', description: 'Receive test API keys and architectural constraints.' }
        ]
      },
      {
        day: 'Day 3 - Nov 08, 2026',
        items: [
          { time: '04:00 PM', title: 'Grand Pitching & Valuation Day', description: 'Pitch to VC partners and financial regulatory judges.' }
        ]
      }
    ],
    problemStatements: [
      {
        id: 'ft-1',
        track: 'Micro-Credit',
        title: 'Cashflow-Based Alternative Credit Scoring for Artisans and Fisherfolk',
        description: 'Provide fair credit ratings based on recurring utility habits and local cooperative transactions.'
      }
    ],
    contactEmail: 'connect@fintechvalleyvizag.gov.in',
    contactPhone: '+91 891 289 9000',
    registrationUrl: 'https://hackzone.io/register/fintech-valley-hack-2026',
    createdAt: '2026-09-22T09:00:00Z'
  },
  {
    id: 'all-india-open-dev-2026',
    title: 'National Web3 & AI Open Cloud Sprint',
    tagline: '48-hour global virtual hackathon empowering developers to ship open-source web and AI apps.',
    organizer: 'DevSphere Global & Open Source AP Chapter',
    bannerImage: '/src/assets/images/hackzone_hero_tech_1790658156890.jpg',
    mode: 'Online',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Online / Remote Discord & GitHub',
    venueName: 'Online Virtual Stage (Discord & YouTube Live)',
    latitude: 17.6868,
    longitude: 83.2185,
    startDate: '2026-09-28',
    endDate: '2026-09-30',
    registrationDeadline: '2026-09-28T23:59:59',
    prizePool: '₹ 8,30,000 ($10,000)',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 1,
    maxTeamSize: 4,
    experienceLevel: 'All Levels',
    categories: ['Web Development', 'Open Innovation', 'Artificial Intelligence', 'Cloud Computing'],
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Supabase', 'Cloudflare Workers'],
    status: 'Ongoing',
    isVerified: true,
    isFeatured: false,
    source: 'Aggregator',
    approved: true,
    description: 'An open global sprint happening right now! Developers from Visakhapatnam and around the world collaborate remotely across Discord channels to build web tools, developer utilities, and AI productivity agents.',
    eligibility: 'Anyone anywhere in the world with an internet connection and a passion for coding.',
    rules: [
      'Repository must be public with open-source license.',
      'Demo video (max 3 minutes) uploaded to YouTube/Loom.'
    ],
    prizes: {
      first: '₹ 4,00,000',
      second: '₹ 2,50,000',
      third: '₹ 1,80,000'
    },
    schedule: [
      {
        day: 'Day 1 - Sep 28, 2026',
        items: [
          { time: '09:00 AM', title: 'Kickoff Stream', description: 'Keynote and channel assignments.' }
        ]
      },
      {
        day: 'Day 3 - Sep 30, 2026',
        items: [
          { time: '11:59 PM', title: 'Submissions Close', description: 'PR submission and community voting.' }
        ]
      }
    ],
    problemStatements: [
      {
        id: 'open-1',
        track: 'Developer Tooling',
        title: 'Local-First Collaborative Code Reviewer',
        description: 'Real-time diff annotation tool that works smoothly even with intermittent connectivity.'
      }
    ],
    contactEmail: 'hello@devsphereglobal.org',
    registrationUrl: 'https://hackzone.io/register/all-india-open-dev-2026',
    createdAt: '2026-09-10T12:00:00Z'
  },
  {
    id: 'srm-ap-genai-marathon',
    title: 'Amaravati GenAI Innovators Marathon',
    tagline: 'Build agentic workflows and intelligent applications on enterprise foundation models.',
    organizer: 'SRM University AP & Industry AI Consortium',
    bannerImage: '/src/assets/images/hackathon_vizag_ai_1790658174737.jpg',
    mode: 'Hybrid',
    state: 'Andhra Pradesh',
    district: 'NTR / Vijayawada',
    city: 'Amaravati / Vijayawada',
    collegeOrUniversity: 'SRM University AP',
    venueName: 'APJ Abdul Kalam Auditorium, SRM University Campus, Neerukonda, Amaravati',
    latitude: 16.4800,
    longitude: 80.5050,
    startDate: '2026-10-15',
    endDate: '2026-10-16',
    registrationDeadline: '2026-10-11T23:59:59',
    prizePool: '₹ 4,00,000',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 2,
    maxTeamSize: 4,
    experienceLevel: 'All Levels',
    categories: ['Artificial Intelligence', 'Machine Learning', 'App Development'],
    technologies: ['LangChain', 'Python', 'React Native', 'FastAPI'],
    status: 'Registration Open',
    isVerified: true,
    isFeatured: false,
    source: 'Organizer',
    approved: true,
    description: 'Amaravati GenAI Marathon challenges university students to build real-world AI assistants, autonomous bots, and intelligent workflow automations for regional governance and education.',
    eligibility: 'All students enrolled in recognized universities.',
    rules: ['Teams must submit working GitHub code and demonstrate API calls.'],
    prizes: {
      first: '₹ 2,00,000',
      second: '₹ 1,20,000',
      third: '₹ 80,000'
    },
    schedule: [
      {
        day: 'Day 1 - Oct 15',
        items: [{ time: '10:00 AM', title: 'Sprint Kickoff', description: 'API workshops and hacking begins.' }]
      }
    ],
    problemStatements: [
      {
        id: 'srm-1',
        track: 'GovTech',
        title: 'Vernacular Telugu Language Voice Assistant for Public Welfare Schemes',
        description: 'Speech-to-speech AI answering welfare eligibility queries naturally in regional dialects.'
      }
    ],
    contactEmail: 'genai-hack@srmap.edu.in',
    registrationUrl: 'https://hackzone.io/register/srm-ap-genai-marathon',
    createdAt: '2026-09-21T08:00:00Z'
  },
  {
    id: 'iit-tirupati-deeptech',
    title: 'DeepTech & Quantum Leapathon 2026',
    tagline: 'Solving computational bottlenecks in materials science, cryptography, and space tech.',
    organizer: 'IIT Tirupati Innovation & Incubation Cell',
    bannerImage: '/src/assets/images/hackathon_cyber_summit_1790658190326.jpg',
    mode: 'Offline',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    city: 'Tirupati',
    collegeOrUniversity: 'IIT Tirupati',
    venueName: 'Central Lecture Theatre, IIT Tirupati Permanent Campus, Yerpedu',
    latitude: 13.6288,
    longitude: 79.4192,
    startDate: '2026-11-14',
    endDate: '2026-11-15',
    registrationDeadline: '2026-11-05T23:59:59',
    prizePool: '₹ 6,00,000',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 2,
    maxTeamSize: 4,
    experienceLevel: 'Advanced',
    categories: ['Data Science', 'Cybersecurity', 'Open Innovation'],
    technologies: ['Qiskit', 'Rust', 'C++', 'CUDA', 'Python'],
    status: 'Upcoming',
    isVerified: true,
    isFeatured: false,
    source: 'Organizer',
    approved: true,
    description: 'Organized at the state-of-the-art IIT Tirupati campus, this hackathon pushes high-performance computing, quantum circuit simulations, and algorithmic optimization to their limits.',
    eligibility: 'Pre-final, final year students, postgraduates, and researchers.',
    rules: ['Rigorous benchmarks will be run on official cluster testbeds.'],
    prizes: {
      first: '₹ 3,50,000',
      second: '₹ 1,75,000',
      third: '₹ 75,000'
    },
    schedule: [
      {
        day: 'Day 1 - Nov 14',
        items: [{ time: '09:00 AM', title: 'Cluster Access & Benchmarks', description: 'Compute node allocation.' }]
      }
    ],
    problemStatements: [
      {
        id: 'deep-1',
        track: 'Quantum Optimization',
        title: 'Route Optimization for High-Density Grid Logistics using QAOA',
        description: 'Simulate quantum approximate optimization algorithms for supply chain routing.'
      }
    ],
    contactEmail: 'leapathon@iittp.ac.in',
    registrationUrl: 'https://hackzone.io/register/iit-tirupati-deeptech',
    createdAt: '2026-09-23T15:00:00Z'
  },
  {
    id: 'iiit-hyderabad-hack',
    title: 'Autonomous AI & Edge Intelligence Hack',
    tagline: 'Designing computer vision algorithms and low-power autonomous robot navigation models.',
    organizer: 'IIIT Hyderabad Center for Innovation & Entrepreneurship',
    bannerImage: '/src/assets/images/hackathon_iot_green_1790658203405.jpg',
    mode: 'Hybrid',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Hyderabad',
    collegeOrUniversity: 'IIIT Hyderabad',
    venueName: 'Kohli Research Block, Gachibowli, Hyderabad',
    latitude: 17.4455,
    longitude: 78.3490,
    startDate: '2026-10-18',
    endDate: '2026-10-20',
    registrationDeadline: '2026-10-12T23:59:59',
    prizePool: '₹ 8,00,000',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 2,
    maxTeamSize: 4,
    experienceLevel: 'Intermediate',
    categories: ['Robotics', 'Artificial Intelligence', 'IoT', 'Machine Learning'],
    technologies: ['ROS2', 'YOLOv10', 'TensorRT', 'Python', 'C++'],
    status: 'Registration Open',
    isVerified: true,
    isFeatured: false,
    source: 'Organizer',
    approved: true,
    description: 'Premier autonomous systems challenge in Hyderabad’s tech corridor, testing real-time obstacle avoidance, visual odometry, and edge inference.',
    eligibility: 'All college teams and startup builders.',
    rules: ['Physical robot or high-fidelity Isaac Sim / Gazebo simulation accepted.'],
    prizes: {
      first: '₹ 4,50,000',
      second: '₹ 2,50,000',
      third: '₹ 1,00,000'
    },
    schedule: [
      {
        day: 'Day 1 - Oct 18',
        items: [{ time: '10:00 AM', title: 'Arena Simulation Unveiling', description: 'Track testing and live telemetry.' }]
      }
    ],
    problemStatements: [
      {
        id: 'auto-1',
        track: 'Autonomous Nav',
        title: 'Edge AI Drone Precision Landing on Moving Platforms',
        description: 'Real-time vision based marker detection running on under 15 Watts power budget.'
      }
    ],
    contactEmail: 'cie@iiit.ac.in',
    registrationUrl: 'https://hackzone.io/register/iiit-hyderabad-hack',
    createdAt: '2026-09-19T10:00:00Z'
  },
  {
    id: 'vizag-viit-coastal-drone',
    title: 'VIIT Coastal Drone & Clean Ocean Hack',
    tagline: 'Smart coastal monitoring and drone surveillance for Bay of Bengal beaches and harbors.',
    organizer: 'Vignan Institute of Information Technology (VIIT)',
    bannerImage: '/src/assets/images/hackathon_iot_green_1790658203405.jpg',
    mode: 'Offline',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    collegeOrUniversity: 'Vignan’s Institute of Information Technology (VIIT)',
    venueName: 'VIIT Main Auditorium, Duvvada, Visakhapatnam',
    latitude: 17.7099,
    longitude: 83.1661,
    startDate: '2026-11-20',
    endDate: '2026-11-21',
    registrationDeadline: '2026-11-12T23:59:59',
    prizePool: '₹ 2,00,000',
    currency: 'INR',
    fee: 'Free',
    minTeamSize: 2,
    maxTeamSize: 4,
    experienceLevel: 'Beginner',
    categories: ['IoT', 'Robotics', 'Sustainability'],
    technologies: ['ArduPilot', 'Python', 'OpenCV', 'ESP32'],
    status: 'Upcoming',
    isVerified: false, // Pending verification test for Admin!
    isFeatured: false,
    source: 'Organizer',
    approved: false, // Admin can approve/verify in Admin panel!
    description: 'Submitted by student tech club at VIIT Duvvada, focused on building aerial monitoring and automated beach cleanup drones.',
    eligibility: 'College engineering students across Andhra Pradesh.',
    rules: ['Teams must submit design simulation before physical flight testing.'],
    prizes: {
      first: '₹ 1,00,000',
      second: '₹ 60,000',
      third: '₹ 40,000'
    },
    schedule: [
      {
        day: 'Day 1 - Nov 20',
        items: [{ time: '09:30 AM', title: 'Assemble & Review', description: 'Safety inspection.' }]
      }
    ],
    problemStatements: [
      {
        id: 'drone-1',
        track: 'Beach Conservation',
        title: 'Autonomous Beach Litter Identification and Mapping Drone',
        description: 'Map plastic debris density along RK Beach and Rushikonda Beach.'
      }
    ],
    contactEmail: 'drones@vignan.edu.in',
    registrationUrl: 'https://hackzone.io/register/vizag-viit-coastal-drone',
    createdAt: '2026-09-27T18:00:00Z'
  }
];

export const INITIAL_USER: import('../types').UserProfile = {
  id: 'usr-default-01',
  name: 'Harshini Molleti',
  email: 'harshinimolleti1001@gmail.com',
  role: 'developer',
  college: 'Andhra University College of Engineering',
  state: 'Andhra Pradesh',
  district: 'Visakhapatnam',
  city: 'Visakhapatnam',
  interests: ['Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Web Development'],
  skills: ['Python', 'TypeScript', 'PyTorch', 'React', 'FastAPI'],
  savedHackathonIds: ['vizag-ai-nexus-2026', 'gitam-cyber-shield-2026'],
  registeredHackathons: [
    {
      hackathonId: 'vizag-ai-nexus-2026',
      teamName: 'Vizag Neural Pioneers',
      registeredAt: '2026-09-25T14:20:00Z',
      membersCount: 3
    }
  ],
  notificationPreferences: {
    districtAlerts: true,
    deadlineAlerts: true,
    interestAlerts: true,
    newsletter: false
  }
};

export const INITIAL_NOTIFICATIONS: import('../types').AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Registration Closing Soon!',
    message: 'Only 2 days remaining to register for CyberShield AP & DefHack 2026 at GITAM University, Visakhapatnam.',
    type: 'deadline',
    timestamp: '1 hour ago',
    read: false,
    hackathonId: 'gitam-cyber-shield-2026'
  },
  {
    id: 'notif-2',
    title: 'New Hackathon in Visakhapatnam!',
    message: 'Smart Coast Green IoT & Robotics Challenge has opened registrations at GVPCE Madhurawada.',
    type: 'district',
    timestamp: '5 hours ago',
    read: false,
    hackathonId: 'gvpce-green-iot-2026'
  },
  {
    id: 'notif-3',
    title: 'Matches Your Interests (AI/ML)',
    message: 'Vizag AI & Quantum Nexus Hackathon 2026 matches your skill profile in Visakhapatnam with ₹5,00,000 prize pool!',
    type: 'interest',
    timestamp: '1 day ago',
    read: true,
    hackathonId: 'vizag-ai-nexus-2026'
  }
];

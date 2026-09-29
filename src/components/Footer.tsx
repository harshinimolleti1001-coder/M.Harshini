import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedDistrict, setSelectedState } = useApp();

  const handlePickDistrict = (s: string, d: string) => {
    setSelectedState(s);
    setSelectedDistrict(d);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-xs text-slate-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div 
              className="text-xl font-bold tracking-tight text-white flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white text-xs font-mono">
                HZ
              </span>
              <span>HackZone</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's decentralized discovery portal for district and university hackathons. Empowering student innovators, researchers, and tech communities.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified Community Challenges</span>
            </div>
          </div>

          {/* District Portals */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Andhra Pradesh Hubs
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => handlePickDistrict('Andhra Pradesh', 'Visakhapatnam')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Visakhapatnam (Vizag)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePickDistrict('Andhra Pradesh', 'NTR / Vijayawada')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Vijayawada & Amaravati
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePickDistrict('Andhra Pradesh', 'Tirupati')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Tirupati & Rayalaseema
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePickDistrict('Andhra Pradesh', 'East Godavari / Kakinada')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Kakinada & Godavari
                </button>
              </li>
            </ul>
          </div>

          {/* National Tech Hubs */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              National Tech Zones
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => handlePickDistrict('Telangana', 'Hyderabad')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Hyderabad Cyberabad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePickDistrict('Karnataka', 'Bengaluru Urban')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Bengaluru Tech Capital
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePickDistrict('Tamil Nadu', 'Chennai')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Chennai Coastal Corridor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePickDistrict('Maharashtra', 'Pune')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Pune Innovation District
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Explore HackZone
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-white transition-colors">
                  All Hackathons Listing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-white transition-colors">
                  Interactive GIS Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('upcoming')} className="hover:text-white transition-colors">
                  Live Countdown & Schedule
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('categories')} className="hover:text-white transition-colors">
                  Categories & Domains
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 HackZone Platform. Built for developers across India and beyond.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Configured for Visakhapatnam, Andhra Pradesh · Expandable nationwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

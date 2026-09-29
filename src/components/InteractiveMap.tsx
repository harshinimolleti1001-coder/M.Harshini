import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hackathon } from '../types';
import { STATES_AND_DISTRICTS } from '../data/locations';
import { 
  MapPin, 
  Calendar, 
  Trophy, 
  Compass, 
  ExternalLink, 
  Maximize2, 
  ShieldCheck, 
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import L from 'leaflet';

export const InteractiveMap: React.FC = () => {
  const {
    hackathons,
    selectedDistrict,
    setSelectedDistrict,
    setSelectedHackathonId,
    setOpenRegistrationModalForId
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  const [activeHackathon, setActiveHackathon] = useState<Hackathon | null>(null);
  const [filterMode, setFilterMode] = useState<string>('all');

  // Filter hackathons with valid coordinates
  const mappableHackathons = hackathons.filter(h => {
    const hasCoords = typeof h.latitude === 'number' && typeof h.longitude === 'number';
    const matchesMode = filterMode === 'all' || h.mode.toLowerCase() === filterMode.toLowerCase();
    return hasCoords && matchesMode;
  });

  // Current district coordinates fallback
  const currentDistrictInfo = STATES_AND_DISTRICTS
    .flatMap(s => s.districts)
    .find(d => d.name.toLowerCase() === selectedDistrict.toLowerCase());

  const initialLat = currentDistrictInfo?.coordinates.lat || 17.6868;
  const initialLng = currentDistrictInfo?.coordinates.lng || 83.2185;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy prior map if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 12,
      scrollWheelZoom: true
    });

    // Dark sleek OpenStreetMap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when mappable hackathons or district changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    mappableHackathons.forEach(h => {
      // Custom HTML Pin icon with vibrant colors
      const isAI = h.categories.includes('Artificial Intelligence') || h.categories.includes('Machine Learning');
      const isCyber = h.categories.includes('Cybersecurity');
      const isIoT = h.categories.includes('IoT') || h.categories.includes('Robotics');

      const pinColor = isAI ? '#6366f1' : isCyber ? '#f43f5e' : isIoT ? '#10b981' : '#06b6d4';

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: ${pinColor};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <div style="
              width: 12px;
              height: 12px;
              background: #ffffff;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([h.latitude, h.longitude], { icon: customIcon }).addTo(map);

      // Bind popup
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 text-slate-900 font-sans';
      popupContent.innerHTML = `
        <div style="font-weight: 700; font-size: 13px; margin-bottom: 2px; color: #0f172a;">${h.title}</div>
        <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">📍 ${h.venueName}</div>
        <div style="display: flex; gap: 8px; font-size: 11px; font-weight: 600; margin-bottom: 6px;">
          <span style="color: #4f46e5;">🗓️ ${h.startDate}</span>
          <span style="color: #d97706;">🏆 ${h.prizePool}</span>
        </div>
        <p style="font-size: 11px; color: #334155; line-height: 1.3; margin-bottom: 8px;">${h.tagline.slice(0, 85)}...</p>
        <button id="view-hack-${h.id}" style="
          width: 100%;
          background: #4f46e5;
          color: white;
          border: none;
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        ">View Details</button>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setActiveHackathon(h);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-hack-${h.id}`);
        if (btn) {
          btn.onclick = () => setSelectedHackathonId(h.id);
        }
      });

      markersRef.current[h.id] = marker;
    });

    // Auto select first hackathon for card preview
    if (!activeHackathon && mappableHackathons.length > 0) {
      setActiveHackathon(mappableHackathons[0]);
    }
  }, [mappableHackathons.length, filterMode]);

  // Handle District Jump
  const handleFlyToDistrict = (districtName: string) => {
    setSelectedDistrict(districtName);
    const dInfo = STATES_AND_DISTRICTS
      .flatMap(s => s.districts)
      .find(d => d.name.toLowerCase() === districtName.toLowerCase());

    if (dInfo && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([dInfo.coordinates.lat, dInfo.coordinates.lng], 13, {
        duration: 1.5
      });
    }
  };

  const handleSelectCard = (hack: Hackathon) => {
    setActiveHackathon(hack);
    if (mapInstanceRef.current && hack.latitude && hack.longitude) {
      mapInstanceRef.current.flyTo([hack.latitude, hack.longitude], 14, { duration: 1.2 });
      const m = markersRef.current[hack.id];
      if (m) m.openPopup();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl backdrop-blur-md">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Geographical Discovery Map</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Hackathons by Location & District
          </h2>
          <p className="text-xs text-slate-400">
            Click on map pins or select an event card to view venues, college hubs, and live dates.
          </p>
        </div>

        {/* Quick District Fly-to Jump Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-medium text-[11px]">Fly to:</span>
          {['Visakhapatnam', 'NTR / Vijayawada', 'Tirupati', 'Hyderabad', 'Bengaluru Urban'].map(dName => (
            <button
              key={dName}
              onClick={() => handleFlyToDistrict(dName)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                selectedDistrict === dName
                  ? 'bg-indigo-600 border-indigo-500 text-white font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {dName.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Layout: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Map Canvas Column (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative">
          
          {/* Map floating control bar */}
          <div className="absolute top-3 left-3 z-[400] flex items-center gap-2 bg-slate-950/90 border border-slate-800 backdrop-blur-md p-1.5 rounded-xl shadow-lg text-xs">
            <span className="text-[11px] font-semibold text-slate-400 px-1">Mode:</span>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode('offline')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'offline' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Offline
            </button>
            <button
              onClick={() => setFilterMode('hybrid')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'hybrid' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Hybrid
            </button>
          </div>

          {/* Map pin legend on bottom right */}
          <div className="absolute bottom-3 right-3 z-[400] bg-slate-950/90 border border-slate-800 backdrop-blur-md px-3 py-2 rounded-xl text-[11px] text-slate-300 shadow-lg hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>AI / ML</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Cyber</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>IoT / Green</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span>Open Dev</span>
            </div>
          </div>

          {/* The Leaflet Container */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[450px] sm:h-[560px] z-10" 
            style={{ minHeight: '450px' }}
          />
        </div>

        {/* Sidebar Cards Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider px-1">
            <span>District Pins ({mappableHackathons.length})</span>
            <span>Click to Fly</span>
          </div>

          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1 custom-scrollbar">
            {mappableHackathons.map(h => {
              const isSelected = activeHackathon?.id === h.id;
              return (
                <div
                  key={h.id}
                  onClick={() => handleSelectCard(h)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-xs space-y-2 ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500 shadow-lg shadow-indigo-950/50'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-cyan-400 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {h.district}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-300">
                      {h.mode}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm line-clamp-1">
                    {h.title}
                  </h4>

                  <p className="text-slate-400 text-xs line-clamp-2">
                    {h.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
                    <span className="text-amber-400 font-bold">{h.prizePool}</span>
                    <span className="text-slate-300">{h.startDate}</span>
                  </div>

                  {isSelected && (
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHackathonId(h.id);
                        }}
                        className="w-full py-1.5 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>View Full Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

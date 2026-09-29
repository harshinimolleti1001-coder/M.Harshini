import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/locations';
import { 
  Brain, 
  Cpu, 
  Globe, 
  Smartphone, 
  Shield, 
  Boxes, 
  Wifi, 
  Cloud, 
  Database, 
  Bot, 
  Activity, 
  CreditCard, 
  Leaf, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Boxes: <Boxes className="w-6 h-6" />,
  Wifi: <Wifi className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
  Leaf: <Leaf className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />
};

export const CategoriesSection: React.FC = () => {
  const { setFilterState, setActiveTab, hackathons } = useApp();

  const handleSelectCategory = (catName: string) => {
    setFilterState(prev => ({ ...prev, category: catName }));
    setActiveTab('explore');
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 
          className="text-3xl font-extrabold text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Explore by Technology Domain
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Find specialized challenges aligned with your tech stack, research area, or career goals.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES_LIST.map((cat, idx) => {
          // Calculate live count from hackathons database
          const liveCount = hackathons.filter(h => 
            h.categories.some(c => c.toLowerCase() === cat.name.toLowerCase())
          ).length;

          return (
            <button
              key={cat.name}
              onClick={() => handleSelectCategory(cat.name)}
              className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-indigo-500/50 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden shadow-lg active:scale-95"
            >
              {/* Subtle gradient corner glow */}
              <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${cat.color} opacity-15 blur-xl group-hover:opacity-30 transition-opacity`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                {ICON_MAP[cat.icon] || <Sparkles className="w-6 h-6" />}
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                {cat.name}
              </h3>

              <div className="mt-2 flex items-center justify-between w-full text-xs text-slate-400">
                <span className="tabular-nums font-medium">
                  {liveCount} {liveCount === 1 ? 'hackathon' : 'hackathons'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

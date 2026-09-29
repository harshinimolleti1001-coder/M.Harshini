import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Bell, 
  CheckCheck, 
  MapPin, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  ChevronRight 
} from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setSelectedHackathonId
  } = useApp();

  const handleNotificationClick = (id: string, hackathonId?: string) => {
    markNotificationRead(id);
    if (hackathonId) {
      setSelectedHackathonId(hackathonId);
      onClose();
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'district':
        return <MapPin className="w-4 h-4 text-cyan-400" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-rose-400" />;
      case 'interest':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'approval':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Notifications & Alerts</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No notifications at the moment.
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n.id, n.hackathonId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 text-xs ${
                  n.read
                    ? 'bg-slate-950/50 border-slate-800/80 text-slate-400'
                    : 'bg-indigo-950/30 border-indigo-500/40 text-slate-200 shadow-md'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                  {getNotifIcon(n.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-white text-xs">{n.title}</h4>
                    <span className="text-[10px] text-slate-500 shrink-0 font-mono">{n.timestamp}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{n.message}</p>
                  {n.hackathonId && (
                    <span className="text-[11px] text-cyan-400 font-medium inline-flex items-center gap-1 pt-1">
                      <span>View Hackathon</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

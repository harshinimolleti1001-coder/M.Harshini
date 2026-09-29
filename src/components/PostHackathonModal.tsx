import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hackathon, HackathonMode, Category } from '../types';
import { STATES_AND_DISTRICTS, CATEGORIES_LIST } from '../data/locations';
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  Trophy, 
  Users, 
  Laptop, 
  Mail, 
  Phone, 
  Globe, 
  Plus, 
  Trash2,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface PostHackathonModalProps {
  onClose: () => void;
}

export const PostHackathonModal: React.FC<PostHackathonModalProps> = ({ onClose }) => {
  const { user, submitHackathon } = useApp();

  const [stateName, setStateName] = useState('Andhra Pradesh');
  const [districtName, setDistrictName] = useState('Visakhapatnam');
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [organizer, setOrganizer] = useState(user?.name ? `${user.name} Labs` : '');
  const [venueName, setVenueName] = useState('');
  const [collegeOrUniversity, setCollegeOrUniversity] = useState('');
  const [mode, setMode] = useState<HackathonMode>('Offline');
  const [startDate, setStartDate] = useState('2026-11-15');
  const [endDate, setEndDate] = useState('2026-11-16');
  const [registrationDeadline, setRegistrationDeadline] = useState('2026-11-10T23:59:59');
  const [prizePool, setPrizePool] = useState('₹ 2,00,000');
  const [firstPrize, setFirstPrize] = useState('₹ 1,00,000');
  const [secondPrize, setSecondPrize] = useState('₹ 60,000');
  const [thirdPrize, setThirdPrize] = useState('₹ 40,000');
  const [fee, setFee] = useState<'Free' | 'Paid'>('Free');
  const [minTeamSize, setMinTeamSize] = useState(2);
  const [maxTeamSize, setMaxTeamSize] = useState(4);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['Artificial Intelligence']);
  const [techInput, setTechInput] = useState('Python, React, FastAPI');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('Open to all college students, developers, and tech teams.');
  const [rules, setRules] = useState([
    'All code must be original and built during the designated hackathon window.',
    'Teams must demo a working prototype to the jury.'
  ]);
  const [newRule, setNewRule] = useState('');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState('+91 891 284 0000');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [formError, setFormError] = useState('');

  const currentDistricts = STATES_AND_DISTRICTS.find(s => s.name === stateName)?.districts || [];

  const handleCategoryToggle = (cat: Category) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()]);
      setNewRule('');
    }
  };

  const handleRemoveRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !organizer.trim() || !description.trim()) {
      setFormError('Please fill out the Hackathon Title, Organizer, and Description.');
      return;
    }

    const techArray = techInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    // Approximate coordinates for district
    const districtCoords = currentDistricts.find(d => d.name === districtName)?.coordinates || { lat: 17.6868, lng: 83.2185 };

    const newHackathonData: Partial<Hackathon> = {
      title: title.trim(),
      tagline: tagline.trim() || 'A high-impact competitive hackathon',
      organizer: organizer.trim(),
      mode,
      state: stateName,
      district: districtName,
      city: districtName.split('/')[0].trim(),
      venueName: venueName.trim() || `${districtName} Innovation Campus`,
      collegeOrUniversity: collegeOrUniversity.trim() || undefined,
      latitude: districtCoords.lat,
      longitude: districtCoords.lng,
      startDate,
      endDate,
      registrationDeadline,
      prizePool,
      fee,
      minTeamSize,
      maxTeamSize,
      categories: selectedCategories,
      technologies: techArray.length > 0 ? techArray : ['Fullstack', 'AI'],
      description: description.trim(),
      eligibility: eligibility.trim(),
      rules,
      prizes: {
        first: firstPrize,
        second: secondPrize,
        third: thirdPrize
      },
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      registrationUrl: registrationUrl.trim()
    };

    submitHackathon(newHackathonData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Organizer Portal</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Post a New Hackathon
            </h3>
            <p className="text-xs text-slate-400">
              Submit your college or corporate hackathon. It will be reviewed by admin and listed publicly in your selected district.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {formError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs custom-scrollbar">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> 01. Event Overview
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">
                  Hackathon Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Vizag Smart City AI Sprint 2026"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Organizer / University Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="e.g. Andhra University Coding Club"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Format / Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-indigo-500"
                >
                  <option value="Offline">Offline (In-Person)</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Online">Online (Virtual)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">Tagline / Short Hook</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="One sentence describing the challenge and purpose"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">
                  Complete Description <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide comprehensive details about themes, expectations, mentorship, and outcome..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location & Geographical Zone */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> 02. Geographical Zone & Venue
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">State</label>
                <select
                  value={stateName}
                  onChange={(e) => {
                    setStateName(e.target.value);
                    const d = STATES_AND_DISTRICTS.find(s => s.name === e.target.value)?.districts[0]?.name || '';
                    setDistrictName(d);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-indigo-500"
                >
                  {STATES_AND_DISTRICTS.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">District / Zone</label>
                <select
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-indigo-300 font-semibold focus:border-indigo-500"
                >
                  {currentDistricts.map(d => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Venue / Auditorium Address</label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g. AUCE Assembly Hall, Waltair Uplands"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Host College / University (Optional)</label>
                <input
                  type="text"
                  value={collegeOrUniversity}
                  onChange={(e) => setCollegeOrUniversity(e.target.value)}
                  placeholder="e.g. Andhra University"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Dates, Deadlines & Team Size */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> 03. Timeline & Participation
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Registration Deadline</label>
                <input
                  type="datetime-local"
                  value={registrationDeadline.slice(0, 16)}
                  onChange={(e) => setRegistrationDeadline(e.target.value + ':00')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Min Team Size</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={minTeamSize}
                  onChange={(e) => setMinTeamSize(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Max Team Size</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={maxTeamSize}
                  onChange={(e) => setMaxTeamSize(parseInt(e.target.value) || 4)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Fee</label>
                <select
                  value={fee}
                  onChange={(e) => setFee(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:border-indigo-500"
                >
                  <option value="Free">Free to Attend</option>
                  <option value="Paid">Paid Registration</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Prizes & Categories */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4" /> 04. Prizes & Categories
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Total Prize Pool</label>
                <input
                  type="text"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  placeholder="e.g. ₹ 3,00,000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-bold focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">First Place Prize</label>
                <input
                  type="text"
                  value={firstPrize}
                  onChange={(e) => setFirstPrize(e.target.value)}
                  placeholder="e.g. ₹ 1,50,000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1.5">
                  Select Categories (Pick at least 1)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES_LIST.map(cat => {
                    const isSelected = selectedCategories.includes(cat.name as any);
                    return (
                      <button
                        type="button"
                        key={cat.name}
                        onClick={() => handleCategoryToggle(cat.name as any)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">
                  Required Technologies / Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g. Python, Docker, React, PyTorch, LoRaWAN"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Contact & Official Registration */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> 05. Contact & Official Registration
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Contact Email</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">External Portal URL</label>
                <input
                  type="url"
                  value={registrationUrl}
                  onChange={(e) => setRegistrationUrl(e.target.value)}
                  placeholder="https://example.org/hack"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Submission Notice */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-slate-300">
            <p className="font-semibold text-indigo-300 mb-0.5">Verification Assurance Protocol</p>
            <p className="text-slate-400">
              Submitted events will be verified by the HackZone district administration team to protect participants from illegitimate competitions. Once approved, it receives the official "Verified" shield badge.
            </p>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
            >
              Submit for Admin Review
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

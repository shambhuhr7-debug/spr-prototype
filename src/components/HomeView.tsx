import React from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, Droplet, 
  MapPin, HeartHandshake, Users, ArrowRight, 
  FileText, Calendar, Radio, Sparkles, Building2,
  Lock, Landmark
} from 'lucide-react';
import { MOCK_JOBS, SYSTEM_STATS } from '../data';
import { OdorReport } from '../types';
import AnimatedProcessFlow from './AnimatedProcessFlow';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'parc' | 'careers') => void;
  reduceMotion: boolean;
}

export default function HomeView({ onNavigate, reduceMotion }: HomeViewProps) {
  // Animated Stats State
  const [residents, setResidents] = React.useState(0);
  const [communities, setCommunities] = React.useState(0);
  const [serviceArea, setServiceArea] = React.useState(0);
  const [farmAcres, setFarmAcres] = React.useState(0);
  const statsRef = React.useRef<HTMLDivElement>(null);

  // Concern Form State
  const [concernLocation, setConcernLocation] = React.useState('');
  const [concernCategory, setConcernCategory] = React.useState('Odor');
  const [concernDesc, setConcernDesc] = React.useState('');
  const [reporterEmail, setReporterEmail] = React.useState('');
  const [reporterRole, setReporterRole] = React.useState('Resident');
  const [formError, setFormError] = React.useState('');
  const [successTicket, setSuccessTicket] = React.useState('');
  const [localReports, setLocalReports] = React.useState<OdorReport[]>([
    {
      timestamp: "10 minutes ago",
      locationType: "Platte River Trail Near Basin 3",
      intensity: "Negligible",
      description: "Slight chemical clean odor, otherwise perfectly normal River breeze.",
      reporterStatus: "Resident"
    },
    {
      timestamp: "2 hours ago",
      locationType: "Dewatering Centrifuge perimeter",
      intensity: "None",
      description: "Everything nominal, no odor traveling beyond primary boundary.",
      reporterStatus: "Visitor"
    }
  ]);

  // Daily Odor Rating - interactive demo element
  const [odorStatus, setOdorStatus] = React.useState<'None' | 'Light' | 'Moderate'>('None');

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) {
      // Fallback
      setResidents(300000);
      setCommunities(19);
      setServiceArea(108);
      setFarmAcres(7530);
      return;
    }

    if (reduceMotion) {
      setResidents(300000);
      setCommunities(19);
      setServiceArea(108);
      setFarmAcres(7530);
      return;
    }

    let rInterval: NodeJS.Timeout;
    let cInterval: NodeJS.Timeout;
    let sInterval: NodeJS.Timeout;
    let fInterval: NodeJS.Timeout;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Clear active intervals
          clearInterval(rInterval);
          clearInterval(cInterval);
          clearInterval(sInterval);
          clearInterval(fInterval);

          // Reset values
          setResidents(0);
          setCommunities(0);
          setServiceArea(0);
          setFarmAcres(0);

          let rStart = 0;
          rInterval = setInterval(() => {
            rStart += 6000;
            if (rStart >= 300000) {
              setResidents(300000);
              clearInterval(rInterval);
            } else {
              setResidents(rStart);
            }
          }, 16);

          let cStart = 0;
          cInterval = setInterval(() => {
            cStart += 1;
            if (cStart >= 19) {
              setCommunities(19);
              clearInterval(cInterval);
            } else {
              setCommunities(cStart);
            }
          }, 24);

          let sStart = 0;
          sInterval = setInterval(() => {
            sStart += 3;
            if (sStart >= 108) {
              setServiceArea(108);
              clearInterval(sInterval);
            } else {
              setServiceArea(sStart);
            }
          }, 16);

          let fStart = 0;
          fInterval = setInterval(() => {
            fStart += 125;
            if (fStart >= 7530) {
              setFarmAcres(7530);
              clearInterval(fInterval);
            } else {
              setFarmAcres(fStart);
            }
          }, 16);
        } else {
          // Reset to 0 when out of view
          setResidents(0);
          setCommunities(0);
          setServiceArea(0);
          setFarmAcres(0);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearInterval(rInterval);
      clearInterval(cInterval);
      clearInterval(sInterval);
      clearInterval(fInterval);
    };
  }, [reduceMotion]);

  const handleConcernSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessTicket('');

    if (!concernLocation.trim()) {
      setFormError('Please describe the location where you observed the issue.');
      return;
    }
    if (!concernDesc.trim()) {
      setFormError('Please enter a short description of the concern.');
      return;
    }

    // Generate random mock tracking ID
    const ticketId = `SPR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setSuccessTicket(ticketId);

    // Append to local reports
    const newReport: OdorReport = {
      timestamp: "Just now",
      locationType: concernLocation,
      intensity: concernCategory === 'Odor' ? 'Noticeable' : 'Negligible',
      description: concernDesc,
      reporterStatus: reporterRole as any,
      reporterEmail: reporterEmail || undefined
    };

    setLocalReports([newReport, ...localReports]);

    // Reset controls
    setConcernLocation('');
    setConcernDesc('');
    setReporterEmail('');
  };

  return (
    <div className="space-y-12">
      {/* 1. HERO CONTAINER */}
      <section 
        className="relative bg-gradient-to-br from-slate-900 via-brand-depth to-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl transition-colors duration-150 py-12 px-6 sm:px-12 lg:px-16"
        id="home-hero-splash"
        aria-label="Welcome and Mission Status"
      >
        {/* Subtle overlay illustration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-teal/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto space-y-8 z-10">
          <div className="inline-flex items-center gap-2 bg-brand-primary/20 border border-brand-teal/40 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-teal animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Civic Transparency &bull; Redesign Proposal v26-022</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              Renewing Water for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-emerald-400 to-brand-green">
                Colorado's Future
              </span>
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Owned jointly by the Cities of Englewood and Littleton, SPR operates as the cornerstone water resource recovery facility for {SYSTEM_STATS.residentsServed} residents. We recover nutrients, purify waste, recycle biosolids across {SYSTEM_STATS.biosolidsAcres} acres, and output pristine water to the South Platte River.
            </p>
          </div>

          {/* Large Live Counter Row */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-white/10" role="region" aria-label="Utility Scale Statistics">
            <div className="space-y-1 text-center md:text-left">
              <span className="block text-3xl sm:text-4xl font-bold font-display text-brand-teal">
                {residents.toLocaleString()}+
              </span>
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
                Residents Served
              </span>
            </div>
            
            <div className="space-y-1 text-center md:text-left">
              <span className="block text-3xl sm:text-4xl font-bold font-display text-emerald-400">
                {communities}
              </span>
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
                Communities Linked
              </span>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <span className="block text-3xl sm:text-4xl font-bold font-display text-brand-teal">
                {serviceArea} sq mi
              </span>
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
                Service Footprint
              </span>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <span className="block text-3xl sm:text-4xl font-bold font-display text-emerald-400">
                {farmAcres.toLocaleString()}+ Ac
              </span>
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
                Agricultural Leases (Byers)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMINENT HERO-LEVEL component: SERVICE STATUS & CONCERN REPORT */}
      <section 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        id="status-reporter-region"
        role="region"
        aria-label="Process Status & Concern reporting"
      >
        {/* Left Side: Real-time System Status Card (Lg: 5cols) */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-neutral-ink font-display uppercase tracking-wider">
                Process System Status
              </h2>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-brand-green px-2.5 py-1 rounded-full text-xs font-bold border border-brand-green/20">
                <span className="h-2 w-2 bg-brand-green rounded-full animate-soft-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Treatment Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-soft p-3.5 rounded-xl border border-gray-100 space-y-0.5">
                <span className="block text-xxs font-bold text-slate-500 uppercase tracking-wide">Avg. Daily Flow (Sample)</span>
                <span className="block text-lg font-bold font-display text-neutral-ink">{SYSTEM_STATS.dailyFlowMGD}</span>
                <span className="block text-[10px] text-slate-500 font-sans leading-tight">
                  <span className="font-semibold text-brand-teal">{SYSTEM_STATS.ratedCapacityMGD}</span> — Rated Capacity
                </span>
              </div>
              <div className="bg-neutral-soft p-3.5 rounded-xl border border-gray-100 space-y-0.5">
                <span className="block text-xxs font-bold text-slate-500 uppercase tracking-wide">Permit Compliance</span>
                <span className="block text-lg font-bold font-display text-neutral-ink">{SYSTEM_STATS.permitCompliance}</span>
                <span className="block text-[10px] text-brand-green font-semibold leading-tight">{SYSTEM_STATS.permitComplianceDetail}</span>
              </div>
            </div>

            {/* Daily Odor containment setting */}
            <div className="space-y-3 bg-blue-50/50 border border-brand-primary/10 rounded-xl p-4">
              <span className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                Fence-line Odor Containment Index
              </span>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${odorStatus === 'None' ? 'bg-brand-green' : odorStatus === 'Light' ? 'bg-amber-400' : 'bg-red-500'}`} />
                <span className="text-xs font-bold uppercase text-neutral-ink">
                  {odorStatus === 'None' ? 'Level 0 - None Detected' : odorStatus === 'Light' ? 'Level 1 - Light containment breeze' : 'Level 2 - Moderate containment'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                Our bio-scrubbers are constantly purging organic compounds. You can toggle state to preview report routing behavior below:
              </p>
              <div className="flex gap-2" role="group" aria-label="Toggle plant odor simulation state">
                {(['None', 'Light', 'Moderate'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setOdorStatus(level)}
                    className={`px-3 py-1 text-[11px] font-bold rounded-md border cursor-pointer transition-all ${
                      odorStatus === level 
                        ? 'bg-brand-primary text-white border-brand-primary font-bold' 
                        : 'bg-white text-slate-600 border-gray-200 hover:border-brand-primary'
                    }`}
                  >
                    Set {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-neutral-soft p-4 rounded-xl border border-gray-100 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-brand-primary shrink-0" />
            <div className="text-[11px] text-slate-500 font-sans leading-relaxed">
              <span className="block font-bold text-neutral-ink text-xs mb-0.5">Bi-City Policy Oversight</span>
              The SPR Supervisory Committee holds open public monthly work meetings. Next Littleton/Englewood Joint Session meets June 23, 2026.
            </div>
          </div>
        </div>

        {/* Right Side: Report a Concern Interactive Form (Lg: 7cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-neutral-ink font-display uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="text-amber-500 h-5 w-5 shrink-0" />
                <span>Service Desk &amp; Odor Concern Portal</span>
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                We take public comments seriously. Reports sync into the Littleton/Englewood SCADA Dispatch center. Teams investigate fenceline coordinates within 45 minutes.
              </p>
            </div>

            {formError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700 font-semibold rounded-r-md" role="alert">
                {formError}
              </div>
            )}

            {successTicket ? (
              <div className="bg-emerald-500/10 border border-brand-green/30 p-4 rounded-xl space-y-3" role="alert">
                <div className="flex items-center gap-2 text-brand-green">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <span className="font-bold text-sm">Concern Dispatched Successfully</span>
                </div>
                <div className="font-mono text-xs text-slate-700 space-y-1">
                  <div><span className="font-bold">Ticket Registry Code:</span> {successTicket}</div>
                  <div><span className="font-bold">Estimated Onsite Inspection:</span> Within 45 minutes</div>
                  <div><span className="font-bold">Status:</span> Assigned to Shift Plant Superintendent</div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Thank you for contributing to Littleton-Englewood air safety and ecological stewardship. You will receive an operational report summary at your provided coordinates.
                </p>
                <button
                  onClick={() => setSuccessTicket('')}
                  className="px-4 py-1.5 bg-brand-primary text-white font-bold text-xs rounded-md hover:bg-brand-depth cursor-pointer transition-colors"
                >
                  File Another Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleConcernSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="concern-category" className="block font-bold text-slate-700 mb-1">
                      Issue Category / Type
                    </label>
                    <select
                      id="concern-category"
                      value={concernCategory}
                      onChange={(e) => setConcernCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden font-sans"
                    >
                      <option value="Odor">Odor / Aerial Emission</option>
                      <option value="Water">Platte River Discoloration / Suspended Silt</option>
                      <option value="Noise">Process Fan Noise / Vibration</option>
                      <option value="Lease">Byers Farmland Lease Area Concern</option>
                      <option value="Other">Other Operational Concern</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reporter-role" className="block font-bold text-slate-700 mb-1">
                      Who are you? (Your Role)
                    </label>
                    <select
                      id="reporter-role"
                      value={reporterRole}
                      onChange={(e) => setReporterRole(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden font-sans"
                    >
                      <option value="Resident">Littleton or Englewood Resident</option>
                      <option value="Business">Local Business / Industrial Discharger</option>
                      <option value="Agricultural">Byers Farm Lease Tenant Partner</option>
                      <option value="Volunteer">South Platte Trail Visitor / Volunteer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="concern-location" className="block font-bold text-slate-700 mb-1">
                    Specific Location Coordinates (Street, Boundary, or Segment)
                  </label>
                  <input
                    type="text"
                    id="concern-location"
                    value={concernLocation}
                    onChange={(e) => setConcernLocation(e.target.value)}
                    placeholder="e.g. 2900 block of Platte River Drive, near South Trail trail milestone 12"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="concern-desc" className="block font-bold text-slate-700 mb-1">
                      Detailed Description of Findings
                    </label>
                    <textarea
                      id="concern-desc"
                      value={concernDesc}
                      onChange={(e) => setConcernDesc(e.target.value)}
                      placeholder="e.g. Transient sweet moldy odor noticed starting around 7:15 PM which persisted for about 10 minutes..."
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <label htmlFor="reporter-email" className="block font-bold text-slate-700 mb-1">
                        Optional Email (For follow-up inspection logs)
                      </label>
                      <input
                        type="email"
                        id="reporter-email"
                        value={reporterEmail}
                        onChange={(e) => setReporterEmail(e.target.value)}
                        placeholder="e.g. resident@littleton.org"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 py-2.5 bg-brand-primary hover:bg-brand-depth text-white font-bold rounded-lg cursor-pointer transition-colors shadow-sm text-xs"
                      id="concern-report-submit-btn"
                    >
                      Submit Concern to Dispatch
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Collapsible recent logger display to demonstrate active client-side reactivity */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <span className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
              Live Verified Reports (Past 24 Hrs)
            </span>
            <div className="space-y-1.5 h-16 overflow-y-auto pr-1">
              {localReports.map((report, idx) => (
                <div key={idx} className="flex justify-between items-start gap-3 text-[10px] bg-slate-50 border border-slate-200 p-2 rounded-lg font-mono">
                  <div className="space-y-0.5">
                    <span className="block text-[11px] font-bold text-neutral-ink font-sans leading-tight">
                      {report.locationType}
                    </span>
                    <p className="text-[10px] text-slate-500 font-sans leading-none">{report.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-brand-primary font-bold">{report.intensity}</span>
                    <span className="block text-[9px] text-slate-400">{report.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 ANIMATED WATER RECOVERY PROCESS SIMULATOR */}
      <AnimatedProcessFlow reduceMotion={reduceMotion} />

      {/* 3. FOUR BENTO BOX USER ENTRY PORTALS */}
      <section className="space-y-6" id="bento-portals-section">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-display tracking-tight text-neutral-ink uppercase">
            Audience Resource Pathways
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Please select your structural category coordinates to discover rates, billing guidelines, compliance records, and active pilot engineering audits.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Ratepayers & Citizens */}
          <div tabIndex={0} className="bg-white border border-gray-200 hover:border-brand-teal focus-within:border-brand-teal transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus-within:ring-2 focus-within:ring-brand-teal/40 outline-hidden rounded-2xl p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center border border-brand-primary/10">
                <Landmark className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-ink font-display leading-tight group-hover:text-brand-primary transition-colors">
                Ratepayers &amp; Citizens
              </h3>
              <p className="text-xxs leading-relaxed font-sans text-slate-500">
                Access current residential wastewater treatment rate structures. Littleton 2026 rates include a 5% system modernization adjustment, while Englewood outside city treatment sits at $4.79 per 1,000 gallons.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 bg-slate-50 p-1.5 rounded">
                <Shield className="h-3 w-3 text-brand-green" />
                <span>Raftelis Sewer Rate Study</span>
              </div>
              <button 
                onClick={() => handleNavClickWithAnnounce('home')}
                className="text-xs text-brand-primary font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                aria-label="View residential sewer rate tables and audits"
              >
                <span>View Sewer Rates</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: Businesses & Dischargers */}
          <div tabIndex={0} className="bg-white border border-gray-200 hover:border-brand-teal focus-within:border-brand-teal transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus-within:ring-2 focus-within:ring-brand-teal/40 outline-hidden rounded-2xl p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center border border-brand-teal/10">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-ink font-display leading-tight group-hover:text-brand-teal transition-colors">
                Businesses &amp; Dischargers
              </h3>
              <p className="text-xxs leading-relaxed font-sans text-slate-500">
                Manage commercial pre-treatment permits, check heavy grease interceptor maintenance requirements, and download discharge compliance regulations before municipal auditing.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 bg-slate-50 p-1.5 rounded">
                <Lock className="h-3 w-3 text-brand-teal" />
                <span>EPA Pretreatment Code 403</span>
              </div>
              <button 
                onClick={() => handleNavClickWithAnnounce('home')}
                className="text-xs text-brand-teal font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                aria-label="View business pretreatment permits and grease control guidelines"
              >
                <span>Discharger Permits</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 3: Careers & Operators */}
          <div tabIndex={0} className="bg-white border border-gray-200 hover:border-brand-teal focus-within:border-brand-teal transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus-within:ring-2 focus-within:ring-brand-teal/40 outline-hidden rounded-2xl p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center border border-brand-green/10">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-ink font-display leading-tight group-hover:text-brand-green transition-colors">
                Careers Network
              </h3>
              <p className="text-xxs leading-relaxed font-sans text-slate-500">
                Wastewater operations are critical regional security assets. Discover in-domain job listings with professional training, licensing assistance, and robust salary brackets.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 bg-slate-50 p-1.5 rounded">
                <CheckCircle className="h-3 w-3 text-brand-green" />
                <span>5 Active Roles Indexed</span>
              </div>
              <button 
                onClick={() => onNavigate('careers')}
                className="text-xs text-brand-green font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                id="btn-goto-careers-from-bento"
                aria-label="Navigate to Careers jobs search portal"
              >
                <span>Browse Careers</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 4: Newsroom & Pilot Works */}
          <div tabIndex={0} className="bg-white border border-gray-200 hover:border-brand-teal focus-within:border-brand-teal transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus-within:ring-2 focus-within:ring-brand-teal/40 outline-hidden rounded-2xl p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-700/10">
                <Radio className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-ink font-display leading-tight group-hover:text-indigo-700 transition-colors">
                PARC &amp; Newsroom
              </h3>
              <p className="text-xxs leading-relaxed font-sans text-slate-500">
                Explore water recovery engineering and listen to our 'Innovation Flow' podcast. Track real-time anaerobic carbon sequestration and biochemical filter pilot programs.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 bg-slate-50 p-1.5 rounded">
                <Radio className="h-3 w-3 text-indigo-500 animate-pulse" />
                <span>Podcast Episode 42 Live</span>
              </div>
              <button 
                onClick={() => onNavigate('parc')}
                className="text-xs text-indigo-600 font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                id="btn-goto-parc-from-bento"
                aria-label="Navigate to interactive PARC pilot map"
              >
                <span>Explore Pilot Projects</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CIVIC RATE LAW AND COLORADO REGULATION ALERT ACCORDION */}
      <section className="bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-4" id="regulatory-compliance-callout">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
            <Shield className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-neutral-ink font-display uppercase tracking-wider">
              Littleton-Englewood Utility Transparency Policy
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Under Title II of the ADA, Colorado C.R.S. § 24-85-101 et seq., and Colorado State House Bill 21-1110, we are dedicated to absolute information equity. Download current certified board approvals and rate reports.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <div className="bg-white p-4 rounded-xl border border-gray-300 flex items-start gap-3">
            <FileText className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="block text-xs font-bold text-neutral-ink">2026 Littleton Sewer Resolution</span>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">Securing 50% shares of treatment costs under 5% capital billing hike.</p>
              <a href="#" className="inline-block text-[10px] text-brand-primary font-bold underline hover:text-brand-depth mt-1">Download Resolution PDF</a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-300 flex items-start gap-3">
            <Calendar className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="block text-xs font-bold text-neutral-ink">Raftelis Financial Rate Study</span>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">Comprehensive, independent audit ensuring legal, equitable consumer cost allocations.</p>
              <a href="#" className="inline-block text-[10px] text-brand-primary font-bold underline hover:text-brand-depth mt-1">Review Rate Study PDF</a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-300 flex items-start gap-3">
            <Radio className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="block text-xs font-bold text-neutral-ink">Podcast: Innovation Flow Ep. 42</span>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">Managing dryland biosolid crops in Byers - featuring agricultural lease coordinators.</p>
              <a href="#" className="inline-block text-[10px] text-brand-primary font-bold underline hover:text-brand-depth mt-1">Listen to Episode</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  function handleNavClickWithAnnounce(view: 'home' | 'parc' | 'careers') {
    onNavigate(view);
    // Announce context switch to assist screen-readers
    const msg = document.getElementById('accessibility-announcement');
    if (msg) {
      msg.textContent = "Switched display view to: " + view;
    }
  }
}

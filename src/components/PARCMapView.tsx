import React from 'react';
import { 
  PARC_PROJECTS 
} from '../data';
import { PARCProject } from '../types';
import { MapPin, Info, Users, Landmark, FileSpreadsheet, Layers, Cpu, Compass } from 'lucide-react';
import WaterLedger from './WaterLedger';

interface PARCMapViewProps {
  highContrast: boolean;
  reduceMotion: boolean;
}

export default function PARCMapView({ highContrast, reduceMotion }: PARCMapViewProps) {
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>(PARC_PROJECTS[0].id);
  const activeProject = PARC_PROJECTS.find(p => p.id === selectedProjectId) || PARC_PROJECTS[0];

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
    // Announce to screen-readers
    const announcer = document.getElementById('accessibility-announcement');
    const proj = PARC_PROJECTS.find(p => p.id === id);
    if (announcer && proj) {
      announcer.textContent = `Selected pilot research project: ${proj.name}, status is ${proj.status}. Details panel updated below.`;
    }
    // Scroll to details panel if on tiny mobile viewport
    if (window.innerWidth <= 768) {
      const detailsCard = document.getElementById('parc-details-panel');
      if (detailsCard) {
        detailsCard.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Title Header */}
      <div className="border-b border-gray-200 pb-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full text-xs font-bold text-brand-primary uppercase">
          <Compass className="h-3.5 w-3.5" />
          <span>Interactive Utility Blueprint</span>
        </div>
        <h1 className="text-3xl font-extrabold font-display tracking-tight text-neutral-ink uppercase">
          PARC Pilot &amp; Research Center Map
        </h1>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed font-sans">
          Welcome to SPR's Pilot and Research Center (PARC). We collaborate with regional research laboratories, green energy coalitions, and Colorado universities to test pioneering wastewater filtration, biosolid land application, and renewable methane containment. Use the interactive fenceline SVG map or the fully synchronized access table below to audit active research.
        </p>
      </div>

      {/* Main Interactive Map & Details Split Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive SVG Map Blueprint (Lg: 7cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-brand-teal" />
              <span className="text-xs font-bold font-display uppercase tracking-wider text-neutral-ink">
                Fenceline Process Blueprint
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
              Scale Check: 1 inch = 180 feet &bull; Englewood, CO
            </div>
          </div>

          {/* SVG Map Canvas Box */}
          <div 
            className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-16/10"
            id="interactive-svg-canvas-wrapper"
          >
            {/* Dark Technical Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Interactive SVG Diagram representing processing pools */}
            <svg 
              viewBox="0 0 600 375" 
              className="w-full h-full text-slate-400 select-none"
              aria-label="Schematic layout map of SPR regional utility"
              role="img"
            >
              {/* Plant Perimeter fencing */}
              <rect x="15" y="15" width="570" height="345" rx="10" fill="none" stroke="#2BA84A" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.3" />
              <text x="30" y="32" fill="#2BA84A" className="text-[9px] font-mono font-bold tracking-widest opacity-60">FACILITY SECURITY BOUNDARY</text>

              {/* South Platte River bordering loop */}
              <path d="M 0,350 Q 150,330 300,340 T 600,310" fill="none" stroke="#1AAEB5" strokeWidth="28" opacity="0.15" />
              <path d="M 0,350 Q 150,330 300,340 T 600,310" fill="none" stroke="#1B75BB" strokeWidth="4" opacity="0.4" strokeDasharray="12,6" />
              <text x="440" y="348" fill="#1AAEB5" className="text-[10px] font-bold font-display tracking-wide uppercase opacity-70">South Platte River Flow</text>

              {/* Primary Settling Pool Boxes */}
              <rect x="40" y="160" width="100" height="75" rx="5" fill="#1A2730" stroke="#0E3F66" strokeWidth="2" />
              <text x="50" y="180" fill="#E2E8F0" className="text-[9px] font-semibold font-mono tracking-wide">Primary Settlers</text>
              <line x1="50" y1="190" x2="130" y2="190" stroke="#0E3F66" strokeWidth="1" />
              <line x1="50" y1="205" x2="130" y2="205" stroke="#0E3F66" strokeWidth="1" />

              {/* Aeration Basins Pools (Secondary Treatment) */}
              <rect x="230" y="50" width="160" height="90" rx="5" fill="#1A2730" stroke="#0E3F66" strokeWidth="2" />
              <text x="240" y="70" fill="#E2E8F0" className="text-[9px] font-semibold font-mono tracking-wide">Secondary Aeration Basins</text>
              <rect x="240" y="80" width="40" height="45" fill="none" stroke="#1B75BB" opacity="0.3" />
              <rect x="290" y="80" width="40" height="45" fill="none" stroke="#1B75BB" opacity="0.3" />
              <rect x="340" y="80" width="40" height="45" fill="none" stroke="#1B75BB" opacity="0.3" />

              {/* Digester Silos Circle Shapes */}
              <circle cx="160" cy="110" r="32" fill="#1A2730" stroke="#0E3F66" strokeWidth="2" />
              <circle cx="160" cy="110" r="2" fill="#1AAEB5" opacity="0.5" />
              <text x="135" y="114" fill="#E2E8F0" className="text-[9px] font-mono tracking-wide">Digesters</text>

              {/* Centrifuge Dewatering Halls */}
              <rect x="180" y="240" width="120" height="65" rx="4" fill="#1A2730" stroke="#0E3F66" strokeWidth="2" />
              <text x="190" y="260" fill="#E2E8F0" className="text-[9px] font-semibold font-mono tracking-wide">Solid Dewatering</text>
              <line x1="190" y1="275" x2="290" y2="275" stroke="#0E3F66" strokeWidth="1" />

              {/* Secondary Clarification Tanks */}
              <circle cx="460" cy="170" r="38" fill="#1A2730" stroke="#0E3F66" strokeWidth="2" />
              <text x="424" y="174" fill="#E2E8F0" className="text-[9px] font-semibold font-mono tracking-wide">Clarifier Tank 4</text>

              {/* Administration & Technical Lab Buildings */}
              <rect x="420" y="50" width="120" height="50" rx="3" fill="#0E3F66" opacity="0.4" stroke="#1AAEB5" strokeWidth="1" />
              <text x="430" y="75" fill="#94A3B8" className="text-[8px] font-mono font-bold tracking-wide">Administrative Central Lab</text>

              {/* Flow Direction Indicator pipes */}
              <path d="M 140,195 L 230,110" fill="none" stroke="#1B75BB" strokeWidth="2" strokeDasharray="3,3" opacity="0.5" />
              <path d="M 390,95 Q 460,95 460,132" fill="none" stroke="#1B75BB" strokeWidth="2" strokeDasharray="3,3" opacity="0.5" />
              <path d="M 460,208 L 460,320" fill="none" stroke="#1AAEB5" strokeWidth="3" strokeDasharray="4,2" opacity="0.5" />
              <text x="355" y="240" fill="#94A3B8" className="text-[8px] font-mono italic opacity-50">Treated Effluent to River</text>
            </svg>

            {/* Absolute Plotted Pilot Hotspots Layer */}
            {PARC_PROJECTS.map((project) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project.id)}
                  id={`blueprint-hotspot-${project.id}`}
                  className={`absolute group cursor-pointer p-1 rounded-full transition-all duration-200 ease-out focus:scale-110 outline-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 ${
                    isSelected ? 'z-50 scale-125' : 'z-20 hover:scale-110'
                  }`}
                  style={{ left: `${project.coords.x}%`, top: `${project.coords.y}%` }}
                  aria-label={`Interactive Map Pin: ${project.name}. Click for details.`}
                  aria-pressed={isSelected}
                >
                  {/* Outer Pulsing Indicator Ring */}
                  <span className={`absolute inline-flex h-8 w-8 rounded-full opacity-65 transition-all duration-300 ${
                    isSelected 
                      ? (reduceMotion ? 'bg-brand-primary' : 'animate-soft-pulse bg-brand-primary') 
                      : 'bg-brand-teal/80 group-hover:scale-110'
                  }`} />
                  
                  {/* Central Glow Core */}
                  <div className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-md border transition-all duration-200 ${
                    isSelected 
                      ? 'bg-brand-primary border-white' 
                      : 'bg-[#1A2730] border-brand-teal group-hover:bg-brand-teal'
                  }`}>
                    <MapPin className="h-2.5 w-2.5" />
                  </div>

                  {/* Desktop Tiny Label tooltip on Hover */}
                  <span className="hidden md:group-hover:block absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-slate-700 text-slate-100 text-[10px] py-1 px-2.5 rounded font-mono font-bold leading-none pointer-events-none z-50 shadow-lg">
                    {project.name} ({project.status})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="flex items-center gap-1.5 font-bold text-neutral-ink">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" /> Active Pilot Status
            </span>
            <span className="flex items-center gap-1.5 font-bold text-neutral-ink">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-teal" /> In Testing Status
            </span>
            <span className="flex items-center gap-1.5 font-bold text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> Upcoming Concept
            </span>
          </div>
        </div>

        {/* Right Side: High-legibility interactive details Panel (Lg: 5cols) */}
        <div 
          className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between h-full space-y-6 md:min-h-[440px] lg:col-span-5"
          id="parc-details-panel"
          role="region"
          aria-live="polite"
          aria-label={`Detailed parameters for ${activeProject.name}`}
        >
          <div key={selectedProjectId} className={`space-y-4 ${reduceMotion ? '' : 'animate-details-enter'}`}>
            <div className="border-b border-gray-100 pb-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Location: {activeProject.location}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                  activeProject.status === 'Active' ? 'bg-emerald-50 text-brand-green border border-brand-green/20' :
                  activeProject.status === 'In Testing' ? 'bg-blue-50 text-brand-primary border border-brand-primary/20' :
                  activeProject.status === 'Completed' ? 'bg-slate-50 text-slate-500 border border-slate-200' :
                  'bg-purple-50 text-purple-700 border border-purple-200'
                }`}>
                  {activeProject.status}
                </span>
              </div>
              <h2 className="text-lg font-bold font-display text-neutral-ink leading-tight">
                {activeProject.name}
              </h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {activeProject.description}
            </p>

            <div className="space-y-2 font-sans pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Users className="h-4 w-4 text-brand-teal shrink-0" />
                <span><span className="font-bold text-neutral-ink">Lead:</span> {activeProject.leadResearcher}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Landmark className="h-4 w-4 text-brand-teal shrink-0" />
                <span><span className="font-bold text-neutral-ink">CIP Funding Status:</span> {activeProject.investment}</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-soft p-4 rounded-xl border border-gray-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-brand-primary" /> Joint City Policy Note
            </span>
            <p className="text-[11px] font-sans text-slate-500 leading-relaxed">
              Every PARC design requires joint approval by Littleton &amp; Englewood finance administrators. Results are logged publicly to guarantee ratepayer value under Littleton's 5% modernization tax structure.
            </p>
          </div>
        </div>

      </div>

      {/* Parallel Fully Accessible HTML Table View (Equal access proof point) */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-3" id="parc-accessible-list">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-neutral-ink font-display uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-brand-primary" />
              <span>Full Project Index (WCAG 2.2 Table View)</span>
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Designed as an accessibility fallback. Select any table project row below to synchronize and update the fenceline blueprint map focus above.
            </p>
          </div>
        </div>

        {/* Scrollable Responsive Table container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[600px]" aria-label="PARC Research Projects Detailed Directory">
            <thead>
              <tr className="bg-neutral-soft text-slate-600 font-bold uppercase tracking-wider border-b border-gray-200">
                <th scope="col" className="px-4 py-3 font-sans">Project Name</th>
                <th scope="col" className="px-4 py-3 font-sans">Location</th>
                <th scope="col" className="px-4 py-3 font-sans">Current Status</th>
                <th scope="col" className="px-4 py-3 font-sans">Lead Researcher</th>
                <th scope="col" className="px-4 py-3 font-sans">CIP Investment Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PARC_PROJECTS.map((project) => {
                const isSelected = project.id === selectedProjectId;
                return (
                  <tr 
                    key={project.id}
                    onClick={() => handleProjectSelect(project.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleProjectSelect(project.id);
                      }
                    }}
                    tabIndex={0}
                    className={`transition-colors duration-200 cursor-pointer focus:outline-none ${
                        isSelected 
                          ? 'bg-brand-primary/10 font-medium border-l-4 border-brand-primary' 
                          : 'hover:bg-neutral-soft focus:bg-neutral-soft'
                      }`}
                    id={`table-row-${project.id}`}
                    aria-selected={isSelected}
                  >
                    <td className="px-4 py-3 mr-2 font-display font-medium text-neutral-ink">
                      {project.name}
                    </td>
                    <td className="px-4 py-3 font-sans text-slate-600">{project.location}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        project.status === 'Active' ? 'bg-emerald-50 text-brand-green' :
                        project.status === 'In Testing' ? 'bg-blue-50 text-brand-primary' :
                        'bg-purple-50 text-purple-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-slate-600">{project.leadResearcher}</td>
                    <td className="px-4 py-3 font-mono text-slate-500 font-semibold">{project.investment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Water Compliance Quality Ledger System */}
      <WaterLedger reduceMotion={reduceMotion} />
    </div>
  );
}

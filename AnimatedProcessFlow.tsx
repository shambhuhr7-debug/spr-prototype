import React from 'react';
import { HelpCircle, Info, ChevronRight, Droplet, Layers, HelpCircle as HelpIcon } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  technicalDetails: string;
  chemicalFormula?: string;
  regulationCode?: string;
  metric: string;
  metricLabel: string;
}

interface AnimatedProcessFlowProps {
  reduceMotion: boolean;
}

export default function AnimatedProcessFlow({ reduceMotion }: AnimatedProcessFlowProps) {
  const [activeStageId, setActiveStageId] = React.useState<string>('inflow');
  const [hoveredStageId, setHoveredStageId] = React.useState<string | null>(null);

  const stages: Stage[] = [
    {
      id: 'inflow',
      name: '1. Inflow Stream',
      subtitle: 'Raw Wastewater Influent',
      description: 'Raw gravitational wastewater streams enter the facility containing dissolved organics, sand, and household debris. Heavy grit Chambers filter out large particles.',
      technicalDetails: 'Screening separates solids > 6mm. Flow velocity is maintained at 2.0 ft/s to allow heavy sand/gravel settling while holding organic compounds in suspension.',
      metric: '300k Residents',
      metricLabel: 'Tributary Source'
    },
    {
      id: 'clarifier',
      name: '2. Primary Clarifier',
      subtitle: 'Gravity Settling & Skimming',
      description: 'Physical separation stage where flow velocity is drastically reduced, allowing heavier sludge organics to sink to the floor and lighter greases to float for mechanical skimming.',
      technicalDetails: 'Removes 50-60% of total suspended solids (TSS) and 30-40% of biological oxygen demand (BOD) prior to secondary bio-treatment.',
      metric: '55% TSS Reduced',
      metricLabel: 'Primary Treatment Efficiency'
    },
    {
      id: 'aeration',
      name: '3. Aeration Basin',
      subtitle: 'Secondary Biological Digestion',
      description: 'Our biological engine. Millions of beneficial microbes (activated sludge) are cultivated and fed active oxygen, rapidly absorbing and digesting dissolved pollutants.',
      technicalDetails: 'We use the Post-Aeration Nitrogen Mitigation (PANM) pilot to optimize biological denitrification, lowering total effluent nitrogen without chemical additives.',
      metric: '94% BOD5 Digested',
      metricLabel: 'Microbial Digest Rate'
    },
    {
      id: 'uv',
      name: '4. UV Disinfection',
      subtitle: 'Physical Pathogen Eradication',
      description: 'Chemical-free final sterilization. Clarified water passes through high-intensity ultraviolet lamp arrays, scrambling the DNA of virus/bacterial pathogens without adding harmful chlorine.',
      technicalDetails: 'Low-pressure, high-output UV arrays supply a minimum radiation dose of 30 mJ/cm² to ensure complete pathogen neutralization prior to discharge.',
      metric: '< 1 CFU / 100mL',
      metricLabel: 'E. Coli Safety Index'
    },
    {
      id: 'outflow',
      name: '5. Outflow Stream',
      subtitle: 'Purified Colorado Discharge',
      description: 'The final purified effluent, thoroughly cleansed and rich in dissolved oxygen, is gravity discharged into the South Platte River, complying 100% with CDPHE standards.',
      technicalDetails: 'Discharged flow supports local downstream agricultural leases and provides high-quality river water supporting native trout populations and recreational trails.',
      metric: '~20 MGD',
      metricLabel: 'Avg. Daily Clean Discharge'
    }
  ];

  const activeStage = stages.find(s => s.id === activeStageId) || stages[0];

  return (
    <section 
      className="bg-white border border-gray-250 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
      id="animated-flow-manifold"
      aria-label="Water Recovery Process Simulator"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-150 pb-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-primary block">
            Core Recovery Loop
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold font-display text-neutral-ink uppercase">
            Interactive Recovery Flow Simulator
          </h2>
          <p className="text-xs text-slate-500 font-sans max-w-2xl leading-relaxed">
            Trace the mechanical and biological lifecycle of water renewal from residential raw inflow coordinates to pristine river discharge. Click or focus on any stage to audit live process parameters and technical metrics.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-blue-50 text-brand-primary border border-brand-primary/10 px-3 py-1.5 rounded-full text-xs font-semibold">
          <Info className="h-4 w-4 text-brand-primary" />
          <span>Select nodes to toggle audit telemetry</span>
        </div>
      </div>

      {/* Responsive Process Pipeline Block */}
      <div className="relative pt-6 pb-2" id="manifold-pipeline-canvas">
        {/* SVG Pipeline Connection Background (Hidden on mobile stack, displayed on lg) */}
        <div className="absolute inset-x-0 top-18 h-2 bg-slate-100 rounded-full hidden md:block border-t border-b border-gray-200 overflow-hidden">
          {/* Animated Droplets Pipe Path */}
          <div className="w-full h-full relative">
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-brand-primary/40 via-brand-teal/50 to-brand-green/45 ${
                reduceMotion ? '' : 'origin-left animate-[flow-dash_20s_linear_infinite]'
              }`}
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, #1AAEB5 15px, #1AAEB5 30px)',
                backgroundSize: '45px 100%'
              }}
            />
          </div>
        </div>

        {/* 5-Column Grid Node Representation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative z-10">
          {stages.map((stage, idx) => {
            const isSelected = stage.id === activeStageId;
            const isHovered = stage.id === hoveredStageId;

            // Render Micro-Graphic Schemes per Stage
            const renderMicroGraphic = () => {
              if (stage.id === 'inflow') {
                return (
                  <svg className="h-8 w-8 text-blue-500" viewBox="0 0 32 32" fill="none">
                    <rect x="2" y="14" width="22" height="4" rx="2" fill="currentColor" opacity="0.3" />
                    <circle cx={isSelected && !reduceMotion ? 22 : 12} cy="16" r="4" fill="currentColor" className={reduceMotion ? '' : 'transition-colors duration-1000'} />
                    <path d="M 4,16 C 8,10 12,22 16,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 12,16 C 16,10 20,22 24,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  </svg>
                );
              }
              if (stage.id === 'clarifier') {
                return (
                  <svg className="h-8 w-8 text-brand-teal" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="14" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
                    <line x1="4" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="10" cy="20" r="1.5" fill="currentColor" opacity="0.6" className={reduceMotion ? '' : 'animate-pulse'} />
                    <circle cx="16" cy="23" r="1.5" fill="currentColor" opacity="0.8" className={reduceMotion ? '' : 'animate-pulse'} style={{ animationDelay: '0.2s' }} />
                    <circle cx="22" cy="18" r="1.5" fill="currentColor" opacity="0.5" className={reduceMotion ? '' : 'animate-pulse'} style={{ animationDelay: '0.4s' }} />
                  </svg>
                );
              }
              if (stage.id === 'aeration') {
                return (
                  <svg className="h-8 w-8 text-brand-teal" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
                    {/* Tiny Rising Bubbles */}
                    <circle cx="10" cy={isSelected && !reduceMotion ? "12" : "20"} r="1.5" fill="currentColor" opacity="0.75" className={reduceMotion ? '' : 'animate-ping'} />
                    <circle cx="16" cy={isSelected && !reduceMotion ? "15" : "22"} r="1" fill="currentColor" opacity="0.9" className={reduceMotion ? '' : 'animate-ping'} style={{ animationDelay: '0.3s' }} />
                    <circle cx="22" cy={isSelected && !reduceMotion ? "10" : "18"} r="2" fill="currentColor" opacity="0.6" className={reduceMotion ? '' : 'animate-ping'} style={{ animationDelay: '0.5s' }} />
                    <circle cx="13" cy="24" r="1" fill="currentColor" opacity="0.5" />
                    <circle cx="19" cy="25" r="1.5" fill="currentColor" opacity="0.4" />
                  </svg>
                );
              }
              if (stage.id === 'uv') {
                return (
                  <svg className="h-8 w-8 text-indigo-500" viewBox="0 0 32 32" fill="none">
                    <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                    {/* Vertical Glowing UV Rays */}
                    <line x1="11" y1="4" x2="11" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,1" className={reduceMotion ? '' : 'animate-pulse'} />
                    <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" strokeWidth="2.5" className={reduceMotion ? '' : 'animate-pulse'} style={{ animationDelay: '0.2s' }} />
                    <line x1="21" y1="4" x2="21" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,1" className={reduceMotion ? '' : 'animate-pulse'} style={{ animationDelay: '0.4s' }} />
                  </svg>
                );
              }
              return (
                <svg className="h-8 w-8 text-brand-green" viewBox="0 0 32 32" fill="none">
                  {/* Wave pattern */}
                  <path d="M2 14 C 6 10, 10 18, 14 14 C 18 10, 22 18, 26 14 C 30 10, 31 12, 32 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M2 22 C 6 18, 10 26, 14 22 C 18 18, 22 26, 26 22 C 30 18, 31 20, 32 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  <circle cx="28" cy="14" r="2.5" fill="currentColor" className={reduceMotion ? '' : 'animate-bounce'} />
                </svg>
              );
            };

            return (
              <div key={stage.id} className="relative group">
                <button
                  onClick={() => setActiveStageId(stage.id)}
                  onMouseEnter={() => setHoveredStageId(stage.id)}
                  onMouseLeave={() => setHoveredStageId(null)}
                  className={`w-full text-left bg-white border rounded-2xl p-4 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-1 focus:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[145px] ${
                    isSelected 
                      ? 'border-brand-teal shadow-md ring-1 ring-brand-teal bg-teal-50/5' 
                      : 'border-gray-200 shadow-xs hover:border-brand-primary'
                  } focus:ring-brand-teal focus:border-brand-teal`}
                  id={`process-button-${stage.id}`}
                  aria-pressed={isSelected}
                  aria-controls="process-manifold-detail-card"
                  aria-label={`${stage.name}. Click to view recovery parameters.`}
                >
                  {/* Stage Graphic Representation */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                      Stage {idx + 1}
                    </span>
                    <div className="shrink-0">
                      {renderMicroGraphic()}
                    </div>
                  </div>

                  {/* Node labels */}
                  <div className="space-y-1 mt-3">
                    <h3 className="text-xs font-bold text-neutral-ink font-display group-hover:text-brand-primary transition-colors">
                      {stage.name.split('. ')[1]}
                    </h3>
                    <p className="text-[10px] text-slate-500 line-clamp-1 leading-tight font-sans">
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Flow connection indicators for screens readers */}
                  <div className="sr-only">
                    {isSelected ? "Currently selected stage details are updated below." : "Click to inspect this stage."}
                  </div>
                </button>

                {/* Micro-Droplet Trailing Pulse Indicator representing real-time movement between nodes (Disabled on mobile, and stopped when reduceMotion) */}
                {!reduceMotion && idx < 4 && (
                  <div className="hidden md:block absolute -right-3.5 top-17 z-30 pointer-events-none">
                    <span className="inline-flex h-3.5 w-3.5 rounded-full bg-brand-primary/55 animate-ping opacity-75" />
                    <span className="absolute -left-0.5 top-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-brand-teal border border-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Synchronized Telemetry Parameters Display Area */}
      <div 
        id="process-manifold-detail-card"
        className="bg-neutral-soft border border-gray-150 rounded-2xl p-5 md:p-6 shadow-sm"
        role="region"
        aria-live="polite"
        aria-label={`Detailed engineering compliance for selected stage: ${activeStage.name}`}
      >
        <div key={activeStage.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${reduceMotion ? '' : 'animate-scale-up'}`}>
          {/* Detailed Info Column */}
          <div className="lg:col-span-8 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-2.5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider font-semibold text-brand-primary uppercase">
                  ACTIVE FLOW COORDINATE
                </span>
                <h3 className="text-base font-bold font-display text-neutral-ink">
                  {activeStage.name} &mdash; <span className="text-slate-600 font-semibold">{activeStage.subtitle}</span>
                </h3>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-brand-green border border-brand-green/20 rounded-full text-xs font-bold font-sans">
                  <span className="h-2 w-2 bg-brand-green rounded-full animate-soft-pulse" />
                  <span>PROCESS COGNATE STATE NOMINAL</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {activeStage.description}
            </p>

            <div className="bg-white border border-gray-150 rounded-xl p-3.5 flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-teal-50 text-brand-teal border border-brand-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-extrabold text-neutral-ink font-display uppercase tracking-wider">
                  Technical Compliance &amp; Engineering Rules
                </span>
                <p className="text-[11px] font-sans text-slate-500 leading-relaxed">
                  {activeStage.technicalDetails}
                </p>
              </div>
            </div>
          </div>

          {/* Audit Metrics Panel Column */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="block text-[10px] font-extrabold text-slate-500 font-mono uppercase tracking-widest border-b border-gray-150 pb-1.5 mb-2">
                Telemetric Audit
              </span>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px] font-sans">
                  <span className="text-slate-500">Operation Status</span>
                  <span className="font-bold text-brand-green">100% Meets CDPHE</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-sans">
                  <span className="text-slate-500">Joint Committee Audit</span>
                  <span className="font-bold text-neutral-ink">Littleton-Englewood Co-signed</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-sans">
                  <span className="text-slate-500">SCADA Coordinates</span>
                  <span className="font-mono font-bold text-slate-600 uppercase">SYS-LOOP-{activeStage.id}</span>
                </div>
              </div>
            </div>

            {/* Custom KPI badge */}
            <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-lg text-center space-y-1">
              <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider leading-none">
                {activeStage.metricLabel}
              </span>
              <span className="block text-xl font-bold font-display text-neutral-ink tracking-tight leading-none">
                {activeStage.metric}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

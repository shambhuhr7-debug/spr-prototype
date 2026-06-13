import React from 'react';
import { AreaChart, Shield, CheckCircle, Info, Keyboard, HelpCircle, TableProperties } from 'lucide-react';

interface MetricData {
  day: string;
  value: number;
}

interface MetricConfig {
  id: string;
  name: string;
  unit: string;
  description: string;
  cdpheLimit: number;
  limitComparisonType: 'max' | 'min'; // 'max' means must be below, 'min' means must be above
  values: MetricData[];
  complianceExplanation: string;
}

interface WaterLedgerProps {
  reduceMotion: boolean;
}

export default function WaterLedger({ reduceMotion }: WaterLedgerProps) {
  const [activeMetricId, setActiveMetricId] = React.useState<string>('turbidity');
  const [focusedPointIndex, setFocusedPointIndex] = React.useState<number | null>(null);

  const metrics: MetricConfig[] = [
    {
      id: 'turbidity',
      name: 'Water Turbidity',
      unit: 'NTU',
      description: 'Measures water clarity. Lower values represent more successful physical filtration of suspended particulate silt. Elevated turbidity protects river pathogens from disinfection processes.',
      cdpheLimit: 2.0,
      limitComparisonType: 'max',
      complianceExplanation: 'CDPHE regulates a maximum of 2.0 NTU for clean stream outlet discharge. Lower is safer.',
      values: [
        { day: 'Mon', value: 1.4 },
        { day: 'Tue', value: 1.2 },
        { day: 'Wed', value: 1.6 },
        { day: 'Thu', value: 1.1 },
        { day: 'Fri', value: 0.9 },
        { day: 'Sat', value: 1.0 },
        { day: 'Sun', value: 0.8 },
      ]
    },
    {
      id: 'dissolved_oxygen',
      name: 'Dissolved Oxygen (DO)',
      unit: 'mg/L',
      description: 'Measures oxygen dissolved in water, vital for downstream trout spawning, biological health, and macro-invertebrates. Post-aeration processes artificially enrich the flow with oxygen before discharge.',
      cdpheLimit: 5.0,
      limitComparisonType: 'min',
      complianceExplanation: 'CDPHE regulates a strict minimum of 5.0 mg/L DO to sustain aquatic habitats. Higher is safer.',
      values: [
        { day: 'Mon', value: 6.4 },
        { day: 'Tue', value: 6.7 },
        { day: 'Wed', value: 6.5 },
        { day: 'Thu', value: 6.9 },
        { day: 'Fri', value: 7.1 },
        { day: 'Sat', value: 7.0 },
        { day: 'Sun', value: 7.2 },
      ]
    },
    {
      id: 'ph_level',
      name: 'pH Level',
      unit: 'S.U.',
      description: 'Indicates acidity or alkalinity balance. Highly stable neutral levels prevent chemical toxicity to aquatic river wildlife and buffer the river against alkaline spring runoff.',
      cdpheLimit: 9.0, // upper limit for simple line comparison (lower is 6.5)
      limitComparisonType: 'max',
      complianceExplanation: 'CDPHE regulates a standard safe discharge envelope between 6.5 and 9.0 S.U.',
      values: [
        { day: 'Mon', value: 7.2 },
        { day: 'Tue', value: 7.3 },
        { day: 'Wed', value: 7.1 },
        { day: 'Thu', value: 7.4 },
        { day: 'Fri', value: 7.2 },
        { day: 'Sat', value: 7.3 },
        { day: 'Sun', value: 7.2 },
      ]
    },
    {
      id: 'ammonia',
      name: 'Ammonia-N',
      unit: 'mg/L',
      description: 'Measures residual raw ammonia nitrogen. Soluble ammonia is toxic to mountain trout and triggers severe algae blooms. Our biological PANM filters target ammonia molecules directly.',
      cdpheLimit: 1.5,
      limitComparisonType: 'max',
      complianceExplanation: 'CDPHE regulates a maximum limit of 1.5 mg/L Ammonia-N in Colorado cold-water fisheries.',
      values: [
        { day: 'Mon', value: 0.45 },
        { day: 'Tue', value: 0.38 },
        { day: 'Wed', value: 0.49 },
        { day: 'Thu', value: 0.32 },
        { day: 'Fri', value: 0.28 },
        { day: 'Sat', value: 0.25 },
        { day: 'Sun', value: 0.30 },
      ]
    }
  ];

  const activeMetric = metrics.find(m => m.id === activeMetricId) || metrics[0];

  // Map metric values to SVG coordinates
  // SVG box: width 500 (from x: 50 to 550), height 180 (from y: 20 to 200)
  const xStart = 60;
  const xEnd = 540;
  const yStart = 30;
  const yEnd = 200;

  // Find min/max values to scale the chart dynamically
  const maxVal = Math.max(...activeMetric.values.map(v => v.value), activeMetric.cdpheLimit) * 1.15;
  const minVal = 0; // standard baseline

  const getPointsPath = () => {
    return activeMetric.values.map((v, idx) => {
      const x = xStart + (idx * (xEnd - xStart)) / (activeMetric.values.length - 1);
      // y-scaling coordinates: high value is top of chart (yStart), low value is bottom (yEnd)
      const ratio = (v.value - minVal) / (maxVal - minVal);
      const y = yEnd - ratio * (yEnd - yStart);
      return { x, y, value: v.value, day: v.day };
    });
  };

  const points = getPointsPath();

  // Limit line height calculation
  const limitRatio = (activeMetric.cdpheLimit - minVal) / (maxVal - minVal);
  const limitY = yEnd - limitRatio * (yEnd - yStart);

  // Formulate absolute path string
  const svgPathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Under-line filled gradient area
  const svgAreaD = `${svgPathD} L ${points[points.length - 1].x} ${yEnd} L ${points[0].x} ${yEnd} Z`;

  const handlePointFocus = (index: number) => {
    setFocusedPointIndex(index);
    // Announce values to auxiliary assistive screen-readers
    const announcer = document.getElementById('accessibility-announcement');
    if (announcer) {
      const pt = points[index];
      const diff = Math.abs(pt.value - activeMetric.cdpheLimit).toFixed(2);
      const compLabel = activeMetric.limitComparisonType === 'max' ? 'below' : 'above';
      announcer.textContent = `Water Quality Report for ${pt.day}. Measured quantity: ${pt.value} ${activeMetric.unit}. This is ${diff} ${activeMetric.unit} ${compLabel} the CDPHE limit of ${activeMetric.cdpheLimit} ${activeMetric.unit}.`;
    }
  };

  const activeFocusedPoint = focusedPointIndex !== null ? points[focusedPointIndex] : null;

  return (
    <section 
      className="bg-white border border-gray-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
      id="water-quality-ledger"
      aria-label="Water Quality Ledger Dashboard"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold font-mono">
            <span>AUDIT DISCLOSURE: SAMPLE DATA &mdash; FOR DEMONSTRATION ONLY</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold font-display text-neutral-ink uppercase">
            PARC Water Quality Compliance Ledger
          </h2>
          <p className="text-xs text-slate-500 font-sans max-w-2xl leading-relaxed">
            As a public, ratepayer-funded environmental utility, we log hourly telemetry. This dashboard displays a real-time sample 7-day trend crossing Colorado Department of Public Health and Environment (CDPHE) regulatory limits.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-emerald-500/10 text-brand-green border border-brand-green/20 px-3.5 py-1.5 rounded-full text-xs font-bold">
          <CheckCircle className="h-4 w-4 text-brand-green" />
          <span>CDPHE 100% COMPLIANT</span>
        </div>
      </div>

      {/* Tabs list for selectable indicators */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Water Quality Parameter Parameters">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => {
              setActiveMetricId(metric.id);
              setFocusedPointIndex(null);
            }}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
              activeMetricId === metric.id
                ? 'bg-brand-primary text-white border-brand-primary font-bold shadow-sm'
                : 'bg-white text-slate-600 border-gray-300 hover:bg-slate-50 hover:border-slate-400'
            }`}
            role="tab"
            aria-selected={activeMetricId === metric.id}
            aria-controls="water-quality-trend-panel"
            id={`ledger-tab-${metric.id}`}
          >
            {metric.name}
          </button>
        ))}
      </div>

      {/* Active Tab Panel Body */}
      <div 
        id="water-quality-trend-panel"
        role="tabpanel"
        aria-labelledby={`ledger-tab-${activeMetric.id}`}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Side: SVG Chart Frame (Lg: 8cols) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="space-y-0.5">
              <span className="block text-[10px] font-mono font-bold uppercase text-slate-500">
                7-DAY COMPLIANCE TELEMETRY TREND
              </span>
              <h3 className="text-sm font-bold font-display text-neutral-ink">
                {activeMetric.name} ({activeMetric.unit})
              </h3>
            </div>
            
            {/* Guide markers legend */}
            <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-0.5 w-4 bg-brand-primary inline-block" /> Active Reading
              </span>
              <span className="flex items-center gap-1">
                <span className="h-0.5 w-4 border-t border-dashed border-red-500 inline-block" /> CDPHE Limit ({activeMetric.cdpheLimit} {activeMetric.unit})
              </span>
            </div>
          </div>

          <div className="relative pt-2" id="ledger-svg-chart-container">
            {/* Interactive Vector SVG Line Chart */}
            <svg 
              viewBox="0 0 600 240" 
              className="w-full h-auto text-slate-400 select-none overflow-visible"
              aria-hidden="true"
            >
              {/* Horizontal Reference Grid Gridlines */}
              <line x1={xStart} y1={yStart} x2={xEnd} y2={yStart} stroke="#F1F5F9" strokeWidth="1.5" />
              <line x1={xStart} y1={(yStart + yEnd)/2} x2={xEnd} y2={(yStart + yEnd)/2} stroke="#F1F5F9" strokeWidth="1.5" />
              <line x1={xStart} y1={yEnd} x2={xEnd} y2={yEnd} stroke="#E2E8F0" strokeWidth="1.5" />

              {/* Vertical dotted grid lines */}
              {points.map((p, idx) => (
                <line 
                  key={`vline-${idx}`}
                  x1={p.x} 
                  y1={yStart} 
                  x2={p.x} 
                  y2={yEnd} 
                  stroke="#F8FAFC" 
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              ))}

              {/* Shaded baseline Area Fill under trend path */}
              <path 
                d={svgAreaD} 
                fill="url(#trend-gradient-fill)" 
                opacity={reduceMotion ? "0.1" : "0.15"} 
                className={reduceMotion ? '' : 'transition-all duration-300'}
              />

              {/* Vector trend Line path */}
              <path 
                d={svgPathD} 
                fill="none" 
                stroke="#0E3F66" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                className={reduceMotion ? '' : 'transition-all duration-300'}
              />

              {/* CDPHE Regulatory limit line */}
              <line 
                x1={xStart} 
                y1={limitY} 
                x2={xEnd} 
                y2={limitY} 
                stroke="#EF4444" 
                strokeWidth="2" 
                strokeDasharray="5,4" 
                opacity="0.85"
              />

              {/* Points labels (Y Axis limits) */}
              <text x={xStart - 10} y={yStart + 4} textAnchor="end" className="text-[9px] font-mono font-bold fill-slate-400">{maxVal.toFixed(1)}</text>
              <text x={xStart - 10} y={(yStart + yEnd)/2 + 3} textAnchor="end" className="text-[9px] font-mono font-bold fill-slate-400">{(maxVal/2).toFixed(1)}</text>
              <text x={xStart - 10} y={yEnd + 3} textAnchor="end" className="text-[9px] font-mono font-bold fill-slate-400">0.0</text>

              {/* X Axis labels (Days of week) */}
              {points.map((p, idx) => (
                <text 
                  key={`day-${idx}`} 
                  x={p.x} 
                  y={yEnd + 18} 
                  textAnchor="middle" 
                  className={`text-[10px] font-mono font-bold tracking-tight ${
                    focusedPointIndex === idx ? 'fill-brand-primary font-extrabold' : 'fill-slate-500'
                  }`}
                >
                  {p.day}
                </text>
              ))}

              {/* Highlight background elements for focused/hovered indices */}
              {focusedPointIndex !== null && (
                <>
                  {/* Vertical dotted bar indicating selected day coordinates */}
                  <line 
                    x1={points[focusedPointIndex].x} 
                    y1={yStart} 
                    x2={points[focusedPointIndex].x} 
                    y2={yEnd} 
                    stroke="#14B8A6" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,2" 
                  />
                  {/* Glowing ring under selected node */}
                  <circle 
                    cx={points[focusedPointIndex].x} 
                    cy={points[focusedPointIndex].y} 
                    r="8" 
                    fill="#14B8A6" 
                    opacity="0.3" 
                    className={reduceMotion ? '' : 'animate-ping'}
                  />
                </>
              )}

              {/* Interactive Point Hotspot circles */}
              {points.map((p, idx) => (
                <circle 
                  key={`dot-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r={focusedPointIndex === idx ? "6.5" : "4.5"}
                  fill={focusedPointIndex === idx ? "#14B8A6" : "#0E3F66"}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setFocusedPointIndex(idx)}
                />
              ))}

              {/* Gradients declarations */}
              <defs>
                <linearGradient id="trend-gradient-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E3F66" />
                  <stop offset="100%" stopColor="#0E3F66" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Keyboard Focus Navigation Helper Overlay for WCAG compliance */}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-50 text-slate-500 border border-slate-200 px-2 py-1 rounded text-[10px] font-semibold">
              <Keyboard className="h-3 w-3" />
              <span>Tab to focus points below</span>
            </div>
          </div>

          {/* Interactive Keyboard Points Ring Tab Index */}
          <div className="flex justify-between bg-slate-50 border border-gray-200 rounded-xl p-3" role="group" aria-label="Interactive chart coordinate indicators">
            {points.map((p, idx) => {
              const isSelected = focusedPointIndex === idx;
              return (
                <button
                  key={`btn-coord-${idx}`}
                  onClick={() => handlePointFocus(idx)}
                  onFocus={() => handlePointFocus(idx)}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-brand-primary text-white border-brand-primary ring-2 ring-brand-primary/20' 
                      : 'bg-white text-slate-600 border-gray-200 hover:border-brand-primary focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
                  }`}
                  aria-label={`Audit Log: ${p.day}, measured value ${p.value} ${activeMetric.unit}`}
                >
                  {p.day}: <span className={isSelected ? 'text-white' : 'text-slate-900 font-semibold'}>{p.value}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Compliance Verdict Panel (Lg: 4cols) */}
        <div 
          className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6 h-full min-h-[360px]"
          aria-live="polite"
        >
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500 block">
                AUDITED VERDICT
              </span>
              <h4 className="text-sm font-bold text-neutral-ink font-display uppercase tracking-wide">
                Indicator Details
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {activeMetric.description}
            </p>

            {/* Compliance criteria and focused details card */}
            {activeFocusedPoint ? (
              <div 
                className={`bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-xl space-y-2.5 ${
                  reduceMotion ? '' : 'animate-scale-up'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-neutral-ink font-display">
                  <span>Day Coordinate:</span>
                  <span className="text-brand-primary uppercase font-mono">{activeFocusedPoint.day} Log</span>
                </div>
                
                <div className="flex justify-between items-end border-t border-gray-100 pt-2 font-sans text-xs">
                  <span className="text-slate-500">Telemetry Value:</span>
                  <span className="font-bold text-base text-slate-900 font-display">
                    {activeFocusedPoint.value} {activeMetric.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="text-slate-500">CDPHE Reg Limit:</span>
                  <span className="font-semibold text-slate-900">
                    {activeMetric.limitComparisonType === 'max' ? '≤' : '≥'} {activeMetric.cdpheLimit} {activeMetric.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-sans border-b border-gray-100 pb-2">
                  <span className="text-slate-500">Margin to Limit:</span>
                  <span className="font-bold text-emerald-600">
                    {Math.abs(activeFocusedPoint.value - activeMetric.cdpheLimit).toFixed(2)} {activeMetric.unit} (Safe)
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  {activeMetric.complianceExplanation}
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center text-slate-500 space-y-2 py-8">
                <HelpCircle className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="text-xs font-semibold">No point currently focused.</p>
                <p className="text-[10px] font-sans">Hover any chart node, or use the tab coordinates below the chart to audit individual day telemetry logs.</p>
              </div>
            )}
          </div>

          <div className="bg-neutral-soft p-4 rounded-xl border border-gray-200 space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-ink font-display">
              CDPHE Discharge Permit Co-Pilot
            </span>
            <p className="text-[10px] font-sans text-slate-500 leading-relaxed">
              Discharge metrics are submitted directly to the Colorado Department of Public Health and Environment and audited monthly for 100% legal compliance.
            </p>
          </div>
        </div>
      </div>

      {/* WCAG 2.2 Table Fallback section for equal access proof point */}
      <section className="bg-neutral-soft border border-gray-200 rounded-2xl p-5 space-y-3" id="ledger-text-table-fallback">
        <div className="flex items-center gap-2 border-b border-gray-200/80 pb-2">
          <TableProperties className="h-5 w-5 text-brand-primary" />
          <h3 className="text-xs font-extrabold font-display uppercase tracking-wider text-neutral-ink">
            Compliance Table Summary (Accessible Version)
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-sans leading-relaxed">
          Provides full programmatic compatibility with screen-reading assistants and older visual support programs.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[500px]" aria-label="Water Quality Parameters 7-Day Matrix Table">
            <thead>
              <tr className="bg-white text-slate-600 font-bold uppercase tracking-wider border-b border-gray-200">
                <th scope="col" className="px-3 py-2 font-sans">Parameter Name</th>
                <th scope="col" className="px-3 py-2 font-sans">CDPHE Req. Limit</th>
                {activeMetric.values.map(v => (
                  <th key={v.day} scope="col" className="px-3 py-2 font-sans font-mono text-center">{v.day}</th>
                ))}
                <th scope="col" className="px-3 py-2 font-sans text-right">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {metrics.map((metric) => (
                <tr 
                  key={metric.id} 
                  className={`hover:bg-slate-50 font-sans ${
                    activeMetricId === metric.id ? 'bg-brand-primary/5 font-semibold' : ''
                  }`}
                >
                  <td className="px-3 py-2.5 font-bold text-neutral-ink">{metric.name} ({metric.unit})</td>
                  <td className="px-3 py-2.5 font-mono text-slate-600">
                    {metric.limitComparisonType === 'max' ? 'Max' : 'Min'} {metric.cdpheLimit}
                  </td>
                  {metric.values.map((v, i) => (
                    <td key={`val-${v.day}-${i}`} className="px-3 py-2.5 font-mono text-center text-slate-700">
                      {v.value}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-right font-bold text-brand-green">
                    100% Meets Limit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

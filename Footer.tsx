import React from 'react';
import { ShieldCheck, ArrowUp, Mail, Phone, MapPin, Scale } from 'lucide-react';
import { CONNECTING_COMMUNITIES, SYSTEM_STATS } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="bg-brand-depth text-white pt-12 pb-8 border-t-4 border-brand-primary" 
      role="contentinfo" 
      aria-label="Water Utility Information Footer"
      id="app-global-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10 pb-8 border-b border-white/10">
          
          {/* Column 1: Core Institutional Statement */}
          <div className="lg:col-span-1.5 space-y-4">
            <span className="block text-lg font-bold font-display tracking-tight text-white">
              South Platte <span className="text-brand-teal">Renew</span>
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              As the largest municipal water resource recovery utility in the Rocky Mountain West, SPR is jointly owned, operated, and funded on a 50/50 split by the Cities of Littleton and Englewood, Colorado. Committed to active environmental stewardship and protection of the South Platte River since 1978.
            </p>
            <div className="text-[10px] bg-white/5 border border-white/10 rounded-lg p-3 space-y-1.5 font-mono text-slate-200">
              <span className="block font-semibold text-brand-teal">BYERS LEASE HOLDINGS</span>
              <span className="block">Acreage: {SYSTEM_STATS.biosolidsAcres} Dryland Farmland</span>
              <span className="block text-[9px] text-slate-400">Restructured under Denver Ord. No 27 (2025) for beneficial biosolids recycling.</span>
            </div>
          </div>

          {/* Column 2: 19 Connecting Communities */}
          <div className="lg:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-teal mb-3 font-sans">
              Connector Communities served
            </h2>
            <div className="h-44 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 text-[11px] text-slate-300 space-y-1" role="region" aria-label="Scrollable list of communities">
              {CONNECTING_COMMUNITIES.map((community, index) => (
                <div key={index} className="flex items-center gap-1.5 py-0.5 border-b border-white/5">
                  <span className="h-1 w-1 bg-brand-green rounded-full shrink-0" />
                  <span>{community}</span>
                </div>
              ))}
              <div className="text-[10px] text-slate-400 italic pt-1">
                + 9 other regional sanitary subdivisions
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Operations */}
          <div className="lg:col-span-1 space-y-3 text-xs text-slate-300">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-teal mb-3 font-sans">
              Administrative offices
            </h2>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                2900 S. Platte River Drive<br />
                Englewood, CO 80110
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
              <span>Main Office: (303) 762-2110</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
              <span>info@southplatterenewco.gov</span>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-md flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-green shrink-0" />
              <div className="text-[10px] text-slate-200">
                <span className="block font-bold">24-Hour Emergency line</span>
                <span>(303) 762-2111 (Odor, Silt, Spill)</span>
              </div>
            </div>
          </div>

          {/* Column 4: SLED Compliance & Legal */}
          <div className="lg:col-span-0.5 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-teal font-sans">
              Accessibility
            </h2>
            <div className="space-y-2 text-[10px] text-slate-300">
              <div className="flex items-start gap-2 bg-white/5 p-2 rounded border border-white/10">
                <Scale className="h-4 w-4 text-brand-teal shrink-0" />
                <span>State Compliance Statement: Engineered to satisfy C.R.S. 24-85-101 regulations and WCAG 2.2 Level AA.</span>
              </div>
              <div className="text-slate-400">
                Authorized RFP Redesign Prototype<br />
                RFP No: #26-022<br />
                Security audited under NIST/ISO frameworks.
              </div>
            </div>
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="flex items-center gap-1 w-full justify-center px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold leading-none cursor-pointer transition-colors border border-white/5"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Lower bar: ownership, copyright, developer stamp */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} South Platte Renew. All Rights Reserved. Joint Property of the Cities of Littleton &amp; Englewood, Colorado.
          </div>
          <div className="font-sans">
            Designed &amp; Engineered by <span className="text-brand-teal font-semibold">QLogic LLC</span> &bull; Civic Trust Redesign Portfolio
          </div>
        </div>
      </div>
    </footer>
  );
}

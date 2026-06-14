import React from 'react';
import { Menu, X, Droplets, Map, Briefcase, FileText, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'parc' | 'careers';
  onNavigate: (view: 'home' | 'parc' | 'careers') => void;
  highContrast: boolean;
}

export default function Header({ currentView, onNavigate, highContrast }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (view: 'home' | 'parc' | 'careers') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home' as const, label: 'Overview & Operations', icon: Droplets, desc: 'Primary landing & reports' },
    { id: 'parc' as const, label: 'PARC Pilot Map', icon: Map, desc: 'Interactive research map' },
    { id: 'careers' as const, label: 'Careers Portal', icon: Briefcase, desc: 'In-domain job search' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 transition-colors duration-150 shadow-xs" id="app-header-nav">
      {/* Keyboard Accessibility Skip Link */}
      <a 
        href="#main-content-landmark"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[9999] focus:bg-amber-400 focus:text-neutral-ink focus:px-4 focus:py-2.5 focus:font-bold focus:rounded-md focus:shadow-md focus:border-2 focus:border-neutral-ink focus:outline-none"
        id="btn-skip-to-content"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* Logo Brand Frame */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 py-1 cursor-pointer hover:opacity-90 outline-hidden group"
              aria-label="Go to South Platte Renew homepage"
            >
              <div className="bg-brand-primary p-2.5 rounded-xl text-white group-hover:scale-105 transition-transform duration-150 shadow-sm flex items-center justify-center">
                <Droplets className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
              </div>
              <div className="text-left">
                <span className="block text-xl font-bold font-display tracking-tight text-neutral-ink leading-tight">
                  South Platte <span className="text-brand-primary">Renew</span>
                </span>
                <span className="block text-[10px] font-medium tracking-wide uppercase text-slate-500 leading-none">
                  Water Resource Recovery Utility
                </span>
                <span className="block text-[9px] text-brand-teal font-sans uppercase font-semibold leading-none mt-0.5">
                  Englewood &amp; Littleton, CO
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Link Track */}
          <nav className="hidden md:flex items-center gap-1.5" role="navigation" aria-label="Main Navigation">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-brand-primary/10 text-brand-primary border-b-2 border-brand-primary'
                      : 'text-neutral-ink hover:bg-neutral-soft hover:text-brand-teal'
                  }`}
                  aria-current={isSelected ? 'page' : undefined}
                >
                  <IconComp className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile navigation toggle */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={toggleMobileMenu}
              className="p-2.5 rounded-lg text-neutral-ink hover:bg-neutral-soft outline-hidden focus-visible:ring-2 focus-visible:ring-brand-teal cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileMenuOpen ? "Toggle Close Website Navigation Menu" : "Toggle Open Website Navigation Menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="md:hidden bg-white border-t border-gray-200 py-3 px-4 transition-all duration-150 shadow-inner"
        >
          <nav className="flex flex-col gap-1" role="navigation" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-brand-primary text-white'
                      : 'text-neutral-ink hover:bg-neutral-soft'
                  }`}
                  aria-current={isSelected ? 'page' : undefined}
                >
                  <IconComp className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <div>
                    <span className="block">{item.label}</span>
                    <span className={`block text-[11px] font-normal ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

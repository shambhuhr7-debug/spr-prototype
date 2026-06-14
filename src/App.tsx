import React from 'react';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import PARCMapView from './components/PARCMapView';
import CareersView from './components/CareersView';
import { AccessibilitySettings } from './types';

export default function App() {
  const [currentView, setCurrentView] = React.useState<'home' | 'parc' | 'careers'>('home');
  const [accessibility, setAccessibility] = React.useState<AccessibilitySettings>({
    textSize: 'base',
    highContrast: false,
    reduceMotion: false
  });

  // Track page navigation changes to focus title and assist screen-readers
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
      mainHeading.setAttribute('tabindex', '-1');
      mainHeading.focus();
    }
  }, [currentView]);

  // Adjust document container styling according to accessibility selections
  const textScaleClass = 
    accessibility.textSize === 'sm' ? 'text-size-sm text-sm' :
    accessibility.textSize === 'lg' ? 'text-size-lg text-lg' :
    accessibility.textSize === 'xl' ? 'text-size-xl text-xl' : 'text-size-base text-base';

  const highContrastClass = accessibility.highContrast ? 'high-contrast' : 'bg-slate-50 text-neutral-ink';
  const reduceMotionClass = accessibility.reduceMotion ? 'reduced-motion' : '';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${textScaleClass} ${highContrastClass} ${reduceMotionClass}`}>
      
      {/* 1. ACCESSIBILITY TOOLBAR (STAYS PERSISTENT AT TOP OF WINDOW) */}
      <AccessibilityToolbar settings={accessibility} onChange={setAccessibility} />

      {/* 2. INSTITUTIONAL NAVIGATION HEADER WITH SKIP LINK */}
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        highContrast={accessibility.highContrast} 
      />

      {/* 3. MAIN SCIENTIFIC LANDMARK FOR KEYBOARD ESCAPEMENT */}
      <main 
        id="main-content-landmark"
        className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 focus:outline-none"
        tabIndex={-1}
        role="main"
        aria-label="South Platte Renew Redesign Content Frame"
      >
        {currentView === 'home' && (
          <HomeView onNavigate={setCurrentView} reduceMotion={accessibility.reduceMotion} />
        )}

        {currentView === 'parc' && (
          <PARCMapView highContrast={accessibility.highContrast} reduceMotion={accessibility.reduceMotion} />
        )}

        {currentView === 'careers' && (
          <CareersView highContrast={accessibility.highContrast} reduceMotion={accessibility.reduceMotion} />
        )}
      </main>

      {/* 4. MUNICIPAL DIRECTORY FOOTER */}
      <Footer />
    </div>
  );
}

import React from 'react';
import { Accessibility, Moon, Check, Eye, ChevronDown } from 'lucide-react';
import { AccessibilitySettings } from '../types';

interface AccessibilityToolbarProps {
  settings: AccessibilitySettings;
  onChange: (settings: AccessibilitySettings) => void;
}

export default function AccessibilityToolbar({ settings, onChange }: AccessibilityToolbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleHighContrast = () => {
    onChange({
      ...settings,
      highContrast: !settings.highContrast
    });
  };

  const toggleReduceMotion = () => {
    onChange({
      ...settings,
      reduceMotion: !settings.reduceMotion
    });
  };

  const setTextSize = (textSize: 'sm' | 'base' | 'lg' | 'xl') => {
    onChange({
      ...settings,
      textSize
    });
  };

  const resetToDefault = () => {
    onChange({
      textSize: 'base',
      highContrast: false,
      reduceMotion: false
    });
  };

  return (
    <div 
      className="bg-neutral-soft border-b border-gray-200 text-neutral-ink transition-colors duration-150"
      id="accessibility-toolbar-container"
      role="region"
      aria-label="Accessibility Settings"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Accessibility className="h-5 w-5 text-brand-primary" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wider uppercase font-sans">
              SPR Assistance &amp; Accessibility Toolbar
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Text Size Scale */}
            <div className="flex items-center gap-1.5" role="group" aria-label="Adjust font size">
              <span className="text-xs font-medium mr-1 select-none">Text:</span>
              {(['sm', 'base', 'lg', 'xl'] as const).map((size) => {
                const label = size === 'sm' ? 'A-' : size === 'base' ? 'A' : size === 'lg' ? 'A+' : 'A++';
                const isSelected = settings.textSize === size;
                return (
                  <button
                    key={size}
                    id={`btn-text-size-${size}`}
                    onClick={() => setTextSize(size)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-brand-primary text-white border-brand-primary' 
                        : 'bg-white text-neutral-ink border-gray-300 hover:border-brand-teal'
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Set text size to ${size === 'sm' ? 'small' : size === 'base' ? 'medium' : size === 'lg' ? 'large' : 'extra large'}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* High Contrast Toggle */}
            <button
              id="btn-high-contrast-toggle"
              onClick={toggleHighContrast}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border cursor-pointer transition-all ${
                settings.highContrast 
                  ? 'bg-neutral-ink text-white border-white scale-105' 
                  : 'bg-white text-neutral-ink border-gray-300 hover:border-brand-teal'
              }`}
              aria-pressed={settings.highContrast}
              aria-label="Toggle High Contrast Display Mode"
            >
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{settings.highContrast ? 'Standard Mode' : 'High Contrast'}</span>
            </button>

            {/* Reduce Motion Toggle */}
            <button
              id="btn-reduce-motion-toggle"
              onClick={toggleReduceMotion}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border cursor-pointer transition-all ${
                settings.reduceMotion 
                  ? 'bg-emerald-800 text-white border-emerald-950 scale-105' 
                  : 'bg-white text-neutral-ink border-gray-300 hover:border-brand-teal'
              }`}
              aria-pressed={settings.reduceMotion}
              aria-label="Toggle Reduced Motion Setting"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{settings.reduceMotion ? 'Animations On' : 'Reduced Motion'}</span>
            </button>

            {/* Reset Settings */}
            <button
              id="btn-reset-accessibility"
              onClick={resetToDefault}
              className="text-xs text-slate-500 hover:text-brand-primary font-medium underline px-2 py-1 cursor-pointer"
              aria-label="Reset accessibility toolbar settings to defaults"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Screen Reader Announcement Div */}
      <div className="sr-only" aria-live="polite" id="accessibility-announcement">
        {`Accessibility variables loaded. Text size is ${settings.textSize}. High contrast state is ${settings.highContrast ? 'active' : 'inactive'}. Reduced animations state is ${settings.reduceMotion ? 'active' : 'inactive'}.`}
      </div>
    </div>
  );
}

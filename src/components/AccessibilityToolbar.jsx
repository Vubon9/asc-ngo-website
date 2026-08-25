import React, { useState } from 'react';
import { Eye, Sun, Moon, Type, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AccessibilityToolbar() {
  const { lang, toggleLanguage } = useLanguage();
  const [textSize, setTextSize] = useState('normal'); // normal, large, xlarge
  const [highContrast, setHighContrast] = useState(false);

  const applyTextSize = (size) => {
    setTextSize(size);
    const root = document.documentElement;
    if (size === 'large') {
      root.style.fontSize = '18px';
    } else if (size === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  };

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast', !highContrast);
  };

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* A11y Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline font-medium text-slate-400">Accessibility:</span>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5">
            <Type className="w-3 h-3 text-slate-400 mr-1" />
            <button
              onClick={() => applyTextSize('normal')}
              className={`px-1.5 py-0.5 rounded font-bold text-[11px] ${
                textSize === 'normal' ? 'bg-cyan-700 text-white' : 'hover:text-white'
              }`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => applyTextSize('large')}
              className={`px-1.5 py-0.5 rounded font-bold text-xs ${
                textSize === 'large' ? 'bg-cyan-700 text-white' : 'hover:text-white'
              }`}
              title="Large Font Size"
            >
              A+
            </button>
            <button
              onClick={() => applyTextSize('xlarge')}
              className={`px-1.5 py-0.5 rounded font-bold text-sm ${
                textSize === 'xlarge' ? 'bg-cyan-700 text-white' : 'hover:text-white'
              }`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-medium transition-colors ${
              highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            {highContrast ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            <span>{highContrast ? 'High Contrast: ON' : 'High Contrast'}</span>
          </button>
        </div>

        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 px-3 py-1 rounded-full font-bold text-xs transition-all hover:scale-105"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'en' ? 'বাংলা (Bengali)' : 'English'}</span>
        </button>

      </div>
    </div>
  );
}

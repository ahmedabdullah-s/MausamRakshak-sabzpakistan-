import React from 'react';
import { Smartphone, Battery, Wifi, Signal, Sparkles } from 'lucide-react';

interface JetpackFrameToggleProps {
  children: React.ReactNode;
  activeTab: 'weather' | 'alerts' | 'gemini' | 'water';
  onTabChange: (tab: 'weather' | 'alerts' | 'gemini' | 'water') => void;
  isMobileView: boolean;
}

export const JetpackFrameToggle: React.FC<JetpackFrameToggleProps> = ({
  children,
  activeTab,
  onTabChange,
  isMobileView,
}) => {
  if (!isMobileView) {
    return <div className="w-full">{children}</div>;
  }

  // Current time in 24h or 12h for status bar
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex justify-center py-4 px-2 bg-stone-950/90 min-h-screen">
      {/* Smartphone Device Chassis */}
      <div className="w-full max-w-[420px] bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-emerald-900/50 flex flex-col relative">
        {/* Android Status Bar */}
        <div className="bg-emerald-950 text-emerald-200 text-xs px-6 py-2 flex items-center justify-between font-mono shrink-0 select-none border-b border-emerald-900">
          <span>{currentTime}</span>
          <div className="w-16 h-4 bg-slate-900 rounded-full mx-auto border border-slate-800 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-950 border border-emerald-500" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <Signal className="w-3 h-3 text-emerald-400" />
            <Battery className="w-3.5 h-3.5 text-emerald-300" />
          </div>
        </div>

        {/* Android App Bar Badge */}
        <div className="bg-emerald-900 text-emerald-100 text-[10px] font-bold px-4 py-1 flex items-center justify-between border-b border-emerald-800">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-green-300" /> Jetpack Compose UI (Material 3)
          </span>
          <span className="text-emerald-300">Sabz Pakistan v1.0</span>
        </div>

        {/* Device Screen Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-stone-900 custom-scrollbar">
          {children}
        </div>

        {/* Jetpack Compose Material 3 Bottom Navigation Bar */}
        <div className="bg-emerald-950 border-t border-emerald-800 px-3 py-2 flex items-center justify-around shrink-0 text-[10px] font-bold text-emerald-300">
          <button
            onClick={() => onTabChange('weather')}
            className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
              activeTab === 'weather'
                ? 'text-white bg-emerald-700/80 px-3 py-1 ring-1 ring-emerald-400'
                : 'text-emerald-400/70 hover:text-emerald-200'
            }`}
          >
            <span>☁️ Weather</span>
          </button>

          <button
            onClick={() => onTabChange('alerts')}
            className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
              activeTab === 'alerts'
                ? 'text-white bg-emerald-700/80 px-3 py-1 ring-1 ring-emerald-400'
                : 'text-emerald-400/70 hover:text-emerald-200'
            }`}
          >
            <span>⚠️ Risk Alert</span>
          </button>

          <button
            onClick={() => onTabChange('gemini')}
            className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
              activeTab === 'gemini'
                ? 'text-white bg-emerald-700/80 px-3 py-1 ring-1 ring-emerald-400'
                : 'text-emerald-400/70 hover:text-emerald-200'
            }`}
          >
            <span>✨ Gemini AI</span>
          </button>

          <button
            onClick={() => onTabChange('water')}
            className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
              activeTab === 'water'
                ? 'text-white bg-emerald-700/80 px-3 py-1 ring-1 ring-emerald-400'
                : 'text-emerald-400/70 hover:text-emerald-200'
            }`}
          >
            <span>💧 Water Saver</span>
          </button>
        </div>

        {/* Android Home Navigation Bar Line */}
        <div className="bg-emerald-950 py-1.5 flex justify-center shrink-0">
          <div className="w-28 h-1 bg-emerald-600/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};

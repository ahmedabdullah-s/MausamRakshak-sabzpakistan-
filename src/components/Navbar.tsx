import React from 'react';
import { ShieldAlert, CloudSun, RefreshCw, MapPin, Sparkles, Smartphone, Monitor } from 'lucide-react';

interface NavbarProps {
  currentCity: string;
  isLiveApi: boolean;
  dataSource: string;
  onRefresh: () => void;
  isLoading: boolean;
  isMobileView: boolean;
  onToggleViewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCity,
  isLiveApi,
  dataSource,
  onRefresh,
  isLoading,
  isMobileView,
  onToggleViewMode,
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-md text-[#1b4332] border-b border-[#e0e9dd] sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#1b4332] rounded-xl flex items-center justify-center text-white shadow-md">
            <CloudSun className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl tracking-tight text-[#1b4332] flex items-center gap-1.5">
                MausamRakshak
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#1b4332]/10 text-[#1b4332] border border-[#1b4332]/20 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-[#1b4332]" /> Sabz Pakistan
              </span>
            </div>
            <p className="text-xs text-[#5a7d6c] font-semibold tracking-wide">
              Weather Warnings & Climate Advisory | موسم رکھشک
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Location Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8faf7] text-[#1b4332] border border-[#d1dbcf] text-xs font-semibold shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#5a7d6c]" />
            <span>{currentCity}</span>
            <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-[#1b4332] text-white font-mono">
              {dataSource}
            </span>
          </div>

          {/* View Mode Toggle (Jetpack Compose Mobile Frame vs Full Web) */}
          <button
            onClick={onToggleViewMode}
            title={isMobileView ? "Switch to Full Web View" : "Switch to Android Mobile Mockup View"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8faf7] hover:bg-[#e0e9dd] text-[#1b4332] border border-[#d1dbcf] text-xs font-semibold transition-colors"
          >
            {isMobileView ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#1b4332]" />
                <span className="hidden sm:inline">Web View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#1b4332]" />
                <span className="hidden sm:inline">Android Frame</span>
              </>
            )}
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] active:bg-[#112d21] text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Sync</span>
          </button>
        </div>
      </div>
    </header>
  );
};

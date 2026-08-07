import React, { useState } from 'react';
import { Search, Navigation, MapPin } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/pakistanCities';

interface CitySelectorProps {
  currentCity: string;
  onSelectCity: (cityName: string) => void;
  onSelectCoords: (lat: number, lon: number) => void;
  isLoading: boolean;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  currentCity,
  onSelectCity,
  onSelectCoords,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Popular quick cities
  const popularCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Faisalabad',
    'Gilgit',
    'Gwadar',
    'Sialkot',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectCity(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const handleGPSLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        onSelectCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        setIsLocating(false);
        alert('Could not retrieve your location. Defaulting to major Pakistani cities.');
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="bg-white rounded-[2rem] p-4 sm:p-5 border border-[#e0e9dd] shadow-xs text-[#1b4332]">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8ca691]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search city in Pakistan (e.g. Multan, Swat, Faisalabad)..."
            className="w-full bg-[#f8faf7] text-[#1b4332] placeholder-[#8ca691] text-xs sm:text-sm rounded-full pl-10 pr-4 py-2.5 border border-[#d1dbcf] focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:border-[#1b4332] font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold rounded-full text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
        >
          <span>Search</span>
        </button>

        <button
          type="button"
          onClick={handleGPSLocation}
          disabled={isLocating || isLoading}
          title="Use my current GPS Location"
          className="px-4 py-2.5 bg-[#f8faf7] hover:bg-[#e0e9dd] text-[#1b4332] border border-[#d1dbcf] font-bold rounded-full text-xs shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Navigation className={`w-4 h-4 text-[#1b4332] ${isLocating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">My Location</span>
        </button>
      </form>

      {/* Quick City Tags */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-bold text-[#5a7d6c] uppercase tracking-wider mr-1 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#1b4332]" /> Cities:
        </span>
        {popularCities.map((cityName) => {
          const isSelected = currentCity.toLowerCase() === cityName.toLowerCase();
          return (
            <button
              key={cityName}
              onClick={() => onSelectCity(cityName)}
              disabled={isLoading}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#1b4332] text-white shadow-xs font-bold'
                  : 'bg-[#f8faf7] hover:bg-[#e0e9dd] text-[#1b4332] border border-[#edf3eb]'
              }`}
            >
              {cityName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

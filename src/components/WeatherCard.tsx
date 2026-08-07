import React from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  CloudRain,
  Sun,
  CloudSun,
  Cloud,
  CloudLightning,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
  isLoading: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
  // Helper to pick main icon
  const getWeatherIcon = (condition: string, iconCode: string) => {
    const c = condition.toLowerCase();
    if (c.includes('thunder') || c.includes('storm')) {
      return <CloudLightning className="w-14 h-14 text-amber-500 animate-pulse" />;
    }
    if (c.includes('rain') || c.includes('drizzle')) {
      return <CloudRain className="w-14 h-14 text-sky-600" />;
    }
    if (c.includes('cloud')) {
      return <CloudSun className="w-14 h-14 text-emerald-700" />;
    }
    if (c.includes('heat') || c.includes('clear') || c.includes('sun')) {
      return <Sun className="w-14 h-14 text-amber-500" />;
    }
    return <Cloud className="w-14 h-14 text-emerald-700" />;
  };

  const getUrduCondition = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('clear') || c.includes('sun')) return 'صاف اور گرم / Saaf Mausam';
    if (c.includes('heat')) return 'شدید لو اور گرمی / Severe Heatwave';
    if (c.includes('thunder')) return 'گرج چمک / Thunderstorm';
    if (c.includes('rain')) return 'بارش / Rain Showers';
    if (c.includes('cloud')) return 'جزوی طور پر ابر آلود / Partly Cloudy';
    if (c.includes('haze') || c.includes('dust')) return 'غبار اور دھند / Dust Haze';
    return 'عام موسم / Fair Weather';
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-[#e0e9dd] text-[#1b4332] flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="flex justify-between items-start gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-[#5a7d6c]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332] tracking-tight">
              {weather.cityName}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f0f4ee] text-[#1b4332] font-semibold border border-[#d1dbcf]">
              {weather.province || 'Pakistan'}
            </span>
          </div>
          <p className="text-xs font-semibold text-[#5a7d6c]">
            {getUrduCondition(weather.condition)} • <span className="capitalize">{weather.description}</span>
          </p>
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs font-bold text-[#8ca691] uppercase tracking-wider">
            {weather.dataSource}
          </p>
          <span className="text-[11px] font-semibold text-[#5a7d6c] block mt-0.5">
            {weather.isLiveApi ? 'Live API Connected' : 'Cached Data'}
          </span>
        </div>
      </div>

      {/* Main Temperature Hero Display */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 my-2">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#f8faf7] border border-[#edf3eb] flex items-center justify-center shrink-0">
            {getWeatherIcon(weather.condition, weather.icon)}
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="text-6xl sm:text-7xl font-light text-[#1b4332] tracking-tight">
                {weather.temp}
              </span>
              <span className="text-3xl font-light text-[#5a7d6c]">°C</span>
            </div>
            <p className="text-sm font-semibold text-[#5a7d6c] mt-0.5">
              Feels like <strong className="text-[#1b4332]">{weather.feelsLike}°C</strong> • Min {weather.tempMin}° / Max {weather.tempMax}°
            </p>
          </div>
        </div>

        {/* Moisture Indicator Bar */}
        <div className="w-full sm:w-64 bg-[#f8faf7] p-4 rounded-2xl border border-[#edf3eb] space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-[#5a7d6c] uppercase tracking-wider text-[10px]">Moisture Level</span>
            <span className="text-[#1b4332]">{weather.humidity}%</span>
          </div>
          <div className="w-full bg-[#e0e9dd] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#1b4332] h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(10, weather.humidity))}%` }}
            />
          </div>
          <p className="text-[11px] text-[#5a7d6c] font-medium">
            {weather.humidity > 70
              ? 'High moisture - inspect crops for fungal rust'
              : weather.humidity < 30
              ? 'Dry air - elevated soil evaporation'
              : 'Optimal air humidity'}
          </p>
        </div>
      </div>

      {/* Bento Sub-Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <div className="bg-[#f8faf7] p-4 rounded-2xl border border-[#edf3eb]">
          <p className="text-[10px] uppercase tracking-wider text-[#8ca691] font-bold mb-1">Humidity</p>
          <p className="text-xl font-semibold text-[#1b4332]">{weather.humidity}%</p>
        </div>

        <div className="bg-[#f8faf7] p-4 rounded-2xl border border-[#edf3eb]">
          <p className="text-[10px] uppercase tracking-wider text-[#8ca691] font-bold mb-1">Wind Speed</p>
          <p className="text-xl font-semibold text-[#1b4332]">{weather.windSpeed} <span className="text-xs font-normal text-[#5a7d6c]">km/h</span></p>
        </div>

        <div className="bg-[#f8faf7] p-4 rounded-2xl border border-[#edf3eb]">
          <p className="text-[10px] uppercase tracking-wider text-[#8ca691] font-bold mb-1">Rainfall</p>
          <p className="text-xl font-semibold text-[#1b4332]">{weather.rain1h ? `${weather.rain1h} mm` : '0 mm/hr'}</p>
        </div>

        <div className="bg-[#f8faf7] p-4 rounded-2xl border border-[#edf3eb]">
          <p className="text-[10px] uppercase tracking-wider text-[#8ca691] font-bold mb-1">Pressure</p>
          <p className="text-xl font-semibold text-[#1b4332]">{weather.pressure} <span className="text-xs font-normal text-[#5a7d6c]">hPa</span></p>
        </div>
      </div>
    </div>
  );
};

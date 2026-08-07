import React, { useState } from 'react';
import { Droplets, Sprout, Award, Info, Calculator, CheckCircle2 } from 'lucide-react';
import { WeatherData } from '../types';

interface WaterConservationTrackerProps {
  weather: WeatherData;
}

export const WaterConservationTracker: React.FC<WaterConservationTrackerProps> = ({ weather }) => {
  const [landArea, setLandArea] = useState<number>(1); // Acres or Kanals
  const [unit, setUnit] = useState<'acres' | 'kanals'>('acres');
  const [method, setMethod] = useState<'drip' | 'night' | 'mulching' | 'flood'>('drip');

  // Water calculation math based on temperature & humidity
  const baseLitresPerAcre = weather.temp > 38 ? 38000 : weather.temp > 32 ? 32000 : 25000;
  const multiplier = unit === 'acres' ? landArea : landArea * 0.125;

  let savingsPercent = 40;
  if (method === 'drip') savingsPercent = 55;
  if (method === 'mulching') savingsPercent = 35;
  if (method === 'night') savingsPercent = 25;
  if (method === 'flood') savingsPercent = 0;

  const totalLitresNeeded = Math.round(baseLitresPerAcre * multiplier);
  const litresSaved = Math.round(totalLitresNeeded * (savingsPercent / 100));

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#e0e9dd] shadow-xs text-[#1b4332] space-y-5">
      <div className="flex items-center justify-between gap-3 border-b border-[#e0e9dd] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-white flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1b4332] flex items-center gap-2">
              Sabz Pakistan Water Saver Calculator
            </h3>
            <p className="text-xs text-[#5a7d6c]">
              Calculate irrigation water saved in {weather.cityName} ({weather.temp}°C)
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#f0f4ee] text-[#1b4332] border border-[#d1dbcf]">
          Green Score +{savingsPercent * 2}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* Controls */}
        <div className="space-y-3 bg-[#f8faf7] p-4 rounded-2xl border border-[#edf3eb] text-xs">
          <div>
            <label className="text-[#5a7d6c] font-bold mb-1.5 block uppercase tracking-wider text-[10px]">
              Farm / Garden Area:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.5"
                max="500"
                step="0.5"
                value={landArea}
                onChange={(e) => setLandArea(Math.max(0.1, parseFloat(e.target.value) || 1))}
                className="flex-1 bg-white text-[#1b4332] rounded-full px-4 py-2 border border-[#d1dbcf] focus:outline-none focus:ring-2 focus:ring-[#1b4332] font-bold text-sm"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="bg-white text-[#1b4332] rounded-full px-4 py-2 border border-[#d1dbcf] font-bold text-xs focus:outline-none"
              >
                <option value="acres">Acres (ایکڑ)</option>
                <option value="kanals">Kanals (کنال)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#5a7d6c] font-bold mb-1.5 block uppercase tracking-wider text-[10px]">
              Watering Method:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod('drip')}
                className={`py-2 px-3 rounded-full text-xs text-center font-semibold transition-all ${
                  method === 'drip'
                    ? 'bg-[#1b4332] text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-[#e0e9dd] text-[#1b4332] border border-[#d1dbcf]'
                }`}
              >
                Drip (55% Saver)
              </button>

              <button
                type="button"
                onClick={() => setMethod('mulching')}
                className={`py-2 px-3 rounded-full text-xs text-center font-semibold transition-all ${
                  method === 'mulching'
                    ? 'bg-[#1b4332] text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-[#e0e9dd] text-[#1b4332] border border-[#d1dbcf]'
                }`}
              >
                Mulch (35% Saver)
              </button>

              <button
                type="button"
                onClick={() => setMethod('night')}
                className={`py-2 px-3 rounded-full text-xs text-center font-semibold transition-all ${
                  method === 'night'
                    ? 'bg-[#1b4332] text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-[#e0e9dd] text-[#1b4332] border border-[#d1dbcf]'
                }`}
              >
                Night (25% Saver)
              </button>

              <button
                type="button"
                onClick={() => setMethod('flood')}
                className={`py-2 px-3 rounded-full text-xs text-center font-semibold transition-all ${
                  method === 'flood'
                    ? 'bg-amber-600 text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-[#e0e9dd] text-[#1b4332] border border-[#d1dbcf]'
                }`}
              >
                Flood (0% Saver)
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-[#f0f4ee] p-5 rounded-2xl border border-[#e0e9dd] space-y-3 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8ca691] uppercase tracking-wider">
              Estimated Water Savings
            </span>
            <Award className="w-5 h-5 text-[#1b4332]" />
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-light text-[#1b4332] tracking-tight">
              {litresSaved.toLocaleString()} <span className="text-lg font-semibold text-[#5a7d6c]">Litres</span>
            </div>
            <p className="text-xs text-[#5a7d6c] mt-1 font-semibold">
              Water conserved per irrigation cycle in {weather.cityName}!
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#e0e9dd] text-xs text-[#1b4332] flex items-start gap-2.5 text-left">
            <CheckCircle2 className="w-4 h-4 text-[#1b4332] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed font-medium">
              <strong>Sabz Pakistan Impact:</strong> Saving {litresSaved.toLocaleString()} L reduces canal pump diesel/electricity costs by approx. PKR {Math.round(litresSaved * 0.08).toLocaleString()}!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

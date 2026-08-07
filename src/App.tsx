import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { CitySelector } from './components/CitySelector';
import { WeatherCard } from './components/WeatherCard';
import { RiskAlertCard } from './components/RiskAlertCard';
import { AIAdvisoryCard } from './components/AIAdvisoryCard';
import { WaterConservationTracker } from './components/WaterConservationTracker';
import { SabzPakistanBanner } from './components/SabzPakistanBanner';
import { JetpackFrameToggle } from './components/JetpackFrameToggle';
import { WeatherData, RiskAlert, GeminiAdvisory } from './types';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [cityName, setCityName] = useState<string>('Lahore');
  const [coords, setCoords] = useState<{ lat?: number; lon?: number }>({});
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [riskAlert, setRiskAlert] = useState<RiskAlert | null>(null);
  const [advisory, setAdvisory] = useState<GeminiAdvisory | null>(null);

  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(true);
  const [isLoadingAdvisory, setIsLoadingAdvisory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'weather' | 'alerts' | 'gemini' | 'water'>('weather');

  // Load weather data securely from server endpoint /api/weather
  const loadWeatherData = useCallback(
    async (city?: string, lat?: number, lon?: number) => {
      setIsLoadingWeather(true);
      setError(null);

      try {
        let url = '/api/weather';
        const params = new URLSearchParams();
        if (city) {
          params.append('city', city);
        } else if (lat !== undefined && lon !== undefined) {
          params.append('lat', String(lat));
          params.append('lon', String(lon));
        } else {
          params.append('city', cityName);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Weather fetch failed with status ${res.status}`);
        }

        const data = await res.json();
        setWeather(data.weather);
        setRiskAlert(data.riskAlert);
        if (data.weather?.cityName) {
          setCityName(data.weather.cityName);
        }

        // Trigger Gemini AI Advisory fetch
        loadAdvisory(data.weather);
      } catch (err: any) {
        console.error('Error loading weather data:', err);
        setError('Could not fetch live weather. Please check network connection and try again.');
      } finally {
        setIsLoadingWeather(false);
      }
    },
    [cityName]
  );

  // Load Gemini AI Advisory from server endpoint /api/advisory
  const loadAdvisory = async (wData: WeatherData, customQuestion?: string) => {
    setIsLoadingAdvisory(true);
    try {
      const res = await fetch('/api/advisory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weather: wData,
          userQuestion: customQuestion,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAdvisory(data.advisory);
      }
    } catch (err) {
      console.error('Error fetching Gemini AI advisory:', err);
    } finally {
      setIsLoadingAdvisory(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadWeatherData('Lahore');
  }, []);

  const handleSelectCity = (city: string) => {
    setCityName(city);
    setCoords({});
    loadWeatherData(city);
  };

  const handleSelectCoords = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    loadWeatherData(undefined, lat, lon);
  };

  const handleRefresh = () => {
    if (coords.lat !== undefined && coords.lon !== undefined) {
      loadWeatherData(undefined, coords.lat, coords.lon);
    } else {
      loadWeatherData(cityName);
    }
  };

  return (
    <div className="bg-[#f0f4ee] text-[#1b4332] min-h-screen flex flex-col font-sans antialiased selection:bg-[#1b4332] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentCity={weather?.cityName || cityName}
        isLiveApi={weather?.isLiveApi || false}
        dataSource={weather?.dataSource || 'Server Proxy'}
        onRefresh={handleRefresh}
        isLoading={isLoadingWeather}
        isMobileView={isMobileView}
        onToggleViewMode={() => setIsMobileView(!isMobileView)}
      />

      {/* Main Container */}
      <JetpackFrameToggle
        activeTab={activeMobileTab}
        onTabChange={setActiveMobileTab}
        isMobileView={isMobileView}
      >
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Top Banner / Initiative Introduction */}
          {!isMobileView && <SabzPakistanBanner />}

          {/* City Selection Bar */}
          <CitySelector
            currentCity={weather?.cityName || cityName}
            onSelectCity={handleSelectCity}
            onSelectCoords={handleSelectCoords}
            isLoading={isLoadingWeather}
          />

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-100 border border-red-300 text-red-900 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
              <button
                onClick={handleRefresh}
                className="px-3.5 py-1.5 rounded-full bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-xs"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoadingWeather ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3 bg-white rounded-[2rem] border border-[#e0e9dd] shadow-xs">
              <Loader2 className="w-10 h-10 text-[#1b4332] animate-spin" />
              <h3 className="text-base font-bold text-[#1b4332]">
                Fetching Weather for {cityName}...
              </h3>
              <p className="text-xs text-[#5a7d6c] font-medium">
                Connecting server-side to OpenWeather & Open-Meteo services
              </p>
            </div>
          ) : weather && riskAlert ? (
            /* Responsive Content Grid / Mobile Tab Switching */
            isMobileView ? (
              <div className="space-y-4">
                {activeMobileTab === 'weather' && (
                  <WeatherCard weather={weather} isLoading={isLoadingWeather} />
                )}

                {activeMobileTab === 'alerts' && (
                  <RiskAlertCard alert={riskAlert} cityName={weather.cityName} />
                )}

                {activeMobileTab === 'gemini' && (
                  <AIAdvisoryCard
                    weather={weather}
                    advisory={advisory}
                    isLoading={isLoadingAdvisory}
                    onRefreshAdvisory={(customQ) => loadAdvisory(weather, customQ)}
                  />
                )}

                {activeMobileTab === 'water' && (
                  <WaterConservationTracker weather={weather} />
                )}
              </div>
            ) : (
              /* Bento Grid Web Layout */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Section (8 Cols): Weather, Alerts & Water Tracker */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Weather Hero Card */}
                  <WeatherCard weather={weather} isLoading={isLoadingWeather} />

                  {/* Risk Alert Warning Card */}
                  <RiskAlertCard alert={riskAlert} cityName={weather.cityName} />

                  {/* Water Conservation Calculator */}
                  <WaterConservationTracker weather={weather} />
                </div>

                {/* Right Section (4 Cols): Gemini AI Advisory Card (Tall Bento Card) */}
                <div className="lg:col-span-4 sticky top-20">
                  <AIAdvisoryCard
                    weather={weather}
                    advisory={advisory}
                    isLoading={isLoadingAdvisory}
                    onRefreshAdvisory={(customQ) => loadAdvisory(weather, customQ)}
                  />
                </div>
              </div>
            )
          ) : null}
        </main>
      </JetpackFrameToggle>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#e0e9dd] bg-white/80 py-6 text-center text-xs text-[#5a7d6c] space-y-1">
        <p className="font-bold text-[#1b4332] uppercase tracking-wider text-[11px]">
          © 2026 MausamRakshak • Sabz Pakistan Climate Resilience Initiative
        </p>
        <p className="text-[11px] font-medium text-[#8ca691]">
          Empowering Pakistani farmers & communities • Powered by OpenWeather & Gemini AI
        </p>
      </footer>
    </div>
  );
}

export interface WeatherData {
  cityName: string;
  province?: string;
  country: string;
  temp: number; // Celsius
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number; // Percentage
  pressure: number; // hPa
  windSpeed: number; // km/h or m/s
  windDeg?: number;
  condition: string; // e.g., "Clear", "Rain", "Extreme Heat", "Thunderstorm", "Haze"
  description: string; // e.g., "scattered clouds"
  icon: string; // weather icon code
  rain1h?: number; // mm
  uvIndex?: number;
  visibility?: number; // km
  dt: number; // timestamp
  coord: {
    lat: number;
    lon: number;
  };
  isLiveApi: boolean;
  dataSource: 'OpenWeather' | 'Open-Meteo' | 'Pakistan Climate Service';
}

export interface RiskAlert {
  level: 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'NORMAL';
  title: string;
  titleUrdu: string; // Roman Urdu / Urdu mix
  description: string;
  descriptionUrdu: string;
  actionPoints: string[];
  actionPointsUrdu: string[];
  category: 'HEATWAVE' | 'HEAVY_RAIN' | 'DUST_STORM' | 'HIGH_HUMIDITY_PEST' | 'COLD_FROST' | 'DRY_DROUGHT' | 'FAVORABLE';
  bannerBg: string;
  bannerBorder: string;
  textColor: string;
  badgeBg: string;
}

export interface GeminiAdvisory {
  farmingTip: string;
  farmingTipUrdu: string;
  waterConservation: string;
  waterConservationUrdu: string;
  livestockCare: string;
  healthSafety: string;
  summary: string;
}

export interface CityInfo {
  name: string;
  province: string;
  lat: number;
  lon: number;
  regionType: 'agricultural' | 'urban' | 'coastal' | 'mountainous' | 'arid';
  famousCrops?: string[];
}

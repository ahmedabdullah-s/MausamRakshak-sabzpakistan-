import { WeatherData, RiskAlert } from '../types';

export function evaluateRiskAlert(weather: WeatherData): RiskAlert {
  const temp = weather.temp;
  const humidity = weather.humidity;
  const rain = weather.rain1h || 0;
  const condition = weather.condition.toLowerCase();
  const desc = weather.description.toLowerCase();
  const wind = weather.windSpeed;

  // 1. Heatwave Risk (Crucial in Pakistan summer - 38°C to 45°C+)
  if (temp >= 40 || (temp >= 38 && humidity > 50)) {
    return {
      level: 'CRITICAL',
      category: 'HEATWAVE',
      title: 'SEVERE HEATWAVE WARNING',
      titleUrdu: 'شدید لو اور شدید گرمی کی ہدایت / Shadeed Loo Warning',
      description: `Extreme temperature (${temp}°C) detected. High risk of heatstroke, crop dehydration, and livestock thermal stress.`,
      descriptionUrdu: `Shadeed Garmi (${temp}°C) - Dhoop se bachen, faslon ko shaam ko paani dein aur maweshion ko saye mein rakhen.`,
      actionPoints: [
        'Avoid outdoor farming / strenuous manual work between 12:00 PM and 4:00 PM',
        'Irrigate crops in early morning or late evening to reduce evaporative water loss',
        'Keep livestock in well-ventilated shaded sheds with fresh cold water & ORS',
        'Ensure direct hydration with salt/electrolytes for family members and field workers'
      ],
      actionPointsUrdu: [
        'Dopehar 12 se 4 baje tak kheton mein sakht kaam se perhez karein',
        'Subah savere ya shaam ke waqt faslon ko paani dein taake paani zaya na ho',
        'Maweshion ko thandi aur sayedar jagah par rakhen',
        'Limbu paani / ORS ka istemal ziada karein'
      ],
      bannerBg: 'bg-red-900/90 text-white',
      bannerBorder: 'border-red-500',
      textColor: 'text-red-100',
      badgeBg: 'bg-red-500 text-white'
    };
  }

  // 2. Severe Rain / Storm / Flood Warning (Monsoon alert)
  if (rain >= 15 || condition.includes('thunderstorm') || condition.includes('heavy rain') || desc.includes('heavy rain') || desc.includes('extreme rain')) {
    return {
      level: 'CRITICAL',
      category: 'HEAVY_RAIN',
      title: 'HEAVY MONSOON / RAIN ALERT',
      titleUrdu: 'موسلا دھار بارش اور سیلابی الرٹ / Shadeed Barish Alert',
      description: `Significant rainfall expected (${rain > 0 ? rain + ' mm/hr' : 'Heavy Downpour'}). High risk of localized urban flooding and crop waterlogging.`,
      descriptionUrdu: `Shadeed Barish aur paani khara hone ka khatra. Khet aur makaan ki hifazat karein.`,
      actionPoints: [
        'Secure cotton, wheat, and vegetable fields by clearing drainage channels immediately',
        'Store harvested crops and fertilizer sacks on elevated, waterproof platforms',
        'Keep livestock away from electrical poles, low-lying riverbanks, and mud roofs',
        'Avoid driving or walking through flooded causeways or overflowing canals'
      ],
      actionPointsUrdu: [
        'Khetom mein paani ke nikasi ke naaly saaf rakhen',
        'Katai ki hui fasal ko Oonchi aur khushk jagah par muntaqil karein',
        'Maweshion ko bijli ke khambon aur daryaee ilaqon se door rakhen',
        'Kachi chhaton aur zeyr-e-aab rasto se aatyaat karein'
      ],
      bannerBg: 'bg-amber-900/90 text-white',
      bannerBorder: 'border-amber-500',
      textColor: 'text-amber-100',
      badgeBg: 'bg-amber-500 text-black'
    };
  }

  // 3. High Humidity & Mild Temp -> Crop Pest & Fungus Alert (Blight/Locust/Fungal risk)
  if (humidity >= 80 && temp >= 25 && temp <= 35) {
    return {
      level: 'WARNING',
      category: 'HIGH_HUMIDITY_PEST',
      title: 'HIGH HUMIDITY - CROP PEST / BLIGHT ALERT',
      titleUrdu: 'نمی کا میں اضافہ - کیڑے اور بیماری کا خطرہ / Pest Alert',
      description: `Humidity is very high (${humidity}%). Conditions favor fungal diseases (rust/blight) and sucking pests in crops.`,
      descriptionUrdu: `Hawa mein nami (${humidity}%) ziada hai. Faslon par keere aur pafeendi (fungus) ka khatra hai.`,
      actionPoints: [
        'Inspect leaves of Cotton/Wheat/Rice for early signs of fungal rust, whitefly, or aphid attacks',
        'Avoid flood irrigation today; high humidity already preserves soil moisture',
        'Apply bio-fungicides or recommended organic spray during calm morning hours',
        'Ensure proper spacing or weeding to improve air circulation around crops'
      ],
      actionPointsUrdu: [
        'Pattay jaanchain taake keeRay ya bimari ka barwaqt pata chal sake',
        'Aaj ziada paani na dein, fasal mein nami mojud hai',
        'Subah ke waqt sifarish shuda spray karein'
      ],
      bannerBg: 'bg-amber-800/80 text-white',
      bannerBorder: 'border-amber-600',
      textColor: 'text-amber-100',
      badgeBg: 'bg-amber-600 text-white'
    };
  }

  // 4. Dust Storm / High Wind Warning (Andhi / Toofan)
  if (wind >= 30 || desc.includes('dust') || desc.includes('sand') || desc.includes('squall') || condition.includes('squall')) {
    return {
      level: 'WARNING',
      category: 'DUST_STORM',
      title: 'HIGH WIND / DUST STORM WARNING',
      titleUrdu: 'گرد آلود آندھی اور تیز ہوا الرٹ / Andhi Warning',
      description: `High wind speed detected (${wind} km/h). Reduced visibility and risk to standing tall crops (sugarcane/maize).`,
      descriptionUrdu: `Teez hawa aur aandhi (${wind} km/h). Oonchi faslon aur kachay makaano ke liye aatyaat zaroori hai.`,
      actionPoints: [
        'Do NOT perform pesticide spray today as wind will cause drift and waste chemicals',
        'Support tall standing crops like Sugarcane, Maize, and Banana plants',
        'Cover open water storage, grain solar dryers, and household water tanks',
        'Wear protective masks or cloth covering mouth and eyes during outdoor travel'
      ],
      actionPointsUrdu: [
        'Aaj khetom mein spray na karein, hawa se zaya ho jayega',
        'Kamzor aur oonchi faslon ko sahara dein',
        'Paani ke tanki aur gandum ko dhak kar rakhen',
        'Aandhi ke dauran mu aur aankhon ko kapRay se dhakain'
      ],
      bannerBg: 'bg-orange-900/80 text-white',
      bannerBorder: 'border-orange-500',
      textColor: 'text-orange-100',
      badgeBg: 'bg-orange-500 text-white'
    };
  }

  // 5. Extreme Dry / Low Humidity Drought Hazard (Subah/Shaam dry spell)
  if (humidity <= 25 && temp >= 32) {
    return {
      level: 'ADVISORY',
      category: 'DRY_DROUGHT',
      title: 'DRY SPELL & EVAPORATION ALERT',
      titleUrdu: 'شدید خشک سالی اور پانی کا ضیاع / Dry Weather Advisory',
      description: `Air moisture is extremely low (${humidity}%). Rapid soil moisture loss is occurring.`,
      descriptionUrdu: `Hawa mein nami bohut kam hai (${humidity}%). Zameen jald khushk ho rahi hai.`,
      actionPoints: [
        'Apply organic soil mulch (straw/leaves) around crop roots to conserve soil moisture',
        'Prioritize drip irrigation or alternate-furrow watering to save 40% water',
        'Ensure farm animals have extra shade and wet jute cloth cooling',
        'Avoid open burning of crop residue to prevent accidental farm fires'
      ],
      actionPointsUrdu: [
        'Paani bachat ke liye drip ya choti naaliyon se aabyari karein',
        'JaRay khushk hone se bachane ke liye malching karein',
        'Khetom mein aag lagane se strictly perhez karein'
      ],
      bannerBg: 'bg-yellow-900/80 text-white',
      bannerBorder: 'border-yellow-600',
      textColor: 'text-yellow-100',
      badgeBg: 'bg-yellow-600 text-white'
    };
  }

  // 6. Cold / Frost Alert (Winter in Northern Pakistan / Punjab winter nights)
  if (temp <= 4) {
    return {
      level: 'WARNING',
      category: 'COLD_FROST',
      title: 'FROST & COLD WAVE ALERT',
      titleUrdu: 'شدید کورا اور سردی کا الرٹ / Frost Alert',
      description: `Temperature near freezing (${temp}°C). Risk of frost damage to young crops, citrus orchards, and vegetables.`,
      descriptionUrdu: `Kora aur shadeed sardi (${temp}°C). Sabzion aur baaghat par koray se bachao ki zaroorat hai.`,
      actionPoints: [
        'Give light evening irrigation to raise soil thermal capacity and fight frost',
        'Cover nursery seedlings with polythene sheets or straw night shades',
        'Provide warm shelter and dry bedding for cattle, sheep, and poultry',
        'Cover exposed water pipes to prevent freezing and bursting'
      ],
      actionPointsUrdu: [
        'Koray se bachao ke liye shaam ke waqt halka paani dein',
        'Poudon ko polythene ya paraal se dhakain',
        'Janwaron ko garm aur khushk jagah par rakhen'
      ],
      bannerBg: 'bg-blue-900/80 text-white',
      bannerBorder: 'border-blue-500',
      textColor: 'text-blue-100',
      badgeBg: 'bg-blue-500 text-white'
    };
  }

  // Default Favorable / Normal weather
  return {
    level: 'NORMAL',
    category: 'FAVORABLE',
    title: 'FAVORABLE WEATHER CONDITIONS',
    titleUrdu: 'خوشگوار اور مناسب موسم / Normal Weather',
    description: `Current temperature is ${temp}°C with ${humidity}% humidity. Weather conditions are generally favorable for routine farming and outdoor activity.`,
    descriptionUrdu: `Mausam shandar hai (${temp}°C). Kashtkari aur aam kaamo ke liye munasib waqt hai.`,
    actionPoints: [
      'Ideal conditions for routine crop inspection, weeding, and balanced fertilizer application',
      'Good weather to clean solar water pump panels and water storage reservoirs',
      'Check Sabz Pakistan local water conservation guidelines to optimize seasonal irrigation',
      'Ensure standard daily hydration and livestock grazing schedule'
    ],
    actionPointsUrdu: [
      'Fasal ki dekhbhaal aur khaad daalne ka munasib waqt',
      'Solar panels aur paani ke zakhiray saaf karein',
      'Maweshion ke liye aam rozmarra ka schedule rakhen'
    ],
    bannerBg: 'bg-emerald-900/80 text-emerald-100',
    bannerBorder: 'border-emerald-600',
    textColor: 'text-emerald-100',
    badgeBg: 'bg-emerald-600 text-white'
  };
}

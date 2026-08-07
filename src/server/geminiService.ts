import { GoogleGenAI, Type } from '@google/genai';
import { WeatherData, GeminiAdvisory } from '../types';

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is not set.');
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

export async function generateWeatherAdvisory(
  weather: WeatherData,
  userQuestion?: string
): Promise<GeminiAdvisory> {
  const ai = getGenAI();

  // Baseline fallback advisory if API key is absent or fails
  const fallbackAdvisory: GeminiAdvisory = {
    farmingTip: `For ${weather.cityName} (${weather.temp}°C, ${weather.humidity}% humidity): ${
      weather.temp > 38
        ? 'Protect young saplings with shade covers and avoid daytime irrigation.'
        : weather.humidity > 75
        ? 'Inspect fields for rust and sucking pests due to high moisture.'
        : 'Maintain standard weeding and regular field inspections.'
    }`,
    farmingTipUrdu: `Kashatkari Tip: Subah savere ya shaam ke waqt paani dein. Hawa mein nami aur garmi ka khayal rakhen.`,
    waterConservation: `Under the Sabz Pakistan initiative, adopt drip or alternate furrow irrigation to save up to 40% water in ${weather.cityName}.`,
    waterConservationUrdu: `Paani ki bachat: Drip irrigation ya choti naaliyon se paani dein taake zayada se zayada paani bache.`,
    livestockCare: `Keep livestock in shaded, ventilated shelters with access to clean cold water and salt lick.`,
    healthSafety: `Drink 3-4 liters of clean water or ORS today. Wear cotton clothes during farm hours.`,
    summary: `Sabz Pakistan Climate Advisory for ${weather.cityName}: Temperature ${weather.temp}°C, Humidity ${weather.humidity}%. Stay resilient!`,
  };

  if (!ai) {
    return fallbackAdvisory;
  }

  try {
    const prompt = `
You are "MausamRakshak AI", an expert agricultural and climate resilience advisor for Pakistani farmers and citizens operating under the "Sabz Pakistan" environmental theme.

Current Weather Context in Pakistan:
- Location: ${weather.cityName}, ${weather.province || 'Pakistan'}
- Temperature: ${weather.temp}°C (Feels like ${weather.feelsLike}°C)
- Humidity: ${weather.humidity}%
- Weather Condition: ${weather.condition} (${weather.description})
- Wind Speed: ${weather.windSpeed} km/h
- Rain Estimate: ${weather.rain1h || 0} mm/hr
${userQuestion ? `- Specific User Question: "${userQuestion}"` : ''}

Generate practical, concise, action-oriented climate resilience advice suitable for Pakistani farmers, gardeners, and households.
Use a mix of clear English AND simple Roman Urdu / Urdu script so local communities can easily comprehend.

Requirements:
1. farmingTip: Practical advice on crops, soil, spraying, or harvesting for current weather in English.
2. farmingTipUrdu: The same farming advice in simple Roman Urdu + concise Urdu script.
3. waterConservation: Practical tip on water saving/irrigation efficiency aligned with Sabz Pakistan (e.g. drip, mulching, rainwater capture).
4. waterConservationUrdu: Water tip in simple Roman Urdu.
5. livestockCare: Brief tip on cattle/poultry care for these weather conditions.
6. healthSafety: Heatwave / weather personal safety advice.
7. summary: One punchy sentence summary for the Sabz Pakistan daily broadcast.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an expert Pakistani agronomist and climate resilience AI assistant for Sabz Pakistan. Provide simple, extremely useful advice in English and Roman Urdu.',
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            farmingTip: { type: Type.STRING },
            farmingTipUrdu: { type: Type.STRING },
            waterConservation: { type: Type.STRING },
            waterConservationUrdu: { type: Type.STRING },
            livestockCare: { type: Type.STRING },
            healthSafety: { type: Type.STRING },
            summary: { type: Type.STRING },
          },
          required: [
            'farmingTip',
            'farmingTipUrdu',
            'waterConservation',
            'waterConservationUrdu',
            'livestockCare',
            'healthSafety',
            'summary',
          ],
        },
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text) as GeminiAdvisory;
      return parsed;
    }

    return fallbackAdvisory;
  } catch (err) {
    console.error('Error generating Gemini weather advisory:', err);
    return fallbackAdvisory;
  }
}

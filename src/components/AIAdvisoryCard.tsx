import React, { useState } from 'react';
import {
  Sparkles,
  Sprout,
  Droplets,
  HeartPulse,
  Send,
  Loader2,
  RefreshCw,
  MessageSquare,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { WeatherData, GeminiAdvisory } from '../types';

interface AIAdvisoryCardProps {
  weather: WeatherData;
  advisory: GeminiAdvisory | null;
  isLoading: boolean;
  onRefreshAdvisory: (customQuestion?: string) => void;
}

export const AIAdvisoryCard: React.FC<AIAdvisoryCardProps> = ({
  weather,
  advisory,
  isLoading,
  onRefreshAdvisory,
}) => {
  const [activeTab, setActiveTab] = useState<'farming' | 'water' | 'livestock' | 'health'>('farming');
  const [customQuery, setCustomQuery] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim() || isLoading) return;
    setIsAsking(true);
    onRefreshAdvisory(customQuery.trim());
    setCustomQuery('');
    setTimeout(() => setIsAsking(false), 2000);
  };

  const sampleQuestions = [
    'Should I spray pesticide on cotton today?',
    'Protect orchard trees from extreme heat?',
    'Best water conservation tip for wheat?',
    'Heat stress relief for dairy cattle?',
  ];

  return (
    <div className="bg-[#1b4332] rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-sm border border-[#123124] flex flex-col justify-between space-y-6">
      <div className="relative z-10 space-y-6">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Gemini Advisory</h3>
              <p className="text-xs text-white/70">
                AI Climate Insights for {weather.cityName}
              </p>
            </div>
          </div>

          <button
            onClick={() => onRefreshAdvisory()}
            disabled={isLoading}
            title="Regenerate Gemini AI Advisory"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1 rounded-full bg-black/20 border border-white/10">
          <button
            onClick={() => setActiveTab('farming')}
            className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'farming'
                ? 'bg-white text-[#1b4332] shadow-xs'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Farming</span>
          </button>

          <button
            onClick={() => setActiveTab('water')}
            className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'water'
                ? 'bg-white text-[#1b4332] shadow-xs'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Water</span>
          </button>

          <button
            onClick={() => setActiveTab('livestock')}
            className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'livestock'
                ? 'bg-white text-[#1b4332] shadow-xs'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Livestock</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'health'
                ? 'bg-white text-[#1b4332] shadow-xs'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Health</span>
          </button>
        </div>

        {/* Advisory Content Display */}
        {isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 bg-white/5 rounded-2xl border border-white/10">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
            <p className="text-sm font-semibold text-white">
              Consulting Gemini 3.6 Flash AI...
            </p>
          </div>
        ) : advisory ? (
          <div className="space-y-4">
            {activeTab === 'farming' && (
              <div className="space-y-2">
                <p className="text-xs text-white/60 font-mono"># Farming Advice</p>
                <p className="text-base sm:text-lg font-medium leading-relaxed italic">
                  "{advisory.farmingTip}"
                </p>
                {advisory.farmingTipUrdu && (
                  <p className="text-xs text-emerald-200 bg-white/10 p-3 rounded-xl border border-white/10 font-medium leading-relaxed">
                    <strong>Roman Urdu:</strong> {advisory.farmingTipUrdu}
                  </p>
                )}
              </div>
            )}

            {activeTab === 'water' && (
              <div className="space-y-2">
                <p className="text-xs text-white/60 font-mono"># Water Conservation</p>
                <p className="text-base sm:text-lg font-medium leading-relaxed">
                  {advisory.waterConservation}
                </p>
                {advisory.waterConservationUrdu && (
                  <p className="text-xs text-emerald-200 bg-white/10 p-3 rounded-xl border border-white/10 font-medium leading-relaxed">
                    <strong>Roman Urdu:</strong> {advisory.waterConservationUrdu}
                  </p>
                )}
              </div>
            )}

            {activeTab === 'livestock' && (
              <div className="space-y-2">
                <p className="text-xs text-white/60 font-mono"># Livestock Protection</p>
                <p className="text-base sm:text-lg font-medium leading-relaxed">
                  {advisory.livestockCare}
                </p>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-2">
                <p className="text-xs text-white/60 font-mono"># Health & Heat Safety</p>
                <p className="text-base sm:text-lg font-medium leading-relaxed">
                  {advisory.healthSafety}
                </p>
              </div>
            )}

            <div className="h-px bg-white/10 w-full" />

            <p className="text-xs text-white/80 italic">
              "{advisory.summary}"
            </p>
          </div>
        ) : null}

        {/* Ask AI Input */}
        <div className="pt-2 border-t border-white/10 space-y-3">
          <form onSubmit={handleCustomQuestionSubmit} className="flex gap-2">
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Ask custom question..."
              className="flex-1 bg-white/10 text-white placeholder-white/50 text-xs rounded-full px-4 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={isLoading || !customQuery.trim()}
              className="px-4 py-2 bg-white text-[#1b4332] font-bold rounded-full text-xs shadow-xs hover:bg-emerald-100 transition-all disabled:opacity-50 shrink-0"
            >
              {isAsking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </form>

          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onRefreshAdvisory(q)}
                disabled={isLoading}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 border border-white/10 transition-colors text-left"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

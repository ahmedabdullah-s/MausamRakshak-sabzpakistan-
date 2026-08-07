import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, ShieldAlert, CheckCircle, Share2, PhoneCall, ChevronDown, ChevronUp } from 'lucide-react';
import { RiskAlert } from '../types';

interface RiskAlertCardProps {
  alert: RiskAlert;
  cityName: string;
}

export const RiskAlertCard: React.FC<RiskAlertCardProps> = ({ alert, cityName }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const getAlertIcon = (category: string) => {
    switch (category) {
      case 'HEATWAVE':
        return <AlertTriangle className="w-8 h-8 text-white" />;
      case 'HEAVY_RAIN':
        return <ShieldAlert className="w-8 h-8 text-white" />;
      case 'DUST_STORM':
      case 'HIGH_HUMIDITY_PEST':
      case 'COLD_FROST':
        return <AlertCircle className="w-8 h-8 text-white" />;
      default:
        return <CheckCircle className="w-8 h-8 text-white" />;
    }
  };

  const handleShareAlert = () => {
    const shareText = `⚠️ [MAUSAM RAKSHAK ALERT for ${cityName.toUpperCase()}]\n${alert.title}\n${alert.titleUrdu}\n\n${alert.description}\n\nAction Steps:\n${alert.actionPoints.slice(0, 2).map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nStay Safe with Sabz Pakistan!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } else {
      alert(shareText);
    }
  };

  const isSevere = alert.level === 'HIGH' || alert.category === 'HEATWAVE';

  return (
    <div
      className={`rounded-[2rem] p-6 sm:p-8 border-2 shadow-xs transition-all ${
        isSevere
          ? 'bg-[#fff1f1] border-[#ffdbdb] text-[#1b4332]'
          : 'bg-[#fefce8] border-[#fef08a] text-[#1b4332]'
      }`}
    >
      {/* Top Warning Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg shrink-0 ${
              isSevere
                ? 'bg-[#ff4d4d] text-white shadow-red-200'
                : 'bg-[#eab308] text-white shadow-yellow-200'
            }`}
          >
            {getAlertIcon(alert.category)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight text-white ${
                  isSevere ? 'bg-[#ff4d4d]' : 'bg-[#eab308]'
                }`}
              >
                Priority {alert.level}
              </span>
              <span className="text-xs font-semibold text-[#8ca691]">
                {cityName} Weather Alert
              </span>
            </div>

            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isSevere ? 'text-[#b91c1c]' : 'text-[#854d0e]'}`}>
              {alert.title}
            </h3>
            <p className="text-base font-semibold text-[#7f1d1d] mt-0.5">
              {alert.titleUrdu}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 rounded-full bg-white border border-[#ffdbdb] text-[#1b4332] hover:bg-[#fff1f1] transition-colors shadow-2xs"
            title={isExpanded ? "Collapse alert details" : "Expand alert details"}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content Body */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-[#ffdbdb] space-y-5">
          {/* Plain Language Warning Description */}
          <div className="p-4 rounded-2xl bg-white border border-[#ffdbdb] space-y-1">
            <p className="text-base sm:text-lg text-[#7f1d1d] font-medium leading-relaxed">
              {alert.description}
            </p>
            <p className="text-xs text-[#b91c1c] font-semibold italic mt-1">
              {alert.descriptionUrdu}
            </p>
          </div>

          {/* Action Points / Safety Steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#b91c1c] mb-3">
              Recommended Safety & Farming Actions:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {alert.actionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#ffdbdb] text-xs sm:text-sm text-[#1b4332]"
                >
                  <span className="w-6 h-6 rounded-full bg-[#ff4d4d] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <div className="space-y-0.5">
                    <p className="font-semibold text-[#1b4332]">{point}</p>
                    {alert.actionPointsUrdu?.[index] && (
                      <p className="text-xs text-[#7f1d1d]">
                        {alert.actionPointsUrdu[index]}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency & Community Sharing Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#ffdbdb] text-xs">
            <button
              onClick={handleShareAlert}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b4332] text-white font-bold hover:bg-[#2d6a4f] transition-colors shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Alert Message!' : 'Share to Farmers WhatsApp'}</span>
            </button>

            <div className="flex items-center gap-2 text-[#7f1d1d] font-bold">
              <PhoneCall className="w-4 h-4 text-[#b91c1c]" />
              <span>PDMA Emergency Helpline: <strong className="text-[#b91c1c]">1122</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

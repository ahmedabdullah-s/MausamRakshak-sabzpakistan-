import React from 'react';
import { Leaf, ShieldCheck, TreePine, Droplet, PhoneCall } from 'lucide-react';

export const SabzPakistanBanner: React.FC = () => {
  return (
    <div className="rounded-[2rem] bg-white border border-[#e0e9dd] p-5 sm:p-6 shadow-xs text-[#1b4332] flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#1b4332] flex items-center justify-center text-white shrink-0 shadow-xs">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[#1b4332] text-base sm:text-lg">Sabz Pakistan Climate Resilience Initiative</h4>
            <span className="text-[10px] font-extrabold bg-[#f0f4ee] text-[#1b4332] border border-[#d1dbcf] px-2.5 py-0.5 rounded-full">
              سبز پاکستان
            </span>
          </div>
          <p className="text-xs text-[#5a7d6c] font-medium mt-1 max-w-2xl leading-relaxed">
            Empowering Pakistani farmers and communities with AI weather alerts, localized water-saving strategies, and extreme heatwave protection.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 text-xs w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#e0e9dd] pt-3 md:pt-0">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f8faf7] border border-[#d1dbcf] text-[#1b4332] font-semibold shadow-2xs">
          <Droplet className="w-4 h-4 text-[#1b4332]" />
          <span>Save Every Drop</span>
        </div>

        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f8faf7] border border-[#d1dbcf] text-[#1b4332] font-semibold shadow-2xs">
          <TreePine className="w-4 h-4 text-[#1b4332]" />
          <span>Plant Trees</span>
        </div>
      </div>
    </div>
  );
};

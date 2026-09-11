import React from 'react';
import { Compass, Sparkles, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { ScreenType } from '../types';

interface HeroSectionProps {
  onExplorePackages: () => void;
  onRequestCustomItinerary: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePackages,
  onRequestCustomItinerary
}) => {
  return (
    <div className="relative overflow-hidden bg-brand-sage text-brand-cream-light border-b border-brand-border">
      {/* Background Graphic Patterns & Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-rust blur-[128px]" />
        <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-brand-cream-dark blur-[128px]" />
      </div>

      {/* Decorative mountain landscape image back drop */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtPWo23b1k74VKwXVpUu_sO3txFkBw4ZMemVSWR--6RC05c-7wQ0clil5BrPRm8Qdlgg8GJJ1X5H9A3ls3byiRNHtLHsiqCPfT_KUflooIqY1Hc3Z060G69ZgxDqGlTAPgEAphA8jd49nR2C2CqJLGgtzHrz-xAvtIG274IOY64rvPQ76z0Lq0r0EvRx_zCeSo_STZfb_yhtgej4JlQlT2qMSnrUd7QBfZ2J42wxvLV3nzQkoPiiTaqiZQPvPeuz29RY1LphOqgU8')`,
        }}
      />
      
      {/* Soft gradient bottom mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-sage via-brand-sage/80 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Trust Indicator / Special Voucher Badge */}
            <div className="inline-flex items-center gap-2 rounded-md bg-brand-rust/20 px-4 py-2 border border-brand-rust/35 text-brand-cream-light">
              <Sparkles className="h-3.5 w-3.5 text-brand-rust" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
                Gulmarg Phase 1 & 2 Gondola Passes Guaranteed
              </span>
            </div>

            {/* Display Header */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-cream-light font-medium tracking-tight leading-[1.1]">
              Discover Kashmir in <span className="italic text-brand-rust">Ultimate Luxury</span>
            </h1>

            {/* Support Copy */}
            <p className="font-sans text-sm sm:text-base text-brand-cream-light/80 max-w-xl leading-relaxed font-light">
              Skip the ticket queues and cookie-cutter tourist buses. The Sabil Voyages crafts bespoke private journeys, premium houseboat stays, and personalized experiences with Srinagar&apos;s most trusted travel guides.
            </p>

            {/* Trust Features Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-brand-cream-light/90">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-rust/20 text-brand-rust border border-brand-rust/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">Bespoke 1-on-1 WhatsApp curation</span>
              </div>
              <div className="flex items-center gap-2.5 text-brand-cream-light/90">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-rust/20 text-brand-rust border border-brand-rust/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">Private premium 4x4 Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2.5 text-brand-cream-light/90">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-rust/20 text-brand-rust border border-brand-rust/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">Hand-picked Luxury boutique resorts</span>
              </div>
              <div className="flex items-center gap-2.5 text-brand-cream-light/90">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-rust/20 text-brand-rust border border-brand-rust/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">Verified local expert coordinators</span>
              </div>
            </div>

            {/* Two Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onExplorePackages}
                className="flex items-center justify-center gap-2 rounded-lg bg-brand-rust hover:bg-brand-rust-hover px-7 py-4 text-xs font-bold uppercase tracking-wider text-brand-cream-light transition-all duration-300"
                id="btn-hero-explore"
              >
                <Compass className="h-4 w-4 text-brand-cream-light" />
                <span>Explore Bespoke Safaris</span>
                <ArrowRight className="h-4 w-4 text-brand-cream-light" />
              </button>

              <button
                onClick={onRequestCustomItinerary}
                className="flex items-center justify-center gap-2 rounded-lg bg-transparent hover:bg-brand-cream-light/10 border border-brand-border px-7 py-4 text-xs font-bold uppercase tracking-wider text-brand-cream-light transition-all duration-300"
                id="btn-hero-custom"
              >
                <span>Tailored Travel Plan</span>
              </button>
            </div>

          </div>

          {/* Hero Right Visual Column - Custom interactive badge cards */}
          <div className="hidden lg:col-span-5 lg:flex flex-col items-center justify-center relative">
            <div className="relative group overflow-hidden rounded-lg border border-brand-border aspect-4/3 w-full bg-brand-sage shadow-md">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLWHneZevP4Yf41xU58nVPTsqlQWmJrvZT9Bx5Zdku9VxdVFMDurVj4ar2Xl_lc4AS8sdXtnynRLvLUZsyj4SSAjEI262AdGIGkLzQ3wfvPMmed2_Jy2-y2oafN2xvyctwHV1_t4e1UGrXkprzZvq35zNMwAsAZJKorU8kh8v_Lp0c3O5mNO_JAZXZsPn2Pc7QNs8-TqB7pmhE37L-IU2CydYJTquOYdo0tzWJ9--ALj-ks0D1jRhLtzrIbiYpBMR3b2DtJqDFAew" 
                alt="Ski resort Gulmarg" 
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-sage/80 via-transparent" />
              
              {/* Overlay description badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-brand-sage/90 backdrop-blur-md p-4 border border-brand-border text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] text-brand-rust font-bold uppercase tracking-widest leading-none">
                      Featured Destination
                    </p>
                    <h3 className="text-sm font-bold text-brand-cream-light mt-1 font-serif">Gulmarg Snow Meadows</h3>
                  </div>
                  <div className="rounded bg-brand-rust px-2.5 py-1 text-xs font-mono font-bold text-brand-cream-light">
                    ★ 4.9
                  </div>
                </div>
              </div>
            </div>

            {/* Absolute positioning statistical floats */}
            <div className="absolute -top-6 -left-6 rounded-lg bg-brand-cream-light p-3.5 shadow-md text-brand-onyx flex items-center gap-3 border border-brand-border">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-cream-dark text-brand-rust font-serif text-lg font-bold">
                A+
              </div>
              <div className="text-left">
                <p className="font-mono text-[8px] uppercase tracking-wider text-brand-onyx/50">Trusted By</p>
                <p className="text-xs font-bold text-brand-onyx font-serif">1,200+ Premium Families</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 rounded-lg bg-brand-sage/95 backdrop-blur-sm p-4 border border-brand-border flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-rust/20 text-brand-rust">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-[9px] text-brand-rust font-mono tracking-widest font-semibold uppercase">Real-Time Team</p>
                <p className="text-xs font-semibold text-brand-cream-light font-serif">Srinagar Main Office</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Compass, HelpCircle, ShieldCheck, Heart, Send } from 'lucide-react';
import { ScreenType } from '../types';
import { whatsappConfig } from '../data';

interface FooterProps {
  setScreen: (screen: ScreenType) => void;
  onRequestCustomItinerary: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setScreen,
  onRequestCustomItinerary
}) => {
  const handleNavClick = (screen: ScreenType) => {
    setScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-sage text-brand-cream-light border-t border-brand-border pt-16 pb-8 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-brand-border/20 pb-12">
          
          {/* Column 1: App identity */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left"
              id="footer-logo"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-cream-light font-bold text-brand-sage">
                <Compass className="h-5.5 w-5.5 text-brand-rust" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-tight text-white leading-none">
                  The Sabil <span className="font-serif italic font-normal text-brand-rust">Voyages</span>
                </h3>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#DDD8CE] font-bold mt-1">
                  Kashmir Luxury Travel Safaris
                </p>
              </div>
            </button>

            <p className="text-xs text-brand-cream-light/80 max-w-sm leading-relaxed font-light">
              The Sabil Voyages is Srinagar’s premier bespoke travel coordinator. Licensed by Jammu & Kashmir Tourism Department, we guarantee luxury stays, private SUV chauffeurs, and access to sold-out Gulmarg Gondola queue routes.
            </p>

            {/* J&K Licensing indicator */}
            <div className="inline-flex items-center gap-2 rounded bg-brand-dust/10 px-3.5 py-1.5 border border-brand-rust/20 text-brand-cream-light">
              <ShieldCheck className="h-4 w-4 text-brand-rust" />
              <span className="font-mono text-[9px] uppercase tracking-widest font-semibold text-[#DDD8CE]">
                J&K Tourism Lic No. JKT-2951-H
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">
              Sitemap Destinations
            </h4>
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => handleNavClick('home')}
                className="text-xs text-brand-cream-light/70 hover:text-brand-rust hover:underline transition-all text-left font-light"
                id="footer-nav-home"
              >
                Paradisal Home
              </button>
              <button 
                onClick={() => handleNavClick('packages')}
                className="text-xs text-brand-cream-light/70 hover:text-brand-rust hover:underline transition-all text-left font-light"
                id="footer-nav-packages"
              >
                Bespoke Safaris Explorer
              </button>
              <button 
                onClick={() => handleNavClick('inquiry')}
                className="text-xs text-brand-cream-light/70 hover:text-brand-rust hover:underline transition-all text-left font-light"
                id="footer-nav-inquiry"
              >
                WhatsApp Inquiry Portal
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-xs text-brand-cream-light/70 hover:text-brand-rust hover:underline transition-all text-left font-light"
                id="footer-nav-contact"
              >
                Srinagar Support Office
              </button>
              <button 
                onClick={() => handleNavClick('admin')}
                className="text-xs text-brand-cream-light/50 hover:text-[#CCD1C8] hover:underline transition-all text-left font-mono uppercase tracking-wider text-[10px] mt-2 pt-2 border-t border-brand-border/10 flex items-center gap-1.5"
                id="footer-nav-admin"
              >
                <span>🔑</span> Admin Desk
              </button>
            </div>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">
              Instant Support Desk
            </h4>
            <div className="space-y-4">
              <p className="text-xs text-brand-cream-light/80 leading-relaxed font-light">
                Need a sudden modification? Reach out to {whatsappConfig.agentName} directly via real-time WhatsApp audio or text notes.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/${whatsappConfig.phoneNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded bg-brand-rust hover:bg-brand-rust-hover text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  id="footer-cta-whatsapp"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Srinagar Helpline Hotline</span>
                </a>

                <button
                  onClick={onRequestCustomItinerary}
                  className="inline-flex items-center justify-center gap-2 rounded border border-brand-border/20 bg-brand-cream-light/5 hover:bg-brand-cream-light/10 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
                  id="footer-cta-custom"
                >
                  <span>Build Custom Itinerary</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Cohesive regional pride and copyright footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-cream-light/60 gap-4">
          <p>© {new Date().getFullYear()} The Sabil Voyages Safaris. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5 text-[#DDD8CE] font-mono text-[10px]">
            <span>Handcrafted with</span>
            <Heart className="h-3 w-3 text-brand-rust fill-brand-rust animate-pulse" />
            <span>in Srinagar, Jammu & Kashmir</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

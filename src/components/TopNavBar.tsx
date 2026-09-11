import React, { useState } from 'react';
import { Compass, PhoneCall, Menu, X, Share2, Sparkles, Send } from 'lucide-react';
import { ScreenType } from '../types';
import { whatsappConfig } from '../data';

interface TopNavBarProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  onRequestCustomItinerary: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentScreen,
  setScreen,
  onRequestCustomItinerary
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', screen: 'home' as ScreenType },
    { label: 'Explore Safaris', screen: 'packages' as ScreenType },
    { label: 'WhatsApp Inquiry', screen: 'inquiry' as ScreenType },
    { label: 'Office & Support', screen: 'contact' as ScreenType },
    { label: 'Admin Desk', screen: 'admin' as ScreenType }
  ];

  const handleNavClick = (screen: ScreenType) => {
    setScreen(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Sabil Voyages - Luxury Kashmir Travel Safaris',
          text: 'Check out The Sabil Voyages for curated luxury tours, Gondola bookings, and premium stays in Kashmir.',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled or failing', err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share it on WhatsApp or social media!');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-cream-light/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left transition-transform hover:scale-[1.01]"
          id="btn-logo-home"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-sage font-bold text-brand-cream-light shadow-sm">
            <Compass className="h-5 w-5 animate-spin-slow text-brand-rust" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-onyx leading-none">
              The Sabil <span className="font-serif italic font-normal text-brand-rust">Voyages</span>
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-brand-onyx/60 font-semibold mt-1">
              Kashmir Luxury Safaris
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => handleNavClick(item.screen)}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg hover:bg-brand-cream-dark/50 ${
                  isActive 
                    ? 'text-brand-rust font-bold' 
                    : 'text-brand-onyx/75 hover:text-brand-onyx'
                }`}
                id={`nav-item-${item.screen}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-brand-rust rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {/* Quick Share to trigger virality */}
          <button 
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-brand-onyx/70 transition-colors hover:bg-brand-cream-dark hover:text-brand-onyx"
            title="Share with Friends"
            id="btn-share-app"
          >
            <Share2 className="h-4 w-4" />
          </button>

          {/* Luxury Customizer CTA */}
          <button
            onClick={onRequestCustomItinerary}
            className="group flex items-center gap-2 rounded-lg bg-brand-onyx hover:bg-brand-rust px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-300"
            id="btn-nav-custom-itinerary"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-rust group-hover:scale-110" />
            <span>Tailor My Trip</span>
          </button>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-brand-onyx/70 transition-colors hover:bg-brand-cream-dark"
            id="btn-mobile-share"
          >
            <Share2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-brand-onyx/80 hover:bg-brand-cream-dark"
            id="btn-toggle-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-cream-light/95 backdrop-blur-lg">
          <div className="space-y-1.5 px-4 py-6">
            {navItems.map((item) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => handleNavClick(item.screen)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-brand-cream-dark text-brand-rust font-bold' 
                      : 'text-brand-onyx/80 hover:bg-brand-cream-dark hover:text-brand-onyx'
                  }`}
                  id={`mobile-nav-${item.screen}`}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="h-2 w-2 rounded-full bg-brand-rust" />}
                </button>
              );
            })}

            <div className="pt-4 border-t border-brand-border mt-4 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestCustomItinerary();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-rust hover:bg-brand-rust-hover py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                id="btn-mobile-nav-custom"
              >
                <Sparkles className="h-4 w-4" />
                <span>Tailor My Kashmir Trip</span>
              </button>
              
              <a
                href={`https://wa.me/${whatsappConfig.phoneNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-border bg-brand-cream-light py-3 text-xs font-bold uppercase tracking-wider text-brand-onyx hover:bg-brand-cream-dark"
                id="btn-mobile-nav-whatsapp"
              >
                <Send className="h-4 w-4 text-brand-rust" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

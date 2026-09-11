import React, { useState } from 'react';
import { inquiryTopics, useWhatsappConfig } from '../data';
import { InquiryTopic } from '../types';
import { 
  Send, 
  Users, 
  Heart, 
  Sparkles, 
  Briefcase, 
  QrCode, 
  CheckCircle, 
  MessageSquareText, 
  PhoneCall, 
  ArrowRight 
} from 'lucide-react';

export const InquiryView: React.FC = () => {
  const [whatsappConfig] = useWhatsappConfig();
  const [selectedTopic, setSelectedTopic] = useState<InquiryTopic>(inquiryTopics[0]);
  const [customText, setCustomText] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [travelDate, setTravelDate] = useState<string>('');

  // Map icons helper based on topic category
  const renderTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="h-4 w-4 text-brand-rust" />;
      case 'Heart': return <Heart className="h-4 w-4 text-brand-rust" />;
      case 'Sparkles': return <Sparkles className="h-4 w-4 text-brand-rust" />;
      case 'Briefcase': return <Briefcase className="h-4 w-4 text-brand-rust" />;
      default: return <MessageSquareText className="h-4 w-4 text-brand-rust" />;
    }
  };

  // Compile final WhatsApp preview message dynamically
  const getCompiledMessage = () => {
    let base = selectedTopic.whatsappMessage;
    if (guestName) {
      base += ` My name is ${guestName}.`;
    }
    if (travelDate) {
      base += ` We are planning to visit around ${travelDate}.`;
    }
    if (customText) {
      base += ` Custom details: ${customText}`;
    }
    return base;
  };

  const getWhatsAppHref = () => {
    const finalMsg = getCompiledMessage();
    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(finalMsg)}`;
  };

  const handleInquiryAction = () => {
    const generatedId = `SVV-IQ-${Math.floor(1000 + Math.random() * 8999)}`;
    const newInquiryObj = {
      id: generatedId,
      name: guestName.trim() || 'Anonymous Traveler',
      phone: 'Direct via WhatsApp Link Click',
      email: 'N/A',
      guests: 'As discussed',
      month: travelDate.trim() || 'Undecided',
      tier: selectedTopic.title,
      notes: customText.trim() || `Interested in: "${selectedTopic.title}" • ${selectedTopic.description}`,
      timestamp: new Date().toISOString(),
      status: 'unread',
      source: 'WhatsApp Curation Form'
    };

    try {
      const stored = localStorage.getItem('thesabil_itineraries_v1');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newInquiryObj);
      localStorage.setItem('thesabil_itineraries_v1', JSON.stringify(list));
      window.dispatchEvent(new Event('sabil_itineraries_updated'));
    } catch (_) {
      // fallback
    }
  };

  const stepGuides = [
    {
      num: '01',
      title: 'Send Initial Inquiry Topic',
      desc: 'Click a topic button or customize below. It loads an instant template message on your phone.'
    },
    {
      num: '02',
      title: 'Get Hand-Tailored Drafts',
      desc: 'Our Srinagar office generates 2-3 custom day-by-day itineraries with genuine hotel photos under 2 hours.'
    },
    {
      num: '03',
      title: 'Zero-Deposit Refinement',
      desc: 'Refine hotel ratings, car capacities & route stopovers until you are 100% happy. No obligation.'
    },
    {
      num: '04',
      title: 'Guarded Srinagar Meet & Greet',
      desc: 'We pick you up directly from airport arrivals. 24/7 travel desk manager remains active for your group.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16 bg-brand-cream-light text-brand-onyx">
      
      {/* Page Title Header */}
      <div className="text-center space-y-4 border-b border-brand-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-rust font-bold">Instant WhatsApp Portal</p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-brand-onyx">
          Start Your Kashmir Odyssey on WhatsApp
        </h1>
        <div className="h-[1px] w-20 bg-brand-rust/40 mx-auto mt-2" />
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-brand-onyx/75 font-light leading-relaxed">
          Skip standard payment portals. Click any customize topic to chat immediately with {whatsappConfig.agentName}, Sabil&apos;s managing director, for a fully tailored travel layout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Topic selector & customization form */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-brand-onyx/85 uppercase tracking-widest font-mono">1. Select Your Inquiry Objective</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inquiryTopics.map((topic) => {
                const isSelected = selectedTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic);
                    }}
                    className={`p-4 rounded bg-brand-cream-light text-left border transition-all ${
                      isSelected 
                        ? 'border-brand-rust bg-brand-cream-dark/60 shadow-xs ring-1 ring-brand-rust' 
                        : 'border-brand-border hover:border-brand-rust hover:bg-brand-cream-dark/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-cream-light border border-brand-border shadow-xs">
                        {renderTopicIcon(topic.icon)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-onyx">{topic.title}</h4>
                        <p className="text-[11px] text-brand-onyx/70 mt-1 line-clamp-1 font-light">{topic.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Details Inputs */}
          <div className="space-y-6 bg-brand-cream-dark/30 rounded border border-brand-border p-6">
            <h3 className="text-xs font-bold text-brand-onyx/85 uppercase tracking-widest font-mono">2. Optional: Add Quick Customizers</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-semibold">Your Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rahul Sharma"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx placeholder-brand-onyx/40 focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-semibold">Estimated Month / Dates</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mid-December • 6 days"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx placeholder-brand-onyx/40 focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-semibold">Specific Requirements / Family Details</label>
              <textarea
                rows={3} 
                placeholder="e.g. traveling with 2 senior citizens, need 1 premium heater boutique room in Gulmarg + Gondola Phase 2 passes..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx placeholder-brand-onyx/40 focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
              />
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive live previews of the message */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded border border-brand-border bg-brand-sage text-brand-cream-light p-6 text-left space-y-6 shadow-md relative overflow-hidden">
            
            {/* Soft decorative background green glow */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-brand-rust/5 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 border-b border-brand-border/20 pb-4">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-cream-light text-brand-sage font-serif font-bold">
                  S
                </div>
                <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-brand-rust border-2 border-brand-sage animate-pulse" />
              </div>

              <div className="text-left">
                <p className="text-sm font-bold text-white font-serif">{whatsappConfig.agentName}</p>
                <p className="text-[9px] text-[#DDD8CE] font-mono tracking-widest font-bold uppercase">{whatsappConfig.status}</p>
              </div>
            </div>

            {/* Live Message Preview container */}
            <div className="space-y-2">
              <p className="text-[9px] font-mono tracking-widest text-[#DDD8CE] font-bold uppercase">Reactive Message Draft Preview</p>
              <div className="rounded bg-brand-cream-dark/5 border border-brand-border/20 p-4 text-xs sm:text-sm text-brand-cream-light/90 leading-relaxed italic font-serif leading-relaxed">
                {getCompiledMessage()}
              </div>
            </div>

            {/* QR Code and Launch trigger */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
              
              {/* Dummy QR code using clean CSS blocks */}
              <div className="bg-white p-2.5 rounded shrink-0 flex flex-col items-center gap-1.5 shadow-sm border border-brand-border">
                <QrCode className="h-16 w-16 text-brand-onyx" />
                <span className="font-mono text-[8px] uppercase tracking-wider text-brand-onyx/50 font-bold">SCAN LAPTOP</span>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <p className="text-xs text-[#DDD8CE] font-light leading-relaxed">
                  Scanning works instantly on WhatsApp Web. Or click below if you occupy a mobile phone.
                </p>
                
                <a
                  href={getWhatsAppHref()}
                  onClick={handleInquiryAction}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded bg-brand-rust hover:bg-brand-rust-hover text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  id="btn-confirm-whatsapp-submit"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Launch WhatsApp Chat</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Curation Milestones - Beautiful descriptive horizontal timeline */}
      <section className="pt-12 border-t border-brand-border">
        <div className="text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-rust font-bold">Direct Booking Method</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-brand-onyx">Four Steps to Kashmir</h2>
          <div className="h-[1px] w-12 bg-brand-rust/35 mx-auto" />
          <p className="text-xs sm:text-sm text-brand-onyx/75 max-w-xl mx-auto font-light leading-relaxed">
            Experience complete control over properties, travel dates, and vehicle setups without paying up-front booking deposits.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stepGuides.map((guide, index) => (
            <div 
              key={index}
              className="p-6 rounded border border-brand-border bg-brand-cream-light text-left space-y-3 relative hover:border-brand-rust/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-serif italic text-brand-rust/20 font-bold">
                  {guide.num}
                </span>
                <CheckCircle className="h-4.5 w-4.5 text-brand-rust/30" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-onyx">{guide.title}</h3>
              <p className="text-xs text-brand-onyx/75 leading-relaxed font-light">
                {guide.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

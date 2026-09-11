import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, TourPackage } from './types';
import { useTourPackages, useWhatsappConfig, useGalleryPhotos } from './data';
import { TopNavBar } from './components/TopNavBar';
import { HeroSection } from './components/HeroSection';
import { HomeView } from './components/HomeView';
import { PackagesView } from './components/PackagesView';
import { InquiryView } from './components/InquiryView';
import { ContactView } from './components/ContactView';
import { AdminView } from './components/AdminView';
import { Footer } from './components/Footer';
import { 
  MessageCircle, 
  X, 
  Sparkles, 
  Users, 
  Send, 
  CheckCircle, 
  AlertTriangle,
  Flame,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  
  // Custom Live synced states
  const [packages, setPackages] = useTourPackages();
  const [whatsappConfig, setWhatsappConfig] = useWhatsappConfig();
  const [galleryPhotos, setGalleryPhotos] = useGalleryPhotos();
  
  // Custom Itinerary Curation Modal State
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalMonth, setModalMonth] = useState('');
  const [modalGuests, setModalGuests] = useState('2');
  const [modalTier, setModalTier] = useState('4-star-premium');
  const [modalNotes, setModalNotes] = useState('');
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState('');
  const [voucherId, setVoucherId] = useState('');

  // Viral notification state
  const [currentNotification, setCurrentNotification] = useState<string | null>(null);

  // sound toggle for mock notification
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Toggle for persistent floating Support desk bubble
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // AI Chatbot States of Sabil Voyages
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    {
      role: 'assistant',
      content: "Assalamu Alaikum! I am the Sabil AI Concierge. I am delighted to welcome you. I can assist you with curated houseboat selections on Dal Lake, taxi rates, private Crysta route prices, Sonamarg / Gulmarg Gondola queue status, or customized packages. How can Ssammer Bhat's office design your Kashmir holiday?"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scrolling when chat is active or updated
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [chatMessages, chatLoading]);

  const handleSendChat = async (presetText?: string) => {
    const text = presetText !== undefined ? presetText : chatInput;
    if (!text.trim() || chatLoading) return;

    const userMsg = { role: 'user' as const, content: text };
    const nextList = [...chatMessages, userMsg];
    setChatMessages(nextList);
    
    if (presetText === undefined) {
      setChatInput('');
    }
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextList })
      });

      if (!res.ok) {
        throw new Error('Satellite signal weak');
      }

      const data = await res.json();
      setChatMessages([...nextList, { role: 'assistant' as const, content: data.reply }]);
    } catch (_) {
      setChatMessages([
        ...nextList, 
        { 
          role: 'assistant' as const, 
          content: "Our satellite signals near Srinagar are experiencing high mountain winds. Let's try sending that again, or feel free to chat with Mr. Ssammer Hussain Bhat directly via direct WhatsApp link below." 
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    return content.split('\n').map((line, lIdx) => {
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const textLine = isBullet ? line.trim().substring(2) : line;

      const chunks = textLine.split(/\*\*(.*?)\*\*/g);
      const elements = chunks.map((chunk, cIdx) => (
        cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-brand-rust">{chunk}</strong> : chunk
      ));

      if (isBullet) {
        return (
          <span key={lIdx} className="block pl-3 relative mt-1 first:mt-0 text-[11px]">
            <span className="absolute left-0 text-brand-rust font-bold">•</span>
            {elements}
          </span>
        );
      }
      return <p key={lIdx} className="text-[11px] leading-relaxed mt-1 first:mt-0">{elements}</p>;
    });
  };

  // Dynamic document title updates based on current screens
  useEffect(() => {
    const titles: Record<ScreenType, string> = {
      home: 'The Sabil Voyages | Luxury Kashmir Curation Safaris',
      packages: 'Explore Bespoke Kashmir Safaris | The Sabil Voyages',
      inquiry: 'Direct WhatsApp Inquiry Desk | The Sabil Voyages',
      contact: 'Srinagar Tourism Office Support | The Sabil Voyages',
      admin: 'Live Catalog Curation Panel | The Sabil Voyages'
    };
    document.title = titles[screen] || 'The Sabil Voyages';
  }, [screen]);

  // Periodic mock viral bookings toaster simulation
  useEffect(() => {
    const viralAlerts = [
      'Simran & Gurdyal kaur (Ludhiana) just booked Srinagar Romantic Houseboat Tour!',
      'Dr. Adit Sen (Kolkata) requested custom Sonamarg Glacier expedition package.',
      'Ananya Mehta (Mumbai) locked Phase 1 & 2 Gulmarg Gondola queue passes.',
      'Rakesh Jindal (Delhi) requested a custom group traveler van (14 guests).',
      'Farhan Sheikh (Srinagar Founder office) updated premium winter SUV status to Active.',
      'Zeenat Begum (Srinagar Boutique stay) cleared 3 private deluxe honeymoon suites.'
    ];

    const interval = setInterval(() => {
      // Pick random alert
      const randomIdx = Math.floor(Math.random() * viralAlerts.length);
      setCurrentNotification(viralAlerts[randomIdx]);

      // Simple mock audio notification ping using Web Audio API
      if (soundEnabled) {
        try {
          const context = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = context.createOscillator();
          const gain = context.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, context.currentTime); // A5 note
          osc.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.15);
          gain.gain.setValueAtTime(0.04, context.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.2);
          osc.connect(gain);
          gain.connect(context.destination);
          osc.start();
          osc.stop(context.currentTime + 0.25);
        } catch (e) {
          // ignore web audio constraints
        }
      }

      // Hide notification after 6 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 6000);

    }, 24000); // Trigger every 24 seconds to feel non-obtrusive and organic

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const handleSelectPackageFromHome = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setScreen('packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomModal = () => {
    setModalError('');
    setModalSuccess(false);
    setShowCustomModal(true);
  };

  // Quicker timeout for realistic mock submit
  const triggerQuickMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');

    if (!modalName.trim()) {
      setModalError('Please share your name.');
      return;
    }
    if (!modalPhone.trim()) {
      setModalError('A phone number is required so our local offices can route your custom plan.');
      return;
    }

    setModalSubmitting(true);
    const generatedId = `SVV-${Math.floor(2000 + Math.random() * 7999)}`;
    setVoucherId(generatedId);

    // Save custom itinerary details to local storage database
    const newItineraryObj = {
      id: generatedId,
      name: modalName,
      phone: modalPhone,
      email: modalEmail.trim() || 'N/A',
      guests: modalGuests,
      month: modalMonth.trim() || 'Undecided',
      tier: modalTier === '3-star-boutique' ? '3-Star Cozy Boutique' : modalTier === '4-star-premium' ? '4-Star Premium Resorts' : '5-Star Luxury Palace',
      notes: modalNotes.trim() || 'No active customization requests written.',
      timestamp: new Date().toISOString(),
      status: 'unread',
      source: 'Official Bespoke Form'
    };

    try {
      const stored = localStorage.getItem('thesabil_itineraries_v1');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newItineraryObj);
      localStorage.setItem('thesabil_itineraries_v1', JSON.stringify(list));
      window.dispatchEvent(new Event('sabil_itineraries_updated'));
    } catch (e) {
      // fallback
    }

    setTimeout(() => {
      setModalSubmitting(false);
      setModalSuccess(true);
    }, 1400);
  };

  const handleCloseCustomModal = () => {
    setShowCustomModal(false);
    setModalSuccess(false);
    setModalName('');
    setModalPhone('');
    setModalEmail('');
    setModalMonth('');
    setModalNotes('');
  };

  const getCustomWhatsAppLink = () => {
    const text = `Assalamu Alaikum The Sabil Voyages! I submitted custom plan request ID ${voucherId}. Name: ${modalName}, Phone: ${modalPhone}, Month: ${modalMonth}, Stays Rating: ${modalTier}, Guests count: ${modalGuests}. Custom notes: ${modalNotes || 'None'}. Please design this custom itinerary!`;
    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-brand-cream-light text-brand-onyx flex flex-col font-sans selection:bg-brand-rust/20 selection:text-brand-rust">
      
      {/* Top sticky Navigation Bar */}
      <TopNavBar 
        currentScreen={screen} 
        setScreen={setScreen} 
        onRequestCustomItinerary={handleOpenCustomModal}
      />

      {/* Main coordinate view screen router */}
      <main className="flex-1">
        {screen === 'home' && (
          <div>
            <HeroSection 
              onExplorePackages={() => setScreen('packages')}
              onRequestCustomItinerary={handleOpenCustomModal}
            />
            
            <HomeView 
              onSelectPackage={handleSelectPackageFromHome}
              setScreen={setScreen}
              onRequestCustomItinerary={handleOpenCustomModal}
              galleryPhotos={galleryPhotos}
            />
          </div>
        )}

        {screen === 'packages' && (
          <PackagesView 
            onSelectPackage={setSelectedPackage}
            selectedPackageFromMain={selectedPackage}
            onClearSelectedPackage={() => setSelectedPackage(null)}
          />
        )}

        {screen === 'inquiry' && (
          <InquiryView />
        )}

        {screen === 'contact' && (
          <ContactView />
        )}

        {screen === 'admin' && (
          <AdminView 
            packages={packages}
            onChangePackages={setPackages}
            whatsappConfig={whatsappConfig}
            onChangeWhatsappConfig={setWhatsappConfig}
            galleryPhotos={galleryPhotos}
            onChangeGalleryPhotos={setGalleryPhotos}
            onGoHome={() => {
              setScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* High-fidelity responsive Footer branding */}
      <Footer 
        setScreen={setScreen}
        onRequestCustomItinerary={handleOpenCustomModal}
      />

      {/* PERSISTENT FLOATING AI TRAVEL CONCIERGE CHATBOT */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Animated chatbot bubble/card */}
        {isSupportOpen && (
          <div className="pointer-events-auto rounded-lg border border-brand-border bg-brand-cream-light shadow-2xl w-[330px] max-w-[90vw] text-left overflow-hidden flex flex-col relative animate-fade-in">
            {/* Header */}
            <div className="bg-brand-onyx text-brand-cream-light p-3 flex items-center justify-between border-b border-brand-border/40">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-brand-onyx animate-pulse"></span>
                  <div className="h-8 w-8 rounded-full bg-brand-rust flex items-center justify-center text-white font-serif font-bold text-sm shadow-inner">
                    SV
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-sans font-bold tracking-wider uppercase text-white">Sabil AI Concierge</h4>
                  <p className="text-[8px] font-mono text-brand-cream-dark/85 tracking-widest uppercase">Live Kashmir Counsel</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                title="Minimize AI Chatbot"
                id="btn-close-support-bubble"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message History Area */}
            <div className="p-4 overflow-y-auto max-h-[290px] min-h-[190px] bg-brand-cream-light/60 flex flex-col gap-3">
              {chatMessages.map((msg, idx) => {
                const isBot = msg.role === 'assistant';
                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col max-w-[85%] ${isBot ? 'self-start items-start' : 'self-end items-end'}`}
                  >
                    <span className="text-[8px] font-mono font-bold text-brand-onyx/40 uppercase mb-0.5 px-1">
                      {isBot ? 'Sabil AI' : 'You'}
                    </span>
                    <div 
                      className={`rounded px-3 py-2 text-[11px] shadow-xs leading-relaxed ${
                        isBot 
                          ? 'bg-[#F4EFE6] text-brand-onyx border border-brand-border/40 font-serif' 
                          : 'bg-brand-rust text-white font-sans font-medium'
                      }`}
                    >
                      {renderMessageContent(msg.content)}
                    </div>
                  </div>
                );
              })}
              {chatLoading && (
                <div className="self-start flex flex-col max-w-[85%]">
                  <span className="text-[8px] font-mono font-bold text-brand-onyx/40 uppercase mb-0.5 px-1">
                    Sabil AI is thinking...
                  </span>
                  <div className="rounded px-3 py-2 bg-[#F4EFE6] text-brand-onyx/60 text-[11px] border border-brand-border/40 flex items-center gap-2">
                    <span className="flex rounded-full bg-brand-rust/60 h-1.5 w-1.5 animate-ping" />
                    <span>Whispering to Kashmir valleys...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Helper Choice Chips */}
            <div className="px-3 pb-2 pt-1.5 flex flex-wrap gap-1.5 border-t border-brand-border/20 bg-brand-cream-light/80">
              <button 
                onClick={() => handleSendChat("Show me top romantic houseboats")}
                className="text-[9px] font-mono bg-white hover:bg-[#F4EFE6] transition-colors border border-brand-border/60 px-2.5 py-1 rounded text-brand-onyx font-bold shadow-xs cursor-pointer"
              >
                🌸 Houseboats
              </button>
              <button 
                onClick={() => handleSendChat("Best seasons and months to visit Kashmir")}
                className="text-[9px] font-mono bg-white hover:bg-[#F4EFE6] transition-colors border border-brand-border/60 px-2.5 py-1 rounded text-brand-onyx font-bold shadow-xs cursor-pointer"
              >
                🏔️ Best Months
              </button>
              <button 
                onClick={() => handleSendChat("What cab routes and private cars do you offer?")}
                className="text-[9px] font-mono bg-white hover:bg-[#F4EFE6] transition-colors border border-brand-border/60 px-2.5 py-1 rounded text-brand-onyx font-bold shadow-xs cursor-pointer"
              >
                🚗 Cabs & Cars
              </button>
            </div>

            {/* Footer Form Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat();
              }}
              className="p-2 bg-white border-t border-brand-border flex items-center gap-1.5"
            >
              <input 
                type="text"
                placeholder="Ask about rides, stays, flights..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatLoading}
                className="flex-1 text-[11px] border border-brand-border bg-brand-cream-light/20 rounded px-2.5 py-1.5 text-brand-onyx placeholder:text-brand-onyx/45 focus:outline-hidden focus:ring-1 focus:ring-brand-rust/40 focus:border-brand-rust"
              />
              <button 
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="rounded bg-brand-rust text-white p-1.5 hover:bg-brand-rust-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Send Chat Inquiry"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Direct Human Fallback Line */}
            <div className="bg-[#F4EFE6] border-t border-brand-border/40 py-1.5 text-center text-[9px]">
              <span className="text-brand-onyx/55 font-normal">Need human assistance? </span>
              <a 
                href={`https://wa.me/${whatsappConfig.phoneNumber}?text=Hi Sammer Bhat! I am on Sabil Voyages exploring and want to book Kashmir now.`}
                target="_blank"
                rel="noreferrer"
                className="text-brand-rust font-bold hover:underline"
              >
                WhatsApp Direct →
              </a>
            </div>

          </div>
        )}

        {/* Small floating action trigger widget */}
        <button 
          onClick={() => setIsSupportOpen(!isSupportOpen)}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-rust font-bold text-white shadow-xl hover:bg-brand-rust-hover transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-hidden relative"
          title="Toggle WhatsApp Support Desk"
          id="btn-floating-whatsapp-ball"
        >
          {isSupportOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <>
              <span className="absolute -top-1 -right-1 block h-3.5 w-3.5 rounded-full bg-brand-rust ring-2 ring-white animate-pulse" />
              <MessageCircle className="h-6 w-6 text-white" />
            </>
          )}
        </button>

      </div>

      {/* MOCK VIRAL BOOKINGS TOASTER PANEL */}
      {currentNotification && (
        <div className="fixed bottom-6 left-6 z-40 max-w-sm w-[90vw] rounded border border-brand-border bg-brand-cream-light p-4 text-left shadow-2xl flex items-start gap-4 transition-all duration-500 animate-slide-up">
          
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-cream-dark text-brand-rust border border-brand-border">
            <Flame className="h-4.5 w-4.5 text-brand-rust animate-pulse" />
          </div>

          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-widest text-brand-rust font-extrabold flex items-center gap-1">
                <span>Recent booking activity</span>
              </span>
              
              {/* Toggle mock click sound indicators */}
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-brand-onyx/40 hover:text-brand-rust p-0.5 rounded"
                title={soundEnabled ? "Mute audio cues" : "Unmute audio cues"}
                id="btn-toggle-app-ping-mute"
              >
                {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              </button>
            </div>
            
            <p className="text-xs text-brand-onyx font-medium leading-relaxed mt-1 font-serif">
              {currentNotification}
            </p>
          </div>

          {/* Dismiss toaster button */}
          <button 
            onClick={() => setCurrentNotification(null)}
            className="text-brand-onyx/40 hover:text-brand-onyx p-0.5 shrink-0"
            id="btn-dismiss-toaster"
          >
            <X className="h-4 w-4" />
          </button>

        </div>
      )}

      {/* INTEGRATED CUSTOM CURATION OVERLAY MODAL */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop mask */}
          <div 
            onClick={handleCloseCustomModal}
            className="absolute inset-0 bg-brand-sage/85 backdrop-blur-xs transition-opacity" 
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md rounded bg-brand-cream-light shadow-2xl border border-brand-border overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header branding */}
            <div className="bg-brand-sage text-brand-cream-light p-5 text-left flex items-center justify-between relative border-b border-brand-border/20">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-cream-light text-brand-sage">
                  <Compass className="h-5 w-5 text-brand-rust" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold tracking-tight text-white uppercase tracking-wider">Tailor Your Kashmir Trip</h3>
                  <p className="font-mono text-[8px] uppercase tracking-widest text-brand-rust font-bold">100% Bespoke • No Pre-payment</p>
                </div>
              </div>
              
              <button 
                onClick={handleCloseCustomModal}
                className="rounded bg-brand-sage/70 hover:bg-brand-sage text-brand-cream-light p-1.5 transition-colors border border-brand-border/20"
                id="btn-close-customizer-modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Scrollable form inside modal */}
            <div className="flex-1 overflow-y-auto p-5 text-left space-y-4">
              
              {modalSuccess ? (
                // SUCCESS STATE CARD
                <div className="py-6 text-center space-y-5">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded bg-brand-cream-dark text-brand-rust border border-brand-border shadow-xs">
                    <CheckCircle className="h-6 w-6" />
                  </div>

                   <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#DDD8CE] font-bold bg-brand-rust px-2.5 py-1 rounded">Voucher ID: {voucherId}</span>
                    <h4 className="font-serif text-base font-medium text-brand-onyx pt-2">Custom request logged!</h4>
                    <p className="text-xs text-brand-onyx/70 leading-relaxed font-light">
                      Assalamu alaikum! Thank you, <strong>{modalName}</strong>. A detailed copy has been dispatched to Sammer&apos;s administrative mailbox (<strong className="text-brand-rust font-normal">ssammerhussain@gmail.com</strong>) and saved in the Sabil Curation desk. Click below to initiate direct WhatsApp discussion.
                    </p>
                  </div>

                  <div className="p-4 bg-brand-cream-dark/50 rounded border border-brand-border space-y-1.5 font-mono text-[10px] text-brand-onyx/85 max-w-xs mx-auto text-left">
                    <p><span className="text-brand-onyx/50 font-bold">Ref Ticket:</span> {voucherId}</p>
                    <p><span className="text-brand-onyx/50 font-bold">Est. Month:</span> {modalMonth || 'As negotiated'}</p>
                    <p><span className="text-brand-onyx/50 font-bold">Total Guests:</span> {modalGuests} Adults</p>
                    <p><span className="text-brand-onyx/50 font-bold">Hotel Resort Tier:</span> {modalTier.toUpperCase()}</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={getCustomWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded bg-brand-rust hover:bg-brand-rust-hover text-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm"
                      id="modal-wa-discuss-trigger"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Send customized specs</span>
                    </a>

                    <button
                      onClick={handleCloseCustomModal}
                      className="text-xs text-brand-onyx/50 hover:text-brand-rust font-bold uppercase tracking-widest pt-2"
                    >
                      Close Window
                    </button>
                  </div>

                </div>
              ) : (
                // FORM INTAKE
                <form onSubmit={triggerQuickMockSubmit} className="space-y-4">
                  
                  {modalError && (
                    <div className="p-3 rounded bg-brand-rust/10 text-[11px] text-brand-rust flex items-start gap-1.5 border border-brand-rust/20">
                      <AlertTriangle className="h-4 w-4 text-brand-rust shrink-0 mt-0.5" />
                      <span>{modalError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/60 font-bold">Your Full Name*</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Priyanika Goel" 
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/60 font-bold">WhatsApp / Contact Phone*</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 91234-56789" 
                      value={modalPhone}
                      onChange={(e) => setModalPhone(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/60 font-bold">Email Address (for direct PDF copies)*</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. rahul@example.com" 
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/60 font-bold">Guests (Adults)</label>
                      <select
                        value={modalGuests}
                        onChange={(e) => setModalGuests(e.target.value)}
                        className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults (Couple)</option>
                        <option value="4">3 to 5 (Small family)</option>
                        <option value="12">6+ (Group Safari)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/60 font-bold">Target Month</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Early April" 
                        value={modalMonth}
                        onChange={(e) => setModalMonth(e.target.value)}
                        className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/60 font-bold">Hotel Resort rating tier</label>
                    <select
                      value={modalTier}
                      onChange={(e) => setModalTier(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden"
                    >
                      <option value="3-star-boutique">3-Star Cozy Boutique Rooms (Heritage standard)</option>
                      <option value="4-star-premium">4-Star Premium Resorts (Recommended)</option>
                      <option value="5-star-luxury">5-Star Luxury Palace Retreats (World-class)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/60 font-bold">Additional Wishes / Custom note</label>
                    <textarea 
                      rows={2.5}
                      placeholder="e.g. Phase 1 & 2 Gondola passes, photography assists, romantic setups, specific Kashmiri food..." 
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3.5 py-2.5 text-xs text-brand-onyx placeholder-brand-onyx/40 focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={modalSubmitting}
                    className="w-full flex items-center justify-center gap-1.5 rounded bg-brand-onyx text-white font-bold py-3.5 hover:bg-brand-rust transition-colors uppercase tracking-widest text-xs shadow-md disabled:bg-brand-cream-dark disabled:text-brand-onyx/40"
                    id="btn-modal-customizer-submit"
                  >
                    {modalSubmitting ? (
                      <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-brand-rust" />
                    )}
                    <span>{modalSubmitting ? 'Curation in-progress...' : 'Generate Bespoke Plan'}</span>
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

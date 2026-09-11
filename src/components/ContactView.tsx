import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Send, 
  Users, 
  Compass, 
  AlertTriangle,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useWhatsappConfig } from '../data';

export const ContactView: React.FC = () => {
  const [whatsappConfig] = useWhatsappConfig();
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2');
  const [notes, setNotes] = useState('');

  // Form Processing state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formError, setFormError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Quick structural validation
    if (!name.trim()) {
      setFormError('Please enter your full name prior to submitting.');
      return;
    }
    if (!phone.trim()) {
      setFormError('A phone number is required so our local driver or guide can coordinate.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database booking/lead recording
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      const randomID = `SVK-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(randomID);

      // Trigger standard custom notification audio effect if wanted
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDates('');
    setGuests('2');
    setNotes('');
    setSubmitSuccess(false);
    setTicketId('');
  };

  const officeDetails = [
    {
      title: 'Headquarters Address',
      desc: 'Balhama pantha chowk, Srinagar, Jammu & Kashmir - 191101',
      icon: <MapPin className="h-4 w-4 text-brand-rust" />
    },
    {
      title: 'Telephone Curation Line',
      desc: '+919906164966',
      icon: <Phone className="h-4 w-4 text-brand-rust" />
    },
    {
      title: 'Official Email Desk',
      desc: 'thesabilvoyages@gmail.com',
      icon: <Mail className="h-4 w-4 text-brand-rust" />
    },
    {
      title: 'Operating Hours',
      desc: 'Mon - Sat: 9:00 AM - 8:00 PM • Sunday: Closed',
      icon: <Clock className="h-4 w-4 text-brand-rust" />
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16 bg-brand-cream-light text-brand-onyx">
      
      {/* Page header */}
      <div className="text-left space-y-3 border-b border-brand-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-rust font-bold">Srinagar Tourism Office</p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-brand-onyx">
          Get in Touch with The Sabil Voyages
        </h1>
        <div className="h-[1px] w-20 bg-brand-rust/35 mt-2" />
        <p className="text-xs sm:text-sm text-brand-onyx/75 max-w-2xl font-light leading-relaxed">
          We operate Srinagar. Submit an official itinerary quote request or visit us for a delicious cup of traditional Kehwa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* LEFT COLUMN: Srinagar office details & visual map */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
          
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-brand-onyx/85 uppercase tracking-widest font-mono">Office Representatives</h3>
            <div className="grid grid-cols-1 gap-4">
              {officeDetails.map((detail, i) => (
                <div key={i} className="flex gap-4 p-4 rounded border border-brand-border bg-brand-cream-light">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-brand-cream-dark text-brand-rust">
                    {detail.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-onyx">{detail.title}</h4>
                    <p className="text-xs text-brand-onyx/75 mt-1 leading-relaxed font-light">{detail.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Styled Aesthetic Map Graphic Panel */}
          <div className="rounded border border-brand-border overflow-hidden bg-brand-sage text-brand-cream-light p-6 flex-1 flex flex-col justify-between relative min-h-[220px]">
            {/* Map styling grid graphic */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="relative space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-rust font-bold">Interactive Location Spotlight</span>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-serif">
                <Compass className="h-4.5 w-4.5 text-brand-rust animate-spin-slow" />
                <span>Valley Coordinates</span>
              </h4>
              <p className="text-xs text-brand-cream-light/85 leading-relaxed font-light font-serif">
                Balhama pantha chowk, Srinagar.<br />
                Near jammu and kashmir bank Branch s.
              </p>
            </div>

            <div className="relative pt-6 border-t border-brand-border/20 flex items-center justify-between text-[11px] font-mono text-[#DDD8CE]">
              <span>LAT: 34.0837° N</span>
              <span>LON: 74.8062° E</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Official Curation lead-form */}
        <div className="lg:col-span-7">
          <div className="rounded border border-brand-border bg-brand-cream-dark/30 p-6 sm:p-8 text-left">
            
            {submitSuccess ? (
              // Case: Successful submitting leads to premium checkmark card
              <div className="py-8 text-center space-y-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded bg-brand-cream-light text-brand-rust border border-brand-border shadow-sm">
                  <CheckCircle className="h-8 w-8" />
                </div>
                
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#DDD8CE] font-bold bg-brand-rust px-2.5 py-1 rounded">
                    Lead Status: Recorded
                  </span>
                  <h3 className="font-serif text-xl font-medium text-brand-onyx pt-2">Your custom Srinagar request has been filed</h3>
                  <p className="text-xs text-brand-onyx/75 max-w-md mx-auto font-light leading-relaxed">
                    A secure booking lead has been logged under record <strong>{ticketId}</strong>. Our director, <strong>{whatsappConfig.agentName}</strong>, will review your details and send your customized day-by-day itinerary to your phone.
                  </p>
                </div>

                <div className="rounded border border-brand-border bg-brand-cream-light p-5 max-w-sm mx-auto text-left font-mono text-[11px] text-brand-onyx/80 space-y-1.5">
                  <p><strong className="text-brand-onyx font-bold">Record ID:</strong> {ticketId}</p>
                  <p><strong className="text-brand-onyx font-bold">Coordinator:</strong> {whatsappConfig.agentName} (Srinagar)</p>
                  <p><strong className="text-brand-onyx font-bold">Target Guests:</strong> {guests} Adults</p>
                  <p><strong className="text-brand-onyx font-bold">Dates:</strong> {dates || 'As negotiated'}</p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetForm}
                    className="flex items-center gap-1.5 text-xs font-bold text-brand-onyx/60 hover:text-brand-rust uppercase tracking-widest transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Submit another prompt</span>
                  </button>

                  <a
                    href={`https://wa.me/${whatsappConfig.phoneNumber}?text=Hi The Sabil Voyages! I submitted quote request ID ${ticketId} for our kashmir trip. Details: ${notes || 'standard query'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-brand-rust hover:bg-brand-rust-hover text-white px-5 py-3 text-xs font-bold uppercase tracking-wider"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Discuss Quote on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              // Lead Intake inputs
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-brand-border pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-brand-onyx">Official Itinerary Query Form</h3>
                    <p className="text-xs text-brand-onyx/70 font-light mt-1">Inputs are checked by our team immediately during Srinagar office hours.</p>
                  </div>
                  <Sparkles className="h-5 w-5 text-brand-rust" />
                </div>

                {formError && (
                  <div className="rounded bg-brand-rust/10 p-3.5 text-xs text-brand-rust flex items-start gap-2 border border-brand-rust/20">
                    <AlertTriangle className="h-4.5 w-4.5 text-brand-rust shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-bold">Your Full Name*</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Samir Sheikh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-4 py-3 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-bold">WhatsApp Number*</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 98765-43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-4 py-3 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-bold">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. samir@webplace.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-4 py-3 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-bold">Travel Dates / Duration</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Late February • 5 nights"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-4 py-3 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-bold">Number of Guests</label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-4 py-3 text-xs text-brand-onyx focus:outline-hidden"
                    >
                      <option value="1">1 Adult (Solo Explorer)</option>
                      <option value="2">2 Adults (Romantic Couple)</option>
                      <option value="4">3 - 5 Adults (Small Family)</option>
                      <option value="10">6 - 15 Adults (Large Group)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-brand-onyx/60">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-brand-onyx/60 font-bold">Specify Any Custom Wishes</label>
                  <textarea
                    rows={4} 
                    placeholder="Tell us about food, hotel ratings (3-star, 4-star, 5-star), premium flight schedules, honeymooon decor, or private cars."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded border border-brand-border bg-brand-cream-light px-4 py-3 text-xs text-brand-onyx placeholder-brand-onyx/40 focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded bg-brand-onyx hover:bg-brand-rust text-white font-semibold tracking-wider uppercase py-4 transition-colors disabled:bg-brand-cream-dark disabled:text-brand-onyx/40"
                  id="btn-submit-contact-form"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4 text-brand-rust" />
                  )}
                  <span>{isSubmitting ? 'Verifying Coordinates...' : 'Submit Official Quote Request'}</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

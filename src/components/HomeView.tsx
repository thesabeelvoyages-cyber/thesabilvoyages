import React, { useState } from 'react';
import { TourPackage, ScreenType, GalleryPhoto } from '../types';
import { useTourPackages, useWhatsappConfig, testimonials } from '../data';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronRight, 
  CheckCircle, 
  Quote, 
  Send,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';

interface HomeViewProps {
  onSelectPackage: (pkg: TourPackage) => void;
  setScreen: (screen: ScreenType) => void;
  onRequestCustomItinerary: () => void;
  galleryPhotos?: GalleryPhoto[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectPackage,
  setScreen,
  onRequestCustomItinerary,
  galleryPhotos
}) => {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [tourPackages] = useTourPackages();
  const [whatsappConfig] = useWhatsappConfig();

  // Take first 3 packages for the featured showcase
  const featuredPackages = tourPackages.slice(0, 3);

  const destinationCategories = [
    {
      name: 'Gulmarg',
      tag: 'SKIING & ALP-RESORTS',
      image: tourPackages[0]?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLWHneZevP4Yf41xU58nVPTsqlQWmJrvZT9Bx5Zdku9VxdVFMDurVj4ar2Xl_lc4AS8sdXtnynRLvLUZsyj4SSAjEI262AdGIGkLzQ3wfvPMmed2_Jy2-y2oafN2xvyctwHV1_t4e1UGrXkprzZvq35zNMwAsAZJKorU8kh8v_Lp0c3O5mNO_JAZXZsPn2Pc7QNs8-TqB7pmhE37L-IU2CydYJTquOYdo0tzWJ9--ALj-ks0D1jRhLtzrIbiYpBMR3b2DtJqDFAew',
      desc: 'Snow fields, world highest gondola & cozy fireplaces.'
    },
    {
      name: 'Srinagar',
      tag: 'HOUSEBOATS & LAKES',
      image: tourPackages[1]?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtPWo23b1k74VKwXVpUu_sO3txFkBw4ZMemVSWR--6RC05c-7wQ0clil5BrPRm8Qdlgg8GJJ1X5H9A3ls3byiRNHtLHsiqCPfT_KUflooIqY1Hc3Z060G69ZgxDqGlTAPgEAphA8jd49nR2C2CqJLGgtzHrz-xAvtIG274IOY64rvPQ76z0Lq0r0EvRx_zCeSo_STZfb_yhtgej4JlQlT2qMSnrUd7QBfZ2J42wxvLV3nzQkoPiiTaqiZQPvPeuz29RY1LphOqgU8',
      desc: 'Historic Mughal gardens, floating markets & cedarwood carvings.'
    },
    {
      name: 'Pahalgam',
      tag: 'STREAM RETREATS',
      image: tourPackages[2]?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYGW7HgszlgC_PI6PDtoM7TgCAE-ekLM9SCwc6dJl8HjxtcdfwLXrvHta2RskMc6jBBmMJVi97FXoGBpNJ2zY522gmk1Z9fMga3TWWDQ9hsErMfmVkKt-MOVuQjWlsLqfPbkt2BzlJpcmnRRibt1gEIJ37_D9hEaXC44Gvqqms5hv2nhQ9ThAuzBCx0We1rp2_Ojony13a0ur-JqEaG_UXhMBQG2Jcidimm3_oFbcXHEDRsvZxsJSXZrI50kr9nWwYAka4rJ2k8GY',
      desc: 'Shimmering streams, dense pine canopy & gentle pony trekking.'
    }
  ];

  const valueProps = [
    {
      title: 'Phase 1 & 2 Gondola Access',
      desc: 'We secure guaranteed gondola passes directly through our local physical quota. No sold-out disappointments.'
    },
    {
      title: 'True Kashmir Houseboats',
      desc: 'No shared crowded houseboats. We rent private cedarwood suites with dedicated attendants & local wazwan chefs.'
    },
    {
      title: 'Dedicated SUV Transports',
      desc: 'Enjoy comfortable travel in premium private, heating-equipped AWD/4x4 SUVs driven by respectful tour guides.'
    },
    {
      title: 'Bespoke 1-on-1 Iteration',
      desc: 'Speak directly to coordinates based right in Srinagar to tweak your schedule step-by-step till it is absolutely perfect.'
    }
  ];

  const faqs = [
    {
      question: 'When is the best time to visit Kashmir?',
      answer: 'Kashmir is majestic year-round. Visit April to September for lush green valleys, meadow picnics, and pleasant weather. Visit December to March for heavy snow, skiing, and winter activities in Gulmarg.'
    },
    {
      question: 'How do you arrange the Gulmarg Gondola queue passes?',
      answer: "Gondola tickets sell out weeks in advance. The Sabil Voyages guarantees official Phase 1 and Phase 2 tickets inside all customized packages, working directly with Srinagar tourism operators so you do not wait in ticketing queues."
    },
    {
      question: 'Is it safe for children, families and senior citizens?',
      answer: 'Absolutely. Kashmir is highly hospitable, welcoming, and safe. The Sabil Voyages operates private AC premium SUVs and assigns expert local tour drivers who prioritize safety, comfort, and direct entry points so walking is kept minimal and enjoyable for elders.'
    },
    {
      question: 'Can we customize the culinary options in our packages?',
      answer: 'Yes! All The Sabil Voyages custom trips allow you to specify vegetarian, halal, or organic meals. We can customize breakfast and dinner choices, recommend local high-hygiene restaurants, or treat you to luxury home-cooked wazwan feasts.'
    }
  ];

  const handleToggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const handleExploreMore = () => {
    setScreen('packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20 bg-brand-cream-light text-brand-onyx">
      
      {/* Category Icons & Destination Spotlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-rust font-bold">
            Paradisal Destinations
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-brand-onyx">
            Spotlight Kashmir Regions
          </h2>
          <div className="h-[1px] w-20 bg-brand-rust/40 mx-auto mt-2" />
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-brand-onyx/75 font-light leading-relaxed">
            From the soft slopes of Gulmarg to the pine forest trails of Pahalgam, look closer at the magical regions The Sabil Voyages covers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinationCategories.map((dest) => (
            <div 
              key={dest.name}
              className="group relative h-96 overflow-hidden rounded-lg border border-brand-border bg-brand-sage shadow-xs"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-sage via-brand-sage/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 text-left space-y-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#DDD8CE]">
                  {dest.tag}
                </span>
                <h3 className="text-2xl font-serif font-medium text-brand-cream-light">{dest.name}</h3>
                <p className="text-xs text-brand-cream-light/80 leading-relaxed font-light">
                  {dest.desc}
                </p>
                
                <button
                  onClick={handleExploreMore}
                  className="pt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-cream-light hover:text-brand-rust transition-colors"
                >
                  <span>Explore Tours</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate trust / The Sabil Voyages Signature Quality */}
      <section className="bg-brand-cream-dark/45 py-16 border-y border-brand-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left space-y-6">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-rust font-bold">
                The Sabil Voyages Core Promise
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-brand-onyx leading-snug">
                Experience Handcrafted Hospitality
              </h2>
              <div className="h-[1px] w-12 bg-brand-rust/40" />
              <p className="text-sm text-brand-onyx/80 leading-relaxed font-light">
                Many online operators outsource booking vouchers to third-party sub-contractors, leaving guests stranded. At The Sabil Voyages, our family-run team works directly from our Srinagar office, ensuring that every driver, local representative, and houseboat manager is hand-verified and directly answerable to us.
              </p>
              
              <div className="flex gap-4 pt-4">
                <div className="text-center p-4 bg-brand-cream-light rounded-lg border border-brand-border flex-1">
                  <p className="text-3xl font-serif font-semibold text-brand-rust">100%</p>
                  <p className="text-[9px] font-mono uppercase tracking-wider text-brand-onyx/50 font-bold mt-1">Local Curation</p>
                </div>
                <div className="text-center p-4 bg-brand-cream-light rounded-lg border border-brand-border flex-1">
                  <p className="text-3xl font-serif font-semibold text-[#2C352E]">0%</p>
                  <p className="text-[9px] font-mono uppercase tracking-wider text-brand-onyx/50 font-bold mt-1">Hidden Charges</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valueProps.map((prop) => (
                <div 
                  key={prop.title}
                  className="p-6 rounded-lg bg-brand-cream-light border border-brand-border text-left space-y-3 transition-colors hover:border-brand-rust/50"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-brand-cream-dark text-brand-rust">
                    <CheckCircle className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-semibold text-brand-onyx font-serif uppercase tracking-wider">{prop.title}</h3>
                  <p className="text-xs text-brand-onyx/70 leading-relaxed font-light">
                    {prop.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Featured Safaris showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-brand-border pb-4">
          <div className="text-left space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-rust font-bold">
              Recommended Packages
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-brand-onyx">
              Featured Luxury Safaris
            </h2>
            <p className="text-xs sm:text-sm text-brand-onyx/75 font-light">
              Our highest-rated, all-inclusive journeys configured with premium stays and local guides.
            </p>
          </div>
          
          <button
            onClick={handleExploreMore}
            className="group flex items-center gap-2 rounded border border-brand-border bg-brand-cream-light px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-onyx hover:bg-brand-cream-dark"
          >
            <span>See All Safaris</span>
            <ChevronRight className="h-4 w-4 text-brand-onyx/60 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Featured list */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="flex flex-col rounded-lg border border-brand-border bg-brand-cream-light shadow-xs overflow-hidden transition-all duration-300 hover:border-brand-rust/50"
            >
              <div className="relative h-56 overflow-hidden bg-brand-cream-dark">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                  <span className="rounded bg-brand-rust px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-widest text-white">
                    {pkg.category}
                  </span>
                  <span className="rounded bg-brand-sage/90 backdrop-blur-xs px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-widest text-white mt-0.5">
                    {pkg.location}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 rounded bg-brand-cream-light/95 px-2.5 py-1 text-xs font-mono font-medium text-brand-onyx">
                  {pkg.duration}
                </div>
              </div>

              {/* Package Details */}
              <div className="flex-1 p-6 text-left flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-medium text-brand-onyx line-clamp-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-brand-onyx/75 leading-relaxed font-light line-clamp-2">
                    {pkg.description}
                  </p>
                  
                  {/* Highlight pills preview */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                    {pkg.highlights.slice(0, 2).map((highlight) => (
                      <span 
                        key={highlight} 
                        className="rounded bg-brand-cream-dark border border-brand-border px-2.5 py-1 font-sans text-[10px] text-brand-onyx/90 font-medium"
                      >
                        ✓ {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer details / Pricing */}
                <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] font-mono uppercase tracking-widest text-brand-onyx/50 font-bold">Pricing Starts At</span>
                    <span className="text-xl font-serif font-semibold text-brand-onyx">
                      ₹{pkg.price.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-brand-onyx/60 font-sans"> / person</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="rounded bg-brand-onyx hover:bg-brand-rust text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Guide Introductions & Meet Sammer */}
      <section className="bg-brand-sage text-brand-cream-light py-20 overflow-hidden relative border-y border-brand-border">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/4 h-72 w-72 rounded-full bg-brand-cream-light blur-[96px]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded bg-brand-rust/20 px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-brand-rust font-bold border border-brand-rust/20">
                MEET YOUR HOST IN SRINAGAR
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
                Personal Coordination, No Intermediaries
              </h2>
              <div className="h-[1px] w-12 bg-brand-rust" />
              <p className="text-xs sm:text-sm text-brand-cream-light/80 leading-relaxed font-light">
                Our operations director, <strong>{whatsappConfig.agentName}</strong>, coordinates The Sabil Voyages bookings directly from our Srinagar headquarter. Whether you require a specialized wheelchair-friendly hotel entrance, an extra day of skiing at phase 2 in Gulmarg, or a custom sunset kehwa cruise, you can get it with a quick WhatsApp audio message.
              </p>
              
              <div className="flex items-center gap-3 pt-1">
                {/* Active Indicator */}
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-rust opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-rust"></span>
                </div>
                <p className="text-[10px] font-mono tracking-widest text-[#DDD8CE] font-bold uppercase">
                  {whatsappConfig.status}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${whatsappConfig.phoneNumber}?text=Hello ${whatsappConfig.agentName}, I am browsing your Kashmir travel safari options and would like to ask some questions.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-brand-rust hover:bg-brand-rust-hover px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                  <span>Start WhatsApp Chat with {whatsappConfig.agentName}</span>
                </a>
              </div>
            </div>

            {/* Testimonials Collage Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-6 text-left">
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-lg bg-brand-cream-dark/5 border border-brand-border/40 backdrop-blur-xs relative"
                >
                  <Quote className="absolute top-4 right-4 h-6 w-6 text-brand-cream-light/10" />
                  <p className="text-sm italic text-brand-cream-light font-light leading-relaxed font-serif">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-end justify-between border-t border-brand-border/20 pt-4">
                    <div>
                      <p className="text-xs font-semibold text-brand-cream-light">{testimonial.author}</p>
                      <p className="font-mono text-[8px] text-brand-rust font-bold tracking-widest uppercase mt-1">
                        {testimonial.relativeText} • {testimonial.location}
                      </p>
                    </div>
                    <div className="flex text-brand-rust text-xs gap-0.5">
                      ★★★★★
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* GUEST PHOTO GALLERY OF HAPPY TRAVELERS */}
      <section className="bg-[#FAF9F5] border-t border-b border-brand-border py-16 sm:py-20 my-16 sm:my-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-rust font-bold bg-brand-rust/5 px-3 py-1 rounded inline-block">
              Guest Chronicles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-brand-onyx">
              Memories in Paradise
            </h2>
            <div className="h-[1px] w-20 bg-brand-rust/40 mx-auto" />
            <p className="text-xs sm:text-sm text-brand-onyx/75 font-light leading-relaxed">
              Real memories captured by beautiful souls who booked bespoke private Kashmir safaris and honeymoon escapes under Ssammer Bhat's supervision.
            </p>
          </div>

          {(!galleryPhotos || galleryPhotos.length === 0) ? (
            <div className="text-center py-12 bg-white rounded border border-dashed border-brand-border/60">
              <p className="text-xs text-brand-onyx/50">No guest photos added yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {galleryPhotos.map((photo) => (
                <div 
                  key={photo.id}
                  className="bg-white rounded-lg border border-brand-border overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group"
                >
                  {/* Photo frame container with scale on hover */}
                  <div className="aspect-[4/3] overflow-hidden bg-brand-cream-dark/20 relative">
                    <img 
                      src={photo.url} 
                      alt={photo.caption || 'Kashmir visitor'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 right-3 bg-brand-onyx/80 text-white font-mono text-[9px] px-2.5 py-1 rounded font-semibold backdrop-blur-xs">
                      📍 {photo.location}
                    </span>
                  </div>

                  {/* Caption context container */}
                  <div className="p-5 text-left space-y-2">
                    <p className="font-serif text-[13px] text-brand-onyx/90 leading-relaxed font-medium line-clamp-2" title={photo.caption}>
                      &ldquo;{photo.caption}&rdquo;
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-brand-border/40 text-[11px] font-mono">
                      <span className="font-bold text-brand-rust truncate max-w-[150px]" title={photo.travelerName}>
                        {photo.travelerName}
                      </span>
                      <span className="text-brand-onyx/50 font-medium shrink-0">{photo.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Prompt to let visitors know they can book their photo package */}
          <div className="mt-12 text-center">
            <span className="font-sans text-[11px] text-brand-onyx/50 italic">
              Want a dedicated travel photography assistant to match your custom vacation? Ask our chatbot or click below!
            </span>
          </div>
        </div>
      </section>

      {/* FAQs list */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center space-y-4">
          <HelpCircle className="mx-auto h-8 w-8 text-brand-rust" />
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-brand-onyx">
            Frequently Asked Questions
          </h2>
          <div className="h-[1px] w-20 bg-brand-rust/40 mx-auto" />
          <p className="text-xs sm:text-sm text-brand-onyx/75 font-light">
            Clear responses to common questions about Kashmir travel approvals, safety, and Gondola bookings.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpenIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-lg border border-brand-border bg-brand-cream-light shadow-xs overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => handleToggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-sm sm:text-base font-semibold text-brand-onyx hover:bg-brand-cream-dark/50 transition-colors"
                >
                  <span className="mr-3">{faq.question}</span>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-brand-cream-dark text-brand-onyx">
                    {isOpen ? <Minus className="h-4 w-4 text-brand-rust" /> : <Plus className="h-4 w-4 text-brand-onyx/65" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-onyx/75 leading-relaxed font-light border-t border-brand-border/40 text-left">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-lg bg-brand-cream-dark/40 border border-brand-border flex flex-col sm:flex-row items-center justify-between text-left gap-5">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-medium text-brand-onyx">Have a unique Kashmir travel requirement?</h3>
            <p className="text-xs text-brand-onyx/75 font-light leading-relaxed max-w-lg">
              We specilize in organizing romantic photoshoots, multi-city group vehicles, personal Kehwa tea setups, and customized private luxury honeymoon tours.
            </p>
          </div>
          <button
            onClick={onRequestCustomItinerary}
            className="rounded bg-brand-rust hover:bg-brand-rust-hover text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Request Custom Curation
          </button>
        </div>
      </section>

    </div>
  );
};

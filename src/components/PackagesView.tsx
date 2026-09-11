import React, { useState, useMemo } from 'react';
import { TourPackage } from '../types';
import { useTourPackages, useWhatsappConfig } from '../data';
import { 
  Filter, 
  MapPin, 
  Clock, 
  Sparkles, 
  Send, 
  X, 
  Check, 
  Coffee, 
  Car, 
  Home, 
  TicketCheck, 
  ArrowUpDown, 
  AlertCircle 
} from 'lucide-react';

interface PackagesViewProps {
  onSelectPackage: (pkg: TourPackage) => void;
  selectedPackageFromMain: TourPackage | null;
  onClearSelectedPackage: () => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  onSelectPackage,
  selectedPackageFromMain,
  onClearSelectedPackage
}) => {
  const [tourPackages] = useTourPackages();
  const [whatsappConfig] = useWhatsappConfig();
  // Local Filter state
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('popular');

  // Search input query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Detailed Modal local view state
  const [detailedModalPkg, setDetailedModalPkg] = useState<TourPackage | null>(null);

  // If App coordinate pushes a package from Home or topnav, open detailed modal for it
  React.useEffect(() => {
    if (selectedPackageFromMain) {
      setDetailedModalPkg(selectedPackageFromMain);
    }
  }, [selectedPackageFromMain]);

  // Extract unique destinations
  const destinations = ['All', 'Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg'];
  
  // Categories unique
  const categories = ['All', 'HONEYMOON', 'THRILL / ADVENTURE', 'FAMILY / COMFORT', 'WINTER SPECIAL'];

  // Process Filter logic
  const filteredPackages = useMemo(() => {
    return tourPackages
      .filter((pkg) => {
        const matchesDest = selectedDestination === 'All' || pkg.location.toLowerCase() === selectedDestination.toLowerCase();
        const matchesCategory = selectedCategory === 'All' || pkg.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesPrice = pkg.price <= maxPrice;
        
        const matchesSearch = searchQuery === '' || 
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesDest && matchesCategory && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        // Default popular sorting
        return 0; 
      });
  }, [selectedDestination, selectedCategory, maxPrice, searchQuery, sortBy]);

  const handleOpenDetails = (pkg: TourPackage) => {
    setDetailedModalPkg(pkg);
    onSelectPackage(pkg);
  };

  const handleCloseDetails = () => {
    setDetailedModalPkg(null);
    onClearSelectedPackage();
  };

  const getWhatsAppLink = (pkg: TourPackage) => {
    const text = `Assalamu Alaikum The Sabil Voyages! I saw your package "${pkg.title}" (₹${pkg.price.toLocaleString('en-IN')}) and want to book/customize it. Please share hotel details and available travel dates for this safari. Destination: ${pkg.location}`;
    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleBookPackageAction = (pkg: TourPackage) => {
    const generatedId = `SVV-PKG-${Math.floor(1000 + Math.random() * 8999)}`;
    const newInquiryObj = {
      id: generatedId,
      name: 'Catalog Explorer / Guest',
      phone: 'Direct via WhatsApp Package Link',
      email: 'N/A',
      guests: 'As configured',
      month: 'Immediate (Selected ' + pkg.duration + ')',
      tier: pkg.category + ' - ' + pkg.title,
      notes: `Interested in catalog safari: "${pkg.title}" configured at ₹${pkg.price.toLocaleString('en-IN')}. Destination: ${pkg.location}`,
      timestamp: new Date().toISOString(),
      status: 'unread',
      source: 'Package Catalog Booking'
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

  // Preset quick requirements for the detailed inclusion view
  const inclusions = [
    'Traditional Kehwa welcoming ceremonies',
    'Chauffeur guided tour in AC private SUV (Innova / Ertiga / similar)',
    'All tool taxes, toll-booth fees, local diesel and drivers allowance',
    'Shikara Sunset cruise on Dal Lake',
    'Buffet Breakfast & Dinner at all chosen premium hotels & houseboats'
  ];

  const exclusions = [
    'Srinagar flight tickets',
    'Lunch expenses & personal laundry bills',
    'Tips and guides custom gratuities'
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 bg-brand-cream-light text-brand-onyx">
      
      {/* Search and Title Section */}
      <div className="text-left space-y-4 border-b border-brand-border pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-rust font-bold">Bespoke Curation Hub</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-brand-onyx">
              Kashmir Luxury Safaris
            </h1>
            <p className="text-xs sm:text-sm text-brand-onyx/75 font-light">
              Select an all-inclusive adventure, or customize a package with our Srinagar flight desks.
            </p>
          </div>

          {/* Search bar input */}
          <div className="w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search Gulmarg, Gondola, Honeymoon..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-brand-border bg-brand-cream-dark/30 px-4 py-3 text-xs text-brand-onyx placeholder-brand-onyx/40 focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
            />
          </div>
        </div>
      </div>

      {/* Complete Filter Dashboard & Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: Filters Sidebar panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-lg border border-brand-border bg-brand-cream-dark/30 p-6 text-left space-y-6">
            
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-brand-onyx uppercase tracking-wider">
                <Filter className="h-4 w-4 text-brand-rust" />
                <span>Filter Safaris</span>
              </div>
              <button 
                onClick={() => {
                  setSelectedDestination('All');
                  setSelectedCategory('All');
                  setMaxPrice(50000);
                  setSortBy('popular');
                  setSearchQuery('');
                }}
                className="text-xs text-brand-rust hover:text-brand-rust-hover font-semibold uppercase tracking-wider"
              >
                Reset All
              </button>
            </div>

            {/* Destination Selection */}
            <div className="space-y-3">
              <label className="block font-mono text-[10px] font-bold text-brand-onyx/70 uppercase tracking-widest">Destination</label>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {destinations.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => setSelectedDestination(dest)}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium rounded transition-all ${
                      selectedDestination === dest
                        ? 'bg-brand-sage text-white font-bold'
                        : 'bg-brand-cream-light text-brand-onyx border border-brand-border hover:bg-brand-cream-dark'
                    }`}
                  >
                    {dest === 'All' ? 'All Destinations' : dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <label className="block font-mono text-[10px] font-bold text-brand-onyx/70 uppercase tracking-widest">Category</label>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium rounded transition-all truncate ${
                      selectedCategory === cat
                        ? 'bg-brand-sage text-white font-bold'
                        : 'bg-brand-cream-light text-brand-onyx/90 border border-brand-border hover:bg-brand-cream-dark'
                    }`}
                  >
                    {cat === 'All' ? 'All Packages' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Cap selector */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="block font-mono text-[10px] font-bold text-brand-onyx/70 uppercase tracking-widest">Budget Limit</label>
                <span className="text-xs font-mono font-bold text-brand-rust">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min="12000" 
                max="50000" 
                step="2000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-rust cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-brand-onyx/50 font-mono">
                <span>₹12,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Sort Order */}
            <div className="space-y-3">
              <label className="block font-mono text-[10px] font-bold text-brand-onyx/70 uppercase tracking-widest">Sort Packages</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs font-medium text-brand-onyx focus:outline-hidden"
                >
                  <option value="popular">Popularity & Custom</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-brand-onyx/50">
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Packages Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Result counter */}
          <div className="text-left font-mono text-[10px] uppercase tracking-wider text-brand-onyx/60">
            Showing <strong className="text-brand-onyx font-bold">{filteredPackages.length}</strong> matching premium safari routes in Kashmir.
          </div>

          {filteredPackages.length === 0 ? (
            <div className="rounded-lg border border-dashed border-brand-border p-12 text-center space-y-4 bg-brand-cream-dark/10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream-dark text-brand-rust">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-medium text-brand-onyx">No packages match your specific filters</h3>
              <p className="text-xs text-brand-onyx/70 max-w-sm mx-auto font-light leading-relaxed">
                Try widening your price limit or clearing the category selection. Our coordinator can design any customized route for any package budget level.
              </p>
              <button
                onClick={() => {
                  setSelectedDestination('All');
                  setSelectedCategory('All');
                  setMaxPrice(50000);
                  setSearchQuery('');
                }}
                className="rounded bg-brand-rust hover:bg-brand-rust-hover px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPackages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="flex flex-col rounded-lg border border-brand-border bg-brand-cream-light shadow-xs overflow-hidden transition-all duration-300 hover:border-brand-rust/40"
                >
                  {/* Package image with location tags */}
                  <div className="relative h-56 overflow-hidden bg-brand-cream-dark">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="h-full w-full object-cover transition-transform duration-75 hover:scale-101"
                      referrerPolicy="no-referrer"
                    />

                    {/* Left category details badging */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                      <span className="rounded bg-brand-rust px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-widest text-white">
                        {pkg.category}
                      </span>
                      <span className="rounded bg-brand-sage/90 px-2.5 py-0.5 font-mono text-[8px] font-bold tracking-widest text-white mt-0.5 uppercase">
                        {pkg.location}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 rounded bg-brand-cream-light px-2.5 py-1 text-xs font-mono text-brand-onyx shadow-xs flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-rust" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 p-6 text-left flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-medium text-brand-onyx">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-brand-onyx/75 leading-relaxed font-light line-clamp-3">
                        {pkg.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-1.5 pt-2">
                        {pkg.highlights.slice(0, 3).map((high, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-brand-onyx/85">
                            <span className="text-brand-rust font-bold shrink-0">✓</span>
                            <span className="line-clamp-1 font-light">{high}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer price, details click and direct chat button */}
                    <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] font-mono uppercase tracking-widest text-brand-onyx/50 font-bold">Taxes Included</span>
                        <span className="text-lg font-serif font-semibold text-brand-onyx">
                          ₹{pkg.price.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-brand-onyx/60 font-sans"> / pax</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenDetails(pkg)}
                          className="rounded border border-brand-border bg-brand-cream-light text-brand-onyx hover:bg-brand-cream-dark px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          Overview
                        </button>

                        <a
                          href={getWhatsAppLink(pkg)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded bg-brand-rust hover:bg-brand-rust-hover text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                        >
                          <Send className="h-3 w-3" />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* DETAILED MODAL VIEWER OVERLAY */}
      {detailedModalPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop mask */}
          <div 
            onClick={handleCloseDetails}
            className="absolute inset-0 bg-brand-sage/80 backdrop-blur-xs transition-opacity" 
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl rounded-lg bg-brand-cream-light shadow-2xl border border-brand-border overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header image background */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-brand-sage flex-shrink-0">
              <img 
                src={detailedModalPkg.image} 
                alt={detailedModalPkg.title} 
                className="h-full w-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-sage via-brand-sage/40 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 rounded-full bg-brand-sage/60 hover:bg-brand-sage text-white p-2 border border-brand-border/20 transition-colors"
                id="btn-close-package-modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="rounded bg-brand-rust px-2 py-0.5 font-mono text-[8px] font-bold uppercase text-white tracking-widest leading-none">
                  {detailedModalPkg.category}
                </span>
                <h2 className="text-xl font-serif font-medium text-white mt-2 leading-tight">{detailedModalPkg.title}</h2>
              </div>
            </div>

            {/* Scrollable interior content */}
            <div className="flex-1 overflow-y-auto p-6 text-left space-y-6">
              
              {/* Duration and geographical data info bar */}
              <div className="grid grid-cols-2 gap-4 rounded border border-brand-border bg-brand-cream-dark/20 p-4">
                <div>
                  <span className="block font-mono text-[8px] uppercase tracking-widest text-brand-onyx/50 font-bold">Standard Safari Span</span>
                  <p className="text-xs sm:text-sm font-semibold text-brand-onyx font-serif flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-4 w-4 text-brand-rust" />
                    <span>{detailedModalPkg.duration}</span>
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[8px] uppercase tracking-widest text-brand-onyx/50 font-bold">Primary Spot</span>
                  <p className="text-xs sm:text-sm font-semibold text-brand-onyx font-serif flex items-center gap-1.5 mt-0.5">
                    <MapPin className="h-4 w-4 text-brand-rust" />
                    <span>{detailedModalPkg.location}, Kashmir</span>
                  </p>
                </div>
              </div>

              {/* Comprehensive Description text */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-bold text-brand-onyx/70 uppercase tracking-widest leading-none">Safari Curation Journey</h4>
                <p className="text-xs sm:text-sm text-brand-onyx/80 leading-relaxed font-light font-serif">
                  {detailedModalPkg.description}
                </p>
              </div>

              {/* Highlighting bullets specific details mapping */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono font-bold text-brand-onyx/70 uppercase tracking-widest leading-none">Day-to-Day Included Milestones</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {detailedModalPkg.highlights.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-brand-cream-dark/35 border border-brand-border rounded flex items-start gap-2.5 text-xs text-brand-onyx/90"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-brand-rust shrink-0 mt-0.5" />
                      <span className="font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Inclusions checklist panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-brand-border">
                
                {/* INCLUSIONS list */}
                <div className="space-y-3">
                  <h4 className="text-[9px] font-bold text-brand-rust uppercase tracking-widest font-mono flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-brand-rust font-bold" />
                    <span>Always Included Services</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {inclusions.map((inc, i) => (
                      <li key={i} className="text-xs text-brand-onyx/70 flex items-start gap-2 font-light">
                        <span className="text-brand-rust font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* EXCLUSIONS list */}
                <div className="space-y-3">
                  <h4 className="text-[9px] font-bold text-brand-onyx/50 uppercase tracking-widest font-mono flex items-center gap-1">
                    <X className="h-3.5 w-3.5 text-brand-onyx/40" />
                    <span>Excluded from price</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {exclusions.map((exc, i) => (
                      <li key={i} className="text-xs text-brand-onyx/50 flex items-start gap-2 font-light">
                        <span>•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Premium Advisory Section */}
              <div className="p-4 rounded border border-brand-border bg-brand-cream-dark/20 text-left flex items-start gap-3">
                <Coffee className="h-5 w-5 text-brand-rust shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-brand-onyx uppercase tracking-wider font-mono">100% Flexible Curation</p>
                  <p className="text-[11px] text-brand-onyx/75 leading-relaxed font-light mt-1">
                    Our team adjusts properties, stays, durations, and locations based on your arrival flights. Chat directly on WhatsApp to add a photography crew, romantic candle dinners, or traditional group wazwan feasts.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal sticky Footer Actions */}
            <div className="bg-brand-cream-dark/45 p-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
              
              {/* Exact Transparent pricing */}
              <div className="text-center sm:text-left">
                <p className="text-[8px] uppercase font-mono tracking-widest text-[#5A5345] font-bold">Bespoke Price / Person</p>
                <p className="text-2xl font-serif font-semibold text-brand-onyx">
                  ₹{detailedModalPkg.price.toLocaleString('en-IN')}
                  <span className="text-xs font-normal font-sans text-brand-onyx/65"> all-inclusive</span>
                </p>
              </div>

              {/* Beautiful interactive triggers to connect on WhatsApp directly */}
              <div className="flex gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="rounded border border-brand-border bg-brand-cream-light hover:bg-brand-cream-dark text-brand-onyx px-5 py-3.5 text-xs font-semibold uppercase tracking-wider flex-1 sm:flex-initial"
                >
                  Dismiss
                </button>

                <a
                  href={getWhatsAppLink(detailedModalPkg)}
                  onClick={() => handleBookPackageAction(detailedModalPkg)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded bg-brand-rust hover:bg-brand-rust-hover text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider flex-1 sm:flex-initial shadow-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>Book with {whatsappConfig.agentName}</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

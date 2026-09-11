import { useState, useEffect } from 'react';
import { TourPackage, InquiryTopic, Testimonial, GalleryPhoto } from './types';

export const defaultWhatsappConfig = {
  phoneNumber: '919906164699', // Authentic Kashmir travel manager number
  agentName: 'Sammer Hussain Bhat',
  status: 'Online • Customizing Trips'
};

export const whatsappConfig = (() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('thesabil_whatsapp_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }
  return { ...defaultWhatsappConfig };
})();

export function useWhatsappConfig() {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('thesabil_whatsapp_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultWhatsappConfig;
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('thesabil_whatsapp_config');
      if (saved) {
        try { setConfig(JSON.parse(saved)); } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('sabil-data-update', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sabil-data-update', handleStorage);
    };
  }, []);

  const saveConfig = (newConfig: typeof defaultWhatsappConfig) => {
    localStorage.setItem('thesabil_whatsapp_config', JSON.stringify(newConfig));
    setConfig(newConfig);
    Object.assign(whatsappConfig, newConfig);
    window.dispatchEvent(new Event('sabil-data-update'));
  };

  return [config, saveConfig] as const;
}

export const defaultTourPackages: TourPackage[] = [
  {
    id: 'wintercheck',
    title: 'Gulmarg Winter Wonderland Adventure',
    location: 'Gulmarg',
    category: 'WINTER SPECIAL',
    badge: 'Trending • Skiing',
    duration: '5 Days / 4 Nights',
    description: 'Experience Kashmir’s finest winter getaway! Take the world-famed Gulmarg Gondola ride to Apharwat Peak, enjoy private skiing instruction, and cozy up in premium heritage boutique resorts.',
    highlights: [
      'Two-Phase Gulmarg Gondola Tickets Included',
      'Special Private Skiing / Snowboard Lesson',
      'Cozy Sleigh rides & snow trekking',
      'Premium boutique stays with traditional Hamam heating'
    ],
    price: 18500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLWHneZevP4Yf41xU58nVPTsqlQWmJrvZT9Bx5Zdku9VxdVFMDurVj4ar2Xl_lc4AS8sdXtnynRLvLUZsyj4SSAjEI262AdGIGkLzQ3wfvPMmed2_Jy2-y2oafN2xvyctwHV1_t4e1UGrXkprzZvq35zNMwAsAZJKorU8kh8v_Lp0c3O5mNO_JAZXZsPn2Pc7QNs8-TqB7pmhE37L-IU2CydYJTquOYdo0tzWJ9--ALj-ks0D1jRhLtzrIbiYpBMR3b2DtJqDFAew'
  },
  {
    id: 'romanticdal',
    title: 'Srinagar Romantic Houseboat Heritage Tour',
    location: 'Srinagar',
    category: 'HONEYMOON',
    badge: 'Most Popular',
    duration: '4 Days / 3 Nights',
    description: 'A beautiful journey through magical Dal Lake. Stay on a luxury hand-carved cedarwood houseboat, explore pristine Mughal Gardens, and experience a dreamy sunset Shikara ride.',
    highlights: [
      'Private luxury houseboats with local gourmet dining',
      'Sunset Shikara cruise to Floating Gardens',
      'In-person cultural Kehwa tea preparation welcoming',
      'Private air-conditioned SUV transports across gardens'
    ],
    price: 14999,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtPWo23b1k74VKwXVpUu_sO3txFkBw4ZMemVSWR--6RC05c-7wQ0clil5BrPRm8Qdlgg8GJJ1X5H9A3ls3byiRNHtLHsiqCPfT_KUflooIqY1Hc3Z060G69ZgxDqGlTAPgEAphA8jd49nR2C2CqJLGgtzHrz-xAvtIG274IOY64rvPQ76z0Lq0r0EvRx_zCeSo_STZfb_yhtgej4JlQlT2qMSnrUd7QBfZ2J42wxvLV3nzQkoPiiTaqiZQPvPeuz29RY1LphOqgU8'
  },
  {
    id: 'pahalgamalpine',
    title: 'Pahalgam Alpine Valley Retreat',
    location: 'Pahalgam',
    category: 'THRILL / ADVENTURE',
    badge: 'Scenic Escapes',
    duration: '4 Days / 3 Nights',
    description: 'An immersive valley trek around the Lidder River. Spend quiet moments watching cascading streams, horseback ride in the lush hills of Aru and Betaab valleys, and enjoy cozy woodside bonfires.',
    highlights: [
      'Lidder river rafting experience tickets',
      'Scenic Aru, Betaab, and Chandanwari Valley tours',
      'Traditional Kashmiri village exploration walk',
      'Bonfire & authentic wazwan dinner sampler'
    ],
    price: 16200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYGW7HgszlgC_PI6PDtoM7TgCAE-ekLM9SCwc6dJl8HjxtcdfwLXrvHta2RskMc6jBBmMJVi97FXoGBpNJ2zY522gmk1Z9fMga3TWWDQ9hsErMfmVkKt-MOVuQjWlsLqfPbkt2BzlJpcmnRRibt1gEIJ37_D9hEaXC44Gvqqms5hv2nhQ9ThAuzBCx0We1rp2_Ojony13a0ur-JqEaG_UXhMBQG2Jcidimm3_oFbcXHEDRsvZxsJSXZrI50kr9nWwYAka4rJ2k8GY'
  },
  {
    id: 'sonamargtrail',
    title: 'Sonamarg Glacier Explorer & Hike',
    location: 'Sonamarg',
    category: 'THRILL / ADVENTURE',
    badge: 'Glacier Expedition',
    duration: '4 Days / 3 Nights',
    description: 'Hike across massive alpine peaks in the Meadow of Gold. Walk the scenic route to Thajiwas Glacier, view shimmering turquoise streams, and sleep under millions of stars in premium dome retreats.',
    highlights: [
      'Pony rides to Thajiwas Glacier viewpoint',
      'Experienced high-altitude local guide & trekking gear',
      'Kehwa picnic amid snowfield pastures',
      'High-speed local transit from Srinagar airport'
    ],
    price: 21500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGrsdJ6Dxo7GotHhPLrqwoVeFSzQYAQOzxKMx6j0mw71vBjnfxoTV6ZfXraH5QJXiRnyi5acGrjCqfGzgLuYe6v6R_SMjMJaCQCnLhYCz3ci5t7fSNGZhyqOrYfxpb5VRLPlhj-XxOEoUppVRXbvQ7vKXl1U3JDHQh5evCZYPd5RC2OPQanSdPSTlCTZolKpygydL_eGcq0BECCngro4HtHHX7SUgQWKaAvzuNXAGXDoImmicaaeF27jYVI2lh1yI76YeSygKTE1g'
  },
  {
    id: 'grandloop',
    title: 'The Sabil Voyages Signature Grand Kashmir Circle',
    location: 'Srinagar',
    category: 'FAMILY / COMFORT',
    badge: 'Luxury Curated',
    duration: '8 Days / 7 Nights',
    description: 'Our ultimate luxury circuit. Covers Dal Lake in Srinagar, the high alpine slopes of Gulmarg, the pine valleys of Pahalgam, and Sonamarg in absolute comfort. Private luxury SUV included.',
    highlights: [
      'All 5-Star Boutique & Heritage Stay properties',
      'VVIP passes for gondola rides & private Shikara boats',
      'Handcrafted culinary Wazwan feasts cooked by master chefs',
      '24/7 dedicated local tour manager & chauffeur service'
    ],
    price: 45999,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDrss5Sm7tLzJm_JQs-0PxUPEHxPmhlEAyL06aJ7j9rrbZu_-6Avnm2mbejKWPUQCA_M5N1WfKb-4LAC6UMjykgee7Brn5Eoyxlj2C0M5qCPgvOks6jhTQelrFfd99UjEf0C8wqoOhEegmIeiIy1TJ5E6u5IhOr3Lhs_UwhnFONEyh59n3x4aEasXtLv0nkUWpCyVkiDozhJAele42Cwl-nBhiWUFa5zMV0Wvf99TlFBzseYASp0KSi-CI3AFDb28zXGcPbA_1fDo'
  }
];

export const tourPackages: TourPackage[] = (() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('thesabil_packages_v1');
    if (saved) {
      try { return JSON.parse(saved) as TourPackage[]; } catch(e) {}
    }
  }
  return [...defaultTourPackages];
})();

export function useTourPackages() {
  const [pkgs, setPkgs] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem('thesabil_packages_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultTourPackages;
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('thesabil_packages_v1');
      if (saved) {
        try { setPkgs(JSON.parse(saved)); } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('sabil-data-update', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sabil-data-update', handleStorage);
    };
  }, []);

  const savePkgs = (newPkgs: TourPackage[]) => {
    localStorage.setItem('thesabil_packages_v1', JSON.stringify(newPkgs));
    setPkgs(newPkgs);
    // Mutate the array items to keep the public export reference clean & live
    tourPackages.length = 0;
    tourPackages.push(...newPkgs);
    window.dispatchEvent(new Event('sabil-data-update'));
  };

  return [pkgs, savePkgs] as const;
}

export const inquiryTopics: InquiryTopic[] = [
  {
    id: 'general',
    title: 'Customize a Family Vacation',
    description: 'Get options for multi-generation groups, elderly-friendly routes, and custom vans.',
    icon: 'Users',
    whatsappMessage: 'Hello The Sabil Voyages! I am planning a family vacation to Kashmir and would love a custom itinerary with family-friendly stays.'
  },
  {
    id: 'romantic',
    title: 'Honeymoon & Romantic Escapes',
    description: 'Includes premium candlelight dinners, flower beds decoration, and private shikaras.',
    icon: 'Heart',
    whatsappMessage: 'Assalamu alaikum The Sabil Voyages! I am looking for a beautiful honeymoon package. Please share options with luxury houseboat and flower decor.'
  },
  {
    id: 'adventure',
    title: 'Gulmarg Gondola & Ski Bookings',
    description: 'Avoid queues with pre-booked phase 1 & 2 passes and skiing packages.',
    icon: 'Sparkles',
    whatsappMessage: 'Hi The Sabil Voyages! I want to book a Gulmarg adventure package. Please let me know how to get Gondola tickets and skiing instructors.'
  },
  {
    id: 'corporate',
    title: 'Premium Corporate & Group Travels',
    description: 'Tailored for conferences, custom team outings, retreat resorts and large coaches.',
    icon: 'Briefcase',
    whatsappMessage: 'Hello The Sabil Voyages! I would like to inquire about group tours / corporate booking for Kashmir. We have around 15+ members.'
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Our trip with The Sabil Voyages was absolute paradise. They secured Gondola tickets when they were fully sold out online, and our stay in Pahalgam right by the stream was breathtaking.",
    author: "Zoya & Faheem Sheikh",
    location: "Mumbai",
    relativeText: "Honeymooners"
  },
  {
    quote: "As a corporate group, we were worried about transport and food. The Sabil Voyages arranged a stunning executive travel van and gourmet organic Kashmiri meals. Outstanding quality of execution!",
    author: "Arun Nair",
    location: "Bangalore",
    relativeText: "Group Leader"
  },
  {
    quote: "Exceptional care of my elderly parents. Sammer from The Sabil Voyages personally checked on them every single evening and customized the walking tours so they felt completely respected.",
    author: "Tariq Mahmood",
    location: "Dubai, UAE",
    relativeText: "Family Tour"
  }
];

export const defaultGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'g-1',
    url: 'https://images.unsplash.com/photo-1595815771614-12175117104f?auto=format&fit=crop&w=800&q=80',
    caption: 'Sunset shikara boat ride on Dal Lake with beautiful snow mountains behind.',
    travelerName: 'Sanjay & Kavita Sen',
    date: 'May 2026',
    location: 'Srinagar Houseboats'
  },
  {
    id: 'g-2',
    url: 'https://images.unsplash.com/photo-1621849400072-f554417f7041?auto=format&fit=crop&w=800&q=80',
    caption: 'Thrilling snowy landscape during Phase-2 of the Gulmarg Gondola ride.',
    travelerName: 'Aniket & Friends (6 Pax)',
    date: 'January 2026',
    location: 'Gulmarg Gondola'
  },
  {
    id: 'g-3',
    url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    caption: 'Taking gorgeous landscape photography amidst Meadow of Gold flowers.',
    travelerName: 'The Malhotra Family',
    date: 'September 2025',
    location: 'Sonamarg Meadows'
  }
];

export function useGalleryPhotos() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('thesabil_gallery_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultGalleryPhotos;
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('thesabil_gallery_v1');
      if (saved) {
        try { setPhotos(JSON.parse(saved)); } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('sabil-data-update', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sabil-data-update', handleStorage);
    };
  }, []);

  const savePhotos = (newPhotos: GalleryPhoto[]) => {
    localStorage.setItem('thesabil_gallery_v1', JSON.stringify(newPhotos));
    setPhotos(newPhotos);
    window.dispatchEvent(new Event('sabil-data-update'));
  };

  return [photos, savePhotos] as const;
}


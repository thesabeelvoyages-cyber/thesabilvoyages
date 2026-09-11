/**
 * Types and interfaces for The Sabil Voyages Kashmir
 */

export type ScreenType = 'home' | 'packages' | 'inquiry' | 'contact' | 'admin';

export interface TourPackage {
  id: string;
  title: string;
  location: string;
  category: string;
  badge: string;
  duration: string;
  description: string;
  highlights: string[];
  price: number;
  image: string;
}

export interface InquiryTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  whatsappMessage: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  relativeText: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  travelerName: string;
  date: string;
  location: string;
}


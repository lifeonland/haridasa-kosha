// Constants for the application

export const APP_NAME = 'Haridasa Kosha';
export const APP_DESCRIPTION =
  'The largest searchable digital library of Haridasa compositions from the Dvaita Vedanta tradition.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Pagination
export const ITEMS_PER_PAGE = 50;
export const COMPOSERS_PER_PAGE = 50;
export const COMPOSITIONS_PER_PAGE = 50;

// API endpoints
export const API_BASE_URL = `${APP_URL}/api`;
export const API_COMPOSERS = `${API_BASE_URL}/composers`;
export const API_COMPOSITIONS = `${API_BASE_URL}/library`;
export const API_SEARCH = `${API_BASE_URL}/search`;

// Navigation links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/composers', label: 'Composers' },
  { href: '/library', label: 'Compositions' },
];

// Features
export const FEATURES = [
  {
    icon: '🔍',
    title: 'Comprehensive Search',
    description: 'Search across thousands of compositions by title, lyrics, or composer',
  },
  {
    icon: '🎵',
    title: 'Complete Lyrics',
    description: 'Original Kannada lyrics with transliteration and English translation',
  },
  {
    icon: '👤',
    title: 'Composer Profiles',
    description: 'Learn about the masters of the Haridasa tradition',
  },
  {
    icon: '📚',
    title: 'Rich Database',
    description: '500+ compositions from 50+ renowned composers',
  },
];

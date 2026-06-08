import type { Metadata } from 'next';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: '404 | Page Not Found | NoteHub',
  description: 'The page you are looking for could not be found on NoteHub.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: '404 | Page Not Found | NoteHub',
    description: 'The page you are looking for could not be found on NoteHub.',
    type: 'website',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - 404 page not found',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 | Page Not Found | NoteHub',
    description: 'The page you are looking for could not be found on NoteHub.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'NoteHub - 404 page not found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.notFoundContainer}>
      <h1 className={css.notFoundTitle}>404 - Page not found</h1>
      <p className={css.notFoundDescription}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;

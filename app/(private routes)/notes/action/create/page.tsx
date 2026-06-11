import { Metadata } from 'next';
import NoteCreateModal from './CreateNote';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description:
    'Create a new note in NoteHub with title, content, and category.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Create Note | NoteHub',
    description:
      'Create a new note in NoteHub with title, content, and category.',
    type: 'website',
    siteName: 'Create Note | NoteHub',
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/action/create/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note | NoteHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Note | NoteHub',
    description:
      'Create a new note in NoteHub with title, content, and category.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'Create Note | NoteHub',
      },
    ],
  },
};

const NoteCreate = async () => {
  return <NoteCreateModal />;
};

export default NoteCreate;

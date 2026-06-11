import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import EditPage from './EditPage.Client';
import { getMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit | NoteHub',
  description: 'Edit page in NoteHub for change your personal data.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Edit | NoteHub',
    description: 'Edit page in NoteHub for change your personal data.',
    type: 'website',
    siteName: 'Edit | NoteHub',
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/edit/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Edit | NoteHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edit| NoteHub',
    description: 'Edit page in NoteHub for change your personal data.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'Edit | NoteHub',
      },
    ],
  },
};

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditPage />
    </HydrationBoundary>
  );
};

export default Page;

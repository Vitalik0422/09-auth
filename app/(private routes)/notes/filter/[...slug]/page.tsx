import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesFilterListClient from './Notes.client';
import { TagType } from '@/types/note';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/serverApi';

interface FilterNotesProps {
  params: Promise<{ slug: TagType }>;
}

export const generateMetadata = async ({
  params,
}: FilterNotesProps): Promise<Metadata> => {
  const { slug } = await params;
  const activeSlug = slug?.[0] ?? 'all';
  const isAllNotes = activeSlug === 'all';
  const tagLabel = isAllNotes ? 'All Notes' : `${activeSlug} Notes`;
  const title = `${tagLabel} | NoteHub`;
  const description = isAllNotes
    ? 'Browse all notes in NoteHub. Filter, search, and manage notes quickly.'
    : `Browse ${activeSlug.toLowerCase()} notes in NoteHub. Filter, search, and manage notes quickly.`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/notes/filter/${activeSlug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'NoteHub',
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/filter/${activeSlug}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${tagLabel} in NoteHub`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          alt: `${tagLabel} in NoteHub`,
        },
      ],
    },
  };
};

const Page = async ({ params }: FilterNotesProps) => {
  const { slug } = await params;
  const tag = slug[0] as TagType;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, slug: tag, search: '' }],
    queryFn: () =>
      slug[0] === 'all' ? fetchNotes() : fetchNotes('', 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterListClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Page;

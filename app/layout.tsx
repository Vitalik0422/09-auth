import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_NOTEHUB_DOMAIN ?? 'http://localhost:3000',
  ),
  title: 'NoteHub',
  description: 'Plan every day with NoteHub',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'NoteHub',
    description: 'Plan every day with NoteHub.',
    type: 'website',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteHub',
    description: 'Plan every day with NoteHub.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'NoteHub',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Toaster position="top-right" reverseOrder={false} />
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}

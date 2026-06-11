import { Metadata } from 'next';
import css from './Profile.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'Personal profile in a NoteHub Site.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'Personal profile in a NoteHub Site.',
    type: 'website',
    siteName: 'Profile | NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile | NoteHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile | NoteHub',
    description: 'Personal profile in a NoteHub Site.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'Profile | NoteHub',
      },
    ],
  },
};

const Profile = async () => {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar ?? '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: <span>{user.username}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Profile;

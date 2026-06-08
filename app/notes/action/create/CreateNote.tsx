'use client';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useRouter } from 'next/navigation';

const NoteCreateModal = () => {
  const router = useRouter();
  const handleCloseModal = () => {
    router.back();
  };
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onClose={handleCloseModal} />
      </div>
    </main>
  );
};

export default NoteCreateModal;

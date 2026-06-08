'use client';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { NoteFormData } from '@/types/note';
import { noteDraftStore } from '@/lib/store/noteStore';
import toast from 'react-hot-toast';

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const draft = noteDraftStore((state) => state.draft);
  const setDraft = noteDraftStore((state) => state.setDraft);
  const clearDraft = noteDraftStore((state) => state.clearDraft);
  const hydrated = noteDraftStore((state) => state._hasHydrated);
  const isFormInvalid =
    draft.title.trim().length < 2 || draft.content.trim().length < 3;

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(`Note ${note.title} was created`);
      clearDraft();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateNote = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    await createNoteMutation.mutateAsync(data as unknown as NoteFormData);
  };
  const handleChangeDraft = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  if (!hydrated) return <p>Loading...</p>;

  return (
    <form className={css.form} onSubmit={handleCreateNote}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          className={css.input}
          value={draft.title}
          onChange={handleChangeDraft}
          placeholder="Write title"
          minLength={2}
          maxLength={50}
          required
        />
        <span className={css.titleErrText}>
          This field cannot be empty and must be 2 to 50 characters long.
        </span>
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          className={css.textarea}
          value={draft.content}
          onChange={handleChangeDraft}
          placeholder="Write content"
          minLength={3}
          maxLength={150}
          required
        />
        <span className={css.titleErrTextArea}>
          This field cannot be empty and must be 3 to 150 characters long.
        </span>
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChangeDraft}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onClose}
          disabled={createNoteMutation.isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isFormInvalid || createNoteMutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
};
export default NoteForm;

import { TagType } from '@/types/note';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as TagType,
};

type draftState = {
  draft: {
    title: string;
    content: string;
    tag: TagType;
  };
  _hasHydrated: boolean;
};

type draftActions = {
  setDraft: (draft: typeof initialDraft) => void;
  clearDraft: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const noteDraftStore = create<draftState & draftActions>()(
  devtools(
    persist(
      (set) => ({
        draft: initialDraft,
        _hasHydrated: false,
        setDraft: (draft) => set({ draft }),
        clearDraft: () => set({ draft: initialDraft }),
        setHasHydrated: (value: boolean) => set({ _hasHydrated: value }),
      }),
      {
        name: 'note-draft-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ draft: state.draft }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),

    {
      name: 'NoteDraftStore',
    },
  ),
);

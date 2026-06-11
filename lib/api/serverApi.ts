import { cookies } from 'next/headers';
import { instance } from './api';
import type { AxiosResponse } from 'axios';
import { UserData } from '@/types/user';
import { Note, TagType } from '@/types/note';

interface CheckSession {
  success: boolean;
}

interface Notes {
  notes: Note[];
  totalPages: number;
}

export const checkServerSession = async (): Promise<
  AxiosResponse<CheckSession>
> => {
  const cookieStore = await cookies();
  const response = await instance.get<CheckSession>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const getMe = async (): Promise<UserData> => {
  const cookieStore = await cookies();
  const response = await instance.get<UserData>('users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNotes = async (
  search?: string,
  page = 1,
  perPage = 12,
  tag?: TagType,
): Promise<Notes> => {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: TagType;
  } = {
    page,
    perPage,
  };

  if (search) {
    params.search = search;
  }

  if (tag) {
    params.tag = tag;
  }
  const cookieStore = await cookies();
  const response = await instance.get<Notes>(`/notes`, {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await instance.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

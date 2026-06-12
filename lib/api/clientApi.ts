import { Note, NoteFormData, TagType } from '@/types/note';
import { instance } from './api';
import { UserData, UserRegisterData } from '@/types/user';

interface Notes {
  notes: Note[];
  totalPages: number;
}

interface CheckSession {
  success: boolean;
}

interface UpdateUserName {
  username: string;
  email: string;
}

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

  const response = await instance.get<Notes>(`/notes`, {
    params,
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await instance.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: NoteFormData): Promise<Note> => {
  const response = await instance.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const registerUser = async (
  params: UserRegisterData,
): Promise<UserData> => {
  const response = await instance.post<UserData>('auth/register', params);
  return response.data;
};
export const login = async (loginData: UserRegisterData): Promise<UserData> => {
  const response = await instance.post<UserData>('auth/login', loginData);
  return response.data;
};
export const logout = async (): Promise<string> => {
  const response = await instance.post<string>('auth/logout');
  return response.data;
};
export const checkSession = async (): Promise<CheckSession> => {
  const response = await instance.get<CheckSession>('auth/session');
  return response.data;
};
export const getMe = async (): Promise<UserData> => {
  const response = await instance.get<UserData>('users/me');
  return response.data;
};
export const updateMe = async (data: UpdateUserName): Promise<UserData> => {
  const response = await instance.patch<UserData>('users/me', data);
  return response.data;
};

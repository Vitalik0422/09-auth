import { cookies } from 'next/headers';
import { instance } from './api';
import type { AxiosResponse } from 'axios';
import { UserData } from '@/types/user';

interface CheckServerSessionResponse {
  message: string;
}

export const checkServerSession = async (): Promise<
  AxiosResponse<CheckServerSessionResponse>
> => {
  const cookieStore = await cookies();
  const response = await instance.get<CheckServerSessionResponse>(
    '/auth/session',
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );
  return response;
};

export const getMe = async (): Promise<UserData> => {
  const cookieStore = await cookies();
  const response = await instance.get<UserData>('users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log(response);
  return response.data;
};

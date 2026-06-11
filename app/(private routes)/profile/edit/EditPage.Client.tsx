'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './EditPage.module.css';
import Image from 'next/image';
import { MutatingDots } from 'react-loader-spinner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe } from '@/lib/api/clientApi';
import React from 'react';
import { useRouter } from 'next/navigation';

const EditPage = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    retryOnMount: false,
  });
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      router.replace('/profile');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {},
  });

  const handleUpdateUser = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const newUserName = formData.get('username') as string;
    mutate({
      username: newUserName.trim(),
      email: data!.email,
    });
  };
  const handleCancel = () => {
    router.back();
  };

  if (!data)
    return (
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#3483f8"
        secondaryColor="#3483f8"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperClass={css.avatar}
      />
    );

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={data.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleUpdateUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={data.username}
              required
            />
          </div>

          <p>Email:{data.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditPage;

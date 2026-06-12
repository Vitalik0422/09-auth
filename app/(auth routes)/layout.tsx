'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return <div>{children}</div>;
};

export default AuthLayout;

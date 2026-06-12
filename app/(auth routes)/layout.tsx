'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const refetchLayout = () => {
      router.refresh();
      setLoading(false);
    };
    refetchLayout();
  }, [router]);
  return <>{loading ? <div>Loading...</div> : children}</>;
};

export default AuthLayout;

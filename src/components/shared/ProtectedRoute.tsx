"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = storage.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthorized) {
    return null; // Return nothing while checking authorization or redirecting
  }

  return <>{children}</>;
}

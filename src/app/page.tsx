"use client"
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import SplashScreen from "@/components/shared/SplashScreen";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = storage.getSession();
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-background font-sans">
      <SplashScreen />
    </div>
  );
}

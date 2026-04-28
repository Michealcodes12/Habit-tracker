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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <SplashScreen />
      </main>
    </div>
  );
}

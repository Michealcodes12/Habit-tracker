"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Habit } from '@/types/habit';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';

export default function Dashboard() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleLogout = () => {
    storage.saveSession(null);
    router.push('/login');
  };

  const loadHabits = useCallback(() => {
    const session = storage.getSession();
    if (session) {
      const allHabits = storage.getHabits();
      const userHabits = allHabits.filter(h => h.userId === session.userId);
      setHabits(userHabits);
    }
  }, []);

  useEffect(() => {
    const listhabit = async () => {
      loadHabits();


    }
    listhabit()
  }, [loadHabits]);

  return (
    <ProtectedRoute>
      <div className="flex flex-col flex-1 w-full max-w-3xl mx-auto py-8 px-4 font-sans min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Your Dashboard</h1>
          <div className="flex items-center gap-3">
            {!isCreating && (
              <button
                onClick={() => setIsCreating(true)}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition shadow-sm"
              >
                + Create Habit
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {isCreating && (
          <HabitForm
            onSuccess={() => {
              setIsCreating(false);
              loadHabits();
            }}
            onCancel={() => setIsCreating(false)}
          />
        )}

        <HabitList habits={habits} onOpenCreate={() => setIsCreating(true)} />
      </div>
    </ProtectedRoute>
  );
}
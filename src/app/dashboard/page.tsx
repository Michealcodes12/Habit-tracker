"use client";

import { useEffect, useState, useCallback } from 'react';
import { storage } from '@/lib/storage';
import { Habit } from '@/types/habit';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isCreating, setIsCreating] = useState(false);

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
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition shadow-sm"
            >
              + Create Habit
            </button>
          )}
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
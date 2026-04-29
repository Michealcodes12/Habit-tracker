"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Habit } from '@/types/habit';
import { calculateCurrentStreak } from '@/lib/streaks';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';

export default function Dashboard() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [sessionEmail, setSessionEmail] = useState('');

  const handleLogout = () => {
    storage.saveSession(null);
    router.push('/login');
  };

  const loadHabits = useCallback(() => {
    const session = storage.getSession();
    if (session) {
      setSessionEmail(session.email);
      const allHabits = storage.getHabits();
      const userHabits = allHabits.filter(h => h.userId === session.userId);
      setHabits(userHabits);
    }
  }, []);

  useEffect(() => {
    const initHabits = async () => {
      loadHabits();
    };
    initHabits();
  }, [loadHabits]);

  const todayStr = new Date().toISOString().split('T')[0];
  const globalStreak = habits.length > 0 ? Math.max(...habits.map(h => calculateCurrentStreak(h.completions, todayStr))) : 0;

  return (
    <ProtectedRoute>
      <div className="bg-background text-on-background min-h-screen">
        <header className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 docked full-width top-0 sticky z-50 flex items-center justify-between px-6 h-16 w-full">
          <div className="flex items-center gap-4">
            <button className="text-primary hover:bg-white/5 active:scale-95 transition-all duration-200 p-2 rounded-lg">
              <span className="material-symbols-outlined" data-icon="grid_view">grid_view</span>
            </button>
            <h1 className="text-2xl font-black text-primary tracking-tighter font-sans">H-T</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="text-on-surface hover:text-primary transition-colors text-sm font-semibold uppercase tracking-widest border-primary px-4 py-2 rounded-full border-2" data-testid="auth-logout-button">
              Logout
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-primary-container/20 flex items-center justify-center text-primary font-bold">
              {sessionEmail ? sessionEmail.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 space-y-8" data-testid="dashboard-page">
          {/* Welcome Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-on-surface-variant font-semibold tracking-wide uppercase text-xs mb-2">Welcome back</p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Good morning{sessionEmail ? `, ${sessionEmail.split('@')[0]}` : ''}</h2>
            </div>
            <div className="glass-panel p-6 rounded-xl flex items-center gap-6 border-l-4 border-tertiary">
              <div className="bg-tertiary-container/20 p-3 rounded-full">
                <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="local_fire_department" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Global Mastery</p>
                <p className="text-3xl font-black text-on-surface">{globalStreak} Day Streak</p>
              </div>
            </div>
          </section>

          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 gap-4">
            <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4">Weekly Velocity</h3>
                <div className="flex items-end gap-2 h-32">
                  <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[40%]"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[60%]"></div>
                  <div className="flex-1 bg-primary-container rounded-t-lg h-[85%]"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[50%]"></div>
                  <div className="flex-1 bg-primary-container rounded-t-lg h-[95%]"></div>
                  <div className="flex-1 bg-primary rounded-t-lg h-full"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-lg h-0"></div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span className="text-primary">Sat</span><span>Sun</span>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full"></div>
            </div>
          </div>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight">Active Habits</h3>
              {!isCreating && (
                <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all">
                  <span className="material-symbols-outlined text-lg" data-icon="add">add</span>
                  New Habit
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

            <HabitList habits={habits} onOpenCreate={() => setIsCreating(true)} onUpdate={loadHabits} />
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
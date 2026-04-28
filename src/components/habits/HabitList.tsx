import React from 'react';
import { Habit } from '@/types/habit';

interface HabitListProps {
  habits: Habit[];
  onOpenCreate: () => void;
}

export default function HabitList({ habits, onOpenCreate }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <p className="text-slate-500 dark:text-slate-400 mb-2">No habits found.</p>
        <button
          onClick={onOpenCreate}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition"
        >
          Create one to get started!
        </button>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {habits.map((habit) => (
        <li key={habit.id} className="p-5 border rounded-2xl shadow-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{habit.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{habit.description}</p>
        </li>
      ))}
    </ul>
  );
}

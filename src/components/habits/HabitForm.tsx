"use client";

import { useState } from 'react';
import { storage } from '@/lib/storage';

interface HabitFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function HabitForm({ onSuccess, onCancel }: HabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const session = storage.getSession();
    if (!session) return;

    const newHabit = {
      id: crypto.randomUUID(),
      userId: session.userId,
      name: name.trim(),
      description: description.trim(),
      frequency: 'daily' as const,
      createdAt: new Date().toISOString(),
      completions: [],
    };

    const existingHabits = storage.getHabits();
    storage.saveHabits([...existingHabits, newHabit]);

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 w-full mb-6">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Create New Habit</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="habit-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Habit Name</label>
          <input
            id="habit-name"
            type="text"
            data-testid="habit-form-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Read for 20 minutes"
            className="p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-900 dark:text-white"
            required
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="habit-description" className="text-sm font-medium text-slate-700 dark:text-slate-300">Description (Optional)</label>
          <textarea
            id="habit-description"
            data-testid="habit-form-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Why do you want to build this habit?"
            className="p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-900 dark:text-white resize-none h-24"
          />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            data-testid="habit-form-submit"
            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-200"
          >
            Create Habit
          </button>
        </div>
      </div>
    </form>
  );
}

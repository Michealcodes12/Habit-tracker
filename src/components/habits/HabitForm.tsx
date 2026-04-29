"use client";

import { useState } from 'react';
import { storage } from '@/lib/storage';
import { Habit } from '@/types/habit';

interface HabitFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialHabit?: Habit;
}

export default function HabitForm({ onSuccess, onCancel, initialHabit }: HabitFormProps) {
  const [name, setName] = useState(initialHabit?.name || '');
  const [description, setDescription] = useState(initialHabit?.description || '');

  // UI-only states for Lumina design compliance (not saved to storage to maintain existing functionality)
  const [selectedIcon, setSelectedIcon] = useState('self_improvement');
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('07:00');

  const icons = [
    'self_improvement', 'fitness_center', 'menu_book', 'water_drop',
    'bedtime', 'lightbulb', 'hiking', 'brush', 'monitoring', 'code', 'psychiatry', 'more_horiz'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const session = storage.getSession();
    if (!session) return;

    const existingHabits = storage.getHabits();

    if (initialHabit) {
      const updatedHabits = existingHabits.map(h =>
        h.id === initialHabit.id
          ? { ...h, name: name.trim(), description: description.trim() }
          : h
      );
      storage.saveHabits(updatedHabits);
    } else {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        userId: session.userId,
        name: name.trim(),
        description: description.trim(),
        frequency: 'daily',
        createdAt: new Date().toISOString(),
        completions: [],
      };
      storage.saveHabits([...existingHabits, newHabit]);
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background text-on-background overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-primary font-sans">{initialHabit ? 'Edit Habit' : 'New Habit'}</h1>
        <button type="button" onClick={onCancel} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors duration-200 active:scale-90">
          <span className="material-symbols-outlined text-on-surface-variant">close</span>
        </button>
      </header>

      <form id="habit-form" onSubmit={handleSubmit} className="pt-8 pb-32 px-6 max-w-2xl mx-auto space-y-10">

        {/* Habit Name Input Section */}
        <section className="space-y-4">
          <label className="block text-sm font-bold text-on-surface-variant ml-1 uppercase tracking-widest">Name Your Habit</label>
          <div className="relative group">
            <input
              className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant text-on-surface text-xl px-4 py-4 focus:outline-none focus:border-primary focus:bg-surface-container transition-all duration-300 rounded-t-xl placeholder:text-outline/50"
              placeholder="e.g., Morning Meditation"
              type="text"
              data-testid="habit-form-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-focus-within:w-full bg-primary transition-all duration-500 shadow-[0_0_15px_rgba(87,241,219,0.4)]"></div>
          </div>
        </section>

        {/* Habit Description Section */}
        <section className="space-y-4">
          <label className="block text-sm font-bold text-on-surface-variant ml-1 uppercase tracking-widest">Habit Description</label>
          <div className="relative group">
            <textarea
              className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant text-on-surface text-lg px-4 py-4 focus:outline-none focus:border-primary focus:bg-surface-container transition-all duration-300 rounded-t-xl placeholder:text-outline/50 min-h-[120px] resize-none"
              placeholder="Add some details about your new habit..."
              data-testid="habit-form-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-focus-within:w-full bg-primary transition-all duration-500 shadow-[0_0_15px_rgba(87,241,219,0.4)]"></div>
          </div>
        </section>

        {/* Icon Grid Selector */}
        <section className="space-y-4">
          <label className="block text-sm font-bold text-on-surface-variant ml-1 uppercase tracking-widest">Visual Anchor</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setSelectedIcon(icon)}
                className={`aspect-square flex items-center justify-center rounded-xl transition-all active:scale-95 ${selectedIcon === icon
                  ? "bg-primary/20 border border-primary/40 text-primary shadow-[0_0_20px_rgba(87,241,219,0.15)]"
                  : "bg-surface-container-low border border-white/5 text-on-surface-variant hover:text-primary hover:bg-white/5"
                  }`}
              >
                <span className="material-symbols-outlined text-3xl" style={selectedIcon === icon ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {icon}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Frequency & Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frequency Selector */}
          <section className="space-y-4">
            <label className="block text-sm font-bold text-on-surface-variant ml-1 uppercase tracking-widest">Frequency</label>
            <div className="flex p-1 bg-surface-container-low rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setFrequency('daily')}
                className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${frequency === 'daily' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setFrequency('weekly')}
                className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${frequency === 'weekly' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Weekly
              </button>
            </div>
          </section>

          {/* Time Picker */}
          <section className="space-y-4">
            <label className="block text-sm font-bold text-on-surface-variant ml-1 uppercase tracking-widest">Reminder Time</label>
            <div className="flex items-center space-x-3 bg-surface-container-low border border-white/5 rounded-xl px-4 py-2 hover:border-primary/30 transition-colors group">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">schedule</span>
              <input
                className="bg-transparent border-none text-on-surface text-lg font-bold outline-none w-full scheme:dark"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </section>
        </div>

        {/* Pro Tip Card */}
        <section className="relative overflow-hidden bg-surface-container rounded-2xl p-6 flex items-start space-x-4 border border-white/5">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-8xl text-tertiary">rocket_launch</span>
          </div>
          <div className="p-3 bg-tertiary/20 rounded-xl relative z-10">
            <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
          </div>
          <div className="space-y-1 relative z-10">
            <h4 className="text-on-surface font-bold">Consistency Insight</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">92% of users succeed with morning routines. Aim to complete this habit before 10:00 AM for maximum success rate.</p>
          </div>
        </section>

        {/* Fixed Action Footer */}
        <footer className="fixed bottom-0 left-0 right-0 p-6 bg-background/90 backdrop-blur-xl border-t border-white/5 z-50">
          <div className="max-w-2xl mx-auto flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 border border-outline-variant rounded-xl text-on-surface font-bold hover:bg-white/5 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="habit-form-submit"
              className="flex-2 py-4 bg-primary text-on-primary font-extrabold rounded-xl shadow-[0_8px_30px_rgb(87,241,219,0.3)] hover:brightness-110 active:scale-95 transition-all"
            >
              {initialHabit ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}

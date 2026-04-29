import React, { useState } from 'react';
import { Habit } from '@/types/habit';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';
import ConfirmDeleteModal from '../shared/ConfirmDeleteModal';
import { storage } from '@/lib/storage';
import { toggleHabitCompletion } from '@/lib/habits';

interface HabitListProps {
  habits: Habit[];
  onOpenCreate: () => void;
  onUpdate: () => void;
}

export default function HabitList({ habits, onOpenCreate, onUpdate }: HabitListProps) {
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabitId, setDeletingHabitId] = useState<string | null>(null);

  const handleToggle = (habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedHabit = toggleHabitCompletion(habit, today);
    const existingHabits = storage.getHabits();
    const updatedHabits = existingHabits.map((h) => h.id === habit.id ? updatedHabit : h);
    storage.saveHabits(updatedHabits);
    onUpdate();
  };

  const handleDeleteClick = (habitId: string) => {
    setDeletingHabitId(habitId);
  };

  const handleConfirmDelete = () => {
    if (deletingHabitId) {
      const existingHabits = storage.getHabits();
      const updatedHabits = existingHabits.filter((h) => h.id !== deletingHabitId);
      storage.saveHabits(updatedHabits);
      setDeletingHabitId(null);
      onUpdate();
    }
  };

  const handleCancelDelete = () => {
    setDeletingHabitId(null);
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-16 bg-surface-container rounded-xl border border-white/5 shadow-sm">
        <p className="text-on-surface-variant mb-2 font-bold tracking-wide">No active habits found.</p>
        <button
          onClick={onOpenCreate}
          className="text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-sm transition-colors"
        >
          Create one to begin
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {editingHabit && (
        <HabitForm
          initialHabit={editingHabit}
          onSuccess={() => {
            setEditingHabit(null);
            onUpdate();
          }}
          onCancel={() => setEditingHabit(null)}
        />
      )}
      {deletingHabitId && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <ul className="space-y-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={handleToggle}
            onEdit={setEditingHabit}
            onDelete={handleDeleteClick}
          />
        ))}
      </ul>
    </div>
  );
}

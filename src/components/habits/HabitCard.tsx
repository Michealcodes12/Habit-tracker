import { Habit } from '@/types/habit';
import { calculateCurrentStreak } from '@/lib/streaks';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habit: Habit) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

export default function HabitCard({ habit, onToggle, onEdit, onDelete }: HabitCardProps) {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(today);
  const currentStreak = calculateCurrentStreak(habit.completions, today);

  // Pick a consistent color mapping based on length
  const containers = ['bg-secondary-container/20 text-secondary', 'bg-tertiary-container/20 text-tertiary', 'bg-primary-container/20 text-primary-container'];
  const icons = ['terminal', 'self_improvement', 'water_drop', 'star', 'bolt'];
  const styleIdx = habit.name.length % 3;
  const iconIdx = habit.name.length % icons.length;

  return (
    <li className="group relative overflow-hidden bg-surface-container rounded-xl transition-all duration-300 hover:translate-x-1 border border-white/5 shadow-sm">
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => onToggle(habit)}>
          <div className={`w-12 h-12 rounded-xl flex shrink-0 items-center justify-center ${containers[styleIdx]}`}>
            <span className="material-symbols-outlined text-2xl" data-icon={icons[iconIdx]}>{icons[iconIdx]}</span>
          </div>
          <div>
            <h4 className={`font-bold text-lg leading-tight ${isCompletedToday ? 'text-on-surface-variant/80 line-through' : 'text-on-surface'}`}>{habit.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-tertiary text-xs" data-icon="bolt" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{currentStreak} Day Streak</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 transition-opacity">
            <button
              onClick={() => onEdit(habit)}
              className="p-2 bg-surface-container-highest hover:bg-primary/20 text-on-surface-variant hover:text-primary rounded-xl transition-colors"
              aria-label="Edit habit"
            >
              <span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              className="p-2 bg-surface-container-highest hover:bg-error/20 text-on-surface-variant hover:text-error rounded-xl transition-colors"
              aria-label="Delete habit"
            >
              <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
            </button>
          </div>
          <button
            onClick={() => onToggle(habit)}
            className={`w-12 h-12 rounded-full border-2 flex shrink-0 items-center justify-center transition-all active:scale-90 ${isCompletedToday
              ? 'border-primary bg-primary text-on-primary'
              : 'border-outline-variant hover:border-primary/50 text-transparent hover:text-primary/50'
              }`}
            aria-label={isCompletedToday ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <span className="material-symbols-outlined text-2xl font-bold" data-icon="check">check</span>
          </button>
        </div>
      </div>
    </li>
  );
}

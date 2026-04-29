import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '@/lib/habits';
import { Habit } from '@/types/habit';

describe('toggleHabitCompletion', () => {
  const dummyHabit: Habit = {
    id: 'h1',
    userId: 'u1',
    name: 'Read',
    description: '',
    frequency: 'daily',
    createdAt: '2023-10-01',
    completions: ['2023-10-08']
  };

  it('adds a completion date when the date is not present', () => {
    const result = toggleHabitCompletion(dummyHabit, '2023-10-10');
    expect(result.completions).toContain('2023-10-10');
    expect(result.completions).toHaveLength(2);
  });

  it('removes a completion date when the date already exists', () => {
    const result = toggleHabitCompletion(dummyHabit, '2023-10-08');
    expect(result.completions).not.toContain('2023-10-08');
    expect(result.completions).toHaveLength(0);
  });

  it('does not mutate the original habit object', () => {
    const originalCompletions = [...dummyHabit.completions];
    toggleHabitCompletion(dummyHabit, '2023-10-10');
    expect(dummyHabit.completions).toEqual(originalCompletions);
  });

  it('does not return duplicate completion dates', () => {
    const habitWithDupes: Habit = { ...dummyHabit, completions: ['2023-10-10', '2023-10-10'] };
    const result = toggleHabitCompletion(habitWithDupes, '2023-10-09');
    expect(result.completions.filter(d => d === '2023-10-10')).toHaveLength(1);
  });
});

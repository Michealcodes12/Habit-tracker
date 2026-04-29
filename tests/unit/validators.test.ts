import { describe, it, expect } from 'vitest';
import { validateHabitName } from '@/lib/validators';

describe('validateHabitName', () => {
  it('returns an error when habit name is empty', () => {
    const result = validateHabitName('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('returns an error when habit name exceeds 60 characters', () => {
    const longName = 'a'.repeat(61);
    const result = validateHabitName(longName);
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('returns a trimmed value when habit name is valid', () => {
    const result = validateHabitName('  Good Habit  ');
    expect(result.valid).toBe(true);
    expect(result.value).toBe('Good Habit');
  });
});

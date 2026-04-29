import { describe, it, expect } from 'vitest';
import { getHabitSlug } from '@/lib/slug';

describe('getHabitSlug', () => {
  it('returns lowercase hyphenated slug for a basic habit name', () => {
    expect(getHabitSlug('Read Book')).toBe('read-book');
  });

  it('trims outer spaces and collapses repeated internal spaces', () => {
    expect(getHabitSlug('  Drink   Water  ')).toBe('drink-water');
  });

  it('removes non alphanumeric characters except hyphens', () => {
    expect(getHabitSlug('Code 24/7! (Yes)')).toBe('code-247-yes');
  });
});

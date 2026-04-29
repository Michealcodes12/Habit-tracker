export function calculateCurrentStreak(completions: string[], today?: string): number {
  if (!completions || completions.length === 0) return 0;

  const currentToday = today || new Date().toISOString().split('T')[0];

  // Remove duplicates and sort descending (newest first)
  const uniqueSorted = Array.from(new Set(completions)).sort((a, b) => b.localeCompare(a));

  if (!uniqueSorted.includes(currentToday)) return 0;

  let streak = 0;
  let currentCheckDate = currentToday;

  for (const date of uniqueSorted) {
    if (date > currentToday) continue;

    if (date === currentCheckDate) {
      streak++;
      // Calculate previous date
      const [year, month, day] = currentCheckDate.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      d.setDate(d.getDate() - 1);
      currentCheckDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    } else if (date < currentCheckDate) {
      // The streak is broken
      break;
    }
  }

  return streak;
}

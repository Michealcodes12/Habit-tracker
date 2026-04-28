import { User, Session } from '../types/auth';
import { Habit } from '../types/habit';

const USERS_KEY = 'habit-tracker-users';
const SESSION_KEY = 'habit-tracker-session';
const HABITS_KEY = 'habit-tracker-habits';

export const storage = {
  getUsers: (): User[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: User[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  },
  getSession: (): Session | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },
  saveSession: (session: Session | null) => {
    if (typeof window !== 'undefined') {
      if (session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  },
  getHabits: (): Habit[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveHabits: (habits: Habit[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    }
  }
};

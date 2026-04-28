"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { storage } from '@/lib/storage';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const users = storage.getUsers();
    if (users.some((u) => u.email === email)) {
      setError('User already exists');
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password, // Stored locally per requirements
      createdAt: new Date().toISOString(),
    };

    storage.saveUsers([...users, newUser]);
    storage.saveSession({ userId: newUser.id, email: newUser.email });

    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md">
      {/* Branding Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Create an account</h1>
        <p className="text-slate-400 mt-2">Start tracking your habits today</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-slate-800/50 p-8 rounded-2xl shadow-xl border border-slate-700/50 backdrop-blur-sm">
        {error && (
          <div className="text-rose-400 text-sm p-3 bg-rose-500/10 rounded-lg border border-rose-500/20 text-center">
            {error}
          </div>
        )}
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-email" className="text-sm font-medium text-slate-300">Email address</label>
          <input
            id="signup-email"
            type="email"
            data-testid="auth-signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition text-white placeholder-slate-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-password" className="text-sm font-medium text-slate-300">Password</label>
          <input
            id="signup-password"
            type="password"
            data-testid="auth-signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition text-white placeholder-slate-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          data-testid="auth-signup-submit"
          className="mt-2 p-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-500/25"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

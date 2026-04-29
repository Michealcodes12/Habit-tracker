"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { storage } from '@/lib/storage';

export default function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="glass-panel p-8 md:p-10 rounded-xl w-full max-w-md mx-auto relative z-10 shadow-2xl">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl font-extrabold font-sans text-on-surface">Create Account</h2>
        <p className="text-on-surface-variant text-base">Start your journey to mastery today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-error text-sm p-3 bg-error-container/20 rounded-lg border border-error/20 text-center font-bold">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all text-on-surface px-4 py-3 rounded-t-lg outline-none" 
              placeholder="Alex Sterling" 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all text-on-surface px-4 py-3 rounded-t-lg outline-none" 
              placeholder="alex@lumina.io" 
              type="email"
              data-testid="auth-signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all text-on-surface px-4 py-3 rounded-t-lg outline-none pr-12" 
              placeholder="••••••••••••" 
              type={showPassword ? 'text' : 'password'}
              data-testid="auth-signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary" 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 py-2">
          <div className="relative flex items-center">
            <input className="peer h-6 w-6 rounded-full border-2 border-outline-variant bg-transparent checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer appearance-none" id="terms" type="checkbox" required />
            <span className="material-symbols-outlined absolute text-on-primary pointer-events-none scale-0 peer-checked:scale-75 transition-transform left-0 right-0 text-center text-[18px]">check</span>
          </div>
          <label className="text-sm text-on-surface-variant cursor-pointer mt-0.5" htmlFor="terms">
            I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>
          </label>
        </div>

        <button 
          className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2" 
          type="submit"
          data-testid="auth-signup-submit"
        >
          <span>Create Account</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </form>

      <p className="text-center mt-8 text-on-surface-variant text-sm">
        Already have an account? <Link className="text-primary font-bold hover:underline" href="/login">Log in</Link>
      </p>
    </div>
  );
}

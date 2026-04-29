"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { storage } from '@/lib/storage';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = storage.getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    storage.saveSession({ userId: user.id, email: user.email });
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md relative z-10">
      {/* Welcome Header */}
      <div className="text-center mb-10">
        <h1 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-on-surface mb-2 font-sans">Welcome Back</h1>
        <p className="text-on-surface-variant text-base">Your ritual of discipline continues here.</p>
      </div>

      {/* Login Card */}
      <div className="glass-panel p-8 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-error text-sm p-3 bg-error-container/20 rounded-lg border border-error/20 text-center font-bold">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-on-surface-variant" htmlFor="login-email">Email Address</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
              <input
                id="login-email"
                type="email"
                data-testid="auth-login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface pl-12 py-3 rounded-t-lg transition-all placeholder:text-outline-variant outline-none"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-on-surface-variant" htmlFor="login-password">Password</label>
              <span className="text-xs text-primary hover:text-primary-container transition-colors cursor-pointer font-bold">Forgot Password?</span>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                data-testid="auth-login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface pl-12 pr-12 py-3 rounded-t-lg transition-all placeholder:text-outline-variant outline-none"
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-outline"
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          {/* Primary Action */}
          <button
            type="submit"
            data-testid="auth-login-submit"
            className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg shadow-lg shadow-primary/10 hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
          >
            Sign In
            <span className="material-symbols-outlined text-[20px]">login</span>
          </button>
        </form>
      </div>

      {/* Signup Redirect */}
      <div className="mt-8 text-center">
        <p className="text-on-surface-variant text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary font-bold hover:underline">
            Start your journey
          </Link>
        </p>
      </div>
    </div>
  );
}

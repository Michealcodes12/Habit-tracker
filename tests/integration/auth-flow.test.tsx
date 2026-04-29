import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from '@/components/auth/SignupForm';
import LoginForm from '@/components/auth/LoginForm';
import { storage } from '@/lib/storage';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('auth flow', () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
  });

  it('submits the signup form and creates a session', () => {
    render(<SignupForm />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    fireEvent.click(screen.getByTestId('auth-signup-submit'));

    expect(storage.getUsers()).toHaveLength(1);
    expect(storage.getSession()?.email).toBe('test@example.com');
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('shows an error for duplicate signup email', () => {
    storage.saveUsers([{ id: '1', email: 'test@example.com', password: 'password123', createdAt: new Date().toISOString() }]);

    render(<SignupForm />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    fireEvent.click(screen.getByTestId('auth-signup-submit'));

    expect(screen.getByText('User already exists')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('submits the login form and stores the active session', () => {
    storage.saveUsers([{ id: '1', email: 'test@example.com', password: 'password123', createdAt: new Date().toISOString() }]);

    render(<LoginForm />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-login-submit'));

    expect(storage.getSession()?.email).toBe('test@example.com');
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('shows an error for invalid login credentials', () => {
    storage.saveUsers([{ id: '1', email: 'test@example.com', password: 'password123', createdAt: new Date().toISOString() }]);

    render(<LoginForm />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByTestId('auth-login-submit'));

    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    expect(storage.getSession()).toBeNull();
    expect(mockPush).not.toHaveBeenCalled();
  });
});

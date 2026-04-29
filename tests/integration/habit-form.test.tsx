import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';
import { storage } from '@/lib/storage';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('habit form', () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
    storage.saveSession({ userId: 'user1', email: 'test@example.com' });
    storage.saveHabits([]);
  });

  it('shows a validation error when habit name is empty', async () => {
    render(<Dashboard />);
    
    fireEvent.click(screen.getByRole('button', { name: /new habit/i }));
    
    fireEvent.change(screen.getByTestId('habit-form-name'), { target: { value: '   ' } });
    fireEvent.click(screen.getByTestId('habit-form-submit'));
    
    expect(storage.getHabits()).toHaveLength(0);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('creates a new habit and renders it in the list', async () => {
    render(<Dashboard />);
    
    fireEvent.click(screen.getByRole('button', { name: /new habit/i }));
    fireEvent.change(screen.getByTestId('habit-form-name'), { target: { value: 'Drink Water' } });
    fireEvent.click(screen.getByTestId('habit-form-submit'));
    
    await waitFor(() => {
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Drink Water')).toBeInTheDocument();
    expect(storage.getHabits()).toHaveLength(1);
  });

  it('edits an existing habit and preserves immutable fields', async () => {
    storage.saveHabits([{
      id: 'h1',
      userId: 'user1',
      name: 'Old Name',
      description: 'Old Desc',
      frequency: 'daily',
      createdAt: '2023-01-01T00:00:00.000Z',
      completions: ['2023-01-02']
    }]);

    render(<Dashboard />);
    
    fireEvent.click(screen.getByText('edit'));
    
    fireEvent.change(screen.getByTestId('habit-form-name'), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByTestId('habit-form-submit'));
    
    await waitFor(() => {
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('New Name')).toBeInTheDocument();
    
    const habits = storage.getHabits();
    expect(habits[0].name).toBe('New Name');
    expect(habits[0].createdAt).toBe('2023-01-01T00:00:00.000Z');
    expect(habits[0].completions).toEqual(['2023-01-02']);
  });

  it('deletes a habit only after explicit confirmation', async () => {
    storage.saveHabits([{
      id: 'h1',
      userId: 'user1',
      name: 'To Delete',
      description: '',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: []
    }]);

    render(<Dashboard />);
    
    fireEvent.click(screen.getByText('delete'));
    
    expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText(/Are you sure you want to delete/i)).not.toBeInTheDocument();
    expect(storage.getHabits()).toHaveLength(1);
    
    fireEvent.click(screen.getByText('delete'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    
    await waitFor(() => {
      expect(screen.queryByText('To Delete')).not.toBeInTheDocument();
    });
    expect(storage.getHabits()).toHaveLength(0);
  });

  it('toggles completion and updates the streak display', async () => {
    storage.saveHabits([{
      id: 'h1',
      userId: 'user1',
      name: 'Daily Run',
      description: '',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: []
    }]);

    render(<Dashboard />);
    
    expect(screen.getAllByText('0 Day Streak').length).toBeGreaterThan(0);
    
    fireEvent.click(screen.getByLabelText('Mark as complete'));
    
    await waitFor(() => {
      expect(screen.getAllByText('1 Day Streak').length).toBeGreaterThan(0);
    });
    
    const habits = storage.getHabits();
    expect(habits[0].completions).toHaveLength(1);
  });
});

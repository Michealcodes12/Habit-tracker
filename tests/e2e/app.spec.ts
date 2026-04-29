import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await expect(page).toHaveURL(/\/login/, { timeout: 15000 });
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'test-user', email: 'test@example.com' }));
    });
    await page.goto('/');
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.getByPlaceholder('Alex Sterling').fill('John Doe');
    await page.getByTestId('auth-signup-email').fill('new@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByRole('checkbox').check();
    await page.getByTestId('auth-signup-submit').click();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-users', JSON.stringify([
        { id: 'user1', email: 'user1@example.com', password: 'password123', createdAt: new Date().toISOString() },
        { id: 'user2', email: 'user2@example.com', password: 'password123', createdAt: new Date().toISOString() }
      ]));
      window.localStorage.setItem('habit-tracker-habits', JSON.stringify([
        { id: 'h1', userId: 'user1', name: 'User 1 Habit', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] },
        { id: 'h2', userId: 'user2', name: 'User 2 Habit', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] }
      ]));
    });

    await page.goto('/login');
    await page.getByTestId('auth-login-email').fill('user1@example.com');
    await page.getByTestId('auth-login-password').fill('password123');
    await page.getByTestId('auth-login-submit').click();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText('User 1 Habit')).toBeVisible();
    await expect(page.getByText('User 2 Habit')).toBeHidden();
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'user1', email: 'user1@example.com' }));
    });
    
    await page.goto('/dashboard');
    await page.getByRole('button', { name: /New Habit/i }).click();
    await page.getByTestId('habit-form-name').fill('Drink Water');
    await page.getByTestId('habit-form-submit').click();
    await expect(page.getByText('Drink Water')).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'user1', email: 'user1@example.com' }));
      window.localStorage.setItem('habit-tracker-habits', JSON.stringify([
        { id: 'h1', userId: 'user1', name: 'Daily Walk', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] }
      ]));
    });

    await page.goto('/dashboard');
    await expect(page.getByText('0 Day Streak').first()).toBeVisible();
    await page.getByLabel('Mark as complete').click();
    await expect(page.getByText('1 Day Streak').first()).toBeVisible();
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'user1', email: 'user1@example.com' }));
      window.localStorage.setItem('habit-tracker-habits', JSON.stringify([
        { id: 'h1', userId: 'user1', name: 'Persistent Habit', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] }
      ]));
    });

    await page.goto('/dashboard');
    await expect(page.getByText('Persistent Habit')).toBeVisible();
    await page.reload();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText('Persistent Habit')).toBeVisible();
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'user1', email: 'user1@example.com' }));
    });

    await page.goto('/dashboard');
    await page.getByTestId('auth-logout-button').click();
    await expect(page).toHaveURL(/\/login/);
    const session = await page.evaluate(() => window.localStorage.getItem('habit-tracker-session'));
    expect(session).toBeNull();
  });

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto('/login');
    await expect(page.getByTestId('auth-login-submit')).toBeVisible();
    await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.ready;
      }
    });
    await context.setOffline(true);
    await page.reload();
    await expect(page.getByTestId('auth-login-submit')).toBeVisible();
  });
});

// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: true,
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}{ext}',
  retries: 0,
  workers: 4,
  timeout: 10000,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'BROWSER=false storybook dev -p 6006',
      url: 'http://localhost:6006',
    },
    {
      command: 'npm run dev',
      url: 'http://localhost:5173',
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

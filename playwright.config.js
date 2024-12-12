// @ts-check
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry'
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ]
})

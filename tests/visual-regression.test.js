// Ce test nécessite que le projet soit buildé et que Storybook soit en cours d'exécution pour fonctionner

import { test, expect } from '@playwright/test';
import { readdirSync } from 'fs';

// Petit hack car page.waitForSelector ne fonctionne pas avec Storybook
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const stories = await Promise.all(
  readdirSync('src/stories')
    .filter((file) => file.endsWith('.stories.js'))
    .map(async (file) => ({
      name: file.split('.')[0],
      paths: Object.keys(await import(`../src/stories/${file}`))
        .filter((x) => x !== 'default')
        .map((exported) => ({
          name: exported,
          url: `/?path=/story/stories-${file.split('.')[0].toLowerCase()}--${exported}`,
        })),
    })),
);

test.describe('Charts visual regression', () => {
  stories.forEach((story) => {
    story.paths.forEach((path) => {
      test(`${story.name} - ${path.name}`, async ({ page, browserName }) => {
        await page.goto(path.url);
        await page.setViewportSize({ width: 1920, height: 1080 });
        await sleep(3000);

        const graph = page.locator('#storybook-preview-iframe');

        const name = `${story.name.toLowerCase()}-${path.name.toLowerCase()}-${browserName}.png`;

        await expect(graph).toHaveScreenshot(name, {
          animations: 'disabled',
        });
      });
    });
  });
});

test.describe('Dev doc page visual regression', () => {
  test('Full page', async ({ page, browserName }) => {
    await page.goto('http://localhost:5173/');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await sleep(3000);

    const name = `dev-doc-full-page-${browserName}.png`;

    await expect(page).toHaveScreenshot(name, {
      animations: 'disabled',
      fullPage: true,
    });
  });
});

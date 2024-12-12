// This test require the project to be build and storybook running to work

import { test, expect} from '@playwright/test'
import { readdirSync } from 'fs'

const stories = await Promise.all(
  readdirSync('src/stories')
  .filter((file) => file.endsWith('.stories.js'))
  .map(async (file) => ({
    name: file.split('.')[0],
    paths: Object.keys(await import(`../src/stories/${file}`))
      .filter((x) => x !== 'default')
      .map((exported) => ({
        name: exported,
        url: `/?path=/story/stories-${file
          .split('.')[0]
          .toLowerCase()}--${exported}`
      }))
  }))
)

test.describe('Charts visual regression', () => {
  stories.forEach((story) => {
    story.paths.forEach((path) => {
      test(`${story.name} - ${path.name}`, async ({ page },testInfo ) => {
        await page.goto(path.url)
        await page.setViewportSize({ width: 1920, height: 1080 })
        // await page.waitForSelector('#storybook-root')

        const graph = await page.locator('#storybook-preview-iframe')

        await expect(graph).toHaveScreenshot(
          `${story.name.toLowerCase()}-${path.name.toLowerCase()}-${testInfo.snapshotSuffix}.png`,
          {
            animations: 'disabled'
          }
        )
      })
    })
  })
})

test.describe('Dev doc page visual regression', () => {
  test('Full page', async ({ page }, testInfo) => {
    await page.goto('http://localhost:5173/')
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page).toHaveScreenshot(
      `dev-doc-full-page-${testInfo.snapshotSuffix}.png`,
      {
        animations: 'disabled',
        fullPage: true
      }
    )
  })
})

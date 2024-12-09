// This test require the project to be build and storybook running to work

const { test, expect } = require('@playwright/test')
const { readdirSync } = require('fs')
const { describe } = require('node:test')

const stories = readdirSync('src/stories')
  .filter((file) => file.endsWith('.stories.js'))
  .map((file) => ({
    name: file.split('.')[0],
    paths: Object.keys(require(`../src/stories/${file}`))
      .filter((x) => x !== 'default')
      .map((exported) => ({
        name: exported,
        url: `/?path=/story/stories-${file
          .split('.')[0]
          .toLowerCase()}--${exported}`
      }))
  }))

describe('Charts visual regression', () => {
  stories.forEach((story) => {
    story.paths.forEach((path) => {
      test(`${story.name} - ${path.name}`, async ({ page }) => {
        await page.goto(path.url)
        await page.setViewportSize({ width: 1920, height: 1080 })
        // await page.waitForSelector('#storybook-root')

        const graph = await page.locator('#storybook-preview-iframe')

        await expect(graph).toHaveScreenshot(
          `${story.name.toLowerCase()}-${path.name.toLowerCase()}-${process.platform}.png`,
          {
            animations: 'disabled'
          }
        )
      })
    })
  })
})

describe('Dev doc page visual regression', () => {
  test('Full page', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page).toHaveScreenshot(
      `dev-doc-full-page-${process.platform}.png`,
      {
        animations: 'disabled',
        fullPage: true
      }
    )
  })
})

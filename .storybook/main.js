/** @type { import('@storybook/web-components-vite').StorybookConfig } */
export default {
  stories: ['../src/**/*.stories.js'],
  framework: {
    name: '@storybook/web-components-vite',
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
};

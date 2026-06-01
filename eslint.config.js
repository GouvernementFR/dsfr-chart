import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginStorybook from 'eslint-plugin-storybook';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
    },
  },

  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        defineModel: 'readonly',
      },
    },
    rules: {
      'vue/no-v-html': 'off',
    },
  },

  ...pluginStorybook.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ignores: ['!.storybook'],
  },

  skipFormatting,
];

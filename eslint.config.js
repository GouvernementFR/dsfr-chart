export default {
  env: {
    node: true,
    es2022: true
  },
  extends: ['plugin:vue/essential', 'standard', 'plugin:storybook/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}

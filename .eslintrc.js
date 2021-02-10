module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    jest: true
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],

  globals: {
    _: true
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  // add your custom rules here
  rules: {
    "no-extra-boolean-cast": 0,
    "no-debugger": 0,
    "object-curly-spacing": ["error", "always"],
    "quotes": [
      "error",
      "double"
    ]
  },

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    },
  ],

  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript'
  ]
};

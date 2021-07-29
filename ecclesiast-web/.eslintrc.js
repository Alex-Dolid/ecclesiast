module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    jest: true
  },

  extends: [
    "plugin:vue/vue3-essential",
    "@vue/typescript",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
  ],

  globals: {
    _: true
  },

  parser: "vue-eslint-parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },

  plugins: ["@typescript-eslint"],

  // add your custom rules here
  rules: {
    "no-unused-vars": 1,
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
};

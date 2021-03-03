module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: 0,
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/jsx-one-expression-per-line": 0,
    "linebreak-style": 0,
    "no-console": 0,
    "no-use-before-define": 0,
    "react/prop-types": 0,
    "object-curly-newline": 0,
    "react/react-in-jsx-scope": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-unused-vars": 0,
    "react/require-default-props": 0,
    "comma-dangle": 0,
    radix: 0,
    indent: 0,
    "arrow-body-style": 0,

    "import/prefer-default-export": 0,
    "operator-linebreak": 0,
    "prefer-destructuring": 0,
  },
};

module.exports = {
  extends: ["expo", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["/dist/*"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".jsx", ".js", ".tsx", ".ts"] },
    ],
    "@typescript-eslint/no-unsafe-function-type": "error",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-empty-object-type": "error",
  },
};

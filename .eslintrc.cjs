module.exports = {
  root: true,
  extends: ['./packages/eslint-config/index.js'],
  parserOptions: {
    project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json', './services/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};

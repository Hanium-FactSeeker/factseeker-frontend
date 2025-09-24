// commitlint.config.cjs
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['Feat', 'Fix', 'Refactor', 'Style', 'Test', 'Chore', 'Docs'],
    ],
    'type-case': [2, 'always', 'pascal-case'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
  },
};

module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['import', 'unused-imports'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        'unused-imports/no-unused-imports-ts': 'error',
        'import/order': [
          'error',
          {
            groups: ['external', 'builtin', 'internal', 'parent', 'sibling'],
            pathGroups: [
              {
                pattern: 'react+(|-native)',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '@+(routes|screens|components|hooks|theme)',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: './',
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react+(|-native)'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            'newlines-between': 'always',
          },
        ],
      },
    },
  ],
};

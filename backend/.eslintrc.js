module.exports = {
  root: true, // This prevents inheritance from parent configs
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'commonjs',
  },
  rules: {
    // Disable TypeScript-specific rules since this is a JavaScript project
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    
    // Disable React rules since this is a Node.js backend
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
    
    // Disable some strict rules for backend development
    'no-console': 'off',
    'no-process-exit': 'off',
    'consistent-return': 'off',
    'require-await': 'off',
    'prefer-const': 'warn',
    'no-unused-vars': ['error', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'caughtErrorsIgnorePattern': '^_'
    }],
    'curly': ['error', 'all'],
    'eqeqeq': 'error',
    'no-var': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'array-callback-return': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-wrappers': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-return-assign': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'prefer-promise-reject-errors': 'error',
    'yoda': 'error'
  },
  ignorePatterns: [
    'node_modules/**/*',
    'dist/**/*',
    'build/**/*',
    'coverage/**/*',
    '*.min.js'
  ]
}; 
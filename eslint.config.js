/**
 * ESLint 配置檔案 (v9 格式)
 * 基於 Context7 最新最佳實踐優化
 *
 * @author: @haotool
 * @version: 1.0.0
 * @created: 2025-01-27T15:45:00+08:00
 */

import js from '@eslint/js';
import globals from 'globals';

export default [
  // Global ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'team-worktrees/**',
      'history/**', // 忽略歷史檔案目錄
      '*.min.js',
      '*.bundle.js',
      'app.js', // JSON-LD 結構化數據，非 JavaScript 代碼
      'jest.setup.js', // 測試設置檔案，包含特殊模擬代碼
    ],
  },

  // Global language options and globals
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: 'warn',
    },
  },

  // JavaScript/JSX file configuration
  {
    files: ['**/*.js', '**/*.jsx'],
    ...js.configs.recommended,
    rules: {
      // 程式碼品質規則
      // 允許部分 console 方法，禁止其他方法
      'no-console': ['warn', { 'allow': ['warn', 'error', 'info'] }], // 開發工具中允許 console
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-undef': 'error',

      // 格式規則
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',

      // 最佳實踐
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',

      // 錯誤防護
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
    },
  },

  // Test file configuration overrides
  {
    files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js', 'dev-tools/jest.setup.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.mocha,
        ...globals.jasmine,
        page: 'readonly',
        browser: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // 測試檔案中允許 console
      'no-undef': 'off', // 測試環境變數由 globals 提供
    },
  },

  // Config file configuration overrides
  {
    files: ['*.config.js', '*.config.mjs', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off', // 配置檔案中允許 console
    },
  },

  // Development tools configuration
  {
    files: ['dev-tools/**/*.js', 'scripts/**/*.js'],
    rules: {
      'no-console': 'off', // 開發工具中允許 console
      'no-unused-vars': 'warn', // 開發工具中放寬未使用變數檢查
    },
  },
];

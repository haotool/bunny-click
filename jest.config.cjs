/**
 * Jest 配置文件 - Bunny Click 主專案
 * 基於 Context7 最佳實踐配置修復 Haste 模組衝突與 ES6 模組問題
 * [context7:/jestjs/jest:2025-08-20T01:33:46+08:00]
 * 版本: 2025.8.20
 */

/** @type {import('jest').Config} */
const config = {
  // 測試環境配置
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // 解決 Haste 模組命名衝突 (history/ 目錄有重複 package.json)
  modulePathIgnorePatterns: [
    '<rootDir>/history/',
    '<rootDir>/dev-tools/',
    '<rootDir>/team-worktrees/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
  ],

  // 模組名稱映射 - 修復 ES6 import 問題
  moduleNameMapper: {
    // 處理相對路徑 ES6 模組
    '^../storage/adapter.js$': '<rootDir>/storage/adapter.js',
    '^../storage/(.*)$': '<rootDir>/storage/$1',
    // 處理樣式檔案
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // 處理圖片與靜態資源
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },

  // 變換配置 - ES6 模組支援
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // 測試匹配模式
  testMatch: ['<rootDir>/tests/**/*.test.js', '<rootDir>/scripts/**/*.test.js'],

  // 忽略測試路徑
  testPathIgnorePatterns: [
    '/node_modules/',
    '/history/',
    '/dev-tools/',
    '/team-worktrees/',
    '/dist/',
    '.*\\.e2e\\.test\\.js$',
  ],

  // 覆蓋率配置
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    '<rootDir>/app.js',
    '<rootDir>/storage/**/*.js',
    '<rootDir>/scripts/**/*.js',
    '!<rootDir>/scripts/**/*.test.js',
    '!<rootDir>/tests/**/*',
    '!<rootDir>/dev-tools/**/*',
    '!<rootDir>/history/**/*',
    '!<rootDir>/team-worktrees/**/*',
    '!<rootDir>/*.config.js',
  ],

  // 模組文件擴展名
  moduleFileExtensions: ['js', 'json', 'jsx'],

  // 模組目錄
  moduleDirectories: ['node_modules'],

  // 測試超時
  testTimeout: 10000,

  // 快取設定
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',

  // 並行執行
  maxWorkers: '50%',

  // 錯誤處理
  errorOnDeprecated: false,

  // 覆蓋率門檻 (根據 .cursor/rules/quality.mdc 標準)
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 80,
      statements: 85,
    },
    // 核心模組更嚴格要求
    './app.js': {
      branches: 80,
      functions: 95,
      lines: 85,
      statements: 90,
    },
    './storage/': {
      branches: 75,
      functions: 90,
      lines: 80,
      statements: 85,
    },
  },

  // Jest 全域變數
  globals: {
    NODE_ENV: 'test',
  },
};

module.exports = config;

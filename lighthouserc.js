/**
 * Lighthouse CI 配置檔案
 * 基於 .cursor/rules/quality.mdc 與 PWA 最佳實踐
 * 建立時間: 2025-08-26T23:10:06+08:00 [time.now:Asia/Taipei]
 * 負責人: haotool
 */

module.exports = {
  ci: {
    // 收集設定
    collect: {
      // 測試 URL
      url: ['http://localhost:8080/'],

      // 收集次數 (取最佳結果)
      numberOfRuns: 3,

      // 預設配置
      settings: {
        // 使用桌面模式測試
        preset: 'desktop',

        // 關閉 Chrome 擴展
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-extensions',

        // 僅收集關鍵類別
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],

        // 跳過某些稽核以加速
        skipAudits: ['uses-http2', 'uses-long-cache-ttl', 'uses-text-compression'],
      },
    },

    // 上傳設定 (暫時關閉)
    upload: {
      target: 'temporary-public-storage',
    },

    // 品質門檻設定 (根據 .cursor/rules/quality.mdc)
    assert: {
      assertions: {
        // 效能要求
        'categories:performance': ['error', { minScore: 0.9 }],

        // PWA 要求
        'categories:pwa': ['error', { minScore: 0.9 }],

        // 可存取性要求 (WCAG 2.1 AA)
        'categories:accessibility': ['error', { minScore: 0.9 }],

        // 最佳實踐
        'categories:best-practices': ['error', { minScore: 0.9 }],

        // SEO 基本要求
        'categories:seo': ['error', { minScore: 0.85 }],

        // Core Web Vitals 門檻
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-input-delay': ['error', { maxNumericValue: 100 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'time-to-interactive': ['error', { maxNumericValue: 3800 }],

        // PWA 特定要求
        'service-worker': 'error',
        'installable-manifest': 'error',
        'apple-touch-icon': 'error',
        'themed-omnibox': 'error',
        viewport: 'error',

        // 資源優化
        'unused-javascript': ['warn', { maxNumericValue: 20000 }],
        'unused-css-rules': ['warn', { maxNumericValue: 10000 }],
        'modern-image-formats': 'warn',
        'efficient-animated-content': 'warn',
      },
    },

    // 伺服器設定
    server: {
      port: 8080,

      // 靜態檔案服務
      command: 'npm run preview',
    },
  },
};

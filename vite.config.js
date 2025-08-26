/**
 * Vite 配置文件 - Bunny Click PWA 專案
 * 基於 Context7 最佳實踐的現代化 PWA 配置
 * [context7:vite-pwa/vite-plugin-pwa:2025-08-26T23:10:06+08:00]
 * [context7:vitejs/vite:2025-08-26T23:10:06+08:00]
 * 版本: 2025.8.26
 */

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // 建置配置 (整合配置)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './src/index.html',
      },
      output: {
        // 檔案命名策略 - 優化快取
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|ico)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(woff2|woff|ttf)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // 壓縮選項
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // 開發階段保留 console
        drop_debugger: true,
      },
    },
    // 資源內聯閾值
    assetsInlineLimit: 4096,
  },

  plugins: [
    VitePWA({
      // 註冊類型：自動更新 (Context7 最新推薦)
      registerType: 'autoUpdate',

      // 包含額外資產 (Context7 最佳實踐)
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],

      // 開發選項 (支援開發階段測試)
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallbackAllowlist: [/^index\.html$/],
      },

      // Web App Manifest 配置 (基於專案品牌色彩)
      manifest: {
        name: 'Bunny Click - 點擊樂趣遊戲',
        short_name: 'BunnyClick',
        description: '現代化的 PWA 點擊遊戲，展示 Web 技術極限的炫酷特效與音效體驗',
        theme_color: '#f66fb9',
        background_color: '#ffffff',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['games', 'entertainment'],
        lang: 'zh-TW',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },

      // Workbox 配置 - 基於 Context7 最新最佳實踐
      workbox: {
        // 強制自動更新行為
        clientsClaim: true,
        skipWaiting: true,

        // 預快取檔案模式 - 包含所有必要資源
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webmanifest,woff2}',
          'icons/**/*.{png,svg,ico}',
          'assets/fonts/**/*.{woff2,woff,ttf}',
        ],

        // 排除特定檔案
        globIgnores: ['**/sw*', '**/workbox-*', '**/lighthouse-*'],

        // 最大檔案大小限制 (3MB)
        maximumFileSizeToCacheInBytes: 3000000,

        // 導航回退處理
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],

        // 運行時快取策略 - 基於 Context7 最佳實踐
        runtimeCaching: [
          // Google Fonts 快取策略 - 1年快取
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 天
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 天
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // 頁面導航快取策略 - Network First
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 週
              },
            },
          },

          // 圖片資源快取策略 - Cache First，30天
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 天
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // JS/CSS 檔案快取 - Stale While Revalidate，1週
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 週
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // Web Worker 檔案快取
          {
            urlPattern: /\.worker\.js$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'worker-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 週
              },
            },
          },
        ],
      },
    }),
  ],

  // 靜態資源處理
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.png', '**/*.svg', '**/*.ico'],

  // 預覽伺服器配置
  preview: {
    port: 8080,
    host: true,
  },

  // 開發伺服器配置 (Context7 效能最佳實踐)
  server: {
    port: 8000,
    host: true,
    // 檔案預熱，提升開發體驗
    warmup: {
      clientFiles: ['./src/index.html', './src/main.js', './src/styles/main.css'],
    },
  },

  // 依賴預建置優化
  optimizeDeps: {
    include: ['workbox-core', 'workbox-precaching', 'workbox-routing', 'workbox-strategies'],
  },
});

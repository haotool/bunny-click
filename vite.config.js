/**
 * Vite 配置文件 - Bunny Click PWA 專案
 * 基於 Context7 最佳實踐的現代化 PWA 配置
 * [context7:vite-pwa/vite-plugin-pwa:2025-08-16T20:52:00+08:00]
 * 版本: 2025.8.16
 */

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      // 註冊類型：提示用戶更新 (基於 Context7 最佳實踐)
      registerType: 'prompt',

      // 開發選項
      devOptions: {
        enabled: true,
      },

      // Web App Manifest 配置
      manifest: {
        name: 'Bunny Click - 點擊樂趣遊戲',
        short_name: 'Bunny Click',
        description: '一個有趣的點擊遊戲，測試您的 TPS (每秒點擊次數) 並享受炫酷特效',
        theme_color: '#ff69b4',
        background_color: '#87ceeb',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
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

      // Workbox 配置 - 基於 Context7 最佳實踐
      workbox: {
        // 預快取檔案模式 - 包含所有必要資源
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webmanifest,woff2}',
          'icons/**/*.{png,svg,ico}',
          'fonts/**/*.{woff2,woff,ttf}'
        ],

        // 排除特定檔案
        globIgnores: ['**/sw*', '**/workbox-*', '**/lighthouse-*'],

        // 最大檔案大小限制 (3MB)
        maximumFileSizeToCacheInBytes: 3000000,

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

  // 建置配置
  build: {
    // 產物目錄
    outDir: 'dist',

    // 最佳化選項
    rollupOptions: {
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
        drop_console: true,
        drop_debugger: true,
      },
    },

    // 資源內聯閾值
    assetsInlineLimit: 4096,
  },

  // 公共目錄資源複製
  publicDir: 'public',

  // 靜態資源處理
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.png', '**/*.svg', '**/*.ico'],

  // 預覽伺服器配置
  preview: {
    port: 8080,
    host: true,
  },

  // 開發伺服器配置
  server: {
    port: 8000,
    host: true,
    open: true,
  },
});

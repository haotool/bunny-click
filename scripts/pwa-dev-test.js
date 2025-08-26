#!/usr/bin/env node

/**
 * PWA 開發階段測試腳本
 * 基於 vite-plugin-pwa 最佳實踐，支援 Service Worker 開發測試
 * 建立時間: 2025-08-26T23:10:06+08:00 [time.now:Asia/Taipei]
 * 負責人: haotool
 */

import { createServer } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import chalk from 'chalk';
import open from 'open';

class PWADevTester {
  constructor() {
    this.server = null;
    this.port = 8000;
  }

  // 啟動開發伺服器並測試 PWA 功能
  async startDevServer() {
    console.log(chalk.blue.bold('🚀 啟動 PWA 開發測試伺服器...\n'));

    try {
      // 建立 Vite 開發伺服器
      this.server = await createServer({
        plugins: [
          VitePWA({
            registerType: 'autoUpdate',

            // 開發選項 - 啟用 Service Worker 測試
            devOptions: {
              enabled: true,
              type: 'module',
              navigateFallbackAllowlist: [/^index\.html$/],
            },

            // 測試用 manifest
            manifest: {
              name: 'Bunny Click - Dev Test',
              short_name: 'BunnyClick Dev',
              description: '開發階段 PWA 功能測試',
              theme_color: '#f66fb9',
              background_color: '#ffffff',
              display: 'standalone',
              start_url: '/',
              scope: '/',
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
              ],
            },

            // 工作箱配置
            workbox: {
              clientsClaim: true,
              skipWaiting: true,
              globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
          }),
        ],

        server: {
          port: this.port,
          host: true,
          // 檔案預熱
          warmup: {
            clientFiles: ['./index.html', './styles.css', './app.js', './fx.worker.js'],
          },
        },
      });

      await this.server.listen();

      const url = `http://localhost:${this.port}`;
      console.log(chalk.green('✅ PWA 開發伺服器已啟動'));
      console.log(chalk.cyan(`🌐 本地 URL: ${url}`));
      console.log(chalk.cyan(`📱 網路 URL: http://[your-ip]:${this.port}`));
      console.log('');

      // 顯示 PWA 測試指南
      this.displayPWATestGuide(url);

      // 自動開啟瀏覽器
      await this.openBrowser(url);

      // 監聽退出信號
      this.setupGracefulShutdown();
    } catch (error) {
      console.error(chalk.red('❌ 啟動開發伺服器失敗:'), error.message);
      process.exit(1);
    }
  }

  // 顯示 PWA 測試指南
  displayPWATestGuide(url) {
    console.log(chalk.yellow.bold('📋 PWA 功能測試清單:\n'));

    const testItems = [
      {
        emoji: '🔧',
        title: 'Service Worker 註冊',
        desc: '打開開發者工具 > Application > Service Workers',
        action: '確認 Service Worker 已註冊並處於 activated 狀態',
      },
      {
        emoji: '📱',
        title: 'Web App Manifest',
        desc: '開發者工具 > Application > Manifest',
        action: '檢查 manifest 資訊完整且圖標顯示正確',
      },
      {
        emoji: '💾',
        title: '快取策略',
        desc: '開發者工具 > Application > Storage',
        action: '確認 Cache Storage 包含預期的快取資源',
      },
      {
        emoji: '🔄',
        title: '自動更新測試',
        desc: '修改程式碼並儲存',
        action: '觀察瀏覽器是否自動重新載入',
      },
      {
        emoji: '📶',
        title: '離線功能',
        desc: '開發者工具 > Network > Offline',
        action: '啟用離線模式，確認應用程式仍可運作',
      },
      {
        emoji: '🎯',
        title: '安裝提示',
        desc: '在支援的瀏覽器中',
        action: '檢查是否出現「新增至主畫面」提示',
      },
    ];

    testItems.forEach((item, index) => {
      console.log(chalk.white(`${index + 1}. ${item.emoji} ${chalk.bold(item.title)}`));
      console.log(chalk.gray(`   📍 ${item.desc}`));
      console.log(chalk.green(`   ✅ ${item.action}`));
      console.log('');
    });

    console.log(chalk.blue.bold('🔗 實用連結:\n'));
    console.log(chalk.cyan(`   PWA 應用程式: ${url}`));
    console.log(chalk.cyan(`   Service Worker: ${url}/dev-sw.js?dev-sw`));
    console.log(chalk.cyan(`   Manifest: ${url}/manifest.webmanifest`));
    console.log('');
  }

  // 自動開啟瀏覽器
  async openBrowser(url) {
    try {
      console.log(chalk.yellow('🌐 正在開啟瀏覽器...'));
      await open(url);
    } catch (error) {
      console.log(chalk.yellow('ℹ️ 無法自動開啟瀏覽器，請手動訪問上述 URL'));
    }
  }

  // 設置優雅關閉
  setupGracefulShutdown() {
    const shutdown = async () => {
      console.log(chalk.yellow('\n🔄 正在關閉伺服器...'));

      if (this.server) {
        await this.server.close();
        console.log(chalk.green('✅ 伺服器已關閉'));
      }

      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }

  // PWA 功能驗證
  async validatePWAFeatures() {
    console.log(chalk.blue.bold('\n🔍 驗證 PWA 功能...\n'));

    const checks = [
      {
        name: 'Manifest 檔案',
        test: () => this.checkManifest(),
      },
      {
        name: 'Service Worker',
        test: () => this.checkServiceWorker(),
      },
      {
        name: '圖標檔案',
        test: () => this.checkIcons(),
      },
    ];

    for (const check of checks) {
      try {
        const result = await check.test();
        if (result) {
          console.log(chalk.green(`✅ ${check.name} 檢查通過`));
        } else {
          console.log(chalk.red(`❌ ${check.name} 檢查失敗`));
        }
      } catch (error) {
        console.log(chalk.red(`❌ ${check.name} 檢查錯誤: ${error.message}`));
      }
    }
  }

  // 檢查 Manifest 檔案
  async checkManifest() {
    const fs = await import('fs');
    const manifestExists =
      fs.existsSync('./dist/manifest.webmanifest') || fs.existsSync('./app.webmanifest');
    return manifestExists;
  }

  // 檢查 Service Worker
  async checkServiceWorker() {
    const fs = await import('fs');
    const swExists = fs.existsSync('./dist/sw.js') || fs.existsSync('./sw.js');
    return swExists;
  }

  // 檢查圖標檔案
  async checkIcons() {
    const fs = await import('fs');
    const iconsExist =
      fs.existsSync('./icons/icon-192x192.png') && fs.existsSync('./icons/icon-512x512.png');
    return iconsExist;
  }
}

// 執行 PWA 開發測試
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new PWADevTester();

  const command = process.argv[2];

  switch (command) {
    case 'validate':
      tester.validatePWAFeatures();
      break;
    case 'start':
    default:
      tester.startDevServer();
      break;
  }
}

export default PWADevTester;

/**
 * ServiceWorkerManager - Service Worker 管理器
 * 負責 Service Worker 的註冊、更新和管理
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

export class ServiceWorkerManager {
  constructor() {
    this.registration = null;
    this.isRegistered = false;
    this.isUpdateAvailable = false;
    this.isInitialized = false;
  }

  /**
   * 初始化 Service Worker 管理器
   */
  async init() {
    console.log('⚙️ 初始化 Service Worker 管理器...');

    try {
      // 檢查瀏覽器支援
      if (!this.isServiceWorkerSupported()) {
        console.warn('⚠️ 瀏覽器不支援 Service Worker');
        return;
      }

      // 註冊 Service Worker
      await this.registerServiceWorker();

      // 設定更新檢查
      this.setupUpdateHandler();

      // 設定定期更新檢查
      this.setupPeriodicUpdateCheck();

      this.isInitialized = true;
      console.log('✅ Service Worker 管理器初始化完成');

    } catch (error) {
      console.error('❌ Service Worker 管理器初始化失敗:', error);
    }
  }

  /**
   * 註冊 Service Worker
   */
  async registerServiceWorker() {
    try {
      // 使用 Vite PWA 插件生成的 Service Worker
      const swUrl = '/sw.js';

      this.registration = await navigator.serviceWorker.register(swUrl);
      this.isRegistered = true;

      console.log('✅ Service Worker 註冊成功:', this.registration.scope);

      // 監聽註冊事件
      this.registration.addEventListener('updatefound', () => {
        console.log('🔄 發現 Service Worker 更新');
        this.handleUpdate();
      });

    } catch (error) {
      console.error('❌ Service Worker 註冊失敗:', error);
      throw error;
    }
  }

  /**
   * 設定更新處理器
   */
  setupUpdateHandler() {
    if (!this.registration) {return;}

    // 監聽 Service Worker 狀態變化
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 Service Worker 控制器已更改');
      this.onControllerChange();
    });

    // 監聽來自 Service Worker 的消息
    navigator.serviceWorker.addEventListener('message', (event) => {
      this.handleServiceWorkerMessage(event);
    });
  }

  /**
   * 處理 Service Worker 更新
   */
  handleUpdate() {
    const newWorker = this.registration.installing;

    if (!newWorker) {return;}

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          // 有新版本可用
          console.log('📦 新版本可用');
          this.isUpdateAvailable = true;
          this.showUpdateNotification();
        } else {
          // Service Worker 首次安裝
          console.log('✅ Service Worker 首次安裝完成');
          this.showInstallNotification();
        }
      }
    });
  }

  /**
   * 控制器變更處理
   */
  onControllerChange() {
    if (this.isUpdateAvailable) {
      // 重新載入頁面以套用更新
      window.location.reload();
    }
  }

  /**
   * 處理來自 Service Worker 的消息
   */
  handleServiceWorkerMessage(event) {
    const { type, payload } = event.data;

    switch (type) {
      case 'SKIP_WAITING':
        this.skipWaiting();
        break;

      case 'CACHE_UPDATED':
        console.log('📦 快取已更新:', payload);
        break;

      case 'OFFLINE_READY':
        console.log('📴 離線模式準備就緒');
        this.showOfflineReadyNotification();
        break;

      default:
        console.log('📨 收到 Service Worker 消息:', event.data);
    }
  }

  /**
   * 跳過等待並立即激活新的 Service Worker
   */
  async skipWaiting() {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  /**
   * 檢查更新
   */
  async checkForUpdates() {
    if (!this.registration) {return;}

    try {
      console.log('🔍 檢查 Service Worker 更新...');
      await this.registration.update();
      console.log('✅ Service Worker 更新檢查完成');

    } catch (error) {
      console.error('❌ Service Worker 更新檢查失敗:', error);
    }
  }

  /**
   * 設定定期更新檢查
   */
  setupPeriodicUpdateCheck() {
    // 每30分鐘檢查一次更新
    setInterval(() => {
      this.checkForUpdates();
    }, 30 * 60 * 1000);

    // 頁面可見性變化時檢查更新
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
  }

  /**
   * 顯示更新通知
   */
  showUpdateNotification() {
    this.showNotification('🔄 新版本可用！', '點擊重新載入以更新應用程式', () => {
      this.applyUpdate();
    });
  }

  /**
   * 顯示安裝通知
   */
  showInstallNotification() {
    this.showNotification('✅ 應用程式已安裝！', '現在可以離線使用', null, 3000);
  }

  /**
   * 顯示離線就緒通知
   */
  showOfflineReadyNotification() {
    this.showNotification('📴 離線模式已就緒！', '應用程式可以在沒有網路連線時使用', null, 3000);
  }

  /**
   * 顯示通知
   */
  showNotification(title, message, action = null, duration = 5000) {
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = 'sw-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        <div class="notification-actions">
          ${action ? '<button class="action-btn">更新</button>' : ''}
          <button class="close-btn">×</button>
        </div>
      </div>
    `;

    // 添加樣式
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
      zIndex: '2000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      fontFamily: 'inherit',
    });

    document.body.appendChild(notification);

    // 綁定事件
    if (action) {
      const actionBtn = notification.querySelector('.action-btn');
      actionBtn.addEventListener('click', () => {
        action();
        this.removeNotification(notification);
      });
    }

    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      this.removeNotification(notification);
    });

    // 顯示動畫
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // 自動移除（如果有設定時間）
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, duration);
    }
  }

  /**
   * 移除通知
   */
  removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  /**
   * 套用更新
   */
  async applyUpdate() {
    if (this.isUpdateAvailable) {
      await this.skipWaiting();
    }
  }

  /**
   * 檢查瀏覽器支援
   */
  isServiceWorkerSupported() {
    return 'serviceWorker' in navigator;
  }

  /**
   * 取消註冊 Service Worker
   */
  async unregister() {
    if (this.registration) {
      try {
        await this.registration.unregister();
        console.log('✅ Service Worker 取消註冊成功');
        this.isRegistered = false;
        this.registration = null;

      } catch (error) {
        console.error('❌ Service Worker 取消註冊失敗:', error);
      }
    }
  }

  /**
   * 獲取註冊狀態
   */
  getStatus() {
    return {
      isSupported: this.isServiceWorkerSupported(),
      isRegistered: this.isRegistered,
      isUpdateAvailable: this.isUpdateAvailable,
      scope: this.registration?.scope || null,
    };
  }

  /**
   * 銷毀管理器
   */
  destroy() {
    console.log('🔥 銷毀 Service Worker 管理器');

    this.registration = null;
    this.isRegistered = false;
    this.isUpdateAvailable = false;
    this.isInitialized = false;
  }
}

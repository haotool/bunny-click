/**
 * PWAInstaller - PWA 安裝管理器
 * 負責處理 PWA 安裝提示和安裝流程
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

export class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.installBanner = null;
    this.installBtn = null;
    this.closeBtn = null;
    this.isInstallable = false;
    this.isInitialized = false;
  }

  /**
   * 初始化 PWA 安裝器
   */
  async init() {
    console.log('📱 初始化 PWA 安裝器...');

    try {
      this.setupEventListeners();
      this.setupInstallBanner();
      this.checkInstallability();

      this.isInitialized = true;
      console.log('✅ PWA 安裝器初始化完成');

    } catch (error) {
      console.error('❌ PWA 安裝器初始化失敗:', error);
    }
  }

  /**
   * 設定事件監聽器
   */
  setupEventListeners() {
    // 監聽 beforeinstallprompt 事件
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('💾 PWA 可安裝');

      // 防止瀏覽器預設的安裝提示
      event.preventDefault();

      // 儲存事件供稍後使用
      this.deferredPrompt = event;
      this.isInstallable = true;

      // 顯示自定義安裝橫幅
      this.showInstallBanner();
    });

    // 監聽 appinstalled 事件
    window.addEventListener('appinstalled', (event) => {
      console.log('✅ PWA 安裝完成');

      // 隱藏安裝橫幅
      this.hideInstallBanner();

      // 清除 deferredPrompt
      this.deferredPrompt = null;
      this.isInstallable = false;

      // 顯示安裝成功訊息
      this.showInstallSuccessMessage();
    });

    // 監聽 PWA 啟動方式
    window.addEventListener('load', () => {
      this.detectLaunchMode();
    });
  }

  /**
   * 設定安裝橫幅
   */
  setupInstallBanner() {
    this.installBanner = document.getElementById('pwa-install-banner');
    this.installBtn = document.getElementById('pwa-install-btn');
    this.closeBtn = document.getElementById('pwa-close-btn');

    if (this.installBtn) {
      this.installBtn.addEventListener('click', () => {
        this.handleInstallClick();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.hideInstallBanner();
      });
    }
  }

  /**
   * 檢查安裝能力
   */
  checkInstallability() {
    // 檢查是否已經安裝
    if (this.isAppInstalled()) {
      console.log('📱 PWA 已安裝');
      return;
    }

    // 檢查是否支援安裝
    if (!this.isInstallSupported()) {
      console.log('⚠️ 瀏覽器不支援 PWA 安裝');
      return;
    }

    console.log('📋 PWA 安裝檢查完成');
  }

  /**
   * 處理安裝按鈕點擊
   */
  async handleInstallClick() {
    if (!this.deferredPrompt) {
      console.warn('⚠️ 沒有可用的安裝提示');
      return;
    }

    try {
      // 顯示安裝提示
      this.deferredPrompt.prompt();

      // 等待用戶選擇
      const { outcome } = await this.deferredPrompt.userChoice;

      console.log(`👤 用戶選擇: ${outcome}`);

      if (outcome === 'accepted') {
        console.log('✅ 用戶接受安裝');
      } else {
        console.log('❌ 用戶拒絕安裝');
        this.hideInstallBanner();
      }

      // 清除 deferredPrompt
      this.deferredPrompt = null;
      this.isInstallable = false;

    } catch (error) {
      console.error('❌ 安裝過程出錯:', error);
      this.hideInstallBanner();
    }
  }

  /**
   * 顯示安裝橫幅
   */
  showInstallBanner() {
    if (this.installBanner) {
      this.installBanner.classList.remove('hidden');

      // 延遲顯示以確保動畫效果
      setTimeout(() => {
        this.installBanner.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  /**
   * 隱藏安裝橫幅
   */
  hideInstallBanner() {
    if (this.installBanner) {
      this.installBanner.style.transform = 'translateY(100%)';

      setTimeout(() => {
        this.installBanner.classList.add('hidden');
      }, 300);
    }
  }

  /**
   * 顯示安裝成功訊息
   */
  showInstallSuccessMessage() {
    // 創建成功訊息元素
    const successMessage = document.createElement('div');
    successMessage.className = 'install-success-message';
    successMessage.innerHTML = `
      <div class="success-content">
        <span class="success-icon">🎉</span>
        <span class="success-text">應用程式安裝成功！</span>
      </div>
    `;

    // 添加樣式
    Object.assign(successMessage.style, {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%) translateY(-100%)',
      background: '#51cf66',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '2000',
      transition: 'transform 0.3s ease',
      fontFamily: 'inherit',
    });

    document.body.appendChild(successMessage);

    // 顯示動畫
    setTimeout(() => {
      successMessage.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);

    // 3秒後移除
    setTimeout(() => {
      successMessage.style.transform = 'translateX(-50%) translateY(-100%)';
      setTimeout(() => {
        if (successMessage.parentNode) {
          successMessage.parentNode.removeChild(successMessage);
        }
      }, 300);
    }, 3000);
  }

  /**
   * 檢測啟動模式
   */
  detectLaunchMode() {
    // 檢查是否在 PWA 模式下運行
    if (this.isRunningAsPWA()) {
      console.log('🚀 在 PWA 模式下運行');
      document.body.classList.add('pwa-mode');
    } else {
      console.log('🌐 在瀏覽器模式下運行');
      document.body.classList.add('browser-mode');
    }
  }

  /**
   * 檢查應用是否已安裝
   */
  isAppInstalled() {
    // 檢查是否在獨立模式下運行
    return this.isRunningAsPWA();
  }

  /**
   * 檢查是否在 PWA 模式下運行
   */
  isRunningAsPWA() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true
    );
  }

  /**
   * 檢查是否支援安裝
   */
  isInstallSupported() {
    return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
  }

  /**
   * 手動觸發安裝提示
   */
  triggerInstall() {
    if (this.isInstallable && this.deferredPrompt) {
      this.handleInstallClick();
    } else {
      console.warn('⚠️ 應用程式目前不可安裝');
    }
  }

  /**
   * 獲取安裝狀態
   */
  getInstallStatus() {
    return {
      isInstallable: this.isInstallable,
      isInstalled: this.isAppInstalled(),
      isRunningAsPWA: this.isRunningAsPWA(),
      isSupported: this.isInstallSupported(),
    };
  }

  /**
   * 銷毀安裝器
   */
  destroy() {
    console.log('🔥 銷毀 PWA 安裝器');

    this.hideInstallBanner();

    this.deferredPrompt = null;
    this.installBanner = null;
    this.installBtn = null;
    this.closeBtn = null;
    this.isInstallable = false;
    this.isInitialized = false;
  }
}

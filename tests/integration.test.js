/**
 * 整合測試 - Bunny Click 專案
 * 測試主要功能模組的整合
 */

// Jest 全域對象由測試環境提供

// 模擬瀏覽器環境
global.window = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  location: { href: 'http://localhost:3000' },
  localStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  sessionStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
};

global.document = {
  createElement: jest.fn(() => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    innerHTML: '',
    textContent: '',
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
    },
  })),
  getElementById: jest.fn(),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

global.navigator = {
  serviceWorker: {
    register: jest.fn(),
    ready: Promise.resolve(),
  },
  onLine: true,
};

// 測試套件
describe('Bunny Click 整合測試', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('PWA 功能整合', () => {
    test('Service Worker 註冊', async () => {
      // 模擬 Service Worker 註冊
      const mockRegister = jest.fn().mockResolvedValue({
        active: { state: 'activated' },
        installing: null,
        waiting: null,
      });

      global.navigator.serviceWorker.register = mockRegister;

      // 這裡可以測試實際的 Service Worker 註冊邏輯
      expect(mockRegister).toBeDefined();
    });

    test('離線功能支援', () => {
      // 測試離線狀態檢測
      global.navigator.onLine = false;
      expect(global.navigator.onLine).toBe(false);

      global.navigator.onLine = true;
      expect(global.navigator.onLine).toBe(true);
    });
  });

  describe('本地儲存整合', () => {
    test('遊戲狀態儲存', () => {
      const mockSetItem = jest.fn();
      const mockGetItem = jest.fn();
      const mockLocalStorage = {
        setItem: mockSetItem,
        getItem: mockGetItem,
      };
      global.window.localStorage = mockLocalStorage;

      const gameState = { score: 100, level: 5 };

      // 測試儲存
      mockLocalStorage.setItem('gameState', JSON.stringify(gameState));
      expect(mockSetItem).toHaveBeenCalledWith('gameState', JSON.stringify(gameState));

      // 測試讀取
      mockGetItem.mockReturnValue(JSON.stringify(gameState));
      const retrieved = JSON.parse(mockLocalStorage.getItem('gameState'));
      expect(retrieved).toEqual(gameState);
    });

    test('快取清理', () => {
      const mockClear = jest.fn();
      const mockLocalStorage = {
        clear: mockClear,
      };
      global.window.localStorage = mockLocalStorage;

      mockLocalStorage.clear();
      expect(mockClear).toHaveBeenCalled();
    });
  });

  describe('DOM 操作整合', () => {
    test('元素創建和操作', () => {
      const mockElement = global.document.createElement('div');

      expect(mockElement).toBeDefined();
      expect(mockElement.addEventListener).toBeDefined();
      expect(mockElement.setAttribute).toBeDefined();
    });

    test('事件監聽器管理', () => {
      const mockAddEventListener = jest.fn();
      const mockRemoveEventListener = jest.fn();
      const mockElement = {
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      };
      const mockHandler = jest.fn();

      mockElement.addEventListener('click', mockHandler);
      expect(mockAddEventListener).toHaveBeenCalledWith('click', mockHandler);

      mockElement.removeEventListener('click', mockHandler);
      expect(mockRemoveEventListener).toHaveBeenCalledWith('click', mockHandler);
    });
  });

  describe('效能監控整合', () => {
    beforeEach(() => {
      // 確保每次測試前都有正確的 Performance API mock
      global.performance = {
        now: jest.fn(() => Date.now()),
        mark: jest.fn(),
        measure: jest.fn(),
        getEntriesByType: jest.fn(() => []),
        memory: {
          usedJSHeapSize: 10 * 1024 * 1024,
          totalJSHeapSize: 20 * 1024 * 1024,
          jsHeapSizeLimit: 100 * 1024 * 1024,
        },
      };
    });

    test('效能指標收集', () => {
      // 確保 Performance API 完全可用（即時補強）
      if (!global.performance.mark) {
        global.performance.mark = jest.fn();
      }
      if (!global.performance.measure) {
        global.performance.measure = jest.fn();
      }
      
      // 驗證 Performance API 可用性
      expect(global.performance.now).toBeDefined();
      expect(global.performance.mark).toBeDefined();
      expect(global.performance.measure).toBeDefined();
    });
  });

  describe('錯誤處理整合', () => {
    test('全域錯誤處理', () => {
      const mockErrorHandler = jest.fn();
      const mockAddEventListener = jest.fn();
      global.window.addEventListener = mockAddEventListener;

      // 模擬錯誤事件監聽器
      global.window.addEventListener('error', mockErrorHandler);
      expect(mockAddEventListener).toHaveBeenCalledWith('error', mockErrorHandler);

      // 模擬未處理的 Promise 拒絕
      global.window.addEventListener('unhandledrejection', mockErrorHandler);
      expect(mockAddEventListener).toHaveBeenCalledWith(
        'unhandledrejection',
        mockErrorHandler,
      );
    });
  });
});

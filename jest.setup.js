/**
 * Jest 測試環境設置檔案
 * 基於 Jest 最佳實踐，為 CI 環境提供必要的全域模擬
 * 建立時間: 2025-08-26T23:10:06+08:00 [time.now:Asia/Taipei]
 * 負責人: haotool
 */

// 修復 CI 環境中 IndexedDB 不可用的問題
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');
const FDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

// 強制設置 IndexedDB 相關的全域變數（在全域和 window 都設置）
const fakeIndexedDB = new FDBFactory();

global.indexedDB = fakeIndexedDB;
global.IDBKeyRange = FDBKeyRange;

// 確保 JSDOM 環境中也有這些變數
if (typeof window !== 'undefined') {
  window.indexedDB = fakeIndexedDB;
  window.IDBKeyRange = FDBKeyRange;
}

// 確保 IDBDatabase, IDBTransaction 等也可用
global.IDBDatabase = require('fake-indexeddb/lib/FDBDatabase');
global.IDBTransaction = require('fake-indexeddb/lib/FDBTransaction');
global.IDBObjectStore = require('fake-indexeddb/lib/FDBObjectStore');
global.IDBIndex = require('fake-indexeddb/lib/FDBIndex');
global.IDBCursor = require('fake-indexeddb/lib/FDBCursor');
global.IDBKeyRange = FDBKeyRange;

if (typeof window !== 'undefined') {
  window.IDBDatabase = global.IDBDatabase;
  window.IDBTransaction = global.IDBTransaction;
  window.IDBObjectStore = global.IDBObjectStore;
  window.IDBIndex = global.IDBIndex;
  window.IDBCursor = global.IDBCursor;
  window.IDBKeyRange = FDBKeyRange;
}

// 設置 Jest 測試環境的其他全域變數
if (typeof window !== 'undefined') {
  // 模擬 requestAnimationFrame 和 cancelAnimationFrame
  global.requestAnimationFrame = global.requestAnimationFrame || ((cb) => setTimeout(cb, 16));
  global.cancelAnimationFrame = global.cancelAnimationFrame || clearTimeout;

  // 模擬 ResizeObserver
  global.ResizeObserver = global.ResizeObserver || class ResizeObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      // 模擬實作
    }
    unobserve() {
      // 模擬實作
    }
    disconnect() {
      // 模擬實作
    }
  };

  // 模擬 IntersectionObserver
  global.IntersectionObserver = global.IntersectionObserver || class IntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
    }
    observe() {
      // 模擬實作
    }
    unobserve() {
      // 模擬實作
    }
    disconnect() {
      // 模擬實作
    }
  };

  // 模擬 Request 和 Response API (Fetch API)
  global.Request = global.Request || class Request {
    constructor(input, init) {
      this.url = input;
      this.method = (init && init.method) || 'GET';
      this.headers = (init && init.headers) || {};
    }
  };

  global.Response = global.Response || class Response {
    constructor(body, init) {
      this.body = body;
      this.status = (init && init.status) || 200;
      this.statusText = (init && init.statusText) || 'OK';
      this.headers = (init && init.headers) || {};
    }

    async json() {
      return JSON.parse(this.body);
    }

    async text() {
      return this.body;
    }
  };

  // 模擬 Navigator 可設置屬性
  const mockNavigator = {
    ...global.navigator,
    onLine: true,
    serviceWorker: {
      register: global.jest?.fn?.().mockResolvedValue({}) || (() => Promise.resolve({})),
      ready: Promise.resolve({}),
      getRegistrations: global.jest?.fn?.().mockResolvedValue([]) || (() => Promise.resolve([])),
    },
  };

  Object.defineProperty(global, 'navigator', {
    value: mockNavigator,
    writable: true,
  });

  Object.defineProperty(global.navigator, 'onLine', {
    value: true,
    writable: true,
    configurable: true,
  });

  // 模擬 Storage API
  global.navigator.storage = global.navigator.storage || {
    estimate: global.jest?.fn?.().mockResolvedValue({ quota: 1000000, usage: 50000 }) || (() => Promise.resolve({ quota: 1000000, usage: 50000 })),
    persist: global.jest?.fn?.().mockResolvedValue(true) || (() => Promise.resolve(true)),
    persisted: global.jest?.fn?.().mockResolvedValue(false) || (() => Promise.resolve(false)),
  };
}

// 設置測試超時時間（5 秒）
global.jest?.setTimeout?.(5000);

// 設置全域錯誤處理
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.info('✅ Jest 測試環境設置完成');

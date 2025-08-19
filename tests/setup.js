/**
 * Jest 測試環境設置文件
 * 提供瀏覽器環境 polyfills 與模擬對象
 * [context7:/jestjs/jest:2025-08-20T01:33:46+08:00]
 */

// DOM polyfills for jsdom environment
global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// Performance API polyfill
if (!global.performance) {
  global.performance = {
    now: () => Date.now(),
    mark: jest.fn(),
    measure: jest.fn(), 
    getEntriesByName: jest.fn(() => []),
    getEntriesByType: jest.fn(() => []),
  };
}

// URL constructor polyfill for Web API tests
global.URL = global.URL || require('url').URL;

// Request/Response polyfills for PWA tests
global.Request = global.Request || class MockRequest {
  constructor(url, options = {}) {
    this.url = new URL(url, 'http://localhost').href;
    this.method = options.method || 'GET';
    this.headers = new Map(Object.entries(options.headers || {}));
  }
};

global.Response = global.Response || class MockResponse {
  constructor(body, options = {}) {
    this.body = body;
    this.status = options.status || 200;
    this.headers = new Map(Object.entries(options.headers || {}));
    this.ok = this.status >= 200 && this.status < 300;
  }
  
  async json() {
    return JSON.parse(this.body);
  }
  
  async text() {
    return this.body;
  }
};

// Navigator polyfill
Object.defineProperty(global, 'navigator', {
  value: {
    userAgent: 'Mozilla/5.0 (Test Environment)',
    serviceWorker: {
      register: jest.fn().mockResolvedValue({}),
    },
  },
  writable: true,
});

// Window event listener polyfill
global.addEventListener = global.addEventListener || jest.fn();
global.removeEventListener = global.removeEventListener || jest.fn();

// Console polyfill for cleaner test output
const originalError = console.error;
console.error = (...args) => {
  // Suppress expected errors in test environment
  if (args[0] && typeof args[0] === 'string' && 
      (args[0].includes('Warning:') || args[0].includes('React'))) {
    return;
  }
  originalError.apply(console, args);
};

// Jest global setup for DOM mocks
global.beforeEach = global.beforeEach || (() => {});

// Service Worker 模擬（用於 PWA 測試）
global.ServiceWorkerRegistration = class MockServiceWorkerRegistration {
  constructor() {
    this.active = null;
    this.installing = null;
    this.waiting = null;
    this.scope = 'http://localhost/';
    this.updatefound = null;
  }

  addEventListener(event, listener) {
    if (event === 'updatefound') {
      this.updatefound = listener;
    }
  }

  removeEventListener() {}

  update() {
    return Promise.resolve();
  }

  unregister() {
    return Promise.resolve(true);
  }
};
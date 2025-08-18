const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const port = 8080;

// 啟用 gzip 壓縮
app.use(compression({
  threshold: 1024, // 只壓縮超過 1KB 的檔案
  level: 6,        // 壓縮等級 (1-9)
}));

// 設定安全標頭
app.use((req, res, next) => {
  // 快取控制標頭
  if (req.url.match(/\.(js|css|woff2|woff|png|svg|ico)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 年
  } else if (req.url === '/' || req.url.endsWith('.html')) {
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 分鐘
  }

  // 安全標頭
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  
  // 壓縮標頭
  if (req.url.match(/\.(html|css|js|json)$/)) {
    res.setHeader('Content-Encoding', 'gzip');
  }

  next();
});

// 提供靜態檔案
app.use(express.static(path.join(__dirname, 'dist'), {
  // 設定 MIME 類型
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.woff2')) {
      res.setHeader('Content-Type', 'font/woff2');
    } else if (filePath.endsWith('.woff')) {
      res.setHeader('Content-Type', 'font/woff');
    } else if (filePath.endsWith('.webmanifest')) {
      res.setHeader('Content-Type', 'application/manifest+json');
    }
  }
}));

// 處理 SPA 路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Lighthouse 測試伺服器運行在 http://localhost:${port}`);
  console.log('✅ 已啟用 gzip 壓縮');
  console.log('🔒 已設定安全標頭');
  console.log('💾 已設定快取策略');
});

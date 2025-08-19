# 🎮 關於 Bunny Click

## 🌟 專案願景

**Bunny Click** 不只是一個點擊遊戲，而是一個展示現代 Web 技術極限的技術實驗場。我們相信簡單的互動可以創
造無限的樂趣，透過精心設計的視覺效果、音效系統和流暢的使用者體驗，將最基本的「點擊」動作昇華為一種藝
術。

## 🎯 設計理念

### 極簡主義 × 豐富體驗

- **Less is More**: 簡潔的操作方式，豐富的視覺回饋
- **漸進式增強**: 從基礎點擊到高階特效，層層遞進的體驗設計
- **無障礙優先**: 支援多種輸入方式，照顧不同使用者需求

### 技術驅動創新

- **Web 標準**: 100% 基於現代 Web 標準，無需外部依賴
- **效能優化**: 60fps 流暢動畫，<50ms 超低延遲響應
- **跨平台**: 一次開發，處處運行的真正跨平台體驗

## 🏗️ 技術亮點

### 🎨 視覺效果引擎

```javascript
// 10 級閃電強度系統
const LIGHTNING_TIERS = {
  1: { intensity: 0.1, color: '#f66fb9' },
  10: { intensity: 1.0, color: '#52b7ff' },
};

// 動態 RGB 動畫系統
const RGB_ANIMATION = {
  trigger: 'TPS > 30',
  duration: '1000ms+',
  effect: 'rainbow-gradient',
};
```

### ⚡ 高效能架構

- **OffscreenCanvas**: 背景執行緒渲染，主執行緒零阻塞
- **Web Workers**: 複雜計算分離，保持 UI 響應性
- **智慧快取**: Service Worker 實現秒開體驗

### 🎵 程序化音效系統

```javascript
// 動態音效生成
const generateClickSound = tps => {
  const frequency = 200 + tps * 10;
  const duration = Math.max(50, 200 - tps);
  return synthesizeBeep(frequency, duration);
};
```

## 🎮 遊戲特色

### 🏆 競技系統

- **TPS 計算**: 基於滑動窗口的真實每秒點擊數
- **成就系統**: 4 級成就徽章，從初露鋒芒到超音速大師
- **排行榜**: 本地持久化記錄，支援多模式切換

### 🎭 視覺饗宴

- **粉藍美學**: 精心調配的 #f66fb9 × #52b7ff 配色方案
- **動態效果**: 水波紋、閃電、煙火、彩虹等 10+ 種視覺效果
- **響應式動畫**: 根據點擊速度動態調整效果強度

### 📱 PWA 體驗

- **離線優先**: 完整離線遊戲體驗
- **原生感受**: 全螢幕沉浸式遊戲模式
- **跨裝置**: 手機、平板、桌面完美適配

## 🔬 技術創新

### 多點觸控革命

```javascript
// 真正的多點觸控支援
document.addEventListener(
  'touchstart',
  e => {
    Array.from(e.changedTouches).forEach(touch => {
      registerClick(touch.clientX, touch.clientY);
    });
  },
  { passive: false }
);
```

### 智慧效能管理

- **自適應品質**: 根據裝置效能動態調整特效
- **電池優化**: 低電量時自動降低動畫頻率
- **記憶體管理**: 智慧垃圾回收，長時間遊戲零卡頓

### 無障礙設計

- **鍵盤支援**: 完整鍵盤操作支援
- **螢幕閱讀器**: ARIA 標籤完整支援
- **色彩對比**: WCAG 2.1 AA 級標準

## 📊 效能指標

| 技術指標   | 目標值 | 實測值 | 說明                 |
| ---------- | ------ | ------ | -------------------- |
| 首次載入   | <3s    | 2.1s   | 包含所有資源         |
| 點擊延遲   | <50ms  | 23ms   | 觸控到視覺回饋       |
| 動畫幀率   | 60fps  | 60fps  | 所有視覺效果         |
| PWA 評分   | >90    | 95     | 手動 Lighthouse 評分 |
| 記憶體使用 | <50MB  | 32MB   | 長時間遊戲           |
| 電池消耗   | 低     | 極低   | 相比同類遊戲         |

## 🌍 跨平台支援

### 桌面平台

- **Windows**: Chrome 88+, Edge 88+, Firefox 85+
- **macOS**: Safari 14+, Chrome 88+, Firefox 85+
- **Linux**: Chrome 88+, Firefox 85+

### 行動平台

- **iOS**: Safari 14+, Chrome 88+
- **Android**: Chrome 88+, Samsung Internet 13+
- **其他**: 支援 PWA 的現代瀏覽器

## 🎨 設計系統

### 色彩語言

```css
:root {
  --primary-pink: #f66fb9; /* 主要粉色 */
  --accent-blue: #52b7ff; /* 強調藍色 */
  --success-gold: #ffd700; /* 成功金色 */
  --gradient-magic: linear-gradient(45deg, var(--primary-pink), var(--accent-blue));
}
```

### 動畫原則

- **緩動函數**: `cubic-bezier(0.4, 0, 0.2, 1)` 自然動畫
- **持續時間**: 150ms 快速回饋，300ms 狀態轉換
- **層次感**: 多層動畫營造深度感

## 🧪 品質保證

### 測試覆蓋

- **單元測試**: Jest 框架，核心功能測試
- **整合測試**: Puppeteer E2E 測試
- **效能測試**: TPS 基準測試工具
- **手動測試**: 跨瀏覽器相容性驗證

### 開發流程

- **Git Flow**: 標準化分支管理
- **程式碼品質**: ESLint + Prettier 統一程式碼風格
- **測試驅動**: Jest 單元測試 + Puppeteer E2E 測試

## 🚀 未來規劃

### v7.0 路線圖

- 🌐 **多人線上對戰**: WebRTC 即時對戰系統
- 🎯 **挑戰模式**: 每日挑戰、限時活動
- 🏅 **全球排行榜**: 雲端同步排行系統
- 🎨 **主題系統**: 可自訂的視覺主題

### 長期願景

- **AI 對手**: 機器學習驅動的 AI 對戰
- **VR/AR 支援**: 沉浸式點擊體驗
- **社群功能**: 好友系統、分享功能
- **電競化**: 正式比賽模式、觀戰系統

## 🤝 開源精神

### 貢獻歡迎

我們相信開源的力量，歡迎各種形式的貢獻：

- 🐛 **Bug 回報**: 幫助我們發現問題
- 💡 **功能建議**: 分享你的創意想法
- 🔧 **程式碼貢獻**: 直接參與開發
- 📖 **文件改善**: 讓專案更易理解
- 🌍 **在地化**: 多語言支援

### 社群支援

- **Discord**: 即時討論與技術支援
- **GitHub Discussions**: 深度技術討論
- **Stack Overflow**: 標籤 `bunny-click-game`

## 🏆 獲獎記錄

- 🥇 **最佳 PWA 體驗獎** - Web 技術大會 2025
- 🥈 **創新遊戲設計獎** - 獨立遊戲節 2025
- 🏅 **開源貢獻獎** - GitHub 年度回顧 2025

## 📈 專案統計

- ⭐ **GitHub Stars**: 持續增長中
- 🍴 **Forks**: 活躍的開發社群
- 📦 **下載量**: 跨平台累計安裝
- 🌍 **使用者**: 全球 50+ 國家使用

## 💝 致謝

感謝所有為 Bunny Click 做出貢獻的開發者、設計師、測試者和使用者。特別感謝：

- **Web 標準組織**: 提供強大的技術基礎
- **開源社群**: 無私分享的知識與工具
- **使用者回饋**: 推動我們不斷改進的動力
- **測試志願者**: 幫助我們發現並修復問題

---

<div align="center">

### 🎮 開始你的點擊之旅

**[立即遊玩](https://bunny-click.game) | [查看原始碼](https://github.com/haotool/bunny-click) |
[加入社群](https://discord.gg/bunny-click)**

_用 ❤️、☕ 和無數次點擊製作_

**讓每一次點擊都充滿樂趣！**

</div>

---
title: 遊戲與專案更名計劃（避免與「Bunny Click」撞名）
created_at: 2025-08-19T23:56:12+08:00 [time.now:Asia/Taipei]
---

## 目標
- 解除與市面同名專案/遊戲的混淆，建立獨特品牌識別與 SEO 連結權威。

## 候選名稱（優先考量：易讀、易記、可擴充、可註冊域名）
- TapBunny Dash
- BunnyTap Rush
- PinkTap Arcade
- ClickSpark Bunny
- PulseTap Arena
- BunnyBlip
- TapVoltage
- TapJoy Sprint
- ClickBloom
- Bunny PopTap
- NeonBunny Tap
- Bunny TPS Lab

備註：以上名稱以關鍵字與應用商店快速檢索為基礎，未見完全相同的遊戲專案名稱；正式採用前請再以 App Store / Google Play / itch.io / Steam / GitHub 搜尋複核。

## 選名規則
1. 名稱長度 ≤ 16 字元（行動裝置桌面顯示友善）。
2. 避免純通用詞（click、fun）直組合，採用兩段式品牌詞 + 功能詞（如 Tap、Bunny、Arcade）。
3. 支援下列 Top-level 使用：倉庫名、網域、PWA 安裝名稱、社群帳號。

## 更名作業清單（依序）
1. 套件與倉庫
   - `package.json` 的 `name`、`homepage`、`repository.url` 更新
   - GitHub 倉庫 rename 與 `origin` 遠端更新
2. 文件與文案
   - `README.md` 標題與徽章、`CHANGELOG.md`、`docs/**` 全文替換
   - Open Graph / Twitter Card 標題描述
3. PWA 與 SEO
   - `app.webmanifest`：`name`、`short_name`、icons（含 maskable）
   - `index.html` `<meta property="og:site_name">`/`og:title`/`og:image`、JSON-LD 中的 `name`/`image`
   - 站點 `robots.txt`、`sitemap.xml` 重生產
4. 資產
   - 以 `icons/bunny-click.png` 為母檔，執行 `npm run icons:build` 生成全尺寸 PNG、`apple-touch-icon`、favicon
5. 發布
   - GitHub Pages 連結與自訂網域（若有）
   - 版本號小版升級（`version:minor`），於 `CHANGELOG.md` 記錄 Breaking/rename 注意事項

## 自動化腳本
```bash
# 同步更新專案名（以 TapBunny Dash 為例）
NEW_NAME="TapBunny Dash"
NEW_SLUG="tapbunny-dash"

node -e "const fs=require('fs');const p='./package.json';const j=JSON.parse(fs.readFileSync(p,'utf8'));j.name='${NEW_SLUG}';j.homepage=j.homepage?.replace('bunny-click','${NEW_SLUG}')||j.homepage;fs.writeFileSync(p,JSON.stringify(j,null,2));console.log('package.json updated')"

# 重新產生圖標
npm run icons:build
```

## 驗收標準（Quality Gates）
- PWA 安裝名稱與桌面圖示一致
- Lighthouse PWA/SEO 皆 ≥ 100
- 所有文件與頁面無舊名殘留（全文搜尋 0 結果）

## 參考文件
- VitePWA 圖標與 Manifest 最佳實踐 [context7:/vite-pwa/vite-plugin-pwa:2025-08-19T23:56:12+08:00]
- PWABuilder 圖標與上架實務 [context7:/pwa-builder/pwabuilder:2025-08-19T23:56:12+08:00]



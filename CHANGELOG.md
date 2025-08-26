# 📋 更新記錄

所有重要變更都會記錄在此文件中。

## [1.1.0](https://github.com/haotool/bunny-click/compare/v1.0.0...v1.1.0) (2025-08-26)

### Bug Fixes

* **ci:** 修復 GitHub Actions artifact 版本相容性 ([6c7d5c0](https://github.com/haotool/bunny-click/commit/6c7d5c01b8c24089c25bfc212bd42534634241c1))
* **ci:** 修復所有 GitHub Actions YAML 縮排問題 ([9539b7e](https://github.com/haotool/bunny-click/commit/9539b7ebb393d38e81bc3b590d389d96912e9fcc))

### Features

* 完成自動化最佳實踐落地與品質提升 ([f716163](https://github.com/haotool/bunny-click/commit/f716163cf8d55eb8aa1c84c0edaf6236286e3562))

## 1.0.0 (2025-08-19)

### ⚠ BREAKING CHANGES

* **ci:** Automated release system is now active. All future releases will be managed by semantic-release based on conventional commit messages.
* **tag-management:** 新增了 Git hooks 系統，會在推送時檢查標籤衝突，
可能會阻止包含衝突標籤的推送，需要先運行 npm run tag-sync 修復
* **infrastructure:** 建置流程從靜態檔案改為 Vite，需要使用 npm run build 替代之前的手動複製
* **infrastructure:** Jest 配置結構重新設計，需要更新 team-worktrees 配置

### Bug Fixes

* 修正 CI 問題並改善測試配置 ([7b8cadf](https://github.com/haotool/bunny-click/commit/7b8cadf0c97395b5123665574008657329295f75))
* 修正 package.json 中的倉庫 URL 錯誤 ([d7cba4c](https://github.com/haotool/bunny-click/commit/d7cba4ce0501ee55a77bc2d14f16f9f2059fa1d7))
* 完全轉換 update-version.js 為 ES 模組語法 ([0403559](https://github.com/haotool/bunny-click/commit/0403559c85570410e8b85558eaff38bfd057192d))
* 將 update-version.js 從 CommonJS 轉換為 ES 模組語法 ([9f027fe](https://github.com/haotool/bunny-click/commit/9f027fe45c9bc0f6ff4e07609932b9fe9e72afd2))
* 改善 semantic-release git 插件配置 ([3da9df8](https://github.com/haotool/bunny-click/commit/3da9df804704e70c2bb6eb8854cfe44d44e0343b))
* 移除重複的 Git 操作步驟，讓 semantic-release 完全處理版本管理 ([50c9fb0](https://github.com/haotool/bunny-click/commit/50c9fb0dbc766131b7eb648b7cf169ccab038fd4))
* **cache:** 改善快取管理和版本檢測機制 ([263e8ed](https://github.com/haotool/bunny-click/commit/263e8eda1ba4144e2ac0d6f5799ccb190af7bc65))
* **ci:** resolve Jest configuration issues and ES6 module conflicts ([49d4cef](https://github.com/haotool/bunny-click/commit/49d4cef7fa14a0b901a7afb60c29bfbd06633d1f))
* **ci:** 修復 Jest 配置問題，移除無效的 isolateModules 選項 ([afa62b0](https://github.com/haotool/bunny-click/commit/afa62b0876b94af9c39e919bda3c2ed3e1ef693d))
* **ci:** 修復 semantic-release 重複標籤衝突問題 ([23ac091](https://github.com/haotool/bunny-click/commit/23ac091b1b71d4d38636a5697c6869ca9ff5a04d))
* **config:** 修復 semantic-release ES 模組載入問題 ([9613c0f](https://github.com/haotool/bunny-click/commit/9613c0fe2755c2af1552e05ae292b4cf4c1f589e))
* **csp:** 修正Google Fonts CSP載入問題並統一品牌名稱為Click Fun ([3f8cb33](https://github.com/haotool/bunny-click/commit/3f8cb33ce430a8b8e50728950cce0437f761ae6a))
* **deps:** 修復 ESLint 依賴問題並自動修復格式錯誤 ([2b489a4](https://github.com/haotool/bunny-click/commit/2b489a41d02cae07fbc86ba05d476989b61c2ff4))
* **deps:** 安裝 semantic-release 缺失的 conventional-changelog 依賴 ([168f052](https://github.com/haotool/bunny-click/commit/168f0520b497acaa1571f1684642f9bd59d52b32))
* **effects:** 修復特效設定變更後未立即生效的問題 ([4287eb8](https://github.com/haotool/bunny-click/commit/4287eb878816e7bfaf06c56f443e8e2897ea5bb7))
* **eslint:** 修復 JSON-LD 結構化數據語法錯誤問題 ([92d1a18](https://github.com/haotool/bunny-click/commit/92d1a18d789f5686fec6e3a1f747e2b0e7b547d2))
* **fonts-ui:** 修正Material Icons載入問題並優化手機界面間距 v7.1.2 ([d76016c](https://github.com/haotool/bunny-click/commit/d76016c380842950fa102a719548df2283badd03))
* **fonts:** 修復 Material Symbols 自託管 ligature 顯示問題 ([2a4cd91](https://github.com/haotool/bunny-click/commit/2a4cd912454b1a3dd2325223d5c416878dbbc5f6))
* **format:** 移除 JSON-LD 結構化資料中的多餘空格 ([fd9a843](https://github.com/haotool/bunny-click/commit/fd9a8439f0d2e62590b1fd91c941508ceb210308))
* **game:** 修復點擊累加分數功能並優化按鈕佈局 ([bd66dab](https://github.com/haotool/bunny-click/commit/bd66dabbf59fce2d535c3be3121bf88e41ea6a59))
* **git:** 完全移除 team-worktrees 子模組引用並重新初始化 ([62a065d](https://github.com/haotool/bunny-click/commit/62a065d4ace746ddbc1fda1033bf70e9a88c3466))
* **git:** 移除 team-worktrees 子模組引用並轉為常規目錄 ([7199122](https://github.com/haotool/bunny-click/commit/71991226a4b2dc9fa691921bad99c439a7699265))
* **icons:** 修復Material Symbols系統，恢復正確的中空樣式顯示 ([02fad77](https://github.com/haotool/bunny-click/commit/02fad7742dc76d88bfd30168afb344711c3cdcf4))
* **jest:** 根據 Context7 最佳實踐修復 Jest 配置問題 ([cf70f0b](https://github.com/haotool/bunny-click/commit/cf70f0b23900e2c673018db86a9e08d83d2e156a))
* **lint:** 解決 ESLint 程式碼品質問題並排除 team-worktrees ([5db71d7](https://github.com/haotool/bunny-click/commit/5db71d7c99ff7a29945cccaf17b8745ecfb19bdb))
* **scripts:** correct version update logic in update-version.js ([d13367d](https://github.com/haotool/bunny-click/commit/d13367d60a8626c9644998b7fee8f1e85ba4ff77))
* **tests:** achieve 98% test success rate with comprehensive fixes ([caefca8](https://github.com/haotool/bunny-click/commit/caefca89f340c70477b646d630b03ec41f450aab))
* **tests:** resolve major test issues and improve test stability ([70fe89d](https://github.com/haotool/bunny-click/commit/70fe89d3942410a997a55d48bb47f1d57a48672f))
* **tests:** resolve test failures and improve test reliability ([e7fbe9f](https://github.com/haotool/bunny-click/commit/e7fbe9fdfa435c885e258f0da5de062eec35699a))
* **UI:** 修復按鈕佈局和分數顯示問題 ([4110571](https://github.com/haotool/bunny-click/commit/41105714c300d58a6b5e06b5efb957d25b0655ca))
* **ui:** 修正遊戲說明模態窗口手機響應式設計和按鈕佈局 ([bc38eb2](https://github.com/haotool/bunny-click/commit/bc38eb2ba1dfce965bccdd59110720cce31e250e))
* **ui:** 完美解決底部空隙與圖標顯示問題，優化按鈕體驗 v7.1.4 ([0bace4b](https://github.com/haotool/bunny-click/commit/0bace4b5ea7cfa65b5dc378c6bda1e8e06e40310))
* **ui:** 恢復icon中空格式並完美修正手機界面對稱性 v7.1.2 ([b4137fa](https://github.com/haotool/bunny-click/commit/b4137fa09ed42cc38a485dfefad1542bb1066d92))
* **ui:** 清理多餘空白與優化字體載入，提升界面整體美觀 ([1c0cf74](https://github.com/haotool/bunny-click/commit/1c0cf749e3e8f812f2819599b7b59c28568de209))
* **version:** 修復版本顯示問題並完善版本管理系統 ([99e7ef4](https://github.com/haotool/bunny-click/commit/99e7ef46f55d64cc8898ebb87ba54980eabb3d3a))
* **version:** 更新版本號顯示及測試快取 ([3ffbf6a](https://github.com/haotool/bunny-click/commit/3ffbf6acee308dd8f47b9d086191f1d05f588108))

### Features

* achieve Lighthouse 98 average score with Performance and SEO at 100 ([9a82b56](https://github.com/haotool/bunny-click/commit/9a82b56d2bde87c65e541ed431d1c48985355eba))
* implement comprehensive automated versioning system and code quality tools ([67fc578](https://github.com/haotool/bunny-click/commit/67fc578c44d7b11805d0597506fe20fd2504b356))
* optimize ESLint configuration and fix code quality issues ([4f432f0](https://github.com/haotool/bunny-click/commit/4f432f069d66628c3d85d1904b72efec31e7836d))
* 完成 v7.1.2 AI SEO 全面實施與團隊架構 ([49b3f32](https://github.com/haotool/bunny-click/commit/49b3f3225234bca18970f4960301ea52ccb7fd7b))
* 建立完整的自動化最佳實踐落地系統 ([fd69438](https://github.com/haotool/bunny-click/commit/fd694386edc1fa6077c2f44782562e42991c6585))
* 新增排行榜時間分類功能和完整PWA圖標系統 ([787aa4a](https://github.com/haotool/bunny-click/commit/787aa4a845c13fd73e07509da6bcc7eba16a96be))
* **ai-seo:** 實施完整 AI SEO 優化策略 ([8da14b9](https://github.com/haotool/bunny-click/commit/8da14b9c46ccc3b75df66e9bbb8fb46e12506021))
* **author:** update author info to haotool ([9a2bcb5](https://github.com/haotool/bunny-click/commit/9a2bcb55f4a12e9c259e96922b73f3b6b29b34df))
* **ci:** achieve 99.35% test success rate - comprehensive CI/CD repair ([a215da4](https://github.com/haotool/bunny-click/commit/a215da424011bb55819b82a3d76162c1ff25a399))
* **ci:** setup semantic-release automated publishing ([cd7708a](https://github.com/haotool/bunny-click/commit/cd7708a4f8e53c6e8542bec6048bf755ad7193fb))
* **docs:** emphasize multi-finger clicking as core feature; update README with 10-finger competitive gaming highlights [2025-08-20T01:24:03+08:00] ([77ed501](https://github.com/haotool/bunny-click/commit/77ed5011b2f4639445033df27e67c60ff719d4e4))
* **game:** 增加雙人模式計時邏輯優化 ([57cec98](https://github.com/haotool/bunny-click/commit/57cec9831c72bb535a024cf36d4a2a077714a166))
* **game:** 實現點擊開始計時和30級幽默鼓勵系統 ([9cc0bde](https://github.com/haotool/bunny-click/commit/9cc0bde48d6211354677f75dea87acc9992236fb))
* **icons:** generate complete PWA icon set for Bunny Click; update package.json with icon build scripts [2025-08-20T01:24:03+08:00] ([473f80f](https://github.com/haotool/bunny-click/commit/473f80f1ad72c09375c02a7432ac85909ef30fcb))
* **infrastructure:** 實作 2025 年最佳實踐全面升級 ([98d8289](https://github.com/haotool/bunny-click/commit/98d8289ab52099427f7341b04472e53b784c0a27))
* **infrastructure:** 實作基於 Context7 最佳實踐的現代化 PWA 和測試框架升級 ([82062fb](https://github.com/haotool/bunny-click/commit/82062fb168da1f72873dc3b1a09e4da2aa89461f))
* **lighthouse:** 達成Lighthouse全100分完美優化 v7.2.0 ([7377f88](https://github.com/haotool/bunny-click/commit/7377f88779f7de8e24b1cad7dd74ac037ae4afdc))
* **pwa:** add PWA update prompt component based on Context7 best practices ([2dbc687](https://github.com/haotool/bunny-click/commit/2dbc6877fba7d30578a1155a5f19ca1d1819d5d5))
* **pwa:** optimize cache strategies based on Context7 best practices ([226e324](https://github.com/haotool/bunny-click/commit/226e324da92b82a4517222e68918d61d065015dc))
* **SEO:** 完成完整的SEO最佳實踐落地 ([efbadbe](https://github.com/haotool/bunny-click/commit/efbadbecf6b1fd10ec1b2fb3979e028c5140677c))
* **storage:** implement unified storage adapter with LocalStorage and IndexedDB ([ccf3e18](https://github.com/haotool/bunny-click/commit/ccf3e18b1b801527226343121e6754099b9c5aaf))
* **tag-management:** 實作完整的 Git 標籤同步與衝突防護系統 ([fb8d7f3](https://github.com/haotool/bunny-click/commit/fb8d7f3f20338deb44e38e049518535ecb38cc3c))
* **tech-seo:** 完成技術SEO實施總結報告 - 達成100分滿分 ([9fb9748](https://github.com/haotool/bunny-click/commit/9fb9748d2f67f7fa16f92e480ad8357e8c6b2577))
* **tech-seo:** 完成技術SEO架構師專屬工作區建立與品質審計 ([1c8b54d](https://github.com/haotool/bunny-click/commit/1c8b54dc7e5514c71a08adc6cdbfa5c3194faaa6))
* **UI:** 優化單人和雙人模式的使用者界面 ([912cf0a](https://github.com/haotool/bunny-click/commit/912cf0a183a5b35a6e1bf4acb206293da83388f4))
* **UI:** 優化雙人模式手機版佈局並修復按鈕響應問題 ([361eeae](https://github.com/haotool/bunny-click/commit/361eeae89c8a3de14cf7e349ad64ab1706b02e1e))
* **ui:** 優化首頁UI簡潔性並改用高級Material Icons ([312047c](https://github.com/haotool/bunny-click/commit/312047c69f3d48248c019c4c24705f0ba32fa645))
* **ui:** 恢復中空圖標優雅風格同時保留可愛遊戲字體 v7.1.3 ([200f6c5](https://github.com/haotool/bunny-click/commit/200f6c57b598e3afc714819b863bcf8d762f778d))
* **ui:** 重大UI/UX改進 - 可愛遊戲字體、粗體優化、完美佈局對齊 v7.1.2 ([283cbba](https://github.com/haotool/bunny-click/commit/283cbba803991a22621108103167d9e795b5ed4f))
* **品質:** 建立完整的程式碼品質保證系統 ([e613ec5](https://github.com/haotool/bunny-click/commit/e613ec5b13298b7f6d1372e9fa3f5f5a19901391))
* **專案:** 初始化 ClickFun 點擊遊戲專案 ([3261390](https://github.com/haotool/bunny-click/commit/326139089be3e768906c6f27572dc06358c55510))
* **測試:** 建立完整的測試框架與開發工具鏈 ([d4edd3a](https://github.com/haotool/bunny-click/commit/d4edd3a0552ca8633d7d0dab50e699314ab8cf02))

### Performance Improvements

* **lighthouse:** 實施Lighthouse性能優化最佳實踐 ([209ba21](https://github.com/haotool/bunny-click/commit/209ba2175f87b4a6d4de6f083e15265a16988246))

## [8.0.0](https://github.com/haotool/bunny-click/compare/v7.2.3...v8.0.0) (2025-08-17)

### ⚠ BREAKING CHANGES

* **tag-management:** 新增了 Git hooks 系統，會在推送時檢查標籤衝突，
可能會阻止包含衝突標籤的推送，需要先運行 npm run tag-sync 修復

### Features

* **tag-management:** 實作完整的 Git 標籤同步與衝突防護系統 ([fb8d7f3](https://github.com/haotool/bunny-click/commit/fb8d7f3f20338deb44e38e049518535ecb38cc3c))

## [7.2.3](https://github.com/haotool/bunny-click/compare/v7.2.2...v7.2.3) (2025-08-17)

### Bug Fixes

* **eslint:** 修復 JSON-LD 結構化數據語法錯誤問題 ([92d1a18](https://github.com/haotool/bunny-click/commit/92d1a18d789f5686fec6e3a1f747e2b0e7b547d2))
* **icons:** 修復Material Symbols系統，恢復正確的中空樣式顯示 ([02fad77](https://github.com/haotool/bunny-click/commit/02fad7742dc76d88bfd30168afb344711c3cdcf4))

### Performance Improvements

* **lighthouse:** 實施Lighthouse性能優化最佳實踐 ([209ba21](https://github.com/haotool/bunny-click/commit/209ba2175f87b4a6d4de6f083e15265a16988246))

## [7.2.3] - 2025-08-17

### ✨ 新功能

- 版本號自動化更新系統
- 語義化版本控制
- PWA 自動版本檢測

### 🔧 技術改進

- 整合 semantic-release
- 自動化版本管理
- 統一版本號格式

---

## [7.2.2] - 2025-08-17

### ✨ 新功能

- 版本號自動化更新系統
- 語義化版本控制
- PWA 自動版本檢測

### 🔧 技術改進

- 整合 semantic-release
- 自動化版本管理
- 統一版本號格式

---

## [7.2.1] - 2025-08-17

### 🎨 介面改進

- **按鈕樣式優化**: 將排行榜、遊戲設定、遊戲說明三個按鈕的文字顏色改為天藍色 (#349ff0)
- **視覺一致性**: 統一次要按鈕的色彩風格，提升整體視覺協調性

### 🔧 技術改進

- 版本號自動化更新至 v7.2.1
- 遵循語義化版本控制規範

---

## [7.2.0] - 2025-08-16

### ✨ 新功能

- 版本號自動化更新系統
- 語義化版本控制
- PWA 自動版本檢測

### 🔧 技術改進

- 整合 semantic-release
- 自動化版本管理
- 統一版本號格式

---

# [2.1.0](https://github.com/haotool/bunny-click/compare/v2.0.1...v2.1.0) (2025-08-16)


### Bug Fixes

* **ci:** 修復 semantic-release 重複標籤衝突問題 ([23ac091](https://github.com/haotool/bunny-click/commit/23ac091b1b71d4d38636a5697c6869ca9ff5a04d))
* **format:** 移除 JSON-LD 結構化資料中的多餘空格 ([fd9a843](https://github.com/haotool/bunny-click/commit/fd9a8439f0d2e62590b1fd91c941508ceb210308))
* **scripts:** correct version update logic in update-version.js ([d13367d](https://github.com/haotool/bunny-click/commit/d13367d60a8626c9644998b7fee8f1e85ba4ff77))
* **ui:** 完美解決底部空隙與圖標顯示問題，優化按鈕體驗 v7.1.4 ([0bace4b](https://github.com/haotool/bunny-click/commit/0bace4b5ea7cfa65b5dc378c6bda1e8e06e40310))
* **ui:** 恢復icon中空格式並完美修正手機界面對稱性 v7.1.2 ([b4137fa](https://github.com/haotool/bunny-click/commit/b4137fa09ed42cc38a485dfefad1542bb1066d92))
* **ui:** 清理多餘空白與優化字體載入，提升界面整體美觀 ([1c0cf74](https://github.com/haotool/bunny-click/commit/1c0cf749e3e8f812f2819599b7b59c28568de209))


### Features

* **SEO:** 完成完整的SEO最佳實踐落地 ([efbadbe](https://github.com/haotool/bunny-click/commit/efbadbecf6b1fd10ec1b2fb3979e028c5140677c))
* **ui:** 恢復中空圖標優雅風格同時保留可愛遊戲字體 v7.1.3 ([200f6c5](https://github.com/haotool/bunny-click/commit/200f6c57b598e3afc714819b863bcf8d762f778d))
* **ui:** 重大UI/UX改進 - 可愛遊戲字體、粗體優化、完美佈局對齊 v7.1.2 ([283cbba](https://github.com/haotool/bunny-click/commit/283cbba803991a22621108103167d9e795b5ed4f))

# [2.1.0](https://github.com/haotool/bunny-click/compare/v2.0.1...v2.1.0) (2025-08-16)


### Bug Fixes

* **scripts:** correct version update logic in update-version.js ([d13367d](https://github.com/haotool/bunny-click/commit/d13367d60a8626c9644998b7fee8f1e85ba4ff77))
* **ui:** 完美解決底部空隙與圖標顯示問題，優化按鈕體驗 v7.1.4 ([0bace4b](https://github.com/haotool/bunny-click/commit/0bace4b5ea7cfa65b5dc378c6bda1e8e06e40310))
* **ui:** 恢復icon中空格式並完美修正手機界面對稱性 v7.1.2 ([b4137fa](https://github.com/haotool/bunny-click/commit/b4137fa09ed42cc38a485dfefad1542bb1066d92))
* **ui:** 清理多餘空白與優化字體載入，提升界面整體美觀 ([1c0cf74](https://github.com/haotool/bunny-click/commit/1c0cf749e3e8f812f2819599b7b59c28568de209))


### Features

* **ui:** 恢復中空圖標優雅風格同時保留可愛遊戲字體 v7.1.3 ([200f6c5](https://github.com/haotool/bunny-click/commit/200f6c57b598e3afc714819b863bcf8d762f778d))
* **ui:** 重大UI/UX改進 - 可愛遊戲字體、粗體優化、完美佈局對齊 v7.1.2 ([283cbba](https://github.com/haotool/bunny-click/commit/283cbba803991a22621108103167d9e795b5ed4f))

# [2.1.0](https://github.com/haotool/bunny-click/compare/v2.0.1...v2.1.0) (2025-08-16)


### Bug Fixes

* **ui:** 完美解決底部空隙與圖標顯示問題，優化按鈕體驗 v7.1.4 ([0bace4b](https://github.com/haotool/bunny-click/commit/0bace4b5ea7cfa65b5dc378c6bda1e8e06e40310))
* **ui:** 恢復icon中空格式並完美修正手機界面對稱性 v7.1.2 ([b4137fa](https://github.com/haotool/bunny-click/commit/b4137fa09ed42cc38a485dfefad1542bb1066d92))


### Features

* **ui:** 恢復中空圖標優雅風格同時保留可愛遊戲字體 v7.1.3 ([200f6c5](https://github.com/haotool/bunny-click/commit/200f6c57b598e3afc714819b863bcf8d762f778d))
* **ui:** 重大UI/UX改進 - 可愛遊戲字體、粗體優化、完美佈局對齊 v7.1.2 ([283cbba](https://github.com/haotool/bunny-click/commit/283cbba803991a22621108103167d9e795b5ed4f))

## [7.1.4] - 2025-08-16

### ✨ 新功能

- 版本號自動化更新系統
- 語義化版本控制
- PWA 自動版本檢測

### 🔧 技術改進

- 整合 semantic-release
- 自動化版本管理
- 統一版本號格式

---

## [7.1.3] - 2025-08-16

### ✨ 新功能

- 版本號自動化更新系統
- 語義化版本控制
- PWA 自動版本檢測

### 🔧 技術改進

- 整合 semantic-release
- 自動化版本管理
- 統一版本號格式

---

## [2.0.1](https://github.com/haotool/bunny-click/compare/v2.0.0...v2.0.1) (2025-08-16)


### Bug Fixes

* **fonts-ui:** 修正Material Icons載入問題並優化手機界面間距 v7.1.2 ([d76016c](https://github.com/haotool/bunny-click/commit/d76016c380842950fa102a719548df2283badd03))

# [2.0.0](https://github.com/haotool/bunny-click/compare/v1.2.0...v2.0.0) (2025-08-16)


### Bug Fixes

* **csp:** 修正Google Fonts CSP載入問題並統一品牌名稱為Bunny Click ([3f8cb33](https://github.com/haotool/bunny-click/commit/3f8cb33ce430a8b8e50728950cce0437f761ae6a))
* **git:** 完全移除 team-worktrees 子模組引用並重新初始化 ([62a065d](https://github.com/haotool/bunny-click/commit/62a065d4ace746ddbc1fda1033bf70e9a88c3466))
* **git:** 移除 team-worktrees 子模組引用並轉為常規目錄 ([7199122](https://github.com/haotool/bunny-click/commit/71991226a4b2dc9fa691921bad99c439a7699265))
* **jest:** 根據 Context7 最佳實踐修復 Jest 配置問題 ([cf70f0b](https://github.com/haotool/bunny-click/commit/cf70f0b23900e2c673018db86a9e08d83d2e156a))
* **lint:** 解決 ESLint 程式碼品質問題並排除 team-worktrees ([5db71d7](https://github.com/haotool/bunny-click/commit/5db71d7c99ff7a29945cccaf17b8745ecfb19bdb))
* **ui:** 修正遊戲說明模態窗口手機響應式設計和按鈕佈局 ([bc38eb2](https://github.com/haotool/bunny-click/commit/bc38eb2ba1dfce965bccdd59110720cce31e250e))


### Features

* **infrastructure:** 實作 2025 年最佳實踐全面升級 ([98d8289](https://github.com/haotool/bunny-click/commit/98d8289ab52099427f7341b04472e53b784c0a27))
* **ui:** 優化首頁UI簡潔性並改用高級Material Icons ([312047c](https://github.com/haotool/bunny-click/commit/312047c69f3d48248c019c4c24705f0ba32fa645))


### BREAKING CHANGES

* **infrastructure:** Jest 配置結構重新設計，需要更新 team-worktrees 配置

# [1.2.0](https://github.com/haotool/bunny-click/compare/v1.1.0...v1.2.0) (2025-08-16)


### Bug Fixes

* **ci:** 修復 Jest 配置問題，移除無效的 isolateModules 選項 ([afa62b0](https://github.com/haotool/bunny-click/commit/afa62b0876b94af9c39e919bda3c2ed3e1ef693d))


### Features

* **ai-seo:** 實施完整 AI SEO 優化策略 ([8da14b9](https://github.com/haotool/bunny-click/commit/8da14b9c46ccc3b75df66e9bbb8fb46e12506021))
* **tech-seo:** 完成技術SEO實施總結報告 - 達成100分滿分 ([9fb9748](https://github.com/haotool/bunny-click/commit/9fb9748d2f67f7fa16f92e480ad8357e8c6b2577))
* **tech-seo:** 完成技術SEO架構師專屬工作區建立與品質審計 ([1c8b54d](https://github.com/haotool/bunny-click/commit/1c8b54dc7e5514c71a08adc6cdbfa5c3194faaa6))
* 完成 v7.1.2 AI SEO 全面實施與團隊架構 ([49b3f32](https://github.com/haotool/bunny-click/commit/49b3f3225234bca18970f4960301ea52ccb7fd7b))
* 新增排行榜時間分類功能和完整PWA圖標系統 ([787aa4a](https://github.com/haotool/bunny-click/commit/787aa4a845c13fd73e07509da6bcc7eba16a96be))

## [7.1.2] - 2025-08-16

### ✨ 新功能

- 版本號自動化更新系統
- 語義化版本控制
- PWA 自動版本檢測

### 🔧 技術改進

- 整合 semantic-release
- 自動化版本管理
- 統一版本號格式

---

## [7.1.2] - 2025-08-16

### 🔄 全域域名更新

- **檔案覆蓋**: 更新 index.html、sitemap.xml、robots.txt、llms.txt 等核心檔案
- **文檔同步**: 同步更新所有 SEO 策略文檔中的域名引用

### 🎯 完整 AI SEO 實施

- **GEO 優化**: 實施 Generative Engine Optimization 針對生成式 AI 引擎
- **AEO 整合**: Answer Engine Optimization 讓 AI 問答系統正確推薦
- **AIO 策略**: AI-Informed Optimization 基於 AI 洞察優化內容
- **LLMO 實施**: Large Language Model Optimization 完整實作

### 📊 全面 SEO 策略文檔

- **BDD 測試場景**: 42 個詳細的 SEO 驗收測試場景
- **關鍵字策略**: 3 層關鍵字布局規劃 (品牌詞、主要詞、長尾詞)
- **搜尋引擎提交指南**: Google、Bing、AI 搜尋引擎完整指引
- **實施檢查清單**: 100% 完成度的 SEO 實施追蹤

### 🤖 AI 搜尋友善優化

- **llms.txt 實施**: 為大型語言模型提供結構化資訊指引
- **結構化數據**: 雙重 JSON-LD Schema (WebApplication + VideoGame)
- **AI 問答格式**: FAQ 結構化數據與 AI 友善內容架構
- **推薦系統優化**: 確保在 ChatGPT、Perplexity、Claude 中正確被推薦

### 📱 Meta 標籤完善

- **Open Graph 完整**: 社交媒體分享優化，包含所有必要屬性
- **Twitter Cards**: 大圖卡片格式，提升 Twitter 分享效果
- **PWA Meta 標籤**: Apple、Microsoft 專用標籤完整支援
- **語言地區標記**: 正確的 zh-TW 語系設定

### 🌐 搜尋引擎基礎設施

- **sitemap.xml**: 完整的 XML 網站地圖，包含所有重要頁面
- **robots.txt**: 搜尋引擎爬蟲指引，包含 AI 爬蟲特殊許可
- **canonical URL**: 標準化網址，避免重複內容問題
- **Lighthouse 100**: SEO 評分滿分準備就緒

### 📋 專業 SEO 工作流

- **5 人專業團隊**: 建立完整的 SEO 專家角色分配
- **並行開發架構**: Git worktree 分支管理與協作流程
- **品質保證系統**: 嚴格的程式碼品質與 SEO 標準
- **技術債控制**: 最低技術債，高度可維護性設計

## [7.1.1] - 2025-08-16

### ✨ 新功能

- 版本號自動化更新系統
- 語義化版本控制
- PWA 自動版本檢測

### 🔧 技術改進

- 整合 semantic-release
- 自動化版本管理
- 統一版本號格式

---

## [7.1.0] - 2025-08-16

### ✨ 新功能

- **🏆 排行榜時間分類功能**：新增三種遊戲時間（15秒、30秒、60秒）對應的排行榜分類
- **📱 完整 PWA 圖標系統**：從 bunny-click.png 生成全套 PWA 圖標，支援所有設備尺寸
- **🎮 遊戲時間標記**：排行榜記錄現在顯示對應的遊戲時間模式

### 🎨 介面改進

- 排行榜新增時間篩選標籤（全部、15秒、30秒、60秒）
- 排行榜記錄項目顯示遊戲時間資訊
- 優化排行榜標籤切換體驗

### 📱 PWA 增強

- 新增完整的圖標尺寸支援：16x16, 32x32, 48x48, 72x72, 76x76, 96x96, 120x120, 128x128, 144x144, 152x152, 167x167, 180x180, 192x192, 384x384, 512x512, 1024x1024
- 更新 app.webmanifest 配置以支援所有設備
- 改善 PWA 安裝體驗

### 🔧 技術改進

- 版本號自動化更新系統
- 語義化版本控制
- 統一版本號格式
- 優化資料儲存結構以支援時間分類

---

# [1.1.0](https://github.com/haotool/bunny-click/compare/v1.0.2...v1.1.0) (2025-08-16)

### Features

- 建立完整的自動化最佳實踐落地系統 ([fd69438](https://github.com/haotool/bunny-click/commit/fd694386edc1fa6077c2f44782562e42991c6585))

## [1.0.2](https://github.com/haotool/bunny-click/compare/v1.0.1...v1.0.2) (2025-08-16)

### Bug Fixes

- 移除重複的 Git 操作步驟，讓 semantic-release 完全處理版本管理 ([50c9fb0](https://github.com/haotool/bunny-click/commit/50c9fb0dbc766131b7eb648b7cf169ccab038fd4))

## [1.0.1](https://github.com/haotool/bunny-click/compare/v1.0.0...v1.0.1) (2025-08-16)

### Bug Fixes

- 改善 semantic-release git 插件配置 ([3da9df8](https://github.com/haotool/bunny-click/commit/3da9df804704e70c2bb6eb8854cfe44d44e0343b))

# 1.0.0 (2025-08-16)

### Bug Fixes

- **cache:** 改善快取管理和版本檢測機制 ([263e8ed](https://github.com/haotool/bunny-click/commit/263e8eda1ba4144e2ac0d6f5799ccb190af7bc65))
- **effects:** 修復特效設定變更後未立即生效的問題 ([4287eb8](https://github.com/haotool/bunny-click/commit/4287eb878816e7bfaf06c56f443e8e2897ea5bb7))
- **game:** 修復點擊累加分數功能並優化按鈕佈局 ([bd66dab](https://github.com/haotool/bunny-click/commit/bd66dabbf59fce2d535c3be3121bf88e41ea6a59))
- **UI:** 修復按鈕佈局和分數顯示問題 ([4110571](https://github.com/haotool/bunny-click/commit/41105714c300d58a6b5e06b5efb957d25b0655ca))
- 修正 CI 問題並改善測試配置 ([7b8cadf](https://github.com/haotool/bunny-click/commit/7b8cadf0c97395b5123665574008657329295f75))
- 修正 package.json 中的倉庫 URL 錯誤 ([d7cba4c](https://github.com/haotool/bunny-click/commit/d7cba4ce0501ee55a77bc2d14f16f9f2059fa1d7))
- 完全轉換 update-version.js 為 ES 模組語法 ([0403559](https://github.com/haotool/bunny-click/commit/0403559c85570410e8b85558eaff38bfd057192d))
- 將 update-version.js 從 CommonJS 轉換為 ES 模組語法 ([9f027fe](https://github.com/haotool/bunny-click/commit/9f027fe45c9bc0f6ff4e07609932b9fe9e72afd2))

### Features

- **game:** 增加雙人模式計時邏輯優化 ([57cec98](https://github.com/haotool/bunny-click/commit/57cec9831c72bb535a024cf36d4a2a077714a166))
- **game:** 實現點擊開始計時和30級幽默鼓勵系統 ([9cc0bde](https://github.com/haotool/bunny-click/commit/9cc0bde48d6211354677f75dea87acc9992236fb))
- implement comprehensive automated versioning system and code quality tools ([67fc578](https://github.com/haotool/bunny-click/commit/67fc578c44d7b11805d0597506fe20fd2504b356))
- optimize ESLint configuration and fix code quality issues ([4f432f0](https://github.com/haotool/bunny-click/commit/4f432f069d66628c3d85d1904b72efec31e7836d))
- **UI:** 優化單人和雙人模式的使用者界面 ([912cf0a](https://github.com/haotool/bunny-click/commit/912cf0a183a5b35a6e1bf4acb206293da83388f4))
- **UI:** 優化雙人模式手機版佈局並修復按鈕響應問題 ([361eeae](https://github.com/haotool/bunny-click/commit/361eeae89c8a3de14cf7e349ad64ab1706b02e1e))
- **品質:** 建立完整的程式碼品質保證系統 ([e613ec5](https://github.com/haotool/bunny-click/commit/e613ec5b13298b7f6d1372e9fa3f5f5a19901391))
- **專案:** 初始化 Bunny Click 點擊遊戲專案 ([3261390](https://github.com/haotool/bunny-click/commit/326139089be3e768906c6f27572dc06358c55510))
- **測試:** 建立完整的測試框架與開發工具鏈 ([d4edd3a](https://github.com/haotool/bunny-click/commit/d4edd3a0552ca8633d7d0dab50e699314ab8cf02))

# 📋 變更記錄

本專案遵循 [語義化版本控制 2.0.0](https://semver.org/lang/zh-TW/) 規範。

## [7.0.0] - 2025-01-27

### 🚀 重大更新

- **版本號自動化系統**: 整合 semantic-release 自動化版本管理
- **語義化版本控制**: 採用業界標準的版本號命名規範
- **Git Hooks 整合**: 自動檢查版本號一致性
- **CI/CD 自動化**: GitHub Actions 自動發布流程

### ✨ 新功能

- 自動版本號更新腳本 (`scripts/update-version.js`)
- 版本號一致性檢查腳本 (`scripts/check-version.js`)
- Husky Git Hooks 配置
- 語義化提交訊息規範

### 🔧 技術改進

- 建立 `package.json` 專案配置
- 整合 semantic-release 生態系統
- 自動化 CHANGELOG.md 生成
- 統一版本號格式和檢查機制

### 📚 文檔更新

- 新增版本管理最佳實踐文檔
- 更新專案結構說明
- 添加自動化腳本使用指南

---

## [6.4.0] - 2025-08-15

### 🎨 雙人模式手機版優化與按鈕修復

#### 📱 手機版佈局改進

- **左右佈局保持**: 雙人模式在手機版保持左右並排顯示
- **VS 圖標優化**: 桌面版 50px，手機版 35px，視覺更平衡
- **間距調整**: 優化手機螢幕的元素間距和 padding

#### 🖱️ 按鈕響應修復

- **事件監聽器**: 修復雙人模式按鈕無法響應的問題
- **觸控優化**: 按鈕最小高度 44px，符合觸控標準
- **touch-action**: 添加 manipulation 改善觸控體驗

#### 🐛 點擊累加修復

- **全局變數暴露**: GameState 暴露到 window 對象便於調試
- **分數累加**: 確認點擊累加分數功能正常運作
- **按鈕佈局**: 單人模式結果按鈕改為居中排列

#### ⚙️ 版本管理

- **版本號更新**: 從 v6.3.0 升級至 v6.4.0
- **快取管理**: 修正自動清除快取邏輯，確保版本更新時正確清除舊快取
- **測試工具**: 新增快取測試工具驗證自動更新功能

---

## [6.3.0] - 2025-08-14

### 🎯 精準 TPS 顯示與專案優化

#### 📊 TPS 精度提升

- **小數點精度**: TPS 數值顯示精確到小數點後 1 位
- **顯示優化**: `Math.round(tps * 10) / 10` 算法確保精確計算
- **使用者體驗**: 更準確的點擊速度回饋

#### 🎨 UI 樣式一致性改進

- **TPS 容器樣式**: 統一 TPS 顯示容器設計，與遊戲模式元件保持一致
- **粉藍 RGB 動畫**: 30+ TPS 觸發精緻的粉藍色漸層 RGB 動畫效果
- **最小顯示時間**: RGB 動畫效果至少持續 1 秒，避免閃爍
- **響應式優化**: 雙人對戰結果界面針對手機優化為垂直佈局

#### 📱 移動端體驗優化

- **雙人結果界面**: 全新的移動端友好佈局設計
- **垂直排列**: 手機螢幕下自動切換為上下排列格式
- **觸摸優化**: 改善手機端的觸摸體驗和視覺效果

#### 🧹 專案結構清理

- **測試檔案移除**: 刪除 `tests/`, `dev-tools/`, `tools/`, `assets/screenshots/` 目錄
- **文檔整理**: 移除測試相關文檔 `README-TESTS.md`, `TEST-SUITE-SUMMARY.md`,
  `TPS_TESTING_REPORT.md`, `FIX-VERIFICATION-REPORT.md`
- **專案精簡**: 保持核心功能，移除開發和測試相關檔案
- **文檔更新**: 更新 README.md 和專案結構說明

#### ⚙️ 版本管理

- **版本號更新**: 從 v6.2.0 升級至 v6.3.0
- **快取管理**: 確保 PWA 快取版本同步更新
- **自動更新**: 已安裝的 PWA 用戶將自動檢測並更新至新版本

---

## [6.2.0] - 2025-08-14

### 🎯 TPS 動畫效果重構與雙人模式結果界面全面升級

#### 🌈 TPS RGB 動畫效果重構

- **新容器結構**: 在 TPS 容器外包裝新的 `hud-tps-wrapper` 容器
- **背景動畫**: 將彩色 RGB 動畫效果移至外層容器背景，保持文字可讀性
- **動畫優化**: 移除原先錯誤的動畫效果，實現更流暢的視覺體驗
- **全面支援**: 同時修正單人和雙人模式的 TPS 容器動畫

#### 🏆 雙人模式結果界面全面重新設計

- **對比式佈局**: 全新的左右對稱玩家結果顯示界面
- **數據整合**: 每個玩家的分數和 TPS 整合在同一區塊內，更直觀易讀
- **獲勝者動畫**:
  - 🥇 金牌 3D 旋轉動畫效果
  - ✨ 流動的金色邊框動畫
  - 👑 浮動的皇冠動畫
  - 🌟 獲勝者發光效果和名字金色發光
- **平手處理**: 🤝 友好的握手圖標和"友誼第一"訊息
- **動態元素**: 🔄 旋轉的 VS 分隔符和漸變視覺效果

#### 💻 全螢幕邏輯優化

- **智能檢測**: 添加移動設備檢測功能
- **選擇性全螢幕**: 只在手機或平板設備時自動全螢幕
- **桌面友好**: 桌面電腦不再強制自動全螢幕

#### 🎨 視覺效果增強

- **響應式設計**: 移動設備上自動調整為垂直排列
- **動畫流暢性**: 所有動畫效果經過優化，提供流暢體驗
- **色彩系統**: 統一的金色主題用於獲勝者效果

---

## [6.0.0] - 2025-08-13

### 🎨 UI/UX 全面升級：現代化高級 App 風格設計

- **🏆 精緻獲勝模態窗**:
  - 毛玻璃效果背景 (`backdrop-filter: blur(20px)`)
  - 漸層背景和精緻陰影效果
  - 獎盃彈跳動畫 (`bounce`) 和成就徽章發光效果 (`glow`)
  - 動態成就系統：根據 TPS 表現顯示不同徽章
- **📊 排行榜分頁功能**:
  - 每頁顯示 8 條記錄，支援前後翻頁
  - 單人模式和雙人對戰模式標籤切換
  - 現代化卡片式記錄項目設計
  - 排名徽章系統 (金銀銅 + 其他)
  - 顯示遊戲模式、日期時間、分數和最高 TPS
- **📱 HUD 佈局優化**:
  - 防換行設計：秒數、雙人對戰模式文字保持同一行
  - TPS 預設換行顯示，獨立一行
  - 最小寬度調整為 80px，確保充足顯示空間
- **🎮 單人模式功能完善**:
  - 新增 TPS 顯示功能，與雙人模式共用所有功能
  - 統一的 HUD 設計和佈局
  - 支援所有 TPS 相關功能：計算、峰值記錄、特效觸發

### ⚡ 閃電效果重新設計

- **🌈 粉色藍色漸層閃電**:
  - 移除原本的紅色閃電邏輯
  - 實現粉紅 (#f66fb9) → 白色 (#ffffff) → 粉藍 (#52b7ff) 漸層
  - 使用 `getPinkBlueColor()` 函數生成動態顏色
- **💫 視覺效果優化**:
  - 超高速模式觸發粉色藍色漸層閃電
  - 保持原有的閃電動畫和分支效果
  - 顏色過渡更加柔和自然

### 🌈 TPS 背景效果調整

- **🎨 恢復彩虹 RGB 效果**:
  - TPS 背景改回原本的彩虹漸層效果
  - 使用 `rainbowShift` 動畫，0.8 秒週期
  - 與遊戲整體風格保持協調

### 🏆 成就系統與動畫效果

- **🎯 動態成就徽章**:
  - 單人模式：初露鋒芒 → 點擊高手 → 閃電快手 → 超音速大師
  - 雙人模式：友誼第一 → 激戰高手 → 對戰王者
  - 根據 TPS 表現自動切換徽章和文案
- **✨ 豐富動畫效果**:
  - 獎盃圖標彈跳動畫 (2 秒無限循環)
  - 成就徽章發光效果 (2 秒交替閃爍)
  - 按鈕懸停動畫 (-1px 上移效果)
  - 所有交互元素 0.2s 緩動過渡

### 🔧 技術實現優化

- **📊 數據持久化增強**:
  - 排行榜數據包含最高 TPS 信息
  - 支援按模式篩選和分頁顯示
  - 增加記錄數量上限至 100 條
- **🎨 CSS 設計系統**:
  - 統一的色彩方案和間距系統
  - CSS Grid 和 Flexbox 響應式佈局
  - 硬件加速動畫，流暢 60fps 體驗
- **⚡ JavaScript 功能**:
  - 事件委託和狀態管理
  - 動態 DOM 渲染和內存優化
  - 完善的事件監聽器生命週期管理

---

## [5.0.0] - 2025-08-13

### 🎯 重大更新：TPS 計算系統完全重構

- **✨ 真實 TPS 計算**:
  - 實現基於滑動窗口的準確 TPS 計算算法
  - 告別基於點擊間隔推算的虛假高數值
  - 統計過去 1 秒內的實際點擊次數
- **📊 峰值記錄系統**:
  - 自動追蹤每位玩家的最高 TPS 峰值
  - 結果頁面顯示雙方最高 TPS 成績
  - 支援單人和雙人模式的完整記錄
- **⚡ 技術優化**:
  - 每 100ms 定期更新，提供流暢即時反饋
  - 自動清理過期數據，防止內存洩漏
  - 完善的定時器生命週期管理

### 🌈 全新粉紅白藍漸層閃電設計

- **🎨 配色重設計**:
  - 彩虹閃電改為粉紅 (#f66fb9) → 白色 (#ffffff) → 粉藍 (#52b7ff) 漸層
  - 與遊戲主題色彩完美統一
  - 更柔和優雅的視覺效果
- **💫 動畫優化**:
  - 新的 `pinkBlueShift` 動畫，1.2 秒柔和週期
  - 避免過度放大變粗 (scale 1.02 vs 1.05)
  - 閃電脈衝和鏈狀閃電效果同步更新
- **🎯 合理閾值**:
  - 30+ TPS 觸發炫酷漸層特效（從不可能的 1000 降低）
  - 20+ TPS 觸發水波紋效果
  - 更容易達到，提升用戶成就感

### 🔧 系統穩定性改進

- **🐛 修復閾值不一致問題**:
  - 統一所有 TPS 相關邏輯的觸發閾值
  - 確保視覺效果與實際邏輯完全同步
- **🧠 內存管理優化**:
  - 遊戲開始時正確初始化所有 TPS 數據
  - 遊戲結束時完整清理定時器和數據
  - 長時間遊戲無內存洩漏問題
- **📈 性能提升**:
  - 滑動窗口算法高效實現
  - 合理的更新頻率平衡準確性與性能
  - 優化的數據結構減少計算開銷

### 📊 增強的數據展示

- **🏆 結果頁面升級**:
  - 單人模式：顯示 `最高 TPS：25`
  - 雙人模式：顯示 `最高 TPS - 玩家1：32 | 玩家2：28`
  - 突出顯示玩家的最佳表現
- **🎮 競技性增強**:
  - 激勵玩家挑戰更高 TPS
  - 提供準確的技能水平反饋
  - 支援未來成就系統的數據基礎

---

## [4.0.0] - 2025-08-13

### ✨ 新增功能

- **🎆 勝利煙火系統**: 包含爆裂、環形、螺旋、連鎖四種煙火效果
- **⚡ 增強閃電效果**: 新增閃電脈衝和鏈狀閃電動畫
- **🎭 勝利畫面特效**: 全屏閃爍效果
- **🎵 豐富音效系統**: 支援隨機音調和勝利音效
- **🌈 Grand Finale**: 大結局效果，包含彩色紙屑雨
- **💫 動畫優化**: 更流暢的過渡和視覺反饋

### 🎨 介面改進

- 優化 TPS 顯示器 UI，改善間距和視覺效果
- 增強勝利畫面的視覺衝擊力
- 改善整體動畫流暢度

---

## [3.0.0] - 2025-08-13

### ✨ 新增功能

- **🌈 彩虹閃電效果**: TPS 超過 1000 時啟動壯觀的彩虹漸層閃電動畫
- **📊 增強 TPS 顯示**:
  - 支援最多 5 位數字顯示 (99999 TPS)
  - 等寬字體確保數字對齊
  - 彩虹背景動畫效果
- **🎨 粉藍色設定介面**:
  - 遊戲設定文字改為粉藍色
  - 開關按鈕採用粉藍色漸層
  - 排行榜按鈕使用粉藍色風格

### 🐛 錯誤修復

- **🔧 修復點擊檢測問題**:
  - 解決 OffscreenCanvas 重複初始化錯誤
  - 修復 inputManager 未正確初始化的問題
  - 改善多點觸控響應性
- **⚡ Worker 初始化優化**:
  - 添加重複初始化保護機制
  - 加強錯誤處理和回退機制
  - 提升效果渲染穩定性

### 🎨 介面改進

- **設定介面**: 所有文字改為粉藍色 (`--sky-500`)
- **開關按鈕**: 啟用時顯示粉藍色漸層效果
- **排行榜**:
  - "清除記錄" 按鈕使用粉藍色背景
  - "關閉" 按鈕使用白色背景配粉藍色文字
- **TPS 顯示容器**: 專業的邊框和背景設計

### ⚡ 效能優化

- 改善 OffscreenCanvas 使用效率
- 優化彩虹效果渲染性能
- 減少不必要的 DOM 操作

### 🧪 測試增強

- 新增 TPS 測試工具頁面
- 完整的點擊功能測試套件
- Puppeteer 自動化測試驗證

---

## [2.0.0] - 2025-08-13

### ✨ 新增功能

- **🎮 雙人對戰模式**: 分屏對戰，支援同時多點觸控
- **🌊 水波紋動畫**: 高速點擊時觸發的動態水波效果
- **📊 TPS 顯示**: 即時點擊速度監測
- **🎯 10 級閃電效果**: 根據點擊速度動態調整的視覺效果

### 🎨 介面更新

- 全新的雙人對戰 UI 設計
- 改善的遊戲計時器顯示
- 優化的設定選單

### ⚡ 效能改進

- OffscreenCanvas 渲染優化
- Web Worker 並行處理
- 記憶體使用優化

---

## [1.0.0] - 2025-08-13

### ✨ 首次發布

- **🎯 單人點擊遊戲**: 基礎的點擊挑戰模式
- **⚡ 閃電視覺效果**: 點擊時的動態閃電動畫
- **🎵 音效系統**: Web Audio API 程序化音效
- **📱 PWA 支援**:
  - Service Worker 離線快取
  - Web App Manifest
  - 桌面/主畫面安裝支援
- **🎨 響應式設計**: 支援手機、平板、桌面裝置
- **⚙️ 遊戲設定**:
  - 音效開關
  - 震動回饋
  - 遊戲時間選擇
- **📊 排行榜系統**: LocalStorage 本地記錄

### 🏗️ 技術架構

- 純 HTML5 + CSS3 + JavaScript
- OffscreenCanvas + Web Workers
- 模組化程式架構
- 優雅的錯誤處理

---

## 📋 版本號命名規範

本專案採用 [語義化版本控制 2.0.0](https://semver.org/lang/zh-TW/) 規範：

### 版本號格式：`MAJOR.MINOR.PATCH`

- **MAJOR** (主版本號): 不相容的 API 修改
- **MINOR** (次版本號): 向下相容的功能性新增
- **PATCH** (修訂版本號): 向下相容的問題修正

### 提交訊息規範

- `feat:` - 新功能 (觸發 MINOR 版本更新)
- `fix:` - 錯誤修復 (觸發 PATCH 版本更新)
- `docs:` - 文檔更新 (觸發 PATCH 版本更新)
- `style:` - 程式碼格式調整 (觸發 PATCH 版本更新)
- `refactor:` - 程式碼重構 (觸發 PATCH 版本更新)
- `perf:` - 效能改善 (觸發 PATCH 版本更新)
- `test:` - 測試相關 (觸發 PATCH 版本更新)
- `chore:` - 建置程序或輔助工具的變動 (觸發 PATCH 版本更新)
- `BREAKING CHANGE:` - 破壞性變更 (觸發 MAJOR 版本更新)

---

## 🚀 自動化版本管理

### 快速版本更新

```bash
# 修訂版本 (1.0.0 → 1.0.1)
npm run version:patch

# 次版本 (1.0.0 → 1.1.0)
npm run version:minor

# 主版本 (1.0.0 → 2.0.0)
npm run version:major
```

### 版本號檢查

```bash
# 檢查所有檔案版本號一致性
npm run check-version

# 手動更新所有檔案版本號
npm run update-version-files
```

### 自動發布

```bash
# 執行完整發布流程
npm run release
```

---

## 📊 版本歷史統計

| 版本  | 發布日期   | 主要功能         | 變更類型    |
| ----- | ---------- | ---------------- | ----------- |
| 7.0.0 | 2025-01-27 | 版本號自動化系統 | 🚀 重大更新 |
| 6.4.0 | 2025-08-15 | 手機版優化       | ✨ 新功能   |
| 6.3.0 | 2025-08-14 | TPS 精度提升     | 🎯 改進     |
| 6.2.0 | 2025-08-14 | TPS 動畫重構     | 🎨 重構     |
| 6.0.0 | 2025-08-13 | UI/UX 全面升級   | 🎨 重大改進 |
| 5.0.0 | 2025-08-13 | TPS 系統重構     | 🚀 重大更新 |
| 4.0.0 | 2025-08-13 | 煙火系統         | ✨ 新功能   |
| 3.0.0 | 2025-08-13 | 彩虹閃電效果     | ✨ 新功能   |
| 2.0.0 | 2025-08-13 | 雙人對戰模式     | ✨ 新功能   |
| 1.0.0 | 2025-08-13 | 首次發布         | 🎉 初始版本 |

---

## 🔗 相關連結

- [語義化版本控制 2.0.0](https://semver.org/lang/zh-TW/)
- [Conventional Commits](https://www.conventionalcommits.org/zh-hant/)
- [Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
- [Husky Git Hooks](https://typicode.github.io/husky/)

---

## 📝 圖例說明

- 🚀 重大更新 (Major)
- ✨ 新功能 (Minor)
- 🎯 改進 (Minor)
- 🎨 重構/介面改進 (Patch)
- 🔧 技術改進 (Patch)
- 🐛 錯誤修復 (Patch)
- 📱 PWA 相關 (Patch)
- 🧪 測試相關 (Patch)
- 📊 數據/分析 (Patch)
- 🎮 遊戲功能 (Patch)
- 🌈 視覺效果 (Patch)
- ⚡ 效能優化 (Patch)

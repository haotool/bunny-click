/**
 * Bunny Click Game - 主要入口檔案
 * 100% 對齊原始版本功能
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

// 導入樣式
import './styles/main.css';

// ===== 鼓勵文字系統 =====
const ENCOURAGEMENT_MESSAGES = [
  // 1-5 TPS: 新手鼓勵
  { minTPS: 1, maxTPS: 2, message: '不錯的開始！手指正在熱身中 🔥' },
  { minTPS: 2, maxTPS: 3, message: '感覺到節奏了嗎？繼續保持！ 🎵' },
  { minTPS: 3, maxTPS: 4, message: '你的手指開始跳舞了！💃' },
  { minTPS: 4, maxTPS: 5, message: '穩定的節奏，就像心跳一樣！❤️' },
  { minTPS: 5, maxTPS: 6, message: '手指靈活度 +1！繼續加油！✨' },

  // 6-15 TPS: 進階鼓勵
  { minTPS: 6, maxTPS: 8, message: '哇！你的手指有魔法嗎？🪄' },
  { minTPS: 8, maxTPS: 10, message: '這速度讓螢幕都開始發燙了！🔥' },
  { minTPS: 10, maxTPS: 12, message: '手指變成閃電了！⚡' },
  { minTPS: 12, maxTPS: 15, message: '你是點擊界的鋼琴家！🎹' },
  { minTPS: 15, maxTPS: 18, message: '手速快到模糊了！👻' },

  // 16-30 TPS: 高手級鼓勵
  { minTPS: 18, maxTPS: 20, message: '這是人類的極限嗎？！🚀' },
  { minTPS: 20, maxTPS: 22, message: '手指已經突破音速！💨' },
  { minTPS: 22, maxTPS: 25, message: '你的手指是渦輪增壓的嗎？🏎️' },
  { minTPS: 25, maxTPS: 28, message: '連蜂鳥都自嘆不如！🐦' },
  { minTPS: 28, maxTPS: 30, message: '手指變成光速了！💫' },

  // 31-50 TPS: 超人級鼓勵
  { minTPS: 30, maxTPS: 35, message: '你確定不是機器人嗎？🤖' },
  { minTPS: 35, maxTPS: 40, message: '手指已經進入超次元空間！🌌' },
  { minTPS: 40, maxTPS: 45, message: '這速度連閃電都追不上！⚡⚡' },
  { minTPS: 45, maxTPS: 50, message: '你的手指違反了物理定律！🧪' },
  { minTPS: 50, maxTPS: 55, message: '手指已經超越時空限制！⏰' },

  // 51-70 TPS: 神級鼓勵
  { minTPS: 55, maxTPS: 60, message: '這是傳說中的神之手速！👑' },
  { minTPS: 60, maxTPS: 65, message: '你的手指擁有量子糾纏能力！⚛️' },
  { minTPS: 65, maxTPS: 70, message: '手指已經達到宇宙級頻率！🌟' },
  { minTPS: 70, maxTPS: 75, message: '連時間都為你的速度停止！⏸️' },
  { minTPS: 75, maxTPS: 80, message: '你的手指創造了新的維度！🔮' },

  // 81-100 TPS: 終極鼓勵
  { minTPS: 80, maxTPS: 85, message: '手指已經成為純能量體！💥' },
  { minTPS: 85, maxTPS: 90, message: '你重新定義了「快」這個字！📚' },
  { minTPS: 90, maxTPS: 95, message: '手指速度已經無法用科學解釋！🔬' },
  { minTPS: 95, maxTPS: 100, message: '你就是點擊宇宙的創造者！🌍' },
  { minTPS: 100, maxTPS: Infinity, message: '傳說中的點擊之神降臨！👼' },
];

// 獲取對應 TPS 的鼓勵文字
function getEncouragementMessage(tps) {
  for (const msg of ENCOURAGEMENT_MESSAGES) {
    if (tps >= msg.minTPS && tps < msg.maxTPS) {
      return msg.message;
    }
  }
  return ENCOURAGEMENT_MESSAGES[ENCOURAGEMENT_MESSAGES.length - 1].message;
}

/**
 * 遊戲主要控制器
 */
class BunnyClickGame {
  constructor() {
    // 遊戲狀態
    this.isGameActive = false;
    this.gameMode = 'single'; // 'single' or 'dual'
    this.gameTimer = 30;
    this.timerInterval = null;
    this.encouragementTimeout = null;

    // 遊戲數據
    this.scores = {
      single: 0,
      player1: 0,
      player2: 0,
    };

    this.tps = {
      single: 0,
      player1: 0,
      player2: 0,
    };

    this.clickCounts = {
      single: [],
      player1: [],
      player2: [],
    };

    // DOM 元素
    this.menuScreen = null;
    this.gameScreen = null;
    this.resultModal = null;

    // 初始化
    this.init();
  }

  /**
   * 初始化遊戲
   */
  init() {
    console.info('🐰 Bunny Click Game 初始化中...');

    // 等待 DOM 完全載入
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupGame());
    } else {
      this.setupGame();
    }
  }

  /**
   * 設置遊戲
   */
  setupGame() {
    console.info('🎮 設置遊戲介面...');

    // 獲取主要 DOM 元素
    this.menuScreen = document.getElementById('menuScreen');
    this.gameScreen = document.getElementById('gameScreen');
    this.resultModal = document.getElementById('resultModal');

    // 確保初始狀態正確
    this.showMenuScreen();

    // 綁定事件處理器
    this.bindEventHandlers();

    console.info('✅ 遊戲設置完成');
  }

  /**
   * 綁定事件處理器
   */
  bindEventHandlers() {
    // 主選單按鈕
    const startSingleBtn = document.getElementById('startSingleBtn');
    const startDualBtn = document.getElementById('startDualBtn');
    const leaderboardBtn = document.getElementById('leaderboardBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const gameInfoBtn = document.getElementById('gameInfoBtn');

    if (startSingleBtn) {
      startSingleBtn.addEventListener('click', () => this.startGame('single'));
    }

    if (startDualBtn) {
      startDualBtn.addEventListener('click', () => this.startGame('dual'));
    }

    if (leaderboardBtn) {
      leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.showSettings());
    }

    if (gameInfoBtn) {
      gameInfoBtn.addEventListener('click', () => this.showGameInfo());
    }

    // 遊戲控制按鈕
    const gameExit = document.getElementById('gameExit');
    if (gameExit) {
      gameExit.addEventListener('click', () => this.exitGame());
    }

    // 遊戲區域點擊事件
    const singlePlayerArea = document.getElementById('singlePlayerArea');
    if (singlePlayerArea) {
      singlePlayerArea.addEventListener('click', e => this.handleSingleClick(e));
    }

    const dualPlayerArea = document.getElementById('dualPlayerArea');
    if (dualPlayerArea) {
      dualPlayerArea.addEventListener('click', e => this.handleDualClick(e));
    }

    // 結果畫面按鈕
    const playAgainBtn = document.getElementById('playAgainBtn');
    const backToMenuBtn = document.getElementById('backToMenuBtn');
    const dualPlayAgainBtn = document.getElementById('dualPlayAgainBtn');
    const dualBackToMenuBtn = document.getElementById('dualBackToMenuBtn');

    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => this.playAgain());
    }

    if (backToMenuBtn) {
      backToMenuBtn.addEventListener('click', () => this.backToMenu());
    }

    if (dualPlayAgainBtn) {
      dualPlayAgainBtn.addEventListener('click', () => this.playAgain());
    }

    if (dualBackToMenuBtn) {
      dualBackToMenuBtn.addEventListener('click', () => this.backToMenu());
    }

    // PWA 安裝按鈕
    const pwaInstallBtn = document.getElementById('pwa-install-btn');
    const pwaCloseBtn = document.getElementById('pwa-close-btn');

    if (pwaInstallBtn) {
      pwaInstallBtn.addEventListener('click', () => this.installPWA());
    }

    if (pwaCloseBtn) {
      pwaCloseBtn.addEventListener('click', () => this.closePWABanner());
    }

    console.info('🔗 事件處理器綁定完成');
  }

  /**
   * 顯示主選單畫面
   */
  showMenuScreen() {
    if (this.menuScreen) {
      this.menuScreen.style.display = 'flex';
    }

    if (this.gameScreen) {
      this.gameScreen.setAttribute('aria-hidden', 'true');
      this.gameScreen.style.display = 'none';
    }

    if (this.resultModal) {
      this.resultModal.setAttribute('aria-hidden', 'true');
      this.resultModal.style.display = 'none';
    }
  }

  /**
   * 開始遊戲
   */
  startGame(mode) {
    console.info(`🎮 開始${mode === 'single' ? '單人' : '雙人'}遊戲`);

    this.gameMode = mode;
    this.isGameActive = true;
    this.gameTimer = 30;

    // 重置分數和統計
    this.resetGameStats();

    // 切換到遊戲畫面
    this.showGameScreen();

    // 設置遊戲模式
    this.setupGameMode(mode);

    // 開始計時器
    this.startTimer();
  }

  /**
   * 顯示遊戲畫面
   */
  showGameScreen() {
    if (this.menuScreen) {
      this.menuScreen.style.display = 'none';
    }

    if (this.gameScreen) {
      this.gameScreen.setAttribute('aria-hidden', 'false');
      this.gameScreen.style.display = 'flex';
    }
  }

  /**
   * 設置遊戲模式
   */
  setupGameMode(mode) {
    const singlePlayerArea = document.getElementById('singlePlayerArea');
    const dualPlayerArea = document.getElementById('dualPlayerArea');
    const gameMode = document.getElementById('gameMode');

    if (mode === 'single') {
      if (singlePlayerArea) {
        singlePlayerArea.style.display = 'flex';
      }
      if (dualPlayerArea) {
        dualPlayerArea.style.display = 'none';
      }
      if (gameMode) {
        gameMode.textContent = '單人模式';
      }

      // 重置鼓勵文字
      const encouragementEl = document.getElementById('encouragementText');
      if (encouragementEl) {
        encouragementEl.textContent = '點擊開始你的挑戰！';
      }
    } else {
      if (singlePlayerArea) {
        singlePlayerArea.style.display = 'none';
      }
      if (dualPlayerArea) {
        dualPlayerArea.style.display = 'flex';
      }
      if (gameMode) {
        gameMode.textContent = '雙人對戰';
      }
    }
  }

  /**
   * 重置遊戲統計
   */
  resetGameStats() {
    this.scores = {
      single: 0,
      player1: 0,
      player2: 0,
    };

    this.tps = {
      single: 0,
      player1: 0,
      player2: 0,
    };

    this.clickCounts = {
      single: [],
      player1: [],
      player2: [],
    };

    this.updateDisplays();
  }

  /**
   * 開始計時器
   */
  startTimer() {
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.gameTimer--;
      this.updateTimerDisplay();

      if (this.gameTimer <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  /**
   * 更新計時器顯示
   */
  updateTimerDisplay() {
    const gameTimer = document.getElementById('gameTimer');
    const hudTimerP1 = document.getElementById('hudTimerP1');
    const hudTimerP2 = document.getElementById('hudTimerP2');

    if (gameTimer) {
      gameTimer.textContent = this.gameTimer;
    }
    if (hudTimerP1) {
      hudTimerP1.textContent = this.gameTimer;
    }
    if (hudTimerP2) {
      hudTimerP2.textContent = this.gameTimer;
    }
  }

  /**
   * 處理單人模式點擊
   */
  handleSingleClick(event) {
    if (!this.isGameActive) {
      return;
    }

    this.scores.single++;
    this.clickCounts.single.push(Date.now());

    // 計算 TPS
    this.calculateTPS('single');

    // 更新顯示
    this.updateDisplays();

    // 視覺效果
    this.addClickEffect(event);
  }

  /**
   * 處理雙人模式點擊
   */
  handleDualClick(event) {
    if (!this.isGameActive) {
      return;
    }

    const clickedZone = event.target.closest('.player-zone');
    if (!clickedZone) {
      return;
    }

    const player = clickedZone.dataset.player;
    const playerKey = `player${player}`;

    this.scores[playerKey]++;
    this.clickCounts[playerKey].push(Date.now());

    // 計算 TPS
    this.calculateTPS(playerKey);

    // 更新顯示
    this.updateDisplays();

    // 視覺效果
    this.addClickEffect(event);
  }

  /**
   * 計算 TPS (Taps Per Second)
   */
  calculateTPS(playerKey) {
    const clicks = this.clickCounts[playerKey];
    const now = Date.now();

    // 只計算過去1秒內的點擊
    const recentClicks = clicks.filter(time => now - time <= 1000);
    this.tps[playerKey] = recentClicks.length;

    // 清理舊的點擊記錄
    this.clickCounts[playerKey] = recentClicks;

    // 更新單人模式的鼓勵文字
    if (playerKey === 'single') {
      this.updateEncouragementText(this.tps.single);
    }
  }

  /**
   * 更新鼓勵文字
   */
  updateEncouragementText(currentTPS) {
    const textEl = document.getElementById('encouragementText');
    if (!textEl) {
      return;
    }

    const message = getEncouragementMessage(currentTPS);

    // 只有在文字改變時才更新，並顯示至少1秒
    if (textEl.textContent !== message) {
      textEl.textContent = message;

      // 添加脈衝效果
      textEl.style.animation = 'none';
      textEl.offsetHeight; // 強制重繪
      textEl.style.animation = 'pulse 0.5s ease-in-out';

      // 確保顯示至少1秒
      clearTimeout(this.encouragementTimeout);
      this.encouragementTimeout = setTimeout(() => {
        // 1秒後可以更新為新的文字
      }, 1000);
    }
  }

  /**
   * 更新所有顯示
   */
  updateDisplays() {
    // 分數顯示
    const singleScore = document.getElementById('singleScore');
    const player1Score = document.getElementById('player1Score');
    const player2Score = document.getElementById('player2Score');

    if (singleScore) {
      singleScore.textContent = this.scores.single;
    }
    if (player1Score) {
      player1Score.textContent = this.scores.player1;
    }
    if (player2Score) {
      player2Score.textContent = this.scores.player2;
    }

    // TPS 顯示
    const headerTpsValue = document.getElementById('headerTpsValue');
    const hudTpsP1Value = document.getElementById('hudTpsP1Value');
    const hudTpsP2Value = document.getElementById('hudTpsP2Value');

    if (headerTpsValue) {
      headerTpsValue.textContent = this.tps.single;
    }
    if (hudTpsP1Value) {
      hudTpsP1Value.textContent = this.tps.player1;
    }
    if (hudTpsP2Value) {
      hudTpsP2Value.textContent = this.tps.player2;
    }
  }

  /**
   * 添加點擊效果
   */
  addClickEffect(event) {
    // 簡單的點擊效果，實際實現可能需要更複雜的動畫
    const target = event.currentTarget;
    target.style.transform = 'scale(0.95)';

    setTimeout(() => {
      target.style.transform = '';
    }, 100);
  }

  /**
   * 結束遊戲
   */
  endGame() {
    console.info('🏁 遊戲結束');

    this.isGameActive = false;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    // 顯示結果
    this.showResults();
  }

  /**
   * 顯示結果
   */
  showResults() {
    // 隱藏遊戲畫面
    if (this.gameScreen) {
      this.gameScreen.style.display = 'none';
    }

    // 顯示結果模態框
    if (this.resultModal) {
      this.resultModal.setAttribute('aria-hidden', 'false');
      this.resultModal.style.display = 'flex';
    }

    // 設置結果顯示
    this.setupResultsDisplay();
  }

  /**
   * 設置結果顯示
   */
  setupResultsDisplay() {
    if (this.gameMode === 'single') {
      this.setupSingleResults();
    } else {
      this.setupDualResults();
    }
  }

  /**
   * 設置單人模式結果
   */
  setupSingleResults() {
    const singleResult = document.getElementById('singleResult');
    const dualResult = document.getElementById('dualResult');

    if (singleResult) {
      singleResult.style.display = 'block';
    }
    if (dualResult) {
      dualResult.style.display = 'none';
    }

    // 更新結果數據
    const resultScore = document.getElementById('resultScore');
    const resultTPS = document.getElementById('resultTPS');

    if (resultScore) {
      resultScore.textContent = this.scores.single;
    }
    if (resultTPS) {
      resultTPS.textContent = Math.max(...Object.values(this.tps));
    }
  }

  /**
   * 設置雙人模式結果
   */
  setupDualResults() {
    const singleResult = document.getElementById('singleResult');
    const dualResult = document.getElementById('dualResult');

    if (singleResult) {
      singleResult.style.display = 'none';
    }
    if (dualResult) {
      dualResult.style.display = 'block';
    }

    // 更新結果數據
    const player1ResultScore = document.getElementById('player1ResultScore');
    const player1ResultTPS = document.getElementById('player1ResultTPS');
    const player2ResultScore = document.getElementById('player2ResultScore');
    const player2ResultTPS = document.getElementById('player2ResultTPS');

    if (player1ResultScore) {
      player1ResultScore.textContent = this.scores.player1;
    }
    if (player1ResultTPS) {
      player1ResultTPS.textContent = this.tps.player1;
    }
    if (player2ResultScore) {
      player2ResultScore.textContent = this.scores.player2;
    }
    if (player2ResultTPS) {
      player2ResultTPS.textContent = this.tps.player2;
    }

    // 判斷勝負
    this.updateWinnerDisplay();
  }

  /**
   * 更新勝負顯示
   */
  updateWinnerDisplay() {
    const dualResultTitle = document.getElementById('dualResultTitle');
    const dualResultSubtitle = document.getElementById('dualResultSubtitle');

    if (this.scores.player1 > this.scores.player2) {
      if (dualResultTitle) {
        dualResultTitle.textContent = '玩家 1 獲勝！';
      }
      if (dualResultSubtitle) {
        dualResultSubtitle.textContent = '恭喜獲得勝利！';
      }
    } else if (this.scores.player2 > this.scores.player1) {
      if (dualResultTitle) {
        dualResultTitle.textContent = '玩家 2 獲勝！';
      }
      if (dualResultSubtitle) {
        dualResultSubtitle.textContent = '恭喜獲得勝利！';
      }
    } else {
      if (dualResultTitle) {
        dualResultTitle.textContent = '平手！';
      }
      if (dualResultSubtitle) {
        dualResultSubtitle.textContent = '勢均力敵的對決！';
      }
    }
  }

  /**
   * 再來一局
   */
  playAgain() {
    console.info('🔄 再來一局');
    this.startGame(this.gameMode);
  }

  /**
   * 返回主選單
   */
  backToMenu() {
    console.info('🏠 返回主選單');
    this.showMenuScreen();
  }

  /**
   * 離開遊戲
   */
  exitGame() {
    console.info('🚪 離開遊戲');

    this.isGameActive = false;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.showMenuScreen();
  }

  /**
   * 顯示排行榜
   */
  showLeaderboard() {
    console.info('🏆 顯示排行榜');
    const modal = document.getElementById('leaderboardModal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  /**
   * 顯示設定
   */
  showSettings() {
    console.info('⚙️ 顯示設定');
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  /**
   * 顯示遊戲說明
   */
  showGameInfo() {
    console.info('ℹ️ 顯示遊戲說明');
    const modal = document.getElementById('gameInfoModal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  /**
   * 安裝 PWA
   */
  installPWA() {
    console.info('📱 安裝 PWA');
    // TODO: 實現 PWA 安裝功能
  }

  /**
   * 關閉 PWA 安裝橫幅
   */
  closePWABanner() {
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (pwaBanner) {
      pwaBanner.classList.add('hidden');
    }
  }
}

// 等待 DOM 載入完成後再初始化遊戲 (Context7 最佳實踐)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGame);
} else {
  initializeGame();
}

function initializeGame() {
  // 啟動遊戲
  const game = new BunnyClickGame();

  // 設置模態框事件監聽器
  setupModalListeners();

  // 將遊戲物件和類別匯出到全域範圍 (向後相容性)
  window.game = game;
  window.BunnyClickGame = BunnyClickGame;
  window.getEncouragementMessage = getEncouragementMessage;

  console.info('🎮 Bunny Click Game v7.2.3 初始化完成');
  return game;
}

/**
 * 設置模態框事件監聽器
 */
function setupModalListeners() {
  // 排行榜模態框
  const closeLeaderboardBtn = document.getElementById('closeLeaderboardBtn');
  if (closeLeaderboardBtn) {
    closeLeaderboardBtn.addEventListener('click', () => {
      closeModal('leaderboardModal');
    });
  }

  // 設定模態框
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
      closeModal('settingsModal');
    });
  }

  // 遊戲說明模態框
  const closeGameInfoBtn = document.getElementById('closeGameInfoBtn');
  if (closeGameInfoBtn) {
    closeGameInfoBtn.addEventListener('click', () => {
      closeModal('gameInfoModal');
    });
  }

  // 點擊背景關閉模態框
  const modals = ['leaderboardModal', 'settingsModal', 'gameInfoModal'];
  modals.forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modalId);
        }
      });
    }
  });

  // ESC 鍵關閉模態框
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && modal.getAttribute('aria-hidden') === 'false') {
          closeModal(modalId);
        }
      });
    }
  });
}

/**
 * 關閉模態框
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
  }
}

// ES6 模組匯出 (現代化最佳實踐)
export { BunnyClickGame, getEncouragementMessage };
export default BunnyClickGame;

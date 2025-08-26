/**
 * GameEngine - 遊戲引擎核心服務
 * 負責遊戲狀態管理、計時器、分數計算和遊戲流程控制
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

/**
 * 遊戲狀態管理
 */
export const GameState = {
  isPlaying: false,
  hasStarted: false,
  mode: 'single', // 'single' | 'dual'
  timeLeft: 30,
  scores: {
    single: 0,
    player1: 0,
    player2: 0,
  },
  settings: {
    soundEnabled: true,
    vibrationEnabled: true,
    gameDuration: 30,
    rippleEnabled: true,
    effectsEnabled: true,
    difficulty: 'normal', // 'easy' | 'normal' | 'hard'
    theme: 'default',
  },
  statistics: {
    totalClicks: 0,
    totalPlayTime: 0,
    highestTPS: 0,
    gamesPlayed: 0,
    achievements: [],
  },
};

/**
 * TPS (Taps Per Second) 計算相關常數
 */
export const TPS_CONFIG = {
  WINDOW_SIZE: 1000, // 1秒視窗
  SPEED_STEP: 0.5,   // 每 0.5 TPS 一級
  MAX_LEVEL: 10,      // 最大特效等級
};

/**
 * 遊戲引擎主類別
 */
export class GameEngine {
  constructor(options = {}) {
    this.audioManager = options.audioManager;
    this.effectsManager = options.effectsManager;
    this.storageService = options.storageService;

    // 計時器相關
    this.gameTimer = null;
    this.tpsTimer = null;
    this.updateTimer = null;

    // TPS 計算相關
    this.clickTimes = [];
    this.currentTPS = 0;

    // 遊戲事件監聽器
    this.eventListeners = new Map();

    // 初始化狀態
    this.isInitialized = false;
  }

  /**
   * 初始化遊戲引擎
   */
  async init() {
    console.log('🎮 初始化遊戲引擎...');

    try {
      // 載入儲存的設定
      await this.loadSettings();

      // 綁定鍵盤事件
      this.bindKeyboardEvents();

      // 初始化 TPS 計算器
      this.initTPSCalculator();

      this.isInitialized = true;
      console.log('✅ 遊戲引擎初始化完成');

    } catch (error) {
      console.error('❌ 遊戲引擎初始化失敗:', error);
      throw error;
    }
  }

  /**
   * 啟動遊戲引擎
   */
  async start() {
    if (!this.isInitialized) {
      throw new Error('遊戲引擎尚未初始化');
    }

    console.log('🚀 啟動遊戲引擎');
    this.emit('engine:started');
  }

  /**
   * 開始單人遊戲
   */
  startSinglePlayer() {
    console.log('🎯 開始單人遊戲');

    this.resetGame();
    GameState.mode = 'single';
    GameState.isPlaying = true;
    GameState.hasStarted = true;
    GameState.timeLeft = GameState.settings.gameDuration;

    this.startGameTimer();
    this.startUpdateLoop();

    // 播放開始音效
    this.audioManager?.playSound('game_start');

    this.emit('game:started', { mode: 'single' });
  }

  /**
   * 開始雙人遊戲
   */
  startDualPlayer() {
    console.log('👥 開始雙人遊戲');

    this.resetGame();
    GameState.mode = 'dual';
    GameState.isPlaying = true;
    GameState.hasStarted = true;
    GameState.timeLeft = GameState.settings.gameDuration;

    this.startGameTimer();
    this.startUpdateLoop();

    // 播放開始音效
    this.audioManager?.playSound('game_start');

    this.emit('game:started', { mode: 'dual' });
  }

  /**
   * 結束遊戲
   */
  exitGame() {
    console.log('🔚 結束遊戲');

    const wasPlaying = GameState.isPlaying;

    GameState.isPlaying = false;
    GameState.hasStarted = false;

    // 清除計時器
    this.clearAllTimers();

    if (wasPlaying) {
      // 儲存遊戲結果
      this.saveGameResult();

      // 播放結束音效
      this.audioManager?.playSound('game_end');

      this.emit('game:ended', {
        mode: GameState.mode,
        scores: { ...GameState.scores },
        tps: this.currentTPS,
      });
    }

    this.emit('game:exited');
  }

  /**
   * 暫停遊戲
   */
  pause() {
    if (GameState.isPlaying) {
      console.log('⏸️ 暫停遊戲');
      GameState.isPlaying = false;
      this.clearAllTimers();
      this.emit('game:paused');
    }
  }

  /**
   * 恢復遊戲
   */
  resume() {
    if (GameState.hasStarted && !GameState.isPlaying) {
      console.log('▶️ 恢復遊戲');
      GameState.isPlaying = true;
      this.startGameTimer();
      this.startUpdateLoop();
      this.emit('game:resumed');
    }
  }

  /**
   * 處理點擊事件
   */
  handleClick(player = 'single', clickData = {}) {
    if (!GameState.isPlaying) {return;}

    const now = Date.now();

    // 記錄點擊時間用於 TPS 計算
    this.clickTimes.push(now);

    // 增加分數
    if (player === 'single' || player === 'player1') {
      GameState.scores[player === 'single' ? 'single' : 'player1']++;
    } else if (player === 'player2') {
      GameState.scores.player2++;
    }

    // 更新統計
    GameState.statistics.totalClicks++;

    // 播放點擊音效
    this.audioManager?.playSound('click', {
      volume: this.calculateClickVolume(),
    });

    // 觸發視覺效果
    if (GameState.settings.rippleEnabled) {
      this.effectsManager?.createRipple(clickData);
    }

    if (GameState.settings.effectsEnabled) {
      this.effectsManager?.createClickEffect(clickData);
    }

    // 觸發震動回饋
    if (GameState.settings.vibrationEnabled) {
      this.triggerVibration();
    }

    this.emit('game:click', {
      player,
      score: GameState.scores[player === 'single' ? 'single' : player],
      tps: this.currentTPS,
      clickData,
    });
  }

  /**
   * 重設遊戲狀態
   */
  resetGame() {
    GameState.scores.single = 0;
    GameState.scores.player1 = 0;
    GameState.scores.player2 = 0;
    GameState.timeLeft = GameState.settings.gameDuration;
    GameState.isPlaying = false;
    GameState.hasStarted = false;

    this.clickTimes = [];
    this.currentTPS = 0;

    this.clearAllTimers();

    this.emit('game:reset');
  }

  /**
   * 開始遊戲計時器
   */
  startGameTimer() {
    this.clearTimer('gameTimer');

    this.gameTimer = setInterval(() => {
      if (GameState.isPlaying && GameState.timeLeft > 0) {
        GameState.timeLeft--;

        this.emit('game:tick', { timeLeft: GameState.timeLeft });

        // 時間到結束遊戲
        if (GameState.timeLeft === 0) {
          this.exitGame();
        }
      }
    }, 1000);
  }

  /**
   * 開始更新循環
   */
  startUpdateLoop() {
    this.clearTimer('updateTimer');

    this.updateTimer = setInterval(() => {
      if (GameState.isPlaying) {
        // 更新 TPS
        this.updateTPS();

        // 發送更新事件
        this.emit('game:update', {
          scores: { ...GameState.scores },
          timeLeft: GameState.timeLeft,
          tps: this.currentTPS,
        });
      }
    }, 100); // 100ms 更新間隔
  }

  /**
   * 初始化 TPS 計算器
   */
  initTPSCalculator() {
    this.clearTimer('tpsTimer');

    this.tpsTimer = setInterval(() => {
      this.updateTPS();
    }, 100); // 每 100ms 計算一次
  }

  /**
   * 更新 TPS 計算
   */
  updateTPS() {
    const now = Date.now();
    const cutoff = now - TPS_CONFIG.WINDOW_SIZE;

    // 移除超過時間窗口的點擊
    this.clickTimes = this.clickTimes.filter(time => time > cutoff);

    // 計算當前 TPS
    this.currentTPS = this.clickTimes.length;

    // 更新最高 TPS 記錄
    if (this.currentTPS > GameState.statistics.highestTPS) {
      GameState.statistics.highestTPS = this.currentTPS;
    }
  }

  /**
   * 計算 TPS 等級（用於特效強度）
   */
  getTpsLevel() {
    return Math.max(1, Math.min(TPS_CONFIG.MAX_LEVEL,
      Math.floor(this.currentTPS / TPS_CONFIG.SPEED_STEP) + 1,
    ));
  }

  /**
   * 計算點擊音量
   */
  calculateClickVolume() {
    const baseVolume = 0.3;
    const tpsBonus = Math.min(this.currentTPS * 0.05, 0.4);
    return Math.min(baseVolume + tpsBonus, 1.0);
  }

  /**
   * 觸發震動回饋
   */
  triggerVibration() {
    if ('vibrate' in navigator && GameState.settings.vibrationEnabled) {
      const intensity = Math.min(this.currentTPS * 2, 50);
      navigator.vibrate(intensity);
    }
  }

  /**
   * 綁定鍵盤事件
   */
  bindKeyboardEvents() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' && GameState.isPlaying) {
        this.exitGame();
      }

      if (event.code === 'Space' && !GameState.isPlaying) {
        event.preventDefault();
        this.startSinglePlayer();
      }
    });
  }

  /**
   * 載入設定
   */
  async loadSettings() {
    if (this.storageService) {
      try {
        const settings = await this.storageService.getSettings();
        Object.assign(GameState.settings, settings);
        console.log('✅ 設定載入完成');
      } catch (error) {
        console.warn('⚠️ 設定載入失敗，使用預設值:', error);
      }
    }
  }

  /**
   * 儲存遊戲結果
   */
  async saveGameResult() {
    if (this.storageService) {
      try {
        const gameResult = {
          mode: GameState.mode,
          scores: { ...GameState.scores },
          tps: this.currentTPS,
          duration: GameState.settings.gameDuration - GameState.timeLeft,
          timestamp: Date.now(),
        };

        await this.storageService.saveGameHistory(gameResult);

        // 更新統計
        GameState.statistics.gamesPlayed++;
        GameState.statistics.totalPlayTime += gameResult.duration;

      } catch (error) {
        console.warn('⚠️ 遊戲結果儲存失敗:', error);
      }
    }
  }

  /**
   * 清除指定計時器
   */
  clearTimer(timerName) {
    if (this[timerName]) {
      clearInterval(this[timerName]);
      this[timerName] = null;
    }
  }

  /**
   * 清除所有計時器
   */
  clearAllTimers() {
    this.clearTimer('gameTimer');
    this.clearTimer('updateTimer');
    // TPS 計時器持續運行，不需要清除
  }

  /**
   * 事件發射器
   */
  emit(eventName, data) {
    const listeners = this.eventListeners.get(eventName) || [];
    listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`事件處理錯誤 [${eventName}]:`, error);
      }
    });
  }

  /**
   * 添加事件監聽器
   */
  on(eventName, callback) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    this.eventListeners.get(eventName).push(callback);
  }

  /**
   * 移除事件監聽器
   */
  off(eventName, callback) {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * 獲取當前遊戲狀態
   */
  getState() {
    return {
      ...GameState,
      currentTPS: this.currentTPS,
      tpsLevel: this.getTpsLevel(),
    };
  }

  /**
   * 銷毀遊戲引擎
   */
  destroy() {
    console.log('🔥 銷毀遊戲引擎');

    this.clearAllTimers();
    this.clearTimer('tpsTimer');
    this.eventListeners.clear();

    this.isInitialized = false;
  }
}

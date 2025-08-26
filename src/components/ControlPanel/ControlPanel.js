/**
 * ControlPanel - 控制面板元件
 * 負責遊戲控制、設定和模式切換
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

export class ControlPanel {
  constructor(options = {}) {
    this.container = options.container;
    this.gameEngine = options.gameEngine;
    this.audioManager = options.audioManager;

    this.element = null;
    this.startButton = null;
    this.resetButton = null;
    this.modeToggle = null;
    this.isInitialized = false;
  }

  /**
   * 初始化控制面板
   */
  async init() {
    console.log('🎛️ 初始化控制面板...');

    try {
      this.createElement();
      this.bindEvents();
      this.updateDisplay();
      this.isInitialized = true;
      console.log('✅ 控制面板初始化完成');

    } catch (error) {
      console.error('❌ 控制面板初始化失敗:', error);
      throw error;
    }
  }

  /**
   * 創建控制面板元素
   */
  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'control-panel';
    this.element.innerHTML = `
      <div class="panel-section game-controls">
        <button id="start-button" class="control-btn start-btn" type="button">
          <span class="btn-icon">▶️</span>
          <span class="btn-text">開始遊戲</span>
        </button>
        
        <button id="reset-button" class="control-btn reset-btn" type="button">
          <span class="btn-icon">🔄</span>
          <span class="btn-text">重新開始</span>
        </button>
        
        <button id="exit-button" class="control-btn exit-btn hidden" type="button">
          <span class="btn-icon">⏹️</span>
          <span class="btn-text">結束遊戲</span>
        </button>
      </div>
      
      <div class="panel-section mode-controls">
        <div class="mode-selector">
          <button id="single-mode-btn" class="mode-btn active" data-mode="single">
            <span class="mode-icon">🐰</span>
            <span class="mode-text">單人模式</span>
          </button>
          
          <button id="dual-mode-btn" class="mode-btn" data-mode="dual">
            <span class="mode-icon">👥</span>
            <span class="mode-text">雙人模式</span>
          </button>
        </div>
      </div>
      
      <div class="panel-section settings-controls">
        <div class="setting-group">
          <button id="sound-toggle" class="setting-btn active" type="button">
            <span class="setting-icon">🔊</span>
            <span class="setting-text">音效</span>
          </button>
          
          <button id="vibration-toggle" class="setting-btn active" type="button">
            <span class="setting-icon">📳</span>
            <span class="setting-text">震動</span>
          </button>
          
          <button id="effects-toggle" class="setting-btn active" type="button">
            <span class="setting-icon">✨</span>
            <span class="setting-text">特效</span>
          </button>
        </div>
      </div>
      
      <div class="panel-section info-display">
        <div class="version-info">
          <span>版本 v7.2.3</span>
        </div>
      </div>
    `;

    this.container.appendChild(this.element);

    // 獲取按鈕引用
    this.startButton = document.getElementById('start-button');
    this.resetButton = document.getElementById('reset-button');
    this.exitButton = document.getElementById('exit-button');
    this.singleModeBtn = document.getElementById('single-mode-btn');
    this.dualModeBtn = document.getElementById('dual-mode-btn');
    this.soundToggle = document.getElementById('sound-toggle');
    this.vibrationToggle = document.getElementById('vibration-toggle');
    this.effectsToggle = document.getElementById('effects-toggle');
  }

  /**
   * 綁定事件
   */
  bindEvents() {
    // 遊戲控制按鈕
    this.startButton?.addEventListener('click', () => {
      this.handleStartGame();
    });

    this.resetButton?.addEventListener('click', () => {
      this.handleResetGame();
    });

    this.exitButton?.addEventListener('click', () => {
      this.handleExitGame();
    });

    // 模式選擇按鈕
    this.singleModeBtn?.addEventListener('click', () => {
      this.handleModeChange('single');
    });

    this.dualModeBtn?.addEventListener('click', () => {
      this.handleModeChange('dual');
    });

    // 設定切換按鈕
    this.soundToggle?.addEventListener('click', () => {
      this.handleSoundToggle();
    });

    this.vibrationToggle?.addEventListener('click', () => {
      this.handleVibrationToggle();
    });

    this.effectsToggle?.addEventListener('click', () => {
      this.handleEffectsToggle();
    });

    // 遊戲引擎事件
    if (this.gameEngine) {
      this.gameEngine.on('game:started', this.onGameStarted.bind(this));
      this.gameEngine.on('game:ended', this.onGameEnded.bind(this));
      this.gameEngine.on('game:exited', this.onGameExited.bind(this));
    }
  }

  /**
   * 處理開始遊戲
   */
  handleStartGame() {
    const state = this.gameEngine?.getState();
    if (!state) {return;}

    if (state.mode === 'dual') {
      this.gameEngine.startDualPlayer();
    } else {
      this.gameEngine.startSinglePlayer();
    }
  }

  /**
   * 處理重新開始
   */
  handleResetGame() {
    this.gameEngine?.resetGame();
    this.updateDisplay();
  }

  /**
   * 處理結束遊戲
   */
  handleExitGame() {
    this.gameEngine?.exitGame();
  }

  /**
   * 處理模式變更
   */
  handleModeChange(mode) {
    const state = this.gameEngine?.getState();
    if (state?.isPlaying) {return;} // 遊戲進行中不能切換模式

    // 更新模式按鈕樣式
    this.singleModeBtn?.classList.toggle('active', mode === 'single');
    this.dualModeBtn?.classList.toggle('active', mode === 'dual');

    // 更新遊戲狀態
    if (this.gameEngine) {
      const currentState = this.gameEngine.getState();
      currentState.mode = mode;
    }
  }

  /**
   * 處理音效切換
   */
  handleSoundToggle() {
    const isEnabled = this.audioManager?.toggle();

    this.soundToggle?.classList.toggle('active', isEnabled);

    // 更新圖示
    const icon = this.soundToggle?.querySelector('.setting-icon');
    if (icon) {
      icon.textContent = isEnabled ? '🔊' : '🔇';
    }
  }

  /**
   * 處理震動切換
   */
  handleVibrationToggle() {
    const state = this.gameEngine?.getState();
    if (!state) {return;}

    const newValue = !state.settings.vibrationEnabled;
    state.settings.vibrationEnabled = newValue;

    this.vibrationToggle?.classList.toggle('active', newValue);

    // 更新圖示
    const icon = this.vibrationToggle?.querySelector('.setting-icon');
    if (icon) {
      icon.textContent = newValue ? '📳' : '📴';
    }
  }

  /**
   * 處理特效切換
   */
  handleEffectsToggle() {
    const state = this.gameEngine?.getState();
    if (!state) {return;}

    const newValue = !state.settings.effectsEnabled;
    state.settings.effectsEnabled = newValue;

    this.effectsToggle?.classList.toggle('active', newValue);

    // 更新圖示
    const icon = this.effectsToggle?.querySelector('.setting-icon');
    if (icon) {
      icon.textContent = newValue ? '✨' : '⚫';
    }
  }

  /**
   * 遊戲開始事件處理
   */
  onGameStarted(data) {
    this.showGameRunningState();
  }

  /**
   * 遊戲結束事件處理
   */
  onGameEnded(data) {
    this.showGameEndedState();
  }

  /**
   * 遊戲退出事件處理
   */
  onGameExited() {
    this.showGameIdleState();
  }

  /**
   * 顯示遊戲運行狀態
   */
  showGameRunningState() {
    this.startButton?.classList.add('hidden');
    this.exitButton?.classList.remove('hidden');

    // 遊戲進行中禁用模式切換
    this.singleModeBtn?.setAttribute('disabled', 'true');
    this.dualModeBtn?.setAttribute('disabled', 'true');
  }

  /**
   * 顯示遊戲結束狀態
   */
  showGameEndedState() {
    this.startButton?.classList.remove('hidden');
    this.exitButton?.classList.add('hidden');

    // 啟用模式切換
    this.singleModeBtn?.removeAttribute('disabled');
    this.dualModeBtn?.removeAttribute('disabled');

    // 更新開始按鈕文字
    const btnText = this.startButton?.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = '再玩一次';
    }
  }

  /**
   * 顯示遊戲空閒狀態
   */
  showGameIdleState() {
    this.startButton?.classList.remove('hidden');
    this.exitButton?.classList.add('hidden');

    // 啟用模式切換
    this.singleModeBtn?.removeAttribute('disabled');
    this.dualModeBtn?.removeAttribute('disabled');

    // 還原開始按鈕文字
    const btnText = this.startButton?.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = '開始遊戲';
    }
  }

  /**
   * 更新顯示
   */
  updateDisplay() {
    const state = this.gameEngine?.getState();
    if (!state) {return;}

    // 更新模式按鈕
    this.singleModeBtn?.classList.toggle('active', state.mode === 'single');
    this.dualModeBtn?.classList.toggle('active', state.mode === 'dual');

    // 更新設定按鈕
    this.soundToggle?.classList.toggle('active', state.settings.soundEnabled);
    this.vibrationToggle?.classList.toggle('active', state.settings.vibrationEnabled);
    this.effectsToggle?.classList.toggle('active', state.settings.effectsEnabled);

    // 根據遊戲狀態顯示對應的按鈕
    if (state.isPlaying) {
      this.showGameRunningState();
    } else if (state.hasStarted) {
      this.showGameEndedState();
    } else {
      this.showGameIdleState();
    }
  }

  /**
   * 處理視窗大小變化
   */
  handleResize() {
    // 可以根據需要調整控制面板布局
  }

  /**
   * 銷毀控制面板
   */
  destroy() {
    console.log('🔥 銷毀控制面板');

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    this.element = null;
    this.startButton = null;
    this.resetButton = null;
    this.exitButton = null;
    this.singleModeBtn = null;
    this.dualModeBtn = null;
    this.soundToggle = null;
    this.vibrationToggle = null;
    this.effectsToggle = null;
    this.isInitialized = false;
  }
}

/**
 * GameBoard - 遊戲主畫面元件
 * 負責遊戲區域的渲染和互動處理
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

export class GameBoard {
  constructor(options = {}) {
    this.container = options.container;
    this.gameEngine = options.gameEngine;
    this.effectsManager = options.effectsManager;

    this.element = null;
    this.bunnyButton = null;
    this.player2Button = null;
    this.isInitialized = false;
  }

  /**
   * 初始化遊戲板
   */
  async init() {
    console.log('🎮 初始化遊戲板...');

    try {
      this.createElement();
      this.bindEvents();
      this.isInitialized = true;
      console.log('✅ 遊戲板初始化完成');

    } catch (error) {
      console.error('❌ 遊戲板初始化失敗:', error);
      throw error;
    }
  }

  /**
   * 創建遊戲板元素
   */
  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'game-board';
    this.element.innerHTML = `
      <div class="game-area">
        <div class="bunny-zone">
          <button id="bunny-button" class="bunny-btn" type="button">
            <span class="bunny-emoji">🐰</span>
            <span class="click-text">點我！</span>
          </button>
        </div>
        
        <div class="dual-zone hidden" id="dual-zone">
          <div class="player-zone player-1">
            <button id="player1-button" class="player-btn player-1-btn" type="button">
              <span class="player-emoji">🐰</span>
              <span class="player-text">玩家 1</span>
            </button>
          </div>
          <div class="player-zone player-2">
            <button id="player2-button" class="player-btn player-2-btn" type="button">
              <span class="player-emoji">🐹</span>
              <span class="player-text">玩家 2</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(this.element);

    // 獲取按鈕引用
    this.bunnyButton = document.getElementById('bunny-button');
    this.player1Button = document.getElementById('player1-button');
    this.player2Button = document.getElementById('player2-button');
  }

  /**
   * 綁定事件
   */
  bindEvents() {
    // 主要兔兔按鈕
    if (this.bunnyButton) {
      this.bunnyButton.addEventListener('click', (event) => {
        this.handleBunnyClick(event);
      });
    }

    // 雙人模式按鈕
    if (this.player1Button) {
      this.player1Button.addEventListener('click', (event) => {
        this.handlePlayerClick(event, 'player1');
      });
    }

    if (this.player2Button) {
      this.player2Button.addEventListener('click', (event) => {
        this.handlePlayerClick(event, 'player2');
      });
    }

    // 遊戲引擎事件
    if (this.gameEngine) {
      this.gameEngine.on('game:started', this.onGameStarted.bind(this));
      this.gameEngine.on('game:ended', this.onGameEnded.bind(this));
      this.gameEngine.on('game:update', this.onGameUpdate.bind(this));
    }
  }

  /**
   * 處理兔兔按鈕點擊
   */
  handleBunnyClick(event) {
    const clickData = this.getClickData(event);

    // 通知遊戲引擎
    this.gameEngine?.handleClick('single', clickData);

    // 視覺回饋
    this.addClickFeedback(this.bunnyButton);
  }

  /**
   * 處理玩家按鈕點擊
   */
  handlePlayerClick(event, player) {
    const clickData = this.getClickData(event);

    // 通知遊戲引擎
    this.gameEngine?.handleClick(player, clickData);

    // 視覺回饋
    const button = player === 'player1' ? this.player1Button : this.player2Button;
    this.addClickFeedback(button);
  }

  /**
   * 獲取點擊資料
   */
  getClickData(event) {
    const rect = event.target.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      timestamp: Date.now(),
      target: event.target,
    };
  }

  /**
   * 添加點擊視覺回饋
   */
  addClickFeedback(button) {
    if (!button) {return;}

    // 添加點擊動畫類別
    button.classList.add('clicked');

    // 移除動畫類別
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 150);
  }

  /**
   * 遊戲開始事件處理
   */
  onGameStarted(data) {
    const { mode } = data;

    if (mode === 'dual') {
      this.showDualMode();
    } else {
      this.showSingleMode();
    }
  }

  /**
   * 遊戲結束事件處理
   */
  onGameEnded(data) {
    // 可以添加遊戲結束的視覺效果
  }

  /**
   * 遊戲更新事件處理
   */
  onGameUpdate(data) {
    // 可以根據遊戲狀態更新 UI
  }

  /**
   * 顯示單人模式
   */
  showSingleMode() {
    const bunnyZone = this.element.querySelector('.bunny-zone');
    const dualZone = this.element.querySelector('.dual-zone');

    if (bunnyZone) {bunnyZone.classList.remove('hidden');}
    if (dualZone) {dualZone.classList.add('hidden');}
  }

  /**
   * 顯示雙人模式
   */
  showDualMode() {
    const bunnyZone = this.element.querySelector('.bunny-zone');
    const dualZone = this.element.querySelector('.dual-zone');

    if (bunnyZone) {bunnyZone.classList.add('hidden');}
    if (dualZone) {dualZone.classList.remove('hidden');}
  }

  /**
   * 處理視窗大小變化
   */
  handleResize() {
    // 可以根據需要調整遊戲區域大小
  }

  /**
   * 銷毀遊戲板
   */
  destroy() {
    console.log('🔥 銷毀遊戲板');

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    this.element = null;
    this.bunnyButton = null;
    this.player1Button = null;
    this.player2Button = null;
    this.isInitialized = false;
  }
}

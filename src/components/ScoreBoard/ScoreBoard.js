/**
 * ScoreBoard - 分數板元件
 * 負責顯示分數、時間、TPS 等遊戲資訊
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

export class ScoreBoard {
  constructor(options = {}) {
    this.container = options.container;
    this.gameEngine = options.gameEngine;

    this.element = null;
    this.scoreDisplay = null;
    this.timeDisplay = null;
    this.tpsDisplay = null;
    this.isInitialized = false;
  }

  /**
   * 初始化分數板
   */
  async init() {
    console.log('📊 初始化分數板...');

    try {
      this.createElement();
      this.bindEvents();
      this.updateDisplay();
      this.isInitialized = true;
      console.log('✅ 分數板初始化完成');

    } catch (error) {
      console.error('❌ 分數板初始化失敗:', error);
      throw error;
    }
  }

  /**
   * 創建分數板元素
   */
  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'score-board';
    this.element.innerHTML = `
      <div class="score-container">
        <div class="score-section single-score" id="single-score">
          <div class="score-label">分數</div>
          <div class="score-value" id="score-display">0</div>
        </div>
        
        <div class="score-section dual-scores hidden" id="dual-scores">
          <div class="player-score">
            <div class="score-label">玩家 1</div>
            <div class="score-value" id="player1-score">0</div>
          </div>
          <div class="vs-separator">VS</div>
          <div class="player-score">
            <div class="score-label">玩家 2</div>
            <div class="score-value" id="player2-score">0</div>
          </div>
        </div>
      </div>
      
      <div class="info-container">
        <div class="info-item">
          <div class="info-label">時間</div>
          <div class="info-value" id="time-display">30</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">TPS</div>
          <div class="info-value" id="tps-display">0</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">等級</div>
          <div class="info-value" id="level-display">1</div>
        </div>
      </div>
    `;

    this.container.appendChild(this.element);

    // 獲取顯示元素引用
    this.scoreDisplay = document.getElementById('score-display');
    this.player1ScoreDisplay = document.getElementById('player1-score');
    this.player2ScoreDisplay = document.getElementById('player2-score');
    this.timeDisplay = document.getElementById('time-display');
    this.tpsDisplay = document.getElementById('tps-display');
    this.levelDisplay = document.getElementById('level-display');
  }

  /**
   * 綁定事件
   */
  bindEvents() {
    if (this.gameEngine) {
      this.gameEngine.on('game:started', this.onGameStarted.bind(this));
      this.gameEngine.on('game:ended', this.onGameEnded.bind(this));
      this.gameEngine.on('game:update', this.onGameUpdate.bind(this));
      this.gameEngine.on('game:tick', this.onGameTick.bind(this));
      this.gameEngine.on('game:click', this.onGameClick.bind(this));
    }
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

    this.updateDisplay();
  }

  /**
   * 遊戲結束事件處理
   */
  onGameEnded(data) {
    // 可以添加遊戲結束動畫或高亮最高分
    this.highlightFinalScore(data);
  }

  /**
   * 遊戲更新事件處理
   */
  onGameUpdate(data) {
    const { scores, timeLeft, tps } = data;
    this.updateScores(scores);
    this.updateTime(timeLeft);
    this.updateTPS(tps);
  }

  /**
   * 遊戲計時事件處理
   */
  onGameTick(data) {
    const { timeLeft } = data;
    this.updateTime(timeLeft);
  }

  /**
   * 遊戲點擊事件處理
   */
  onGameClick(data) {
    const { player, score, tps } = data;
    this.updateScores({ [player]: score });
    this.updateTPS(tps);
  }

  /**
   * 更新顯示
   */
  updateDisplay() {
    const state = this.gameEngine?.getState();
    if (!state) {return;}

    this.updateScores(state.scores);
    this.updateTime(state.timeLeft);
    this.updateTPS(state.currentTPS);
    this.updateLevel(state.tpsLevel);
  }

  /**
   * 更新分數顯示
   */
  updateScores(scores) {
    if (this.scoreDisplay && scores.single !== undefined) {
      this.scoreDisplay.textContent = scores.single;
    }

    if (this.player1ScoreDisplay && scores.player1 !== undefined) {
      this.player1ScoreDisplay.textContent = scores.player1;
    }

    if (this.player2ScoreDisplay && scores.player2 !== undefined) {
      this.player2ScoreDisplay.textContent = scores.player2;
    }
  }

  /**
   * 更新時間顯示
   */
  updateTime(timeLeft) {
    if (this.timeDisplay) {
      this.timeDisplay.textContent = timeLeft;

      // 時間不足時添加警告樣式
      if (timeLeft <= 10) {
        this.timeDisplay.classList.add('time-warning');
      } else {
        this.timeDisplay.classList.remove('time-warning');
      }
    }
  }

  /**
   * 更新 TPS 顯示
   */
  updateTPS(tps) {
    if (this.tpsDisplay) {
      this.tpsDisplay.textContent = Math.round(tps * 10) / 10; // 保留一位小數

      // 根據 TPS 添加不同的樣式
      this.updateTPSStyle(tps);
    }
  }

  /**
   * 更新等級顯示
   */
  updateLevel(level) {
    if (this.levelDisplay) {
      this.levelDisplay.textContent = level;

      // 根據等級添加不同的樣式
      this.updateLevelStyle(level);
    }
  }

  /**
   * 更新 TPS 樣式
   */
  updateTPSStyle(tps) {
    if (!this.tpsDisplay) {return;}

    // 移除所有 TPS 樣式類別
    this.tpsDisplay.classList.remove('tps-low', 'tps-medium', 'tps-high', 'tps-extreme');

    if (tps >= 20) {
      this.tpsDisplay.classList.add('tps-extreme');
    } else if (tps >= 10) {
      this.tpsDisplay.classList.add('tps-high');
    } else if (tps >= 5) {
      this.tpsDisplay.classList.add('tps-medium');
    } else if (tps > 0) {
      this.tpsDisplay.classList.add('tps-low');
    }
  }

  /**
   * 更新等級樣式
   */
  updateLevelStyle(level) {
    if (!this.levelDisplay) {return;}

    // 移除所有等級樣式類別
    this.levelDisplay.classList.remove('level-low', 'level-medium', 'level-high', 'level-max');

    if (level >= 10) {
      this.levelDisplay.classList.add('level-max');
    } else if (level >= 7) {
      this.levelDisplay.classList.add('level-high');
    } else if (level >= 4) {
      this.levelDisplay.classList.add('level-medium');
    } else {
      this.levelDisplay.classList.add('level-low');
    }
  }

  /**
   * 顯示單人模式
   */
  showSingleMode() {
    const singleScore = this.element.querySelector('.single-score');
    const dualScores = this.element.querySelector('.dual-scores');

    if (singleScore) {singleScore.classList.remove('hidden');}
    if (dualScores) {dualScores.classList.add('hidden');}
  }

  /**
   * 顯示雙人模式
   */
  showDualMode() {
    const singleScore = this.element.querySelector('.single-score');
    const dualScores = this.element.querySelector('.dual-scores');

    if (singleScore) {singleScore.classList.add('hidden');}
    if (dualScores) {dualScores.classList.remove('hidden');}
  }

  /**
   * 高亮最終分數
   */
  highlightFinalScore(data) {
    const { mode, scores } = data;

    if (mode === 'dual') {
      // 雙人模式：高亮獲勝者
      if (scores.player1 > scores.player2) {
        this.player1ScoreDisplay?.classList.add('winner');
      } else if (scores.player2 > scores.player1) {
        this.player2ScoreDisplay?.classList.add('winner');
      } else {
        // 平局
        this.player1ScoreDisplay?.classList.add('tie');
        this.player2ScoreDisplay?.classList.add('tie');
      }
    } else {
      // 單人模式：高亮最終分數
      this.scoreDisplay?.classList.add('final-score');
    }

    // 3秒後移除高亮
    setTimeout(() => {
      this.clearHighlights();
    }, 3000);
  }

  /**
   * 清除高亮樣式
   */
  clearHighlights() {
    const elements = [
      this.scoreDisplay,
      this.player1ScoreDisplay,
      this.player2ScoreDisplay,
    ];

    elements.forEach(element => {
      if (element) {
        element.classList.remove('winner', 'tie', 'final-score');
      }
    });
  }

  /**
   * 處理視窗大小變化
   */
  handleResize() {
    // 可以根據需要調整分數板布局
  }

  /**
   * 銷毀分數板
   */
  destroy() {
    console.log('🔥 銷毀分數板');

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    this.element = null;
    this.scoreDisplay = null;
    this.player1ScoreDisplay = null;
    this.player2ScoreDisplay = null;
    this.timeDisplay = null;
    this.tpsDisplay = null;
    this.levelDisplay = null;
    this.isInitialized = false;
  }
}

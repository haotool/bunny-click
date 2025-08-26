/**
 * EffectsManager - 視覺效果管理服務
 * 負責遊戲視覺效果的創建、管理和動畫控制
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

/**
 * 效果配置
 */
const EFFECTS_CONFIG = {
  // 漣漪效果
  ripple: {
    maxSize: 200,
    duration: 600,
    opacity: 0.6,
    color: 'rgba(246, 168, 216, 0.6)',
  },
  // 點擊效果
  click: {
    particleCount: 8,
    duration: 400,
    colors: ['#f6a8d8', '#a8d8f6', '#ffb347', '#51cf66'],
    size: { min: 2, max: 6 },
  },
  // 分數飛出效果
  scoreFloat: {
    duration: 1000,
    distance: 60,
    opacity: { start: 1, end: 0 },
  },
};

/**
 * 視覺效果管理類別
 */
export class EffectsManager {
  constructor() {
    this.effectsContainer = null;
    this.activeEffects = new Set();
    this.effectId = 0;
    this.isEnabled = true;
    this.isInitialized = false;
  }

  /**
   * 初始化效果管理器
   */
  async init() {
    console.log('✨ 初始化效果管理器...');

    try {
      this.createEffectsContainer();
      this.isInitialized = true;
      console.log('✅ 效果管理器初始化完成');

    } catch (error) {
      console.error('❌ 效果管理器初始化失敗:', error);
      throw error;
    }
  }

  /**
   * 創建效果容器
   */
  createEffectsContainer() {
    // 查找或創建效果容器
    this.effectsContainer = document.getElementById('effects-container');

    if (!this.effectsContainer) {
      this.effectsContainer = document.createElement('div');
      this.effectsContainer.id = 'effects-container';
      this.effectsContainer.className = 'effects-container';

      // 設定容器樣式
      Object.assign(this.effectsContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '1000',
        overflow: 'hidden',
      });

      document.body.appendChild(this.effectsContainer);
    }
  }

  /**
   * 創建漣漪效果
   */
  createRipple(clickData = {}) {
    if (!this.isEnabled || !this.isInitialized) {return;}

    const { x = 0, y = 0, color, size } = clickData;
    const config = EFFECTS_CONFIG.ripple;

    // 創建漣漪元素
    const ripple = document.createElement('div');
    const effectId = `ripple-${this.effectId++}`;
    ripple.id = effectId;
    ripple.className = 'effect-ripple';

    // 設定樣式
    Object.assign(ripple.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: '0px',
      height: '0px',
      borderRadius: '50%',
      border: `2px solid ${color || config.color}`,
      transform: 'translate(-50%, -50%)',
      opacity: config.opacity,
      transition: `all ${config.duration}ms ease-out`,
      pointerEvents: 'none',
    });

    this.effectsContainer.appendChild(ripple);
    this.activeEffects.add(effectId);

    // 觸發動畫
    requestAnimationFrame(() => {
      const finalSize = size || config.maxSize;
      ripple.style.width = `${finalSize}px`;
      ripple.style.height = `${finalSize}px`;
      ripple.style.opacity = '0';
    });

    // 清理效果
    setTimeout(() => {
      this.removeEffect(effectId);
    }, config.duration + 100);
  }

  /**
   * 創建點擊粒子效果
   */
  createClickEffect(clickData = {}) {
    if (!this.isEnabled || !this.isInitialized) {return;}

    const { x = 0, y = 0, intensity = 1 } = clickData;
    const config = EFFECTS_CONFIG.click;

    const particleCount = Math.min(config.particleCount * intensity, 20);

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(x, y, i);
    }
  }

  /**
   * 創建單個粒子
   */
  createParticle(x, y, index) {
    const config = EFFECTS_CONFIG.click;
    const particle = document.createElement('div');
    const effectId = `particle-${this.effectId++}`;

    particle.id = effectId;
    particle.className = 'effect-particle';

    // 隨機屬性
    const angle = (index / config.particleCount) * Math.PI * 2;
    const distance = 30 + Math.random() * 40;
    const size = config.size.min + Math.random() * (config.size.max - config.size.min);
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];

    // 計算終點位置
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;

    // 設定初始樣式
    Object.assign(particle.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: '1',
      transition: `all ${config.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      pointerEvents: 'none',
    });

    this.effectsContainer.appendChild(particle);
    this.activeEffects.add(effectId);

    // 觸發動畫
    requestAnimationFrame(() => {
      particle.style.left = `${endX}px`;
      particle.style.top = `${endY}px`;
      particle.style.opacity = '0';
      particle.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    // 清理粒子
    setTimeout(() => {
      this.removeEffect(effectId);
    }, config.duration + 100);
  }

  /**
   * 創建分數飛出效果
   */
  createScoreFloat(x, y, score, options = {}) {
    if (!this.isEnabled || !this.isInitialized) {return;}

    const config = EFFECTS_CONFIG.scoreFloat;
    const scoreElement = document.createElement('div');
    const effectId = `score-${this.effectId++}`;

    scoreElement.id = effectId;
    scoreElement.className = 'effect-score-float';
    scoreElement.textContent = `+${score}`;

    // 設定樣式
    Object.assign(scoreElement.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      color: options.color || '#f6a8d8',
      fontSize: options.fontSize || '24px',
      fontWeight: 'bold',
      transform: 'translate(-50%, -50%)',
      opacity: config.opacity.start,
      transition: `all ${config.duration}ms ease-out`,
      pointerEvents: 'none',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      fontFamily: 'inherit',
    });

    this.effectsContainer.appendChild(scoreElement);
    this.activeEffects.add(effectId);

    // 觸發動畫
    requestAnimationFrame(() => {
      scoreElement.style.top = `${y - config.distance}px`;
      scoreElement.style.opacity = config.opacity.end;
      scoreElement.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    // 清理效果
    setTimeout(() => {
      this.removeEffect(effectId);
    }, config.duration + 100);
  }

  /**
   * 創建連擊效果
   */
  createComboEffect(x, y, combo) {
    if (!this.isEnabled || !this.isInitialized || combo < 2) {return;}

    const comboElement = document.createElement('div');
    const effectId = `combo-${this.effectId++}`;

    comboElement.id = effectId;
    comboElement.className = 'effect-combo';
    comboElement.textContent = `${combo}x COMBO!`;

    // 設定樣式
    Object.assign(comboElement.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y - 40}px`,
      color: '#ffb347',
      fontSize: `${Math.min(16 + combo * 2, 32)}px`,
      fontWeight: 'bold',
      transform: 'translate(-50%, -50%) scale(0)',
      opacity: '0',
      transition: 'all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      pointerEvents: 'none',
      textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
      fontFamily: 'inherit',
    });

    this.effectsContainer.appendChild(comboElement);
    this.activeEffects.add(effectId);

    // 觸發動畫
    requestAnimationFrame(() => {
      comboElement.style.transform = 'translate(-50%, -50%) scale(1)';
      comboElement.style.opacity = '1';

      setTimeout(() => {
        comboElement.style.opacity = '0';
        comboElement.style.transform = 'translate(-50%, -50%) scale(1.2)';
      }, 300);
    });

    // 清理效果
    setTimeout(() => {
      this.removeEffect(effectId);
    }, 900);
  }

  /**
   * 移除效果
   */
  removeEffect(effectId) {
    const element = document.getElementById(effectId);
    if (element && this.effectsContainer.contains(element)) {
      this.effectsContainer.removeChild(element);
    }
    this.activeEffects.delete(effectId);
  }

  /**
   * 清除所有效果
   */
  clearAllEffects() {
    this.activeEffects.forEach(effectId => {
      this.removeEffect(effectId);
    });
    this.activeEffects.clear();
  }

  /**
   * 處理視窗大小變化
   */
  handleResize() {
    if (this.effectsContainer) {
      // 清除現有效果，避免位置錯誤
      this.clearAllEffects();
    }
  }

  /**
   * 啟用效果
   */
  enable() {
    this.isEnabled = true;
    console.log('✨ 視覺效果已啟用');
  }

  /**
   * 停用效果
   */
  disable() {
    this.isEnabled = false;
    this.clearAllEffects();
    console.log('⚫ 視覺效果已停用');
  }

  /**
   * 切換效果開關
   */
  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.isEnabled;
  }

  /**
   * 檢查效果是否啟用
   */
  isEffectsEnabled() {
    return this.isEnabled && this.isInitialized;
  }

  /**
   * 獲取活躍效果數量
   */
  getActiveEffectsCount() {
    return this.activeEffects.size;
  }

  /**
   * 銷毀效果管理器
   */
  destroy() {
    console.log('🔥 銷毀效果管理器');

    this.clearAllEffects();

    if (this.effectsContainer && this.effectsContainer.parentNode) {
      this.effectsContainer.parentNode.removeChild(this.effectsContainer);
    }

    this.effectsContainer = null;
    this.activeEffects.clear();
    this.isInitialized = false;
    this.isEnabled = false;
  }
}

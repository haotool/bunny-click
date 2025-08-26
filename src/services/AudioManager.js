/**
 * AudioManager - 音效管理服務
 * 負責遊戲音效的播放、管理和控制
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

/**
 * 音效配置
 */
const AUDIO_CONFIG = {
  // 音效類型和頻率設定
  sounds: {
    click: {
      frequency: 800,
      duration: 50,
      type: 'sine',
      volume: 0.3,
    },
    game_start: {
      frequency: 440,
      duration: 200,
      type: 'square',
      volume: 0.4,
    },
    game_end: {
      frequency: 330,
      duration: 300,
      type: 'triangle',
      volume: 0.4,
    },
    achievement: {
      frequency: 660,
      duration: 400,
      type: 'sine',
      volume: 0.5,
    },
    error: {
      frequency: 200,
      duration: 150,
      type: 'sawtooth',
      volume: 0.3,
    },
  },
  // 音效池大小（預先創建的 AudioContext 數量）
  poolSize: 10,
  // 主音量
  masterVolume: 0.7,
};

/**
 * 音效管理類別
 */
export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.soundPool = new Map();
    this.isEnabled = true;
    this.isInitialized = false;
  }

  /**
   * 初始化音效管理器
   */
  async init() {
    console.log('🔊 初始化音效管理器...');

    try {
      // 檢查 Web Audio API 支援
      if (!('AudioContext' in window) && !('webkitAudioContext' in window)) {
        console.warn('⚠️ 瀏覽器不支援 Web Audio API');
        return;
      }

      // 創建 AudioContext
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();

      // 創建主音量控制
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = AUDIO_CONFIG.masterVolume;

      // 初始化音效池
      this.initSoundPool();

      this.isInitialized = true;
      console.log('✅ 音效管理器初始化完成');

    } catch (error) {
      console.error('❌ 音效管理器初始化失敗:', error);
      this.isEnabled = false;
    }
  }

  /**
   * 初始化音效池
   */
  initSoundPool() {
    for (const [soundName, config] of Object.entries(AUDIO_CONFIG.sounds)) {
      this.soundPool.set(soundName, {
        config,
        instances: [],
      });
    }
  }

  /**
   * 播放音效
   */
  async playSound(soundName, options = {}) {
    if (!this.isEnabled || !this.isInitialized || !this.audioContext) {
      return;
    }

    try {
      // 確保 AudioContext 處於運行狀態
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const soundConfig = AUDIO_CONFIG.sounds[soundName];
      if (!soundConfig) {
        console.warn(`⚠️ 未知的音效: ${soundName}`);
        return;
      }

      // 合併配置選項
      const finalConfig = { ...soundConfig, ...options };

      // 創建並播放音效
      this.createAndPlaySound(finalConfig);

    } catch (error) {
      console.error(`❌ 播放音效失敗 [${soundName}]:`, error);
    }
  }

  /**
   * 創建並播放音效
   */
  createAndPlaySound(config) {
    const { frequency, duration, type, volume } = config;
    const currentTime = this.audioContext.currentTime;

    // 創建振盪器
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, currentTime);

    // 創建增益節點
    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration / 1000);

    // 連接音訊節點
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // 播放音效
    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration / 1000);

    // 清理資源
    oscillator.addEventListener('ended', () => {
      oscillator.disconnect();
      gainNode.disconnect();
    });
  }

  /**
   * 播放點擊音效（帶變化）
   */
  playClickSound(tps = 0) {
    if (!this.isEnabled) {return;}

    // 根據 TPS 調整音效
    const baseFreq = 800;
    const freqVariation = Math.min(tps * 50, 400);
    const frequency = baseFreq + freqVariation;

    const volume = Math.min(0.3 + (tps * 0.02), 0.6);

    this.playSound('click', { frequency, volume });
  }

  /**
   * 播放成就音效
   */
  playAchievementSound() {
    this.playSound('achievement');
  }

  /**
   * 播放錯誤音效
   */
  playErrorSound() {
    this.playSound('error');
  }

  /**
   * 設定主音量
   */
  setMasterVolume(volume) {
    if (this.masterGain) {
      AUDIO_CONFIG.masterVolume = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.value = AUDIO_CONFIG.masterVolume;
    }
  }

  /**
   * 獲取主音量
   */
  getMasterVolume() {
    return AUDIO_CONFIG.masterVolume;
  }

  /**
   * 啟用音效
   */
  enable() {
    this.isEnabled = true;
    console.log('🔊 音效已啟用');
  }

  /**
   * 停用音效
   */
  disable() {
    this.isEnabled = false;
    console.log('🔇 音效已停用');
  }

  /**
   * 切換音效開關
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
   * 檢查音效是否啟用
   */
  isAudioEnabled() {
    return this.isEnabled && this.isInitialized;
  }

  /**
   * 暫停所有音效
   */
  suspend() {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  /**
   * 恢復音效
   */
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  /**
   * 銷毀音效管理器
   */
  destroy() {
    console.log('🔥 銷毀音效管理器');

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.masterGain = null;
    this.soundPool.clear();
    this.isInitialized = false;
    this.isEnabled = false;
  }
}

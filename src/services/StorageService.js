/**
 * StorageService - 資料儲存服務
 * 提供遊戲資料的持久化儲存功能
 *
 * @author haotool
 * @version 7.2.3
 * @created 2025-08-26
 */

// 導入統一儲存適配器
import { GameStorage } from '../../storage/adapter.js';

/**
 * 儲存服務類別
 */
export class StorageService {
  constructor() {
    this.gameStorage = null;
    this.isInitialized = false;
  }

  /**
   * 初始化儲存服務
   */
  async init() {
    console.log('💾 初始化儲存服務...');

    try {
      this.gameStorage = new GameStorage();
      this.isInitialized = true;
      console.log('✅ 儲存服務初始化完成');
    } catch (error) {
      console.error('❌ 儲存服務初始化失敗:', error);
      throw error;
    }
  }

  /**
   * 載入遊戲設定
   */
  async getSettings() {
    this.ensureInitialized();
    return await this.gameStorage.getSettings();
  }

  /**
   * 儲存遊戲設定
   */
  async saveSettings(settings) {
    this.ensureInitialized();
    await this.gameStorage.saveSettings(settings);
  }

  /**
   * 儲存最高分
   */
  async saveHighScore(mode, score, tps) {
    this.ensureInitialized();
    await this.gameStorage.saveHighScore(mode, score, tps);
  }

  /**
   * 獲取最高分
   */
  async getHighScore(mode) {
    this.ensureInitialized();
    return await this.gameStorage.getHighScore(mode);
  }

  /**
   * 儲存遊戲歷史
   */
  async saveGameHistory(gameData) {
    this.ensureInitialized();
    await this.gameStorage.saveGameHistory(gameData);
  }

  /**
   * 獲取遊戲歷史
   */
  async getGameHistory() {
    this.ensureInitialized();
    return await this.gameStorage.getGameHistory();
  }

  /**
   * 清空遊戲資料
   */
  async clearGameData() {
    this.ensureInitialized();
    await this.gameStorage.clearGameData();
  }

  /**
   * 確保服務已初始化
   */
  ensureInitialized() {
    if (!this.isInitialized) {
      throw new Error('儲存服務尚未初始化');
    }
  }
}

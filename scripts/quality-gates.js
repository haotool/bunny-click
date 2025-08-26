#!/usr/bin/env node

/**
 * 品質門檻自動化檢查腳本
 * 基於 .cursor/rules/quality.mdc 規範
 * 建立時間: 2025-08-26T23:10:06+08:00 [time.now:Asia/Taipei]
 * 負責人: haotool
 */

import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const QUALITY_GATES = {
  // 程式碼品質門檻
  codeQuality: {
    eslintMaxWarnings: 5,
    eslintMaxErrors: 0,
  },

  // 測試覆蓋率門檻
  testCoverage: {
    branches: 75,
    functions: 90,
    lines: 80,
    statements: 85,
  },

  // 效能門檻
  performance: {
    lighthousePerformance: 90,
    lighthousePWA: 90,
    lighthouseAccessibility: 90,
    lighthouseBestPractices: 90,
    lighthouseSEO: 85,
  },

  // 檔案大小門檻
  bundleSize: {
    maxJSSize: 500000, // 500KB
    maxCSSSize: 100000, // 100KB
    maxImageSize: 1000000, // 1MB
  },
};

class QualityGateChecker {
  constructor() {
    this.results = {
      passed: [],
      failed: [],
      warnings: [],
    };
  }

  // 主要檢查流程
  async runAllChecks() {
    console.log(chalk.blue.bold('\n🔍 開始執行品質門檻檢查...\n'));

    try {
      await this.checkCodeQuality();
      await this.checkTestCoverage();
      await this.checkSecurity();
      await this.checkBundleSize();

      this.displayResults();

      if (this.results.failed.length > 0) {
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('❌ 品質檢查過程中發生錯誤:'), error.message);
      process.exit(1);
    }
  }

  // ESLint 程式碼品質檢查
  async checkCodeQuality() {
    console.log(chalk.yellow('📝 檢查程式碼品質 (ESLint)...'));

    try {
      const result = execSync('npm run lint:check', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      this.results.passed.push('✅ ESLint 檢查通過');
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      const warnings = (output.match(/warning/g) || []).length;
      const errors = (output.match(/error/g) || []).length;

      if (errors > QUALITY_GATES.codeQuality.eslintMaxErrors) {
        this.results.failed.push(
          `❌ ESLint 錯誤數量過多: ${errors} (最大允許: ${QUALITY_GATES.codeQuality.eslintMaxErrors})`,
        );
      }

      if (warnings > QUALITY_GATES.codeQuality.eslintMaxWarnings) {
        this.results.warnings.push(
          `⚠️ ESLint 警告數量過多: ${warnings} (建議最大: ${QUALITY_GATES.codeQuality.eslintMaxWarnings})`,
        );
      }
    }
  }

  // Jest 測試覆蓋率檢查
  async checkTestCoverage() {
    console.log(chalk.yellow('🧪 檢查測試覆蓋率...'));

    try {
      execSync('npm run test:coverage', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      // 讀取覆蓋率報告
      const coveragePath = './coverage/coverage-summary.json';
      if (fs.existsSync(coveragePath)) {
        const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
        const total = coverage.total;

        const checks = [
          {
            name: 'branches',
            value: total.branches.pct,
            threshold: QUALITY_GATES.testCoverage.branches,
          },
          {
            name: 'functions',
            value: total.functions.pct,
            threshold: QUALITY_GATES.testCoverage.functions,
          },
          { name: 'lines', value: total.lines.pct, threshold: QUALITY_GATES.testCoverage.lines },
          {
            name: 'statements',
            value: total.statements.pct,
            threshold: QUALITY_GATES.testCoverage.statements,
          },
        ];

        let allPassed = true;
        for (const check of checks) {
          if (check.value < check.threshold) {
            this.results.failed.push(
              `❌ ${check.name} 覆蓋率不足: ${check.value}% (要求: ${check.threshold}%)`,
            );
            allPassed = false;
          }
        }

        if (allPassed) {
          this.results.passed.push('✅ 測試覆蓋率檢查通過');
        }
      }
    } catch (error) {
      this.results.failed.push('❌ 測試執行失敗或覆蓋率不足');
    }
  }

  // 安全性檢查
  async checkSecurity() {
    console.log(chalk.yellow('🔒 檢查安全性漏洞...'));

    try {
      execSync('npm audit --audit-level=moderate', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      this.results.passed.push('✅ 安全性檢查通過');
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      if (output.includes('vulnerabilities')) {
        this.results.failed.push('❌ 發現安全性漏洞，請執行 npm audit fix');
      }
    }
  }

  // 打包大小檢查
  async checkBundleSize() {
    console.log(chalk.yellow('📦 檢查打包大小...'));

    const distPath = './dist';
    if (!fs.existsSync(distPath)) {
      this.results.warnings.push('⚠️ 未找到 dist 目錄，跳過打包大小檢查');
      return;
    }

    try {
      const files = this.getFilesRecursive(distPath);
      let jsSize = 0;
      let cssSize = 0;
      const oversizedImages = [];

      for (const file of files) {
        const filePath = path.join(distPath, file);
        const stats = fs.statSync(filePath);
        const size = stats.size;

        if (file.endsWith('.js')) {
          jsSize += size;
        } else if (file.endsWith('.css')) {
          cssSize += size;
        } else if (/\.(png|jpg|jpeg|gif|webp|svg)$/.test(file)) {
          if (size > QUALITY_GATES.bundleSize.maxImageSize) {
            oversizedImages.push({ file, size });
          }
        }
      }

      // 檢查 JS 大小
      if (jsSize > QUALITY_GATES.bundleSize.maxJSSize) {
        this.results.failed.push(
          `❌ JavaScript 總大小過大: ${(jsSize / 1024).toFixed(1)}KB (最大: ${QUALITY_GATES.bundleSize.maxJSSize / 1024}KB)`,
        );
      }

      // 檢查 CSS 大小
      if (cssSize > QUALITY_GATES.bundleSize.maxCSSSize) {
        this.results.failed.push(
          `❌ CSS 總大小過大: ${(cssSize / 1024).toFixed(1)}KB (最大: ${QUALITY_GATES.bundleSize.maxCSSSize / 1024}KB)`,
        );
      }

      // 檢查圖片大小
      if (oversizedImages.length > 0) {
        for (const img of oversizedImages) {
          this.results.warnings.push(
            `⚠️ 圖片檔案過大: ${img.file} (${(img.size / 1024).toFixed(1)}KB)`,
          );
        }
      }

      if (
        jsSize <= QUALITY_GATES.bundleSize.maxJSSize &&
        cssSize <= QUALITY_GATES.bundleSize.maxCSSSize
      ) {
        this.results.passed.push('✅ 打包大小檢查通過');
      }
    } catch (error) {
      this.results.warnings.push('⚠️ 無法檢查打包大小');
    }
  }

  // 遞迴獲取檔案列表
  getFilesRecursive(dir, prefix = '') {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = prefix ? path.join(prefix, item) : item;

      if (fs.statSync(fullPath).isDirectory()) {
        files.push(...this.getFilesRecursive(fullPath, relativePath));
      } else {
        files.push(relativePath);
      }
    }

    return files;
  }

  // 顯示檢查結果
  displayResults() {
    console.log(chalk.blue.bold('\n📊 品質門檻檢查結果:\n'));

    // 顯示通過的檢查
    if (this.results.passed.length > 0) {
      console.log(chalk.green.bold('✅ 通過的檢查:'));
      this.results.passed.forEach(item => console.log(`  ${item}`));
      console.log();
    }

    // 顯示警告
    if (this.results.warnings.length > 0) {
      console.log(chalk.yellow.bold('⚠️ 警告:'));
      this.results.warnings.forEach(item => console.log(`  ${item}`));
      console.log();
    }

    // 顯示失敗的檢查
    if (this.results.failed.length > 0) {
      console.log(chalk.red.bold('❌ 失敗的檢查:'));
      this.results.failed.forEach(item => console.log(`  ${item}`));
      console.log();
    }

    // 總結
    const total = this.results.passed.length + this.results.failed.length;
    const passed = this.results.passed.length;
    const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

    console.log(chalk.blue.bold(`📈 總體品質分數: ${percentage}% (${passed}/${total} 項檢查通過)`));

    if (this.results.failed.length === 0) {
      console.log(chalk.green.bold('\n🎉 所有品質門檻檢查通過！\n'));
    } else {
      console.log(chalk.red.bold('\n💥 部分品質門檻檢查未通過，請修復後重試。\n'));
    }
  }
}

// 執行檢查
if (import.meta.url === `file://${process.argv[1]}`) {
  const checker = new QualityGateChecker();
  checker.runAllChecks();
}

export default QualityGateChecker;

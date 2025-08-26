#!/usr/bin/env node

/**
 * 開發工作流程輔助腳本
 * 整合所有開發階段常用功能
 * 建立時間: 2025-08-26T23:10:06+08:00 [time.now:Asia/Taipei]
 * 負責人: haotool
 */

import { execSync } from 'child_process';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';

class DevWorkflow {
  constructor() {
    this.commands = {
      'quality-check': {
        name: '品質檢查',
        description: '執行完整的程式碼品質檢查',
        command: 'npm run quality:check',
      },
      'pwa-test': {
        name: 'PWA 測試',
        description: '啟動 PWA 開發測試環境',
        command: 'npm run pwa:dev',
      },
      lighthouse: {
        name: 'Lighthouse 檢查',
        description: '執行 Lighthouse PWA 效能檢查',
        command: 'npm run quality:lighthouse',
      },
      'pre-commit': {
        name: 'Pre-commit 檢查',
        description: '模擬 pre-commit hooks 檢查',
        command: 'npm run precommit',
      },
      'build-test': {
        name: '建置測試',
        description: '建置專案並執行基本檢查',
        command: 'npm run build && npm run pwa:validate',
      },
      'dev-setup': {
        name: '開發環境設置',
        description: '設置開發環境與工具',
        command: 'npm run hooks:install',
      },
    };
  }

  // 主選單
  async showMainMenu() {
    console.log(chalk.blue.bold('\n🛠️ Bunny Click PWA 開發工作流程\n'));

    const choices = Object.entries(this.commands).map(([key, cmd]) => ({
      name: `${cmd.name} - ${chalk.gray(cmd.description)}`,
      value: key,
    }));

    choices.push(
      { name: chalk.yellow('📊 專案狀態檢查'), value: 'status' },
      { name: chalk.cyan('🔧 自訂命令'), value: 'custom' },
      { name: chalk.red('❌ 退出'), value: 'exit' },
    );

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '請選擇要執行的操作:',
        choices,
      },
    ]);

    await this.handleAction(action);
  }

  // 處理用戶選擇
  async handleAction(action) {
    switch (action) {
      case 'status':
        await this.showProjectStatus();
        break;
      case 'custom':
        await this.customCommand();
        break;
      case 'exit':
        console.log(chalk.green('👋 再見！'));
        process.exit(0);
        break;
      default:
        if (this.commands[action]) {
          await this.executeCommand(this.commands[action]);
        }
        break;
    }

    // 回到主選單
    console.log(chalk.gray('\n按 Enter 鍵回到主選單...'));
    await inquirer.prompt([{ type: 'input', name: 'continue', message: '' }]);
    await this.showMainMenu();
  }

  // 執行命令
  async executeCommand(cmd) {
    console.log(chalk.blue.bold(`\n🚀 執行: ${cmd.name}\n`));
    console.log(chalk.gray(`命令: ${cmd.command}\n`));

    try {
      const startTime = Date.now();

      execSync(cmd.command, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(chalk.green(`\n✅ ${cmd.name} 完成！耗時: ${duration}s`));
    } catch (error) {
      console.error(chalk.red(`\n❌ ${cmd.name} 失敗！`));
      console.error(chalk.red(`錯誤: ${error.message}`));
    }
  }

  // 顯示專案狀態
  async showProjectStatus() {
    console.log(chalk.blue.bold('\n📊 專案狀態檢查\n'));

    const checks = [
      {
        name: '📦 package.json',
        check: () => fs.existsSync('./package.json'),
      },
      {
        name: '🎯 vite.config.js',
        check: () => fs.existsSync('./vite.config.js'),
      },
      {
        name: '🧪 jest.config.cjs',
        check: () => fs.existsSync('./jest.config.cjs'),
      },
      {
        name: '🔍 eslint.config.js',
        check: () => fs.existsSync('./eslint.config.js'),
      },
      {
        name: '💡 lighthouserc.js',
        check: () => fs.existsSync('./lighthouserc.js'),
      },
      {
        name: '🪝 .pre-commit-config.yaml',
        check: () => fs.existsSync('./.pre-commit-config.yaml'),
      },
      {
        name: '📋 docs/TODO.md',
        check: () => fs.existsSync('./docs/TODO.md'),
      },
      {
        name: '📚 .cursor/rules/',
        check: () => fs.existsSync('./.cursor/rules/'),
      },
      {
        name: '🏗️ dist/',
        check: () => fs.existsSync('./dist/'),
      },
      {
        name: '📊 coverage/',
        check: () => fs.existsSync('./coverage/'),
      },
    ];

    for (const check of checks) {
      const status = check.check() ? '✅' : '❌';
      console.log(`${status} ${check.name}`);
    }

    // 檢查 npm 腳本
    console.log(chalk.blue.bold('\n📝 可用的 npm 腳本:\n'));

    try {
      const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      const scripts = packageJson.scripts || {};

      const categories = {
        '🏗️ 建置相關': ['build', 'preview', 'dev', 'start'],
        '🧪 測試相關': ['test', 'test:watch', 'test:coverage', 'test:ci'],
        '🔍 品質相關': ['lint', 'format', 'quality:check', 'quality:lighthouse'],
        '📱 PWA 相關': ['pwa:dev', 'pwa:validate', 'pwa:test'],
        '🔧 工具相關': ['hooks:install', 'maintenance', 'health-check'],
      };

      for (const [category, scriptNames] of Object.entries(categories)) {
        console.log(chalk.yellow.bold(category));
        for (const scriptName of scriptNames) {
          if (scripts[scriptName]) {
            console.log(`  ✅ npm run ${scriptName}`);
          } else {
            console.log(`  ❌ npm run ${scriptName} ${chalk.gray('(未定義)')}`);
          }
        }
        console.log('');
      }
    } catch (error) {
      console.error(chalk.red('❌ 無法讀取 package.json'));
    }
  }

  // 自訂命令
  async customCommand() {
    const { command } = await inquirer.prompt([
      {
        type: 'input',
        name: 'command',
        message: '請輸入要執行的命令:',
        validate: input => input.trim().length > 0 || '請輸入有效的命令',
      },
    ]);

    await this.executeCommand({
      name: '自訂命令',
      description: '用戶自訂的命令',
      command: command.trim(),
    });
  }

  // 快速設置
  async quickSetup() {
    console.log(chalk.blue.bold('\n⚡ 快速設置開發環境\n'));

    const setupSteps = [
      {
        name: '安裝依賴',
        command: 'npm install',
      },
      {
        name: '設置 Git Hooks',
        command: 'npm run hooks:install',
      },
      {
        name: '執行初始建置',
        command: 'npm run build',
      },
      {
        name: '執行測試',
        command: 'npm run test',
      },
    ];

    for (const step of setupSteps) {
      console.log(chalk.yellow(`🔄 ${step.name}...`));

      try {
        execSync(step.command, { stdio: 'inherit' });
        console.log(chalk.green(`✅ ${step.name} 完成`));
      } catch (error) {
        console.error(chalk.red(`❌ ${step.name} 失敗: ${error.message}`));
        break;
      }
    }

    console.log(chalk.green.bold('\n🎉 開發環境設置完成！'));
  }
}

// 執行工作流程
if (import.meta.url === `file://${process.argv[1]}`) {
  const workflow = new DevWorkflow();

  const command = process.argv[2];

  switch (command) {
    case 'setup':
      workflow.quickSetup();
      break;
    case 'status':
      workflow.showProjectStatus();
      break;
    default:
      workflow.showMainMenu();
      break;
  }
}

export default DevWorkflow;

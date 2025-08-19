/**
 * Babel 配置文件 - Bunny Click
 * 用於 Jest 測試環境的 ES6 模組轉換
 * [context7:/jestjs/jest:2025-08-20T01:33:46+08:00]
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        modules: 'commonjs', // 為 Jest 轉換為 CommonJS
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
            modules: 'commonjs',
          },
        ],
      ],
    },
  },
};

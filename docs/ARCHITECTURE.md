# 项目架构说明

《资本：轮回与破局》采用纯前端技术栈（HTML5 + CSS3 + ES Modules），无需构建工具即可运行。

## 目录结构

```
├── index.html              # 游戏入口页面
├── css/                    # 样式文件
│   ├── base.css            # 基础重置、通用样式
│   ├── themes.css          # 纪元主题（背景色、边框光效）
│   ├── components.css      # 按钮、进度条、徽章、卡片等组件
│   ├── modals.css          # 弹窗、骰子覆盖层
│   ├── effects.css         # 动画、浮动数字、Toast
│   └── layout.css          # 布局、响应式、游戏结束面板
├── js/                     # JavaScript 源码（ES Modules）
│   ├── main.js             # 入口：初始化游戏引擎并注入资源
│   ├── config.js           # 常量与游戏配置
│   ├── data/               # 数据层（纯数据，无逻辑）
│   │   ├── assets.js       # 事件 SVG 图库
│   │   ├── events.js       # 事件库定义
│   │   ├── fragments.js    # 认知碎片
│   │   └── achievements.js # 成就
│   ├── core/               # 核心引擎
│   │   ├── AudioManager.js # Web Audio API 音频管理
│   │   └── GameEngine.js   # 主游戏类（状态、流程控制）
│   └── utils/              # 工具函数
│       └── helpers.js      # 雷达图、骰子 SVG 生成器
├── docs/                   # 开发文档
│   ├── ARCHITECTURE.md
│   ├── ADD_EVENT.md
│   └── ADD_MODE.md
├── tools/                  # 启动脚本
│   ├── start.bat
│   ├── launch.bat
│   └── run_game_simple.bat
├── legacy/                 # 历史文件
│   └── capital_game_enhanced.py
└── *.txt                   # 原始设计文档
```

## 核心类职责

### `CapitalGame` (js/core/GameEngine.js)
游戏的中央控制器，负责：
- 游戏状态管理（财富、矛盾、技术、纪元、回合）
- 事件调度与渲染
- 用户选择处理（含 D20 骰子修正）
- 结局判定与诊断报告生成
- 成就与认知碎片的持久化

### `AudioManager` (js/core/AudioManager.js)
使用 Web Audio API 合成音频：
- 按纪元变化氛围音乐音色
- 提供 modal / epoch / end / dice / floatUp 等音效

## 数据流

1. `main.js` 初始化 `CapitalGame`，并通过 `setEventImages()` 注入 SVG 资源。
2. 玩家点击选项 → `handleChoice()` → D20 动画 → 应用数值变化 → 检查游戏状态 → 显示知识弹窗 → 进入下一事件。
3. 游戏结束时触发 `endGame()`，生成诊断报告、解锁碎片、检查成就。
4. 碎片与成就状态保存在 `localStorage` 中，跨局继承。

## 技术约束

- 使用 **ES Modules**，必须通过本地 HTTP 服务器打开（已提供 `tools/*.bat`）。
- 所有资源均为内联（SVG、Web Audio），可完全离线运行。
- 数据文件（`js/data/`）仅包含纯对象，方便内容创作者直接修改而无需触碰引擎代码。

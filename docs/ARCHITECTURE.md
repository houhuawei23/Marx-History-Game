# 项目架构说明

《资本：轮回与破局》采用纯前端技术栈（HTML5 + CSS3 + ES Modules），无需构建工具即可运行。

## 目录结构

```
├── index.html              # 游戏入口页面
├── css/                    # 样式文件
│   ├── base.css            # 基础重置、通用样式
│   ├── themes.css          # 纪元主题（背景色、边框光效）
│   ├── components.css      # 按钮、进度条、徽章、卡片、滑块等组件
│   ├── modals.css          # 弹窗、骰子覆盖层、股市小游戏弹窗
│   ├── effects.css         # 动画、浮动数字、Toast、纪元过渡特效
│   └── layout.css          # 双栏布局、Tab 切换、响应式、游戏结束面板
├── js/                     # JavaScript 源码（ES Modules）
│   ├── main.js             # 入口：初始化游戏引擎并注入资源
│   ├── config.js           # 常量与游戏配置（含版本号、社会关系默认值、股市参数）
│   ├── data/               # 数据层（纯数据，无逻辑）
│   │   ├── assets.js       # 事件 SVG 图库
│   │   ├── events.js       # 事件库定义（含滑块事件、社会关系影响）
│   │   ├── fragments.js    # 认知碎片
│   │   └── achievements.js # 成就
│   ├── core/               # 核心引擎
│   │   ├── AudioManager.js # Web Audio API 音频管理
│   │   └── GameEngine.js   # 主游戏类（状态、流程控制、Tab 切换）
│   └── utils/              # 工具函数
│       └── helpers.js      # 雷达图、趋势图、骰子 SVG、纪元动画、粒子效果生成器
├── docs/                   # 开发文档
│   ├── ARCHITECTURE.md
│   ├── ADD_EVENT.md
│   ├── ADD_MODE.md
│   ├── 游戏设计.txt
│   ├── 使用说明.txt
│   └── 下一步优化.txt
├── tools/                  # 启动脚本
│   ├── start.bat
│   ├── start.sh
│   ├── launch.bat
│   └── run_game_simple.bat
├── tests/                  # 测试截图
│   └── screenshots/
├── legacy/                 # 历史文件
│   └── capital_game_enhanced.py
└── README.md / CHANGELOG.md
```

## 核心类职责

### `CapitalGame` (js/core/GameEngine.js)
游戏的中央控制器，负责：
- 游戏状态管理（财富、矛盾、技术、纪元、回合、路线倾向）
- **社会关系系统**：4 项隐藏指标（workers / government / media / competitors）的维护与检测
- 事件调度与渲染：支持普通卡牌选项与滑块输入两种交互形式
- 用户选择处理：含 D20 骰子修正、滑块线性插值计算、股市小游戏财富加成
- **纪元过渡**：全屏 SVG 动画与音效提示
- 结局判定与 **Tab 式诊断报告** 生成（结局 / 数据 / 历史 / 成就）
- 成就与认知碎片的持久化

### `AudioManager` (js/core/AudioManager.js)
使用 Web Audio API 合成音频：
- 按纪元变化氛围音乐音色
- 提供 modal / epoch / end / dice / floatUp 等音效

## 数据流

1. `main.js` 初始化 `CapitalGame`，并通过 `setEventImages()` 注入 SVG 资源。
2. 玩家点击选项 / 拖动滑块 / 完成股市小游戏 → `handleChoice()` / `handleSliderChoice()` → D20 动画 → 应用数值变化 → 检查社会关系紧急事件 → 显示知识弹窗 → 进入下一事件。
3. 纪元切换时触发 `showEpochTransition()`，播放 SVG 动画后进入下一纪元事件池。
4. 游戏结束时触发 `endGame()`，生成诊断报告、解锁碎片、检查成就，并以 4 个 Tab 展示结果。
5. 碎片与成就状态保存在 `localStorage` 中，跨局继承。

## 技术约束

- 使用 **ES Modules**，必须通过本地 HTTP 服务器打开（已提供 `tools/start.bat` 与 `tools/start.sh`）。
- 所有资源均为内联（SVG、Web Audio），可完全离线运行。
- 数据文件（`js/data/`）仅包含纯对象，方便内容创作者直接修改而无需触碰引擎代码。
- 移动端适配：双栏布局在窄屏下自动回退为单栏堆叠。

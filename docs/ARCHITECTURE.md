# 项目架构说明

本文档是《资本：轮回与破局》架构的简要说明，详细架构文档请参阅：

## 详细架构文档

| 文档 | 内容 |
|-----|------|
| **[C4-ARCHITECTURE.md](./C4-ARCHITECTURE.md)** | 完整的 C4 架构视图（Context/Container/Component/Code） |
| **[DATA-MODEL.md](./DATA-MODEL.md)** | 数据模型、类型定义、API 参考 |
| **[ARCHITECTURE-DECISIONS.md](./ARCHITECTURE-DECISIONS.md)** | 架构决策记录（ADR） |

## 核心技术栈

- **前端**：HTML5 + CSS3 + ES Modules（无构建工具）
- **音频**：Web Audio API（程序化合成）
- **数据**：YAML 配置文件 + localStorage 持久化
- **桌面**：Electron + Tauri 双框架支持

## 核心模块

| 模块 | 文件 | 职责 |
|-----|------|-----|
| 游戏引擎 | `js/core/GameEngine.js` | 状态管理、事件调度、流程控制 |
| 音频管理 | `js/core/AudioManager.js` | 背景音乐、音效合成 |
| 配置加载 | `js/data/loader.js` | YAML 解析、异步加载 |
| 工具函数 | `js/utils/helpers.js` | SVG 图表、动画生成 |

## 快速参考

```bash
# 启动开发服务器
python -m http.server 8080

# 桌面应用打包
npm run electron:build:all   # Electron
npm run tauri:build          # Tauri
```

## 目录结构

```
├── index.html              # SPA 入口
├── css/                    # 样式文件
├── js/                     # JavaScript 源码（ES Modules）
│   ├── main.js             # 入口模块
│   ├── config.js           # 常量配置
│   ├── core/               # 核心引擎
│   │   ├── GameEngine.js   # 游戏引擎
│   │   └── AudioManager.js # 音频管理
│   ├── data/               # 数据层
│   │   ├── loader.js       # YAML 加载器
│   │   ├── events.js       # 事件接口
│   │   ├── achievements.js # 成就接口
│   │   ├── fragments.js    # 碎片接口
│   │   └── *.checks.js     # 检查函数
│   └── utils/
│       └── helpers.js       # SVG 生成器
├── yaml/                   # YAML 配置文件
├── electron/               # Electron 桌面配置
└── src-tauri/              # Tauri 桌面配置
```

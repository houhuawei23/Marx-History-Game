# 更新日志

## [1.1.0] - 2026-04-13

### 新增
- **扩展事件库（game-lzk 版本特性迁移）**
  - 纪元1新增「工厂钟表与童工账簿」「纺机专利之争」
  - 纪元2新增「流水线与管理算法」「跨洋电报与价格同盟」
  - 纪元3新增「模型训练数据围猎」「AI 平台零工化」
  - 新增4个纪元条件特殊事件：「流水线算法实验」「算力围栏」「公共算力试验」「无用阶级夜行」
- **纪元配色系统增强（game-lzk 版本特性迁移）**
  - 引入 CSS 变量主题：`theme-epoch-1`（血色积累/红）、`theme-epoch-2`（煤灰垄断/灰金）、`theme-epoch-3`（蓝焰智能/蓝紫）
  - 事件面板新增 `data-epoch` 驱动的背景纹理（渐变光斑、工业条纹、科技网格）
  - 事件标题区新增纪元 badge 与主题语（如「掠夺、圈地、原始暴力」）
- **延长回合数（game-lzk 版本特性迁移）**
  - 总回合数从 6 延长至 12
  - 每纪元事件数从 2 延长至 4

### 变更
- `js/data/events.js`：扩展事件池，新增 `special.epochSpecial` 条件事件组
- `js/core/GameEngine.js`：
  - `nextEvent` 中纪元切换阈值从 `>=2` 调整为 `>=4`
  - 新增 `checkEpochSpecialEvent` 方法，按技术力/财富/社会矛盾条件触发纪元特殊事件
  - `applyEpochTheme` 同步更新 badge、theme line 与 `data-epoch` 属性
  - 状态栏回合计数显示为「本阶段 X/4 回合 | 总 Y/12 回合」
- `js/config.js`：`maxRounds` 6 → 12，`GAME_VERSION` 1.0.2 → 1.1.0
- `css/themes.css`：全面重构为 CSS 变量驱动，保留旧版 `.epoch-x` 兼容性
- `index.html`：事件头部新增 `.epoch-card-badge` 与 `.event-theme-line`

## [1.0.2] - 2026-04-13

### 新增
- **常驻股市面板**：股市小游戏从弹窗改为页面底部常驻组件，每轮事件均可实时查看与交易
- **持股系统**：引入「股价」「持股数」「市值」「现金」四维数据，支持逐股买入/卖出
- **事件驱动的股价波动**：股价变化与当前事件情景及玩家选择直接关联
  - 事件关键词决定市场基准情绪（技术革命看涨、危机罢工看跌等）
  - 选择属性进一步修正（财富↑提振信心、矛盾↓加剧恐慌、技术↑利好创新）
  - D20 骰子引入额外随机波动
- **股市盈亏实时反馈**：选择结算后股价波动，持股市值变化直接计入总财富，并伴随财富条浮动数字动画

### 变更
- 移除 `stock-minigame-modal` 弹窗及相关定时器逻辑
- 重构 `js/core/GameEngine.js`：
  - 移除 `showStockMinigame`、`resolveStockGame`（旧弹窗式）
  - 新增 `setupStockMarket`、`renderStockPanel`、`tradeStock`、`calculateStockChange`、`getCash`、`getMarketExpectation`
  - `handleChoice` 中选择结算后新增股价波动计算与应用
- 扩展 `css/layout.css`：新增 `.stock-panel` 常驻面板样式，替换原有弹窗样式
- 更新 `tests/e2e_test.js`：适配常驻股市面板的交易断言

### 修复
- 修复重新开始游戏后股市面板未重置的问题

## [1.0.1] - 2026-04-13

### 新增
- **回合结果摘要 Toast**：选择结束后先显示 1.4 秒浮动摘要（财富/矛盾/技术变化），再弹出知识弹窗
- **股票小游戏历史记录**：弹窗内新增「操作历史」列表，展示最近 5 次操作的收益/亏损与累计收益
- **股票结算动画**：操作后按钮隐藏，中央以动画展示本次实际收益（如 `+15 财富`），1.4 秒后自动进入下一事件

### 变更
- **D20 骰子弹窗**：从全屏覆盖改为顶部居中浮动卡片，不再遮挡左侧数值面板
- **马克思主义知识弹窗**：从全屏覆盖改为右侧滑入抽屉（宽度 520px），游戏内容始终可见，阅读时仍可观察数据变化
- 扩展 `css/components.css`：新增 `.round-summary-toast`、`.stock-history`、`.stock-result` 等样式
- 扩展 `js/core/GameEngine.js`：新增 `showRoundSummaryToast`、`hideRoundSummaryToast`、`renderStockHistory`，重构 `showDiceRoll`、`showStockMinigame`、`resolveStockGame`

### 修复
- 修复股票小游戏关闭过快导致无法看清收益的问题
- 修复回合选择后数值变化被知识弹窗遮挡的问题

## [1.0.0] - 2026-04-13

### 新增
- **双栏仪表盘布局**：桌面端改为左侧 35% 固定状态栏 + 右侧 65% 主内容区，移动端自动回退单列
- **数据可视化**：
  - SVG 历史趋势折线图（财富/矛盾/技术随回合变化）
  - SVG 社会关系雷达图（工人信任、政府支持、媒体舆论、竞争对手压力）
- **卡牌式选项**：替换原有按钮，支持路线颜色光晕、hover 展开历史隐喻、选择后粒子爆发反馈
- **滑块决策系统**：技术革命、人工智能取代人力、全球气候危机等事件支持滑块输入与实时影响预览
- **股市小游戏**：回合间可选 10 秒限时迷你游戏（买/卖/观望），根据随机走势获得 ±25 财富波动
- **社会关系系统**：4 项隐藏指标影响事件触发，如工人信任 ≤10 触发「总罢工」，政府支持 ≥90 触发「政策红利」
- **纪元过渡特效**：
  - 1→2 纪元：蒸汽朋克齿轮转动 + 蒸汽升腾 SVG 动画
  - 2→3 纪元：数字雨 + 电路板脉冲发光 SVG 动画
- **Tab 式游戏结束面板**：分为「结局诊断」「数据报告」「历史回顾」「成就与碎片」四个标签
- **开发文档**：新增 README.md、CHANGELOG.md、架构说明及扩展指南

### 变更
- 重构 `index.html` 页面结构，新增趋势图、雷达图、股市弹窗、纪元覆盖层、Tab 容器
- 扩展 `js/utils/helpers.js`：新增 `generateTrendChartSVG`、`generateSocialRadarSVG`、纪元动画 SVG 与粒子效果
- 扩展 `js/config.js`：新增社会关系默认值、股市小游戏参数与 `GAME_VERSION`
- 扩展 `js/data/events.js`：全事件增加 `socialImpact` 字段，新增 3 个滑块事件与 2 个社会关系紧急事件
- 重构 `js/core/GameEngine.js`：适配双栏渲染、社会关系系统、股市小游戏、滑块处理、Tab 切换
- 重命名 `.scns/` 为 `tests/screenshots/`，清理空的 `js/ui/` 与 `js/systems/` 目录
- 更新 `.gitignore`，排除测试日志与编辑器缓存

### 修复
- 修复 `showEpochTransition` 中因缺失 `id="epoch-transition-desc"` 导致的 `TypeError`

---

## [初始版本] - 2026-03-26

- 项目初始化
- 完成基础 Roguelike 机制：财富、矛盾、技术三大属性，D20 骰子，三纪元事件池
- 实现结局判定、认知碎片、成就系统与知识点弹窗

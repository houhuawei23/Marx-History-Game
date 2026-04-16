# 资本：轮回与破局 - 数据模型与 API 参考

## 文档概述

本文档详细描述《资本：轮回与破局》系统的数据模型、核心类 API、以及各模块之间的交互接口。

---

## 1. 核心数据模型

### 1.1 游戏状态模型

```typescript
/**
 * 游戏状态 (GameState)
 * 定义游戏运行期间的完整状态
 */
interface GameState {
  // 核心数值
  cash: number;              // 现金
  wealth: number;            // 财富总值（含股票市值）
  socialConflict: number;     // 社会矛盾值 (0-100)
  techPower: number;         // 技术力

  // 进度追踪
  epoch: 1 | 2 | 3;         // 当前纪元
  rounds: number;            // 当前回合
  isGameOver: boolean;       // 游戏结束标志

  // 历史数据
  history: HistoryEntry[];   // 决策历史
  trendHistory: TrendPoint[]; // 趋势数据点

  // 路线系统
  route: RouteState;

  // 社会关系
  social: SocialRelations;

  // 股市系统
  stock: StockState;

  // 元进度
  fragments: Record<string, Fragment>;
  achievements: Record<string, Achievement>;
  equippedFragment: Fragment | null;
  endingsRecord: string[];
  epochSpecialTriggered: Set<string>;
}

/**
 * 决策历史条目
 */
interface HistoryEntry {
  epoch: 1 | 2 | 3;
  event: string;             // 事件名称
  choice: string;            // 玩家选择
  knowledge: string;         // 关联知识
  routeTag?: 'conservative' | 'technologist' | 'reformer';
  changes: {
    wealth: number;
    conflict: number;
    tech: number;
  };
  diceRoll: number;          // D20 骰子结果
  isRouteEvent?: boolean;
  isHiddenEvent?: boolean;
  isSpecialEvent?: boolean;
  isEpochSpecial?: boolean;
  historicalParallel?: string;
  quote?: { text: string; author: string };
  social?: SocialChanges;
  questionAnswered?: boolean;
}

/**
 * 路线状态
 */
interface RouteState {
  conservative: number;     // 保守路线倾向
  technologist: number;      // 技术路线倾向
  reformer: number;         // 改良路线倾向
}

/**
 * 社会关系
 */
interface SocialRelations {
  worker: number;           // 工人信任度 (0-100)
  gov: number;              // 政府支持度
  media: number;            // 媒体态度
  rival: number;            // 竞争对手关系
}

/**
 * 社会关系变化
 */
interface SocialChanges {
  worker?: number;
  gov?: number;
  media?: number;
  rival?: number;
}

/**
 * 股市状态
 */
interface StockState {
  holdings: number;         // 持股数量
  price: number;            // 当前股价
  history: StockTransaction[];
  priceHistory: number[];   // 价格走势图
}

/**
 * 股市交易记录
 */
interface StockTransaction {
  action: 'buy' | 'sell' | 'skip';
  price: number;
  priceDelta?: number;
  shares?: number;
}
```

### 1.2 事件数据模型

```typescript
/**
 * 事件定义 (Event)
 */
interface Event {
  id: string;
  name: string;
  description: string;
  imageKey?: string;         // SVG 图库 key
  imageSvg?: string;         // 实际 SVG (运行时填充)
  historicalParallel?: string;
  quote?: Quote;
  options: Option[];
  knowledge: string;
  question?: Question;        // 可选思考题
  type?: 'normal' | 'slider'; // 事件类型

  // 运行时标记
  isRouteEvent?: boolean;
  routeType?: string;
  isHiddenEvent?: boolean;
  isSpecialEvent?: boolean;
  isEpochSpecial?: boolean;
}

/**
 * 选项定义
 */
interface Option {
  text: string;
  wealth: number;
  conflict: number;
  tech: number;
  routeTag?: 'conservative' | 'technologist' | 'reformer';
  social?: SocialChanges;
}

/**
 * 滑块事件选项
 */
interface SliderOption extends Option {
  slider: {
    label: string;
    min: number;
    max: number;
    default: number;
    preview: string;
  };
  sliderBase?: {
    wealth?: number;
    conflict?: number;
    tech?: number;
    routeTag?: string;
    social?: SocialChanges;
  };
}

/**
 * 名言引用
 */
interface Quote {
  text: string;
  author: string;
}

/**
 * 思考问题
 */
interface Question {
  text: string;
  options: {
    text: string;
    effect?: {
      wealth?: number;
      conflict?: number;
      tech?: number;
    };
  }[];
}
```

### 1.3 成就数据模型

```typescript
/**
 * 成就定义 (Achievement)
 */
interface Achievement {
  id: string;
  name: string;
  desc: string;
  check: AchievementCheckFn;
  unlocked: boolean;
}

/**
 * 成就检查函数类型
 */
type AchievementCheckFn = (
  history: HistoryEntry[],
  fragments: Record<string, Fragment>,
  endingsRecord: string[],
  gameState?: Partial<GameState>
) => boolean;

/**
 * 预定义成就检查函数
 */
const achievementChecks = {
  // 连续3次选择对应路线
  checkReformer: (history) => /* 连续3次改良 */;
  checkHardliner: (history) => /* 连续3次保守 */;
  checkTechnocrat: (history) => /* 连续3次技术 */;

  // 碎片收集
  checkWellRead: (history, fragments) => /* 全部碎片解锁 */;
  checkFragmentCollector: (history, fragments) => /* 单局4个碎片 */;

  // 结局相关
  checkTrueEnding: (history, fragments, endings) => /* 达成真结局 */;
  checkWelfareEnding: (history, fragments, endings) => /* 福利国家 */;
  checkTechFeudalismEnding: (history, fragments, endings) => /* 技术封建 */;
  checkHistoryCycle: (history, fragments, endings) => /* 3连续革命 */;

  // 数值相关
  checkCenturyCapitalist: (history, fragments, endings, state) => /* 财富>300 */;
  checkPeacefulCapitalist: (history, fragments, endings, state) => /* 矛盾<30 */;
  checkSurvivor: (history) => /* 存活>10回合 */;

  // 路线探索
  checkAllRoutes: (history) => /* 三大路线各一次 */;

  // 股市
  checkStockMaster: (history, fragments, endings, state) => /* 股市获利>50 */;

  // 答题
  checkQuestionAnswerer: (history) => /* 回答>=5问题 */;
};
```

### 1.4 认知碎片数据模型

```typescript
/**
 * 认知碎片定义 (Fragment)
 */
interface Fragment {
  id: string;
  name: string;
  desc: string;
  quote: string;
  condition: FragmentConditionFn;
  effect: FragmentEffect;
  unlocked: boolean;
}

/**
 * 碎片解锁条件函数
 */
type FragmentConditionFn = (
  history: HistoryEntry[],
  ending: { name: string; description: string; reason: string }
) => boolean;

/**
 * 碎片效果
 */
interface FragmentEffect {
  wealthStart?: number;      // 开局财富变化
  conflictStart?: number;   // 开局矛盾变化
  techStart?: number;       // 开局技术变化
  wealthPerRound?: number;  // 每回合财富
}

/**
 * 碎片条件函数
 */
const conditionFns = {
  conditionSurplusValue: (history, ending) => /* 剩余价值觉醒 */,
  conditionHistoricalMaterialism: (history, ending) => /* 唯物史观 */,
  conditionKeynesCritique: (history, ending) => /* 凯恩斯批判 */,
  conditionTechAlienation: (history, ending) => /* 技术异化 */,
  conditionFreeKingdom: (history, ending) => /* 自由王国 */,
  conditionClimateJustice: (history, ending) => /* 生态马克思主义 */,
  conditionMonopolyInsight: (history, ending) => /* 垄断资本 */,
  conditionClassConsciousness: (history, ending) => /* 阶级意识 */,
};
```

---

## 2. 核心类 API 参考

### 2.1 CapitalGame 类

```javascript
/**
 * CapitalGame - 游戏引擎核心类
 * 文件位置: js/core/GameEngine.js
 */
class CapitalGame {
  // ==================== 构造函数 ====================

  constructor()
  // 初始化游戏状态，设置默认值，创建 AudioManager 实例

  // ==================== 初始化方法 ====================

  initializeGame()
  // 初始化游戏：绑定事件、显示状态、应用纪元主题、渲染碎片、显示介绍

  async setEventImages(eventImages)
  // @param eventImages {object} SVG 图库对象
  // 注入事件图库，构建事件库，加载完整数据

  async _loadFullData()
  // 异步加载碎片和成就配置，合并已解锁状态

  bindEvents()
  // 绑定所有 UI 事件处理器

  // ==================== 游戏流程控制 ====================

  startGame()
  // 开始游戏：隐藏开始按钮，显示碎片选择

  showFragmentSelection()
  // 显示碎片选择弹窗

  nextEvent()
  // 调度下一事件：
  // 1. 检查上下文提示
  // 2. 应用回合碎片效果
  // 3. 检查各类特殊事件
  // 4. 纪元切换检查
  // 5. 随机普通事件

  displayEvent(event)
  // @param event {Event} 事件对象
  // 渲染事件标题、描述、SVG、选项/滑块

  // ==================== 用户交互处理 ====================

  handleChoice(option, event, cardEl)
  // @param option {Option} 玩家选择的选项
  // @param event {Event} 当前事件
  // @param cardEl {HTMLElement} 选项卡片 DOM 元素
  // 处理选择：D20 骰子 → 数值计算 → 状态更新 → 历史记录 → UI 更新

  renderSliderDecision(event, container)
  // @param event {Event} 滑块事件
  // @param container {HTMLElement} 容器 DOM
  // 渲染滑块交互 UI，绑定确认按钮事件

  tradeStock(action)
  // @param action {'buy' | 'sell' | 'skip'}
  // 处理股市买卖交易

  // ==================== 事件检查 ====================

  checkRouteEvent() → Event | null
  // 检查路线专属事件（改良/保守/技术）

  checkHiddenEvent() → boolean
  // 检查隐藏连锁事件（算力独裁）

  checkSocialEvent() → Event | null
  // 检查社会关系紧急事件（总罢工/政策红利）

  checkEpochSpecialEvent() → Event | null
  // 检查纪元特殊事件（装配线算法/算力篱笆等）

  // ==================== 结局判定 ====================

  checkGameStatus()
  // 检查胜负条件：
  // - socialConflict >= 100 → 革命爆发
  // - wealth <= 0 → 经济危机
  // - rounds >= maxRounds → 历史周期结束

  endGame(reason)
  // @param reason {string} 结束原因
  // 结束游戏：解锁碎片、渲染诊断报告、检查成就

  determineEnding() → Ending
  // @returns {Ending} { name, description }
  // 判定最终结局（3种）

  // ==================== 碎片与成就 ====================

  unlockFragments(ending, reason)
  // @param ending {Ending} 结局对象
  // @param reason {string} 结束原因
  // 检查并解锁达成本局的碎片

  checkAchievements(finalCheck = false)
  // @param finalCheck {boolean} 是否为最终检查
  // 检查所有成就的解锁条件

  // ==================== UI 更新 ====================

  updateStatusDisplay()
  // 更新状态栏（财富、矛盾、技术、持股等）

  updateWealth()
  // 计算并更新总财富（现金 + 股票市值）

  updateHistoryDisplay()
  // 更新历史记录面板

  showDiceRoll(value, callback)
  // @param value {number} 骰子点数
  // @param callback {Function} 动画完成回调
  // 显示 D20 骰子动画

  showKnowledgeModal(text, quote, question)
  // @param text {string} 知识文本
  // @param quote {Quote} 名言引用
  // @param question {Question} 思考问题
  // 显示知识弹窗（打字机效果）

  showContextualTip()
  // 根据当前状态显示上下文提示

  showToast(message, duration)
  // @param message {string} 提示文本
  // 显示临时 Toast 提示

  // ==================== 纪元与主题 ====================

  applyEpochTheme()
  // 应用当前纪元的主题样式和背景音乐

  showEpochTransition()
  // 显示纪元过渡动画

  // ==================== 持久化 ====================

  saveFragments()
  // 将碎片状态保存到 localStorage

  saveAchievements()
  // 将成就状态保存到 localStorage

  async loadFragments() → Record<string, Fragment>
  // 从 localStorage 加载碎片状态

  async loadAchievements() → Record<string, Achievement>
  // 从 localStorage 加载成就状态
}
```

### 2.2 AudioManager 类

```javascript
/**
 * AudioManager - Web Audio 音频管理器
 * 文件位置: js/core/AudioManager.js
 */
class AudioManager {
  // ==================== 构造函数 ====================

  constructor()
  // 初始化音频管理器，创建 3 个纪元的 Audio 元素

  // ==================== 音乐控制 ====================

  init()
  // 初始化 Web Audio Context（用于音效）

  playAmbient()
  // 播放当前纪元背景音乐

  stopAmbient()
  // 停止背景音乐

  toggle() → boolean
  // 切换播放状态，返回当前状态

  setEpoch(epoch)
  // @param epoch {1|2|3}
  // 切换纪元（淡入淡出过渡）

  // ==================== 音效播放 ====================

  playSfx(type)
  // @param type {'modal'|'epoch'|'end'|'dice'|'floatUp'|'click'}
  // 使用 Web Audio API 合成播放对应音效

  // ==================== 内部方法 ====================

  _crossfade(newEpoch)
  // 背景音乐交叉淡入淡出

  _fadeVolume(audio, target, durationMs, onDone)
  // @param audio {HTMLAudioElement}
  // @param target {number} 目标音量 (0-1)
  // @param durationMs {number} 渐变时长
  // @param onDone {Function} 完成回调
  // 音量渐变控制
}
```

---

## 3. 工具函数 API

### 3.1 Helpers (js/utils/helpers.js)

```javascript
/**
 * SVG 图表生成器
 */

/**
 * 生成 D20 骰子 SVG
 * @param {number} value - 骰子点数 (1-20)
 * @returns {string} SVG 字符串
 */
function getDiceSVG(value: number): string;

/**
 * 生成雷达图 SVG（核心数值）
 * @param {number[]} values - 三个数值
 * @param {string[]} labels - 三个标签
 * @param {number} maxVal - 最大值，默认 100
 * @returns {string} SVG 字符串
 */
function generateRadarSVG(values: number[], labels: string[], maxVal?: number): string;

/**
 * 生成趋势折线图 SVG
 * @param {Array<{wealth, conflict, tech}>} history - 历史数据
 * @returns {string} SVG 字符串
 */
function generateTrendChartSVG(history: TrendPoint[]): string;

/**
 * 生成社会关系四轴雷达图 SVG
 * @param {number[]} values - [worker, gov, media, rival]
 * @param {string[]} labels - 四个标签
 * @param {number} maxVal - 最大值，默认 100
 * @returns {string} SVG 字符串
 */
function generateSocialRadarSVG(values: number[], labels: string[], maxVal?: number): string;

/**
 * 生成纪元过渡动画 SVG/HTML
 * @param {number} fromEpoch - 来源纪元
 * @param {number} toEpoch - 目标纪元
 * @returns {string} HTML/SVG 字符串
 */
function getEpochTransitionAnimation(fromEpoch: number, toEpoch: number): string;

/**
 * 生成股市价格走势图 SVG
 * @param {number[]} prices - 价格历史数组
 * @param {number} width - 图表宽度
 * @param {number} height - 图表高度
 * @returns {string} SVG 字符串
 */
function generateStockChartSVG(prices: number[], width?: number, height?: number): string;

/**
 * 创建粒子爆发效果
 * @param {HTMLElement} target - 目标元素
 * @param {string} color - 粒子颜色
 * @param {number} count - 粒子数量
 */
function createParticleBurst(target: HTMLElement, color: string, count?: number): void;
```

### 3.2 Loader (js/data/loader.js)

```javascript
/**
 * YAML 配置加载器
 */

/**
 * 加载单个 YAML 文件
 * @param {string} path - 相对于 yaml/ 的路径
 * @returns {Promise<object>} 解析后的数据
 */
async function loadYaml(path: string): Promise<object>;

/**
 * 批量加载多个 YAML 文件
 * @param {string[]} paths - 文件路径数组
 * @returns {Promise<object[]>} 解析后的数据数组
 */
async function loadYamls(paths: string[]): Promise<object[]>;

/**
 * 加载所有纪元事件
 * @param {object} eventImages - SVG 图库对象
 * @returns {Promise<object>} 事件库对象
 */
async function loadAllEvents(eventImages: object): Promise<EventLibrary>;

/**
 * 加载成就配置
 * @param {object} checks - 成就检查函数库
 * @returns {Promise<object>} 成就对象
 */
async function loadAchievements(checks: object): Promise<Record<string, Achievement>>;

/**
 * 加载认知碎片配置
 * @param {object} conditions - 碎片条件函数库
 * @returns {Promise<object>} 碎片对象
 */
async function loadFragments(conditions: object): Promise<Record<string, Fragment>>;

/**
 * 加载 SVG 图库
 * @returns {Promise<object>} imageKey -> SVG 字符串的映射
 */
async function loadImages(): Promise<Record<string, string>>;
```

---

## 4. 配置格式参考

### 4.1 事件 YAML 格式

```yaml
# yaml/events/epoch1.yaml
- id: enclosure                    # 事件唯一标识
  name: 圈地运动                   # 事件标题
  description: >-
    你发现了一片公共土地，如果将其
    私有化建立工厂，能获得巨大财富...  # 事件描述
  imageKey: enclosure              # SVG 图库 key
  historicalParallel: >-
    英国16-18世纪圈地运动...        # 历史类比
  quote:                            # 名言引用（可选）
    text: '"资本来到世间..."'
    author: 马克思
  options:                          # 选项列表
    - text: 暴力强占                # 选项文本
      wealth: 50                   # 财富变化
      conflict: 20                 # 矛盾变化
      tech: 0                      # 技术变化
      routeTag: conservative        # 路线标签
      social:                      # 社会关系变化（可选）
        worker: -15
        gov: -5
        media: -10
        rival: 0
  knowledge: >-
    唯物史观：生产力的发展...        # 知识文本
  question:                         # 思考问题（可选）
    text: "当劳动被切成可计量的碎片..."
    options:
      - text: 技术在解放人
        effect:
          wealth: 0
          conflict: -5
          tech: 5
```

### 4.2 成就 YAML 格式

```yaml
# yaml/achievements.yaml
- id: trueEnding                   # 成就唯一标识
  name: ✨ 破局之人                 # 成就名称
  desc: 达成真结局：自由人联合体     # 成就描述
  checkFn: checkTrueEnding         # 检查函数名
  unlocked: false                  # 默认未解锁
```

### 4.3 碎片 YAML 格式

```yaml
# yaml/fragments.yaml
- id: surplusValue                 # 碎片唯一标识
  name: 剩余价值觉醒               # 碎片名称
  desc: 对劳资关系的本质有了初步认识。 # 碎片描述
  quote: >-
    "资本是死劳动，它像吸血鬼一样..." # 关联名言
  conditionFn: conditionSurplusValue  # 解锁条件函数名
  effect:                           # 碎片效果
    wealthStart: -10                # 开局财富变化
    wealthPerRound: 5               # 每回合财富变化
  unlocked: false                   # 默认未解锁
```

---

## 5. localStorage 数据格式

| 存储键 | 数据类型 | 描述 |
|-------|---------|------|
| `cg_fragments` | JSON | `{ fragmentId: { unlocked: boolean } }` |
| `cg_achievements` | JSON | `{ achievementId: { unlocked: boolean } }` |
| `cg_endings` | JSON | `string[]` - 结局记录列表 |
| `cg_skipIntro` | string | `"1"` - 跳过介绍标志 |

---

*本文档为数据模型与 API 参考手册，提供完整的类型定义和接口说明。*

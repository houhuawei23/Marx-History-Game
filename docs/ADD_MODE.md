# 如何添加新模式

本指南说明如何为《资本：轮回与破局》添加新的游戏模式（如“极速模式”、“挑战模式”、“沙盒模式”等）。

## 模式系统的核心思想

当前游戏通过 `js/config.js` 中的 `GAME_SETTINGS` 控制核心参数（初始属性、最大回合数等）。添加新模式的最简单方式是：

1. 在配置中新增一套模式参数。
2. 在游戏开始时让玩家选择模式。
3. 根据所选模式覆盖默认参数。

## 第一步：在配置中定义新模式

打开 `js/config.js`，在 `GAME_SETTINGS` 中扩展模式配置：

```javascript
export const GAME_MODES = {
    standard: {
        name: '标准模式',
        description: '体验完整的资本主义发展历程',
        settings: {
            maxRounds: 6,
            startWealth: 100,
            startConflict: 30,
            startTech: 50
        }
    },
    speedrun: {
        name: '极速模式',
        description: '每纪元只有 1 个回合，快节奏决策',
        settings: {
            maxRounds: 3,
            startWealth: 120,
            startConflict: 40,
            startTech: 60
        }
    },
    hardcore: {
        name: '硬核模式',
        description: '开局矛盾更高，容错率更低',
        settings: {
            maxRounds: 6,
            startWealth: 80,
            startConflict: 60,
            startTech: 40
        }
    }
};
```

## 第二步：修改引擎以支持模式选择

### 2.1 存储当前模式

在 `js/core/GameEngine.js` 的 `CapitalGame` 构造函数中，添加模式字段：

```javascript
this.currentMode = 'standard'; // 默认标准模式
this.modeConfig = GAME_MODES.standard.settings;
```

### 2.2 添加模式选择弹窗

参考 `showFragmentSelection()` 的实现方式，添加一个 `showModeSelection()` 方法：

```javascript
showModeSelection() {
    const container = document.getElementById('mode-selection-content');
    const modal = document.getElementById('mode-selection-modal');

    let html = '<h3 style="text-align:center;margin-bottom:20px;color:#feca57;">选择游戏模式</h3>';
    for (const [key, mode] of Object.entries(GAME_MODES)) {
        html += `
            <div class="mode-card" data-mode="${key}">
                <h4>${mode.name}</h4>
                <p>${mode.description}</p>
            </div>
        `;
    }
    container.innerHTML = html;
    modal.style.display = 'flex';
    modal.classList.remove('fade-out');

    container.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => {
            const modeKey = card.dataset.mode;
            this.currentMode = modeKey;
            this.modeConfig = GAME_MODES[modeKey].settings;
            // 应用模式参数到初始状态
            this.wealth = this.modeConfig.startWealth;
            this.socialConflict = this.modeConfig.startConflict;
            this.techPower = this.modeConfig.startTech;
            this.updateStatusDisplay();

            modal.classList.add('fade-out');
            setTimeout(() => {
                modal.style.display = 'none';
                this.showFragmentSelection(); // 继续原有流程
            }, 300);
        });
    });
}
```

### 2.3 修改 startGame 流程

将 `startGame()` 改为先弹出模式选择：

```javascript
startGame() {
    document.getElementById('start-btn').style.display = 'none';
    this.showModeSelection();
}
```

如果不想让模式选择和碎片选择冲突，也可以将模式选择放在开始按钮之前（比如在首页直接显示两个模式按钮）。

### 2.4 让引擎使用动态参数

在 `GameEngine.js` 中，将硬编码的 `GAME_SETTINGS.maxRounds` 替换为 `this.modeConfig.maxRounds`：

- `checkGameStatus()` 中的 `this.rounds >= GAME_SETTINGS.maxRounds`
- 构造函数中的初始值赋值

## 第三步：添加模式专属 UI

在 `index.html` 中添加模式选择弹窗的 DOM 结构（可模仿碎片选择弹窗）：

```html
<!-- 模式选择弹窗 -->
<div class="fragment-selection-modal" id="mode-selection-modal" style="display: none;">
    <div class="fragment-selection-content" id="mode-selection-content"></div>
</div>
```

> 说明：可以直接复用 `.fragment-selection-modal` 的样式类，无需额外写 CSS。

## 第四步：扩展模式差异化（进阶）

### 专属事件池

在 `js/data/events.js` 的 `buildEventLibrary` 返回对象中，新增 `modes` 字段：

```javascript
return {
    1: [...],
    2: [...],
    3: [...],
    route: {...},
    hidden: {...},
    modes: {
        hardcore: {
            1: [ /* 硬核模式专属纪元1事件 */ ],
            2: [ /* ... */ ],
            3: [ /* ... */ ]
        }
    }
};
```

然后在 `GameEngine.js` 的 `nextEvent()` 中，根据当前模式合并事件池：

```javascript
const modeEvents = this.events.modes && this.events.modes[this.currentMode]
    ? this.events.modes[this.currentMode][this.epoch] || []
    : [];
const baseEvents = this.events[this.epoch] || [];
const pool = [...baseEvents, ...modeEvents];
const randomEvent = pool[Math.floor(Math.random() * pool.length)];
this.displayEvent(randomEvent);
```

### 模式专属成就

在 `js/data/achievements.js` 中添加新模式成就，并在 `checkAchievements()` 中正常检测即可。

## 第五步：测试与迭代

1. 确保新模式参数能正确覆盖默认值。
2. 检查 `restartGame()` 时模式是否重置为默认（或保留上次选择，视设计而定）。
3. 在多种模式下运行完整游戏流程，确认结局判定无误。

## 快速检查清单

- [ ] `js/config.js` 中新增了模式参数
- [ ] `GameEngine.js` 中添加了模式选择 UI 与逻辑
- [ ] `index.html` 中添加了模式选择弹窗 DOM
- [ ] 所有引用 `GAME_SETTINGS.maxRounds` / 初始值的地方已适配动态参数
- [ ] 测试了重新开始后的状态重置

祝开发顺利！

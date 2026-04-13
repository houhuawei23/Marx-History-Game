# 如何添加新事件

本指南说明如何在《资本：轮回与破局》中添加全新的事件（情景）。

## 第一步：添加事件图片（可选）

如果新事件需要专属插图，打开 `js/data/assets.js`，在 `EventImages` 对象中添加一个新的 SVG 字符串：

```javascript
export const EventImages = {
    // ... 已有图片 ...
    myNewEvent: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">...你的SVG代码...</svg>`
};
```

> 提示：如果不添加图片，可将事件的 `imageSvg` 字段留空，系统会显示空白背景。

## 第二步：定义事件数据

打开 `js/data/events.js`，在对应纪元的数组中添加事件对象。

### 2.1 普通卡牌事件

```javascript
{
    name: "事件名称",
    description: "事件描述文本",
    imageSvg: EventImages.myNewEvent,      // 引用第一步添加的图片
    historicalParallel: "历史对照说明",
    quote: { 
        text: '"经典语录"', 
        author: '作者' 
    },
    options: [
        {text: "选项A", wealth: 10, conflict: 5, tech: 0, routeTag: 'conservative', socialImpact: {workers: -5, media: 10}},
        {text: "选项B", wealth: -10, conflict: -5, tech: 10, routeTag: 'reformer', socialImpact: {workers: 10, gov: 5}},
        {text: "选项C", wealth: 0, conflict: 0, tech: 20, routeTag: 'technologist', socialImpact: {competitors: -10}}
    ],
    knowledge: "该事件对应的马克思主义知识点讲解"
}
```

### 2.2 滑块事件

```javascript
{
    name: "技术革命",
    type: 'slider',
    description: "你面临一场技术革命，需要决定投入程度。",
    imageSvg: EventImages.tech,
    historicalParallel: "历史对照说明",
    sliderConfig: {
        min: 0,
        max: 100,
        defaultValue: 50,
        labels: { low: '维持现状', mid: '适度投资', high: '全力投入' }
    },
    options: [
        {
            // 滑块事件的 options[0] 提供基准值，用于线性插值计算实际影响
            text: "技术投入",
            wealth: -30, conflict: 10, tech: 30,
            routeTag: 'technologist',
            socialImpact: {workers: -15, media: 10}
        }
    ],
    knowledge: "知识点讲解"
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 事件标题 |
| `type` | string | 可选。`'slider'` 表示使用滑块交互，否则为卡牌选项 |
| `description` | string | 事件描述 |
| `imageSvg` | string | SVG 字符串（可选） |
| `historicalParallel` | string | 历史对照，用于诊断报告 |
| `quote` | object | `{text, author}`，用于诊断报告 |
| `sliderConfig` | object | 滑块事件专用：`{min, max, defaultValue, labels}` |
| `options` | array | 2-4 个选项，每个选项包含 `text`、`wealth`、`conflict`、`tech`、`routeTag`、`socialImpact` |
| `knowledge` | string | 知识弹窗中显示的马克思主义知识点 |

#### `socialImpact` 说明

影响 4 项社会关系指标的增减，字段名为：
- `workers`（工人信任）
- `gov` / `government`（政府支持）
- `media`（媒体舆论）
- `competitors` / `rival`（竞争对手压力）

#### `routeTag` 说明

- `conservative`：保守路线（铁血资本、利润优先）
- `technologist`：技术路线（投资创新、自动化）
- `reformer`：改良路线（福利、妥协、缓和矛盾）

## 第三步：添加路线专属事件（可选）

如果你想让某个路线在特定条件下触发专属事件，可在 `events.js` 的 `route` 对象下添加：

```javascript
route: {
    // ... 已有路线事件 ...
    technologist: {
        name: "技术奇点",
        description: "...",
        // ... 同上
    }
}
```

触发逻辑已在 `GameEngine.js` 的 `checkRouteEvent()` 中写好：当某一路线选择次数 ≥ 2 且有 50% 概率时触发。

## 第四步：添加隐藏连锁事件（可选）

在 `events.js` 的 `hidden` 对象下添加事件，并在 `GameEngine.js` 的 `checkHiddenEvent()` 中配置触发条件。

例如，在 `checkHiddenEvent()` 中添加：

```javascript
const hasMyNewEvent = this.history.some(h => h.event === '你的前置事件名' && h.choice.includes('某个选项关键字'));
const notYetTriggered = !this.history.some(h => h.event === '你的隐藏事件名');
if (hasMyNewEvent && notYetTriggered && this.epoch === 3) {
    this.displayEvent({ ...this.events.hidden.yourHiddenEvent, isHiddenEvent: true });
    return true;
}
```

### 社会关系紧急事件（进阶）

如果你想让某个社会关系指标达到极端值时触发紧急事件，可在 `GameEngine.js` 的 `checkSocialEmergencyEvent()` 中添加判断：

```javascript
if (this.socialRelations.workers <= 10) {
    this.displayEvent({ ...this.events.social.generalStrike, isHiddenEvent: true });
    return true;
}
```

对应的 `events.social` 事件池需在 `events.js` 中定义。

## 第五步：测试

1. 运行 `tools/start.bat`（Windows）或 `bash tools/start.sh`（Linux/macOS）启动本地服务器。
2. 在浏览器中打开游戏，通过多次游玩验证新事件是否正常出现。
3. 检查控制台（F12）是否有报错。

## 完整示例

在 `js/data/events.js` 的纪元 2 数组中添加：

```javascript
{
    name: "关税战争",
    description: "主要贸易伙伴对你出口的商品征收高额关税，海外市场急剧萎缩。",
    imageSvg: EventImages.crisis,
    historicalParallel: "2018年中美贸易战：保护主义抬头，全球化遭遇逆流。",
    quote: { text: '"资产阶级，由于开拓了世界市场，使一切国家的生产和消费都成为世界性的了。"', author: '马克思、恩格斯' },
    options: [
        {text: "游说政府采取报复性关税", wealth: -15, conflict: 10, tech: 0, routeTag: 'conservative', socialImpact: {gov: 10, media: -5}},
        {text: "将工厂迁往低关税国家", wealth: 10, conflict: 15, tech: 5, routeTag: 'technologist', socialImpact: {workers: -15, competitors: 10}},
        {text: "转向内需市场，提高工人福利", wealth: -20, conflict: -10, tech: 0, routeTag: 'reformer', socialImpact: {workers: 15, media: 10}}
    ],
    knowledge: "资本的全球化扩张使其对国际政治经济环境高度敏感。关税壁垒反映了帝国主义国家间争夺市场的矛盾。"
}
```

保存文件，刷新浏览器即可体验新事件！

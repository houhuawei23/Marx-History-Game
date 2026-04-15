/**
 * YAML 配置加载器
 * 使用 js-yaml 解析 YAML 配置文件
 */

// 使用 jsDelivr CDN 加载 js-yaml
import * as yaml from 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm';

const YAML_BASE = './yaml/';

/**
 * 加载单个 YAML 文件
 * @param {string} path -相对于 yaml/ 的路径
 * @returns {Promise<object>} 解析后的数据
 */
export async function loadYaml(path) {
    const url = YAML_BASE + path;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status}`);
        }
        const text = await response.text();
        return yaml.load(text);
    } catch (e) {
        console.error(`Error loading YAML ${path}:`, e);
        return null;
    }
}

/**
 * 批量加载多个 YAML 文件
 * @param {string[]} paths - 文件路径数组
 * @returns {Promise<object[]>} 解析后的数据数组
 */
export async function loadYamls(paths) {
    return Promise.all(paths.map(p => loadYaml(p)));
}

/**
 * 加载所有纪元事件
 * @param {object} eventImages - SVG 图库对象
 * @returns {Promise<object>} 事件库对象，按纪元组织
 */
export async function loadAllEvents(eventImages) {
    const [epoch1, epoch2, epoch3, route, hidden, special] = await loadYamls([
        'events/epoch1.yaml',
        'events/epoch2.yaml',
        'events/epoch3.yaml',
        'events/route.yaml',
        'events/hidden.yaml',
        'events/special.yaml'
    ]);

    return {
        1: epoch1.map(e => enrichEvent(e, eventImages)),
        2: epoch2.map(e => enrichEvent(e, eventImages)),
        3: epoch3.map(e => enrichEvent(e, eventImages)),
        route: {
            conservative: enrichEvent(route.conservative, eventImages),
            technologist: enrichEvent(route.technologist, eventImages),
            reformer: enrichEvent(route.reformer, eventImages)
        },
        hidden: {
            computeDictator: enrichEvent(hidden.computeDictator, eventImages)
        },
        special: {
            workerStrikeEmergency: enrichEvent(special.workerStrikeEmergency, eventImages),
            policyDividend: enrichEvent(special.policyDividend, eventImages),
            epochSpecial: {
                assemblyLineAlgorithm: enrichEvent(special.epochSpecial.assemblyLineAlgorithm, eventImages),
                computeFence: enrichEvent(special.epochSpecial.computeFence, eventImages),
                publicComputeTrial: enrichEvent(special.epochSpecial.publicComputeTrial, eventImages),
                uselessClassNight: enrichEvent(special.epochSpecial.uselessClassNight, eventImages)
            }
        }
    };
}

/**
 * 为事件补充 imageSvg
 * @param {object} event - 事件对象
 * @param {object} eventImages - SVG 图库
 * @returns {object} 补充后的事件
 */
function enrichEvent(event, eventImages) {
    if (!event) return event;
    const enriched = { ...event };
    if (event.imageKey && eventImages) {
        enriched.imageSvg = eventImages[event.imageKey] || '';
    }
    return enriched;
}

/**
 * 加载成就配置
 * @param {object} checks - 成就检查函数库
 * @returns {Promise<object>} 成就对象
 */
export async function loadAchievements(checks) {
    const data = await loadYaml('achievements.yaml');
    if (!data) return {};

    const achievements = {};
    for (const item of data) {
        achievements[item.id] = {
            id: item.id,
            name: item.name,
            desc: item.desc,
            check: checks[item.checkFn] || (() => false),
            unlocked: item.unlocked || false
        };
    }
    return achievements;
}

/**
 * 加载认知碎片配置
 * @param {object} conditions - 碎片条件函数库
 * @returns {Promise<object>} 碎片对象
 */
export async function loadFragments(conditions) {
    const data = await loadYaml('fragments.yaml');
    if (!data) return {};

    const fragments = {};
    for (const item of data) {
        fragments[item.id] = {
            id: item.id,
            name: item.name,
            desc: item.desc,
            quote: item.quote,
            condition: conditions[item.conditionFn] || (() => false),
            effect: item.effect || {},
            unlocked: item.unlocked || false
        };
    }
    return fragments;
}

/**
 * 加载 SVG 图库
 * @returns {Promise<object>} imageKey -> SVG 字符串的映射
 */
export async function loadImages() {
    const data = await loadYaml('images.yaml');
    if (!data) return {};
    return data;
}

/**
 * 事件库加载器
 * 从 YAML 配置文件加载事件数据
 *
 * @deprecated 请使用 loader.js 中的 loadAllEvents 函数
 */

import { loadAllEvents } from './loader.js';

/**
 * 构建事件库（异步）
 * @param {object} EventImages - SVG 图库对象
 * @returns {Promise<object>} 事件库对象
 */
export async function buildEventLibrary(EventImages) {
    return loadAllEvents(EventImages);
}

/**
 * 同步版本 - 返回空对象，由 setEventImages 异步填充
 * @param {object} EventImages - SVG 图库对象（此参数被忽略）
 * @returns {object} 空对象
 */
export function buildEventLibrarySync(EventImages) {
    // 返回空对象，异步加载由 GameEngine.setEventImages 处理
    return {};
}

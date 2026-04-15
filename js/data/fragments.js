/**
 * 认知碎片系统（Meta-progression）
 * 从 YAML 配置和 conditionFns.js 加载
 */

import { loadFragments } from './loader.js';
import { conditionFns } from './conditionFns.js';

/**
 * 加载认知碎片配置（异步）
 * @returns {Promise<object>} 碎片对象
 */
export async function loadFragmentsConfig() {
    return loadFragments(conditionFns);
}

/**
 * 获取碎片条件函数映射
 * @returns {object} 条件函数映射
 */
export function getConditionFns() {
    return conditionFns;
}

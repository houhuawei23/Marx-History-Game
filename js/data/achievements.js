/**
 * 成就系统
 * 从 YAML 配置和 achievementChecks.js 加载
 */

import { loadAchievements } from './loader.js';
import { achievementChecks } from './achievementChecks.js';

/**
 * 加载成就配置（异步）
 * @returns {Promise<object>} 成就对象
 */
export async function loadAchievementsConfig() {
    return loadAchievements(achievementChecks);
}

/**
 * 同步版本 - 返回包含检查函数的对象
 * @returns {object} 成就检查函数映射
 */
export function getAchievementChecks() {
    return achievementChecks;
}

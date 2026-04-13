/**
 * 成就系统
 * 隐藏成就，在特定条件下解锁
 */

export const Achievements = {
    reformer: {
        id: 'reformer',
        name: '🕊️ 改良主义者',
        desc: '连续3次选择改良选项',
        check: (history) => {
            if (history.length < 3) return false;
            const last3 = history.slice(-3);
            return last3.every(h => h.routeTag === 'reformer');
        },
        unlocked: false
    },
    hardliner: {
        id: 'hardliner',
        name: '⚔️ 铁血资本家',
        desc: '连续3次选择保守选项',
        check: (history) => {
            if (history.length < 3) return false;
            const last3 = history.slice(-3);
            return last3.every(h => h.routeTag === 'conservative');
        },
        unlocked: false
    },
    technocrat: {
        id: 'technocrat',
        name: '🤖 技术至上',
        desc: '连续3次选择技术选项',
        check: (history) => {
            if (history.length < 3) return false;
            const last3 = history.slice(-3);
            return last3.every(h => h.routeTag === 'technologist');
        },
        unlocked: false
    },
    wellRead: {
        id: 'wellRead',
        name: '📖 熟读《资本论》',
        desc: '解锁全部认知碎片',
        check: (history, fragments) => Object.values(fragments).every(f => f.unlocked),
        unlocked: false
    },
    historyCycle: {
        id: 'historyCycle',
        name: '🔁 历史循环',
        desc: '连续3局触发革命结局',
        check: (history, fragments, endingsRecord) => {
            if (!endingsRecord || endingsRecord.length < 3) return false;
            const last3 = endingsRecord.slice(-3);
            return last3.every(e => e.includes('无产阶级革命'));
        },
        unlocked: false
    },
    trueEnding: {
        id: 'trueEnding',
        name: '✨ 破局之人',
        desc: '达成真结局：自由人联合体',
        check: (history, fragments, endingsRecord) => endingsRecord && endingsRecord.some(e => e.includes('自由人联合体')),
        unlocked: false
    }
};

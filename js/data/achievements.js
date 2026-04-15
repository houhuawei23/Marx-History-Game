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
    },
    // 新增成就
    allRoutesExplorer: {
        id: 'allRoutesExplorer',
        name: '🧭 全景观察者',
        desc: '三大路线各至少选择一次',
        check: (history) => {
            if (history.length < 3) return false;
            const routes = new Set(history.map(h => h.routeTag).filter(r => r));
            return routes.has('conservative') && routes.has('technologist') && routes.has('reformer');
        },
        unlocked: false
    },
    centuryCapitalist: {
        id: 'centuryCapitalist',
        name: '💰 世纪大亨',
        desc: '单局财富积累超过300',
        check: (history, fragments, endingsRecord, gameState) => {
            return gameState && gameState.wealth >= 300;
        },
        unlocked: false
    },
    peacefulCapitalist: {
        id: 'peacefulCapitalist',
        name: '☮️ 和平资本家',
        desc: '单局社会矛盾始终低于30',
        check: (history, fragments, endingsRecord, gameState) => {
            if (!gameState) return false;
            // 检查历史中所有矛盾的峰值
            let maxConflict = 30;
            history.forEach(h => {
                if (h.changes && h.changes.conflict) {
                    maxConflict = Math.max(maxConflict, h.changes.conflict);
                }
            });
            return maxConflict < 50; // 只要不是极端高矛盾
        },
        unlocked: false
    },
    welfareEnding: {
        id: 'welfareEnding',
        name: '🏛️ 福利国家',
        desc: '达成福利国家的乌托邦结局',
        check: (history, fragments, endingsRecord) => endingsRecord && endingsRecord.some(e => e.includes('福利国家的乌托邦')),
        unlocked: false
    },
    techFeudalismEnding: {
        id: 'techFeudalismEnding',
        name: '💀 技术封建主义',
        desc: '达成坏结局：技术封建主义',
        check: (history, fragments, endingsRecord) => endingsRecord && endingsRecord.some(e => e.includes('技术封建主义')),
        unlocked: false
    },
    survivor: {
        id: 'survivor',
        name: '🛡️ 幸存者',
        desc: '存活超过10回合',
        check: (history) => history.length >= 10,
        unlocked: false
    },
    stockMaster: {
        id: 'stockMaster',
        name: '📈 股市大师',
        desc: '通过股市获利超过50',
        check: (history, fragments, endingsRecord, gameState) => {
            return gameState && gameState.stockHistory && gameState.stockHistory.some(h => h.action === 'sell' && h.priceDelta > 0);
        },
        unlocked: false
    },
    questionAnswerer: {
        id: 'questionAnswerer',
        name: '🤔 理论思考者',
        desc: '回答至少5个思考问题',
        check: (history) => {
            // 统计有 question 字段的事件中被选择的情况
            const questionEvents = history.filter(h => h.questionAnswered);
            return questionEvents.length >= 5;
        },
        unlocked: false
    },
    fragmentCollector: {
        id: 'fragmentCollector',
        name: '📚 碎片收藏家',
        desc: '单局解锁超过4个认知碎片',
        check: (history, fragments) => {
            const unlockedThisRun = Object.values(fragments).filter(f => f.unlocked).length;
            return unlockedThisRun >= 4;
        },
        unlocked: false
    }
};

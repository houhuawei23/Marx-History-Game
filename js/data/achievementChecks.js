/**
 * 成就检查函数库
 * 每个函数接收特定参数，返回 boolean 表示是否解锁
 */

export const achievementChecks = {
    /**
     * 连续3次选择改良选项
     */
    checkReformer: (history) => {
        if (history.length < 3) return false;
        const last3 = history.slice(-3);
        return last3.every(h => h.routeTag === 'reformer');
    },

    /**
     * 连续3次选择保守选项
     */
    checkHardliner: (history) => {
        if (history.length < 3) return false;
        const last3 = history.slice(-3);
        return last3.every(h => h.routeTag === 'conservative');
    },

    /**
     * 连续3次选择技术选项
     */
    checkTechnocrat: (history) => {
        if (history.length < 3) return false;
        const last3 = history.slice(-3);
        return last3.every(h => h.routeTag === 'technologist');
    },

    /**
     * 解锁全部认知碎片
     */
    checkWellRead: (history, fragments) => {
        return Object.values(fragments).every(f => f.unlocked);
    },

    /**
     * 连续3局触发革命结局
     */
    checkHistoryCycle: (history, fragments, endingsRecord) => {
        if (!endingsRecord || endingsRecord.length < 3) return false;
        const last3 = endingsRecord.slice(-3);
        return last3.every(e => e.includes('无产阶级革命'));
    },

    /**
     * 达成真结局：自由人联合体
     */
    checkTrueEnding: (history, fragments, endingsRecord) => {
        return endingsRecord && endingsRecord.some(e => e.includes('自由人联合体'));
    },

    /**
     * 三大路线各至少选择一次
     */
    checkAllRoutes: (history) => {
        if (history.length < 3) return false;
        const routes = new Set(history.map(h => h.routeTag).filter(r => r));
        return routes.has('conservative') && routes.has('technologist') && routes.has('reformer');
    },

    /**
     * 单局财富积累超过300
     */
    checkCenturyCapitalist: (history, fragments, endingsRecord, gameState) => {
        return gameState && gameState.wealth >= 300;
    },

    /**
     * 单局社会矛盾始终较低
     */
    checkPeacefulCapitalist: (history, fragments, endingsRecord, gameState) => {
        if (!gameState) return false;
        let maxConflict = 30;
        history.forEach(h => {
            if (h.changes && h.changes.conflict) {
                maxConflict = Math.max(maxConflict, h.changes.conflict);
            }
        });
        return maxConflict < 50;
    },

    /**
     * 达成福利国家的乌托邦结局
     */
    checkWelfareEnding: (history, fragments, endingsRecord) => {
        return endingsRecord && endingsRecord.some(e => e.includes('福利国家的乌托邦'));
    },

    /**
     * 达成坏结局：技术封建主义
     */
    checkTechFeudalismEnding: (history, fragments, endingsRecord) => {
        return endingsRecord && endingsRecord.some(e => e.includes('技术封建主义'));
    },

    /**
     * 存活超过10回合
     */
    checkSurvivor: (history) => {
        return history.length >= 10;
    },

    /**
     * 通过股市获利超过50
     */
    checkStockMaster: (history, fragments, endingsRecord, gameState) => {
        return gameState && gameState.stockHistory && gameState.stockHistory.some(h => h.action === 'sell' && h.priceDelta > 0);
    },

    /**
     * 回答至少5个思考问题
     */
    checkQuestionAnswerer: (history) => {
        const questionEvents = history.filter(h => h.questionAnswered);
        return questionEvents.length >= 5;
    },

    /**
     * 单局解锁超过4个认知碎片
     */
    checkFragmentCollector: (history, fragments) => {
        const unlockedThisRun = Object.values(fragments).filter(f => f.unlocked).length;
        return unlockedThisRun >= 4;
    }
};

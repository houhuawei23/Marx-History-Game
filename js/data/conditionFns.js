/**
 * 认知碎片条件函数库
 * 每个函数接收 (history, ending) 参数，返回 boolean 表示是否解锁
 */

export const conditionFns = {
    /**
     * 剩余价值觉醒：工人罢工事件中选择镇压选项
     */
    conditionSurplusValue: (history, ending) => {
        return history.some(h => h.event === '工人罢工' && h.choice.includes('镇压'));
    },

    /**
     * 唯物史观萌芽：经历过圈地运动
     */
    conditionHistoricalMaterialism: (history, ending) => {
        return history.some(h => h.event === '圈地运动');
    },

    /**
     * 凯恩斯主义批判：经济危机中选择提高工人工资
     */
    conditionKeynesCritique: (history, ending) => {
        return history.some(h => h.event === '经济危机' && h.choice.includes('提高工人工资'));
    },

    /**
     * 技术异化洞察：技术革命中选择全力投入
     */
    conditionTechAlienation: (history, ending) => {
        return history.some(h => h.event === '技术革命' && h.choice.includes('全力'));
    },

    /**
     * 自由王国钥匙：达成真结局
     */
    conditionFreeKingdom: (history, ending) => {
        return ending && ending.name === '自由人联合体';
    },

    /**
     * 生态马克思主义：全球气候危机中选择全面环保
     */
    conditionClimateJustice: (history, ending) => {
        return history.some(h => h.event === '全球气候危机' && h.choice.includes('全面'));
    },

    /**
     * 垄断资本认知：经历过数字垄断或殖民扩张
     */
    conditionMonopolyInsight: (history, ending) => {
        return history.some(h => h.event === '数字垄断' || h.event === '殖民扩张');
    },

    /**
     * 阶级意识觉醒：触发无产阶级革命结局
     */
    conditionClassConsciousness: (history, ending) => {
        return ending && ending.reason && ending.reason.includes('无产阶级革命');
    }
};

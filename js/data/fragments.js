/**
 * 认知碎片系统（Meta-progression）
 * 记录玩家在游戏过程中获得的理论认知
 */

export const CognitiveFragments = {
    surplusValue: {
        id: 'surplusValue',
        name: '剩余价值觉醒',
        desc: '对劳资关系的本质有了初步认识。',
        quote: '"资本是死劳动，它像吸血鬼一样，只有吮吸活劳动才有生命。" —— 马克思《资本论》第一卷',
        condition: (history, ending) => history.some(h => h.event === '工人罢工' && h.choice.includes('镇压')),
        effect: { wealthStart: -10, wealthPerRound: 5 },
        unlocked: false
    },
    historicalMaterialism: {
        id: 'historicalMaterialism',
        name: '唯物史观萌芽',
        desc: '意识到生产力的发展必然要求生产关系的变革。',
        quote: '"人们在自己生活的社会生产中发生一定的、必然的、不以他们的意志为转移的关系。" —— 马克思',
        condition: (history, ending) => history.some(h => h.event === '圈地运动'),
        effect: { conflictStart: -5 },
        unlocked: false
    },
    keynesCritique: {
        id: 'keynesCritique',
        name: '凯恩斯主义批判',
        desc: '看清了资本主义国家干预的局限性。',
        quote: '"国家真正作为整个社会的代表所采取的第一个行动，同时也是它作为国家所采取的最后一个独立行动。" —— 恩格斯',
        condition: (history, ending) => history.some(h => h.event === '经济危机' && h.choice.includes('提高工人工资')),
        effect: { wealthStart: 10, conflictStart: 5 },
        unlocked: false
    },
    techAlienation: {
        id: 'techAlienation',
        name: '技术异化洞察',
        desc: '技术在资本主义制度下反而加深了人的异化。',
        quote: '"劳动用机器代替了手工劳动，但是，工人却变成了机器的单纯的附属品。" —— 《共产党宣言》',
        condition: (history, ending) => history.some(h => h.event === '技术革命' && h.choice.includes('全力')),
        effect: { techStart: 10, conflictStart: 5 },
        unlocked: false
    },
    freeKingdom: {
        id: 'freeKingdom',
        name: '自由王国钥匙',
        desc: '理解了生产力极度发达后私有制将失去意义。',
        quote: '"在必然王国的彼岸，作为目的本身的人类能力的发展，真正的自由王国，就开始了。" —— 马克思',
        condition: (history, ending) => ending && ending.name === '自由人联合体',
        effect: { techStart: 15, wealthStart: 15 },
        unlocked: false
    },
    climateJustice: {
        id: 'climateJustice',
        name: '生态马克思主义',
        desc: '认识到资本扩张与生态边界之间的冲突。',
        quote: '"资本主义生产破坏着一切财富的源泉——土地和劳动者。" —— 马克思',
        condition: (history, ending) => history.some(h => h.event === '全球气候危机' && h.choice.includes('全面')),
        effect: { conflictStart: -10 },
        unlocked: false
    },
    monopolyInsight: {
        id: 'monopolyInsight',
        name: '垄断资本认知',
        desc: '理解资本集中必然走向垄断。',
        quote: '"竞争转变为垄断，而现代社会的全部经济制度都建立在垄断的基础上。" —— 列宁',
        condition: (history, ending) => history.some(h => h.event === '数字垄断' || h.event === '殖民扩张'),
        effect: { wealthStart: 20, conflictStart: 10 },
        unlocked: false
    },
    classConsciousness: {
        id: 'classConsciousness',
        name: '阶级意识觉醒',
        desc: '无产阶级革命的历史必然性已了然于胸。',
        quote: '"一个幽灵，共产主义的幽灵，在欧洲游荡。" —— 马克思、恩格斯',
        condition: (history, ending) => ending && ending.reason && ending.reason.includes('无产阶级革命'),
        effect: { conflictStart: -15, wealthPerRound: 3 },
        unlocked: false
    }
};

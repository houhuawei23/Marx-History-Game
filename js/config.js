/**
 * 全局配置与常量
 */

export const GAME_VERSION = '1.4.0';

export const EPOCH_NAMES = {
    1: "原始积累纪元",
    2: "工业垄断纪元",
    3: "AI数字纪元"
};

export const ROUTE_LABELS = {
    conservative: '保守',
    technologist: '技术',
    reformer: '改良'
};

export const STORAGE_KEYS = {
    fragments: 'cg_fragments',
    achievements: 'cg_achievements',
    endings: 'cg_endings'
};

export const GAME_SETTINGS = {
    maxRounds: 12,
    maxEpoch: 3,
    startWealth: 100,
    startConflict: 30,
    startTech: 50,
    wealthBarMax: 300,
    conflictBarMax: 100,
    techBarMax: 150,
    routeEventThreshold: 2,
    routeEventChance: 0.5,
    // 社会关系默认值
    social: {
        worker: 50,
        gov: 50,
        media: 50,
        rival: 50,
        min: 0,
        max: 100
    },
    // 股市小游戏参数
    stockGame: {
        enabled: true,
        timerSeconds: 10,
        minChange: -25,
        maxChange: 25,
        buyMultiplier: 1.0,
        sellMultiplier: -1.0,
        skipMultiplier: 0
    }
};

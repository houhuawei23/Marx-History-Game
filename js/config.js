/**
 * 全局配置与常量
 */

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
    maxRounds: 6,
    maxEpoch: 3,
    startWealth: 100,
    startConflict: 30,
    startTech: 50,
    wealthBarMax: 300,
    conflictBarMax: 100,
    techBarMax: 150,
    routeEventThreshold: 2,
    routeEventChance: 0.5
};

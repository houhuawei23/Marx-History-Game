// ========== SVG 图片库 ==========
const EventImages = {
    // 纪元 1
    enclosure: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="60" width="40" height="40" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="15" y="65" width="8" height="8" fill="#d4af37"/><rect x="37" y="65" width="8" height="8" fill="#d4af37"/><rect x="15" y="87" width="8" height="8" fill="#d4af37"/><path d="M10 60 L30 40 L50 60" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="30" cy="50" r="3" fill="#d4af37"/><path d="M55 90 L110 90" stroke="#d4af37" stroke-width="2" stroke-dasharray="4,3"/><rect x="70" y="55" width="35" height="35" fill="none" stroke="#d4af37" stroke-width="2"/><line x1="70" y1="72" x2="105" y2="72" stroke="#d4af37" stroke-width="1.5"/><line x1="87" y1="55" x2="87" y2="90" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    strike: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="85" r="8" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="60" cy="85" r="8" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="90" cy="85" r="8" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M30 77 L30 55 L45 45" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M60 77 L60 50 L75 40" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M90 77 L90 55 L105 45" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="40" y="25" width="20" height="14" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="95" y="30" width="18" height="12" fill="none" stroke="#d4af37" stroke-width="2"/><line x1="42" y1="32" x2="58" y2="32" stroke="#d4af37" stroke-width="1.5"/><line x1="97" y1="36" x2="111" y2="36" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    slavery: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><path d="M20 80 Q20 40 60 40 Q100 40 100 80" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="35" cy="55" r="4" fill="#d4af37"/><circle cx="60" cy="50" r="4" fill="#d4af37"/><circle cx="85" cy="55" r="4" fill="#d4af37"/><path d="M35 65 L35 85" stroke="#d4af37" stroke-width="2"/><path d="M60 60 L60 85" stroke="#d4af37" stroke-width="2"/><path d="M85 65 L85 85" stroke="#d4af37" stroke-width="2"/><rect x="30" y="85" width="60" height="8" fill="none" stroke="#d4af37" stroke-width="2" rx="2"/></svg>`,
    childLabor: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="40" width="50" height="50" fill="none" stroke="#d4af37" stroke-width="2" rx="4"/><circle cx="45" cy="60" r="5" fill="#d4af37"/><circle cx="75" cy="60" r="5" fill="#d4af37"/><path d="M50 80 L70 80" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/><path d="M60 40 L60 25" stroke="#d4af37" stroke-width="2"/><path d="M50 25 L70 25" stroke="#d4af37" stroke-width="2"/><rect x="40" y="90" width="40" height="10" fill="none" stroke="#d4af37" stroke-width="2"/></svg>`,
    bankCrisis: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="45" width="60" height="50" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M25 45 L60 20 L95 45" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="45" y="60" width="10" height="20" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="65" y="60" width="10" height="20" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M40 50 L80 90" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="3,3"/></svg>`,

    // 纪元 2
    crisis: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polyline points="15,90 35,70 55,80 75,40 95,55 115,15" fill="none" stroke="#d4af37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="20" y="95" width="18" height="18" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="45" y="95" width="18" height="18" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="70" y="95" width="18" height="18" fill="none" stroke="#d4af37" stroke-width="2"/><line x1="24" y1="99" x2="34" y2="109" stroke="#d4af37" stroke-width="1.5"/><line x1="34" y1="99" x2="24" y2="109" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    tech: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="60" r="22" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="40" cy="60" r="14" fill="none" stroke="#d4af37" stroke-width="2"/><line x1="40" y1="38" x2="40" y2="30" stroke="#d4af37" stroke-width="2"/><line x1="40" y1="90" x2="40" y2="82" stroke="#d4af37" stroke-width="2"/><line x1="18" y1="60" x2="26" y2="60" stroke="#d4af37" stroke-width="2"/><line x1="54" y1="60" x2="62" y2="60" stroke="#d4af37" stroke-width="2"/><rect x="75" y="45" width="28" height="35" rx="3" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="89" cy="55" r="4" fill="#d4af37"/><path d="M80 68 L98 68" stroke="#d4af37" stroke-width="1.5"/><path d="M83 73 L95 73" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    warOrder: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="50" width="70" height="45" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M20 50 L60 25 L100 50" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="40" cy="72" r="6" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="80" cy="72" r="6" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M95 40 L110 40 L110 55" fill="none" stroke="#d4af37" stroke-width="2"/></svg>`,
    stockCrash: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="80" height="80" fill="none" stroke="#d4af37" stroke-width="2"/><polyline points="30,70 50,50 70,60 90,30" fill="none" stroke="#d4af37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="35" y="80" width="12" height="12" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="55" y="80" width="12" height="12" fill="none" stroke="#d4af37" stroke-width="2"/><rect x="75" y="80" width="12" height="12" fill="none" stroke="#d4af37" stroke-width="2"/><line x1="38" y1="83" x2="44" y2="89" stroke="#d4af37" stroke-width="1.5"/><line x1="44" y1="83" x2="38" y2="89" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    antitrust: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="35" width="50" height="50" fill="none" stroke="#d4af37" stroke-width="2" rx="4"/><line x1="60" y1="35" x2="60" y2="85" stroke="#d4af37" stroke-width="2"/><line x1="35" y1="60" x2="85" y2="60" stroke="#d4af37" stroke-width="2"/><circle cx="60" cy="60" r="10" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M90 30 L100 20" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/><path d="M95 25 L105 35" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/></svg>`,

    // 纪元 3
    ai: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="25" width="40" height="35" rx="12" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="52" cy="42" r="4" fill="#d4af37"/><circle cx="68" cy="42" r="4" fill="#d4af37"/><path d="M55 55 Q60 58 65 55" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-linecap="round"/><rect x="48" y="60" width="24" height="30" fill="none" stroke="#d4af37" stroke-width="2"/><line x1="55" y1="70" x2="65" y2="70" stroke="#d4af37" stroke-width="1.5"/><path d="M35 85 L85 85" stroke="#d4af37" stroke-width="2"/><path d="M25 95 L95 95" stroke="#d4af37" stroke-width="2"/><circle cx="30" cy="42" r="5" fill="none" stroke="#d4af37" stroke-width="1.5"/><circle cx="90" cy="42" r="5" fill="none" stroke="#d4af37" stroke-width="1.5"/><line x1="30" y1="47" x2="30" y2="55" stroke="#d4af37" stroke-width="1.5"/><line x1="90" y1="47" x2="90" y2="55" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    climate: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="28" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M48 52 Q60 40 72 52 Q70 68 60 72 Q50 68 48 52" fill="rgba(212,175,55,0.15)" stroke="#d4af37" stroke-width="1.5"/><path d="M35 35 Q45 25 55 32" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/><path d="M75 30 Q85 22 95 30" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/><path d="M25 75 Q35 68 45 75" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/><path d="M85 80 Q95 72 105 80" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/><line x1="38" y1="38" x2="42" y2="42" stroke="#d4af37" stroke-width="1.5"/><line x1="78" y1="33" x2="82" y2="37" stroke="#d4af37" stroke-width="1.5"/><line x1="28" y1="78" x2="32" y2="82" stroke="#d4af37" stroke-width="1.5"/><line x1="88" y1="83" x2="92" y2="87" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    dataPrivacy: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="60" rx="35" ry="25" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="60" cy="55" r="10" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M60 65 L60 75" stroke="#d4af37" stroke-width="2"/><path d="M55 75 L65 75" stroke="#d4af37" stroke-width="2"/><line x1="30" y1="40" x2="20" y2="30" stroke="#d4af37" stroke-width="1.5"/><line x1="90" y1="40" x2="100" y2="30" stroke="#d4af37" stroke-width="1.5"/><line x1="30" y1="80" x2="20" y2="90" stroke="#d4af37" stroke-width="1.5"/><line x1="90" y1="80" x2="100" y2="90" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    spaceColony: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="85" r="20" fill="none" stroke="#d4af37" stroke-width="2"/><ellipse cx="60" cy="85" rx="35" ry="8" fill="none" stroke="#d4af37" stroke-width="1.5"/><path d="M60 35 L55 55 L65 55 Z" fill="none" stroke="#d4af37" stroke-width="2"/><line x1="60" y1="55" x2="60" y2="65" stroke="#d4af37" stroke-width="2"/><circle cx="80" cy="40" r="6" fill="none" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    geneEdit: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><path d="M30 60 Q30 30 60 30 Q90 30 90 60 Q90 90 60 90 Q30 90 30 60" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M45 45 Q60 60 75 45" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M45 75 Q60 60 75 75" fill="none" stroke="#d4af37" stroke-width="2"/><line x1="85" y1="35" x2="95" y2="25" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/><line x1="90" y1="30" x2="100" y2="40" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/></svg>`,

    // 路线专属事件
    colonial: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="40" width="80" height="50" fill="none" stroke="#d4af37" stroke-width="2" rx="2"/><path d="M25 40 L60 20 L95 40" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="40" cy="65" r="6" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="80" cy="65" r="6" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M60 50 L60 90" stroke="#d4af37" stroke-width="2"/><rect x="55" y="30" width="10" height="8" fill="#d4af37"/></svg>`,
    digitalMonopoly: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="35" width="60" height="60" fill="none" stroke="#d4af37" stroke-width="2" rx="4"/><rect x="40" y="50" width="15" height="15" fill="none" stroke="#d4af37" stroke-width="1.5"/><rect x="65" y="50" width="15" height="15" fill="none" stroke="#d4af37" stroke-width="1.5"/><rect x="52" y="70" width="15" height="15" fill="none" stroke="#d4af37" stroke-width="1.5"/><path d="M55 57 L45 57" stroke="#d4af37" stroke-width="1"/><path d="M72 57 L82 57" stroke="#d4af37" stroke-width="1"/></svg>`,
    unionNegotiation: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><path d="M30 70 Q40 50 60 55 Q80 50 90 70" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="45" cy="45" r="6" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="75" cy="45" r="6" fill="none" stroke="#d4af37" stroke-width="2"/><path d="M45 65 L60 75 L75 65" fill="none" stroke="#d4af37" stroke-width="2" stroke-linejoin="round"/><rect x="45" y="80" width="30" height="8" fill="none" stroke="#d4af37" stroke-width="1.5" rx="2"/></svg>`,

    // 隐藏连锁事件
    computeDictator: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="25" width="50" height="40" rx="6" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="60" cy="45" r="8" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="60" cy="45" r="3" fill="#d4af37"/><path d="M35 55 L25 75" stroke="#d4af37" stroke-width="2"/><path d="M85 55 L95 75" stroke="#d4af37" stroke-width="2"/><path d="M45 65 L30 90" stroke="#d4af37" stroke-width="2"/><path d="M75 65 L90 90" stroke="#d4af37" stroke-width="2"/><circle cx="25" cy="78" r="4" fill="#d4af37"/><circle cx="95" cy="78" r="4" fill="#d4af37"/><circle cx="30" cy="93" r="4" fill="#d4af37"/><circle cx="90" cy="93" r="4" fill="#d4af37"/></svg>`
};

// ========== 认知碎片系统 ==========
const CognitiveFragments = {
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

// ========== 成就系统 ==========
const Achievements = {
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

// ========== 音频管理器（升级：按纪元分层） ==========
class AudioManager {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.gainNode = null;
        this.oscillators = [];
        this.nextNoteTime = 0;
        this.timerID = null;
        this.epoch = 1;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setEpoch(epoch) {
        this.epoch = epoch;
    }

    playAmbient() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.gainNode = this.ctx.createGain();
        this.gainNode.connect(this.ctx.destination);
        this.gainNode.gain.value = 0.06;

        // 基础低频氛围
        const baseFreqs = this.epoch === 3 ? [55, 82.41] : (this.epoch === 2 ? [55, 65.41] : [55, 65.41]);
        baseFreqs.forEach(f => {
            const osc = this.ctx.createOscillator();
            osc.type = this.epoch === 3 ? 'sawtooth' : 'sine';
            osc.frequency.value = f;
            const oscGain = this.ctx.createGain();
            oscGain.gain.value = this.epoch === 3 ? 0.15 : 0.5;
            osc.connect(oscGain);
            oscGain.connect(this.gainNode);
            osc.start();
            this.oscillators.push({ osc, oscGain });
        });

        this.nextNoteTime = this.ctx.currentTime;
        this.scheduleNotes();
    }

    scheduleNotes() {
        if (!this.isPlaying) return;
        const lookahead = 0.5;
        while (this.nextNoteTime < this.ctx.currentTime + lookahead) {
            this.playNote(this.nextNoteTime);
            this.nextNoteTime += this.epoch === 3 ? 1.2 + Math.random() : (this.epoch === 2 ? 1.8 + Math.random() * 1.2 : 2.5 + Math.random() * 2);
        }
        this.timerID = setTimeout(() => this.scheduleNotes(), 200);
    }

    playNote(when) {
        if (!this.ctx) return;
        let scale;
        if (this.epoch === 1) {
            scale = [110, 130.81, 146.83, 164.81, 196.00, 220.00];
        } else if (this.epoch === 2) {
            scale = [130.81, 164.81, 196.00, 261.63, 329.63];
        } else {
            scale = [164.81, 196.00, 261.63, 329.63, 392.00, 523.25];
        }
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const osc = this.ctx.createOscillator();
        osc.type = this.epoch === 3 ? 'square' : (this.epoch === 2 ? 'triangle' : 'sine');
        osc.frequency.value = freq;
        const noteGain = this.ctx.createGain();
        noteGain.gain.setValueAtTime(0, when);
        noteGain.gain.linearRampToValueAtTime(this.epoch === 3 ? 0.06 : 0.1, when + 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.001, when + (this.epoch === 3 ? 1.2 : 2));
        osc.connect(noteGain);
        noteGain.connect(this.gainNode);
        osc.start(when);
        osc.stop(when + (this.epoch === 3 ? 1.4 : 2.2));
    }

    stopAmbient() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        if (this.timerID) {
            clearTimeout(this.timerID);
            this.timerID = null;
        }
        if (this.gainNode) {
            const now = this.ctx.currentTime;
            this.gainNode.gain.cancelScheduledValues(now);
            this.gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
        }
        setTimeout(() => {
            this.oscillators.forEach(({ osc }) => { try { osc.stop(); } catch(e){} });
            this.oscillators = [];
        }, 600);
    }

    playSfx(type) {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        const now = this.ctx.currentTime;
        if (type === 'modal') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(440, now); osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
            gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now); osc.stop(now + 0.4);
        } else if (type === 'epoch') {
            osc.type = 'triangle'; osc.frequency.setValueAtTime(220, now); osc.frequency.linearRampToValueAtTime(440, now + 0.4);
            gain.gain.setValueAtTime(0.1, now); gain.gain.linearRampToValueAtTime(0.001, now + 0.6);
            osc.start(now); osc.stop(now + 0.6);
        } else if (type === 'end') {
            osc.type = 'sawtooth'; osc.frequency.setValueAtTime(880, now); osc.frequency.exponentialRampToValueAtTime(110, now + 1);
            gain.gain.setValueAtTime(0.08, now); gain.gain.linearRampToValueAtTime(0.001, now + 1.2);
            osc.start(now); osc.stop(now + 1.2);
        } else if (type === 'dice') {
            osc.type = 'triangle'; osc.frequency.setValueAtTime(300, now); osc.frequency.linearRampToValueAtTime(600, now + 0.15);
            gain.gain.setValueAtTime(0.08, now); gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
        } else if (type === 'floatUp') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
            gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.start(now); osc.stop(now + 0.15);
        }
    }

    toggle() {
        if (this.isPlaying) { this.stopAmbient(); return false; }
        else { this.playAmbient(); return true; }
    }
}

// ========== D20 骰子 SVG ==========
function getDiceSVG(value) {
    const dots = {
        1: '<circle cx="50" cy="50" r="8" fill="#d4af37"/>',
        2: '<circle cx="30" cy="30" r="6" fill="#d4af37"/><circle cx="70" cy="70" r="6" fill="#d4af37"/>',
        3: '<circle cx="25" cy="25" r="6" fill="#d4af37"/><circle cx="50" cy="50" r="6" fill="#d4af37"/><circle cx="75" cy="75" r="6" fill="#d4af37"/>',
        4: '<circle cx="28" cy="28" r="6" fill="#d4af37"/><circle cx="72" cy="28" r="6" fill="#d4af37"/><circle cx="28" cy="72" r="6" fill="#d4af37"/><circle cx="72" cy="72" r="6" fill="#d4af37"/>',
        5: '<circle cx="25" cy="25" r="6" fill="#d4af37"/><circle cx="75" cy="25" r="6" fill="#d4af37"/><circle cx="50" cy="50" r="6" fill="#d4af37"/><circle cx="25" cy="75" r="6" fill="#d4af37"/><circle cx="75" cy="75" r="6" fill="#d4af37"/>',
        6: '<circle cx="25" cy="25" r="6" fill="#d4af37"/><circle cx="75" cy="25" r="6" fill="#d4af37"/><circle cx="25" cy="50" r="6" fill="#d4af37"/><circle cx="75" cy="50" r="6" fill="#d4af37"/><circle cx="25" cy="75" r="6" fill="#d4af37"/><circle cx="75" cy="75" r="6" fill="#d4af37"/>'
    };
    // For d20 we just map 1-6 pattern repeating, but for visuals we show the number in center for 7-20
    let content = dots[value] || `<text x="50" y="58" font-size="28" fill="#d4af37" text-anchor="middle" font-weight="bold">${value}</text>`;
    return `<svg class="dice-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" rx="12" fill="rgba(0,0,0,0.3)" stroke="#d4af37" stroke-width="3"/>${content}</svg>`;
}

// ========== 雷达图生成器 ==========
function generateRadarSVG(values, labels, maxVal=100) {
    // values: [v1, v2, v3], labels: [l1, l2, l3]
    const centerX = 100, centerY = 100, radius = 80;
    const angles = [-Math.PI/2, Math.PI/6, 5*Math.PI/6];
    let points = '';
    let labelEls = '';
    angles.forEach((a, i) => {
        const r = (Math.min(values[i], maxVal) / maxVal) * radius;
        const x = centerX + r * Math.cos(a);
        const y = centerY + r * Math.sin(a);
        points += `${x},${y} `;
        const lx = centerX + (radius + 18) * Math.cos(a);
        const ly = centerY + (radius + 18) * Math.sin(a);
        labelEls += `<text x="${lx}" y="${ly}" fill="#f0f0f0" font-size="10" text-anchor="middle" dominant-baseline="middle">${labels[i]}</text>`;
    });
    // grid lines
    let grid = '';
    for (let i = 1; i <= 4; i++) {
        const r = (i / 4) * radius;
        let gp = '';
        angles.forEach(a => {
            gp += `${centerX + r * Math.cos(a)},${centerY + r * Math.sin(a)} `;
        });
        grid += `<polygon points="${gp}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
    }
    // axis lines
    let axes = '';
    angles.forEach(a => {
        axes += `<line x1="${centerX}" y1="${centerY}" x2="${centerX + radius * Math.cos(a)}" y2="${centerY + radius * Math.sin(a)}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
    });
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="radar-chart">${grid}${axes}<polygon points="${points}" fill="rgba(254,202,87,0.25)" stroke="#feca57" stroke-width="2"/>${labelEls}</svg>`;
}

// ========== 游戏主类 ==========
class CapitalGame {
    constructor() {
        this.wealth = 100;
        this.socialConflict = 30;
        this.techPower = 50;
        this.epoch = 1;
        this.rounds = 0;
        this.history = [];
        this.isGameOver = false;
        this.audio = new AudioManager();
        this.typewriterTimer = null;
        this.pendingNext = null;

        // 路线倾向
        this.route = { conservative: 0, technologist: 0, reformer: 0 };
        // 认知碎片（从 localStorage 读取持久化）
        this.fragments = this.loadFragments();
        // 成就
        this.achievements = this.loadAchievements();
        // 结局记录（用于成就检测）
        this.endingsRecord = JSON.parse(localStorage.getItem('cg_endings') || '[]');
        // 本轮携带的碎片
        this.equippedFragment = null;
        // 骰子结果
        this.lastDiceRoll = null;

        this.events = this.buildEventLibrary();
        this.initializeGame();
    }

    loadFragments() {
        const saved = localStorage.getItem('cg_fragments');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const merged = {};
                for (const key in CognitiveFragments) {
                    merged[key] = { ...CognitiveFragments[key], ...(parsed[key] || {}) };
                    merged[key].condition = CognitiveFragments[key].condition; // restore function
                }
                return merged;
            } catch(e) { return { ...CognitiveFragments }; }
        }
        return { ...CognitiveFragments };
    }

    saveFragments() {
        localStorage.setItem('cg_fragments', JSON.stringify(this.fragments));
    }

    loadAchievements() {
        const saved = localStorage.getItem('cg_achievements');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const merged = {};
                for (const key in Achievements) {
                    merged[key] = { ...Achievements[key], ...(parsed[key] || {}) };
                    merged[key].check = Achievements[key].check; // restore function
                }
                return merged;
            } catch(e) { return { ...Achievements }; }
        }
        return { ...Achievements };
    }

    saveAchievements() {
        localStorage.setItem('cg_achievements', JSON.stringify(this.achievements));
    }

    buildEventLibrary() {
        return {
            1: [
                {
                    name: "圈地运动",
                    description: "你发现了一片公共土地，如果将其私有化建立工厂，能获得巨大财富，但流离失所的农民会涌入城市。",
                    imageSvg: EventImages.enclosure,
                    historicalParallel: "英国16-18世纪圈地运动：用暴力将农民从土地上赶走，为工业革命提供廉价劳动力。",
                    quote: { text: '"资本来到世间，从头到脚，每个毛孔都滴着血和肮脏的东西。"', author: '马克思' },
                    options: [
                        {text: "暴力强占", wealth: 50, conflict: 20, tech: 0, routeTag: 'conservative'},
                        {text: "支付补偿金缓慢收购", wealth: 20, conflict: 5, tech: 0, routeTag: 'reformer'},
                        {text: "保持公地，投资手工业", wealth: 10, conflict: 0, tech: 5, routeTag: 'technologist'}
                    ],
                    knowledge: "唯物史观：生产力的发展（机器工业）必然要求变革生产关系（私有制取代公有制）。资本原始积累的过程伴随着血腥与暴力。"
                },
                {
                    name: "工人罢工",
                    description: "工人们要求提高工资和改善工作条件，否则将举行大规模罢工。",
                    imageSvg: EventImages.strike,
                    historicalParallel: "19世纪英国宪章运动与法国里昂工人起义：早期工人阶级争取权利的斗争。",
                    quote: { text: '"资本是死劳动，它像吸血鬼一样，只有吮吸活劳动才有生命。"', author: '马克思' },
                    options: [
                        {text: "镇压罢工，雇佣新工人", wealth: -10, conflict: 25, tech: 0, routeTag: 'conservative'},
                        {text: "妥协，小幅提高工资", wealth: -20, conflict: -10, tech: 0, routeTag: 'reformer'},
                        {text: "投资自动化设备替代工人", wealth: -30, conflict: 15, tech: 10, routeTag: 'technologist'}
                    ],
                    knowledge: "剩余价值理论：资本家通过延长劳动时间或提高劳动强度来获取更多剩余价值，这必然导致劳资矛盾的激化。"
                },
                {
                    name: "黑奴贸易",
                    description: " plantations 的棉花需求激增，参与跨大西洋奴隶贸易可获得巨额利润。",
                    imageSvg: EventImages.slavery,
                    historicalParallel: "16-19世纪大西洋奴隶贸易：资本主义原始积累最血腥的篇章之一。",
                    quote: { text: '"美洲金银产地的发现，土著居民的被剿灭、被奴役和被埋葬于矿井，对东印度开始进行的征服和掠夺……"', author: '马克思、恩格斯' },
                    options: [
                        {text: "投资奴隶贸易船队", wealth: 60, conflict: 25, tech: 0, routeTag: 'conservative'},
                        {text: "拒绝参与，投资本土纺织", wealth: 10, conflict: -5, tech: 5, routeTag: 'reformer'},
                        {text: "引进新式轧棉机减少人力依赖", wealth: 5, conflict: 5, tech: 15, routeTag: 'technologist'}
                    ],
                    knowledge: "原始积累不仅是土地的掠夺，更是对人身自由的剥夺。资本主义的全球扩张从一开始就建立在殖民与奴役之上。"
                },
                {
                    name: "童工问题",
                    description: "工厂里大量使用童工以压低工资，社会舆论开始出现谴责之声。",
                    imageSvg: EventImages.childLabor,
                    historicalParallel: "19世纪英国工厂大量使用童工，每天劳动16小时以上，直到《工厂法》颁布才逐步改善。",
                    quote: { text: '"工人阶级的儿女从一出生就注定要成为资本的牺牲品。"', author: '恩格斯《英国工人阶级状况》' },
                    options: [
                        {text: "继续使用童工，利润优先", wealth: 30, conflict: 20, tech: 0, routeTag: 'conservative'},
                        {text: "逐步遣散童工，雇佣成年技工", wealth: -10, conflict: -10, tech: 5, routeTag: 'reformer'},
                        {text: "发明半自动器械降低对童工依赖", wealth: -20, conflict: 0, tech: 15, routeTag: 'technologist'}
                    ],
                    knowledge: "过度剥削劳动力（尤其是妇女儿童）是资本原始积累阶段的典型特征，它透支了社会再生产的基础。"
                },
                {
                    name: "银行危机",
                    description: "过度放贷导致银行出现挤兑潮，你的企业也面临资金链断裂。",
                    imageSvg: EventImages.bankCrisis,
                    historicalParallel: "19世纪频繁的银行恐慌（如1857年、1873年），暴露了早期金融资本的脆弱性。",
                    quote: { text: '"在危机中，商品和它的价值形态（货币）之间的对立发展成绝对矛盾。"', author: '马克思《资本论》' },
                    options: [
                        {text: "裁员减薪，收缩规模自保", wealth: -10, conflict: 15, tech: 0, routeTag: 'conservative'},
                        {text: "向政府申请救济，承诺不裁员", wealth: 10, conflict: -5, tech: 0, routeTag: 'reformer'},
                        {text: "引入复式记账与信用保险", wealth: -20, conflict: 0, tech: 10, routeTag: 'technologist'}
                    ],
                    knowledge: "信用制度加速了资本集中，但也放大了经济危机的传染性。生产过剩与支付手段不足之间的矛盾是危机的直接导火索。"
                }
            ],
            2: [
                {
                    name: "经济危机",
                    description: "生产的商品堆积如山，但底层工人买不起。库存积压，资金链即将断裂。",
                    imageSvg: EventImages.crisis,
                    historicalParallel: "1929年大萧条与2008年金融危机：生产社会化与生产资料私有制矛盾的集中爆发。",
                    quote: { text: '"生产过剩的经济危机是资本主义制度的必然伴侣。"', author: '恩格斯' },
                    options: [
                        {text: "销毁库存，维持价格", wealth: -20, conflict: 30, tech: 0, routeTag: 'conservative'},
                        {text: "降价倾销，开拓海外市场", wealth: -10, conflict: 0, tech: 5, routeTag: 'technologist'},
                        {text: "提高工人工资，扩大内需", wealth: -30, conflict: -15, tech: 0, routeTag: 'reformer'}
                    ],
                    knowledge: "生产社会化与生产资料私有制的基本矛盾。资本主义无法消灭相对过剩人口和消费不足的痼疾。"
                },
                {
                    name: "技术革命",
                    description: "新的生产技术出现，可以大幅提高生产效率，但需要大量投资。",
                    imageSvg: EventImages.tech,
                    historicalParallel: "第二次工业革命（电力、内燃机、流水线）：垄断资本主义形成的物质基础。",
                    quote: { text: '"劳动用机器代替了手工劳动，但是，工人却变成了机器的单纯的附属品。"', author: '《共产党宣言》' },
                    options: [
                        {text: "全力投资新技术", wealth: -40, conflict: 10, tech: 25, routeTag: 'technologist'},
                        {text: "保守投资，逐步更新", wealth: -20, conflict: 5, tech: 15, routeTag: 'reformer'},
                        {text: "维持现状，不投资", wealth: 0, conflict: 0, tech: 0, routeTag: 'conservative'}
                    ],
                    knowledge: "生产力决定生产关系。技术革命推动生产力发展，但资本主义生产关系可能成为生产力发展的桎梏。"
                },
                {
                    name: "世界大战订单",
                    description: "国家陷入战争，军火订单如雪片般飞来，但工厂工人可能被征召入伍。",
                    imageSvg: EventImages.warOrder,
                    historicalParallel: "两次世界大战期间，美国、德国等国的军事工业复合体迅速膨胀。",
                    quote: { text: '"帝国主义就是战争。"', author: '列宁' },
                    options: [
                        {text: "全面转产军工，牟取暴利", wealth: 50, conflict: 20, tech: 10, routeTag: 'conservative'},
                        {text: "接受订单但改善工人待遇", wealth: 30, conflict: 0, tech: 5, routeTag: 'reformer'},
                        {text: "研发新型武器技术", wealth: 20, conflict: 10, tech: 25, routeTag: 'technologist'}
                    ],
                    knowledge: "帝国主义阶段，资本扩张与军事暴力深度绑定。军火资本成为垄断资本的重要组成部分，战争成为资本转嫁危机的手段。"
                },
                {
                    name: "股市崩盘",
                    description: "股市泡沫破裂，投资者恐慌性抛售，你的企业市值大幅缩水。",
                    imageSvg: EventImages.stockCrash,
                    historicalParallel: "1929年华尔街黑色星期四：虚拟资本与实体经济的脱节导致了史无前例的经济大萧条。",
                    quote: { text: '"有价证券的资本化是按利息资本计算的。"', author: '马克思《资本论》第三卷' },
                    options: [
                        {text: "抛售资产，裁员止血", wealth: -10, conflict: 20, tech: 0, routeTag: 'conservative'},
                        {text: "联合其他资本家救市", wealth: -30, conflict: -5, tech: 0, routeTag: 'reformer'},
                        {text: "趁低收购竞争对手技术专利", wealth: -20, conflict: 5, tech: 20, routeTag: 'technologist'}
                    ],
                    knowledge: "虚拟资本的膨胀使经济危机具有了更强的投机性和传染性。金融资本与产业资本的脱节，放大了周期性危机的破坏力。"
                },
                {
                    name: "反垄断法案",
                    description: "政府出台严厉的反垄断法，你的垄断地位受到威胁。",
                    imageSvg: EventImages.antitrust,
                    historicalParallel: "19世纪末20世纪初美国《谢尔曼反托拉斯法》：国家为缓和阶级矛盾而进行的制度调整。",
                    quote: { text: '"竞争转变为垄断，而现代社会的全部经济制度都建立在垄断的基础上。"', author: '列宁《帝国主义是资本主义的最高阶段》' },
                    options: [
                        {text: "暗中分化瓦解法案推进", wealth: -10, conflict: 15, tech: 0, routeTag: 'conservative'},
                        {text: "主动拆分，换取社会声誉", wealth: -20, conflict: -15, tech: 0, routeTag: 'reformer'},
                        {text: "以技术专利优势形成新壁垒", wealth: 10, conflict: 5, tech: 15, routeTag: 'technologist'}
                    ],
                    knowledge: "垄断是资本主义发展到一定阶段的必然产物。国家干预表面上限制垄断，实则是为了维护资本主义制度的长期稳定。"
                }
            ],
            3: [
                {
                    name: "人工智能取代人力",
                    description: "你研发出了通用人工智能（AGI），可以取代90%的工人。效率极高，但剩下的10%工人面临绝境。",
                    imageSvg: EventImages.ai,
                    historicalParallel: "当前生成式AI引发的大规模失业焦虑：新一轮技术革命正在重塑劳动市场。",
                    quote: { text: '"机器本身缩短劳动时间，但它的资本主义使用却延长工作日。"', author: '马克思《资本论》' },
                    options: [
                        {text: "全面推行AI，解雇所有工人", wealth: 50, conflict: 99, tech: 30, routeTag: 'technologist'},
                        {text: "推行机器人税，将利润分配给全民", wealth: 20, conflict: -20, tech: 20, routeTag: 'reformer'},
                        {text: "利用AI进行计划经济，弱化市场调节", wealth: 0, conflict: -30, tech: 30, routeTag: 'technologist'}
                    ],
                    knowledge: "AI时代，资本逻辑非但没有失效，反而强化了。当生产资料高度集中时，资本主义的雇佣劳动关系就瓦解了。"
                },
                {
                    name: "全球气候危机",
                    description: "气候变化导致极端天气频发，社会要求企业承担更多环保责任。",
                    imageSvg: EventImages.climate,
                    historicalParallel: "当代气候变暖与生态危机：资本无限增殖逻辑与地球有限资源之间的根本冲突。",
                    quote: { text: '"资本主义生产破坏着一切财富的源泉——土地和劳动者。"', author: '马克思' },
                    options: [
                        {text: "无视环保要求，继续追求利润", wealth: 30, conflict: 40, tech: 0, routeTag: 'conservative'},
                        {text: "投资绿色技术，逐步转型", wealth: -20, conflict: -10, tech: 15, routeTag: 'reformer'},
                        {text: "全面转向可持续发展", wealth: -40, conflict: -20, tech: 25, routeTag: 'reformer'}
                    ],
                    knowledge: "资本主义的生产方式与生态环境之间存在根本矛盾。无限扩张的资本逻辑与有限的自然资源之间存在不可调和的冲突。"
                },
                {
                    name: "数据隐私泄露",
                    description: "你掌握的大量用户数据被黑客窃取并公开，引发全民对数字寡头的愤怒。",
                    imageSvg: EventImages.dataPrivacy,
                    historicalParallel: "近年来Facebook-Cambridge Analytica等数据丑闻：数字资本对用户行为的全面监控。",
                    quote: { text: '"在资产阶级社会里，资本具有独立性和个性，而活动着的个人却没有独立性和个性。"', author: '马克思、恩格斯' },
                    options: [
                        {text: "压制舆论，起诉 whistleblower", wealth: -10, conflict: 30, tech: 0, routeTag: 'conservative'},
                        {text: "公开道歉，加强数据保护立法", wealth: -30, conflict: -15, tech: 10, routeTag: 'reformer'},
                        {text: "用AI追踪泄露源并升级防火墙", wealth: -20, conflict: 5, tech: 20, routeTag: 'technologist'}
                    ],
                    knowledge: "数字资本时代，数据成为新的生产资料。对用户隐私的剥夺是数字剥削的新形式，它加剧了资本对日常生活的渗透与控制。"
                },
                {
                    name: "太空殖民计划",
                    description: "太空采矿与火星殖民成为可能，需要天文数字般的投资，但回报同样惊人。",
                    imageSvg: EventImages.spaceColony,
                    historicalParallel: "当代SpaceX、Blue Origin等太空私企：资本逻辑从地球向宇宙空间的扩张。",
                    quote: { text: '"资产阶级除非对生产工具，从而对生产关系，从而对全部社会关系不断地进行革命，否则就不能生存下去。"', author: '马克思、恩格斯' },
                    options: [
                        {text: "独占太空资源开采权", wealth: 60, conflict: 25, tech: 20, routeTag: 'conservative'},
                        {text: "与国际机构合作开发", wealth: 30, conflict: -5, tech: 15, routeTag: 'reformer'},
                        {text: "研发可控核聚变推进技术", wealth: 10, conflict: 0, tech: 35, routeTag: 'technologist'}
                    ],
                    knowledge: "当地球市场趋于饱和，资本必然向新的空间扩张。太空殖民是资本增殖逻辑在宇宙尺度的延伸，但它无法解决资本主义的基本矛盾。"
                },
                {
                    name: "基因编辑伦理",
                    description: "基因编辑技术可以制造'完美劳动者'，但伦理争议巨大，社会哗然。",
                    imageSvg: EventImages.geneEdit,
                    historicalParallel: "2018年基因编辑婴儿事件：生物技术在资本驱动下对人类伦理底线的挑战。",
                    quote: { text: '"人本身——劳动力——也成为商品，而且是最廉价的商品。"', author: '恩格斯' },
                    options: [
                        {text: "秘密资助人体实验", wealth: 40, conflict: 35, tech: 25, routeTag: 'conservative'},
                        {text: "呼吁全球伦理监管框架", wealth: -10, conflict: -15, tech: 10, routeTag: 'reformer'},
                        {text: "将技术用于疾病治疗以转移焦点", wealth: 10, conflict: -5, tech: 20, routeTag: 'technologist'}
                    ],
                    knowledge: "生物技术在资本逻辑下可能导致对人的生命本身进行商品化。当劳动力可以被'设计'时，人的主体性将面临前所未有的危机。"
                }
            ],
            // 路线专属事件池（由系统按条件注入）
            route: {
                conservative: {
                    name: "殖民扩张",
                    description: "你的资本积累需要新的原料产地和倾销市场，军方愿意为你保驾护航。",
                    imageSvg: EventImages.colonial,
                    historicalParallel: "19世纪末帝国主义瓜分非洲与亚洲：资本输出与军事侵略相伴而生。",
                    quote: { text: '"资产阶级在它的不到一百年的阶级统治中所创造的生产力，比过去一切世代创造的全部生产力还要多，还要大。"', author: '马克思、恩格斯' },
                    options: [
                        {text: "武力征服殖民地", wealth: 70, conflict: 30, tech: 5, routeTag: 'conservative'},
                        {text: "签订不平等贸易条约", wealth: 50, conflict: 20, tech: 0, routeTag: 'conservative'},
                        {text: "投资当地基础设施换取特权", wealth: 30, conflict: 10, tech: 10, routeTag: 'reformer'}
                    ],
                    knowledge: "帝国主义阶段，资本输出取代商品输出成为主导。军事暴力与经济掠夺的结合，是垄断资本全球扩张的典型特征。"
                },
                technologist: {
                    name: "数字垄断",
                    description: "你的算法平台已经占据市场80%份额，监管机构正在调查你。",
                    imageSvg: EventImages.digitalMonopoly,
                    historicalParallel: "21世纪谷歌、亚马逊、腾讯等科技巨头的反垄断调查：数字资本的高度集中。",
                    quote: { text: '"垄断是从自由竞争中成长起来的。"', author: '列宁' },
                    options: [
                        {text: "收购所有潜在竞争对手", wealth: 40, conflict: 20, tech: 15, routeTag: 'technologist'},
                        {text: "开放部分API接口以避嫌", wealth: 20, conflict: -5, tech: 10, routeTag: 'reformer'},
                        {text: "利用大数据构筑更高壁垒", wealth: 30, conflict: 10, tech: 25, routeTag: 'technologist'}
                    ],
                    knowledge: "数字资本通过平台垄断和数据壁垒形成'赢者通吃'的市场格局。技术本身成为垄断工具，加剧了资本集中和社会不平等。"
                },
                reformer: {
                    name: "工会谈判",
                    description: "工人联合会力量壮大，他们要求签订集体合同，否则将发动总罢工。",
                    imageSvg: EventImages.unionNegotiation,
                    historicalParallel: "20世纪欧美工会运动的兴起：工人阶级通过组织化斗争争取权益的重要历程。",
                    quote: { text: '"无产者在这个革命中失去的只是锁链。他们获得的将是整个世界。"', author: '马克思、恩格斯' },
                    options: [
                        {text: "拒绝谈判，分化工会", wealth: -10, conflict: 25, tech: 0, routeTag: 'conservative'},
                        {text: "签订集体合同，提高福利", wealth: -30, conflict: -20, tech: 0, routeTag: 'reformer'},
                        {text: "引入自动化以削弱工会筹码", wealth: -20, conflict: 10, tech: 15, routeTag: 'technologist'}
                    ],
                    knowledge: "工会运动是工人阶级争取自身权益的重要手段。但在资本主义框架内，集体谈判只能缓和矛盾，无法根除剥削制度本身。"
                }
            },
            // 隐藏连锁事件
            hidden: {
                computeDictator: {
                    name: "算力独裁",
                    description: "由于你此前的技术垄断与全面AI化，社会已经形成了由算法控制的极端不平等结构。",
                    imageSvg: EventImages.computeDictator,
                    historicalParallel: "科幻作品中的'技术封建主义'想象：当资本逻辑与技术权力结合到极致的社会图景。",
                    quote: { text: '"资本无法自行增殖，陷入死寂。"', author: '马克思主义学者对未来的预言' },
                    options: [
                        {text: "维持算法统治", wealth: 30, conflict: 50, tech: 20, routeTag: 'technologist'},
                        {text: "将算力公有化", wealth: -50, conflict: -50, tech: 10, routeTag: 'reformer'}
                    ],
                    knowledge: "当生产资料（AI算力）高度集中到不再需要人类劳动者时，资本主义的雇佣劳动关系就彻底瓦解了。这要么通向'自由王国'，要么通向技术封建主义的深渊。"
                }
            }
        };
    }

    initializeGame() {
        this.bindEvents();
        this.updateStatusDisplay();
        this.applyEpochTheme();
        this.renderFragmentGallery();
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('continue-btn').addEventListener('click', () => this.closeKnowledgeModal());
        document.getElementById('music-toggle').addEventListener('click', () => this.toggleMusic());
        document.getElementById('fragment-gallery-btn').addEventListener('click', () => this.openFragmentGallery());
        document.getElementById('close-gallery-btn').addEventListener('click', () => this.closeFragmentGallery());
    }

    toggleMusic() {
        const btn = document.getElementById('music-toggle');
        const active = this.audio.toggle();
        btn.textContent = active ? '🔊' : '🔇';
        btn.classList.toggle('active', active);
    }

    startGame() {
        document.getElementById('start-btn').style.display = 'none';
        // 弹出碎片选择
        this.showFragmentSelection();
    }

    applyEpochTheme() {
        document.body.className = `epoch-${this.epoch}`;
        this.audio.setEpoch(this.epoch);
    }

    showFragmentSelection() {
        const unlocked = Object.values(this.fragments).filter(f => f.unlocked);
        const container = document.getElementById('fragment-selection-content');
        const modal = document.getElementById('fragment-selection-modal');

        if (unlocked.length === 0) {
            modal.style.display = 'none';
            this.nextEvent();
            return;
        }

        let html = '<p style="margin-bottom:15px;opacity:0.9;">选择一项已解锁的认知碎片带入本轮（也可选择不带）：</p>';
        html += `<div class="fragment-card" data-id=""><h4>🚫 空手上阵</h4><p>不携带任何碎片，体验纯粹的资本轮回。</p></div>`;
        unlocked.forEach(f => {
            html += `<div class="fragment-card" data-id="${f.id}"><h4>${f.name}</h4><p>${f.desc}</p><p class="fragment-effect">效果：${this.describeEffect(f.effect)}</p></div>`;
        });
        container.innerHTML = html;

        modal.style.display = 'flex';
        modal.classList.remove('fade-out');

        container.querySelectorAll('.fragment-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                this.equippedFragment = id ? this.fragments[id] : null;
                if (this.equippedFragment) {
                    this.applyFragmentEffect(this.equippedFragment.effect);
                }
                modal.classList.add('fade-out');
                setTimeout(() => {
                    modal.style.display = 'none';
                    this.updateStatusDisplay();
                    this.nextEvent();
                }, 300);
            });
        });
    }

    describeEffect(effect) {
        const parts = [];
        if (effect.wealthStart) parts.push(`开局财富${effect.wealthStart > 0 ? '+' : ''}${effect.wealthStart}`);
        if (effect.conflictStart) parts.push(`开局矛盾${effect.conflictStart > 0 ? '+' : ''}${effect.conflictStart}`);
        if (effect.techStart) parts.push(`开局技术${effect.techStart > 0 ? '+' : ''}${effect.techStart}`);
        if (effect.wealthPerRound) parts.push(`每回合财富${effect.wealthPerRound > 0 ? '+' : ''}${effect.wealthPerRound}`);
        return parts.join('，') || '无';
    }

    applyFragmentEffect(effect) {
        if (effect.wealthStart) this.wealth += effect.wealthStart;
        if (effect.conflictStart) this.socialConflict += effect.conflictStart;
        if (effect.techStart) this.techPower += effect.techStart;
    }

    renderFragmentGallery() {
        const container = document.getElementById('gallery-list');
        const all = Object.values(this.fragments);
        let html = '';
        all.forEach(f => {
            const locked = !f.unlocked;
            html += `
                <div class="gallery-item ${locked ? 'locked' : ''}">
                    <h4>${locked ? '🔒 未解锁' : f.name}</h4>
                    <p>${locked ? '???' : f.desc}</p>
                    ${locked ? '' : `<p class="gallery-quote">${f.quote}</p>`}
                </div>
            `;
        });
        container.innerHTML = html;
    }

    openFragmentGallery() {
        this.renderFragmentGallery();
        const modal = document.getElementById('fragment-gallery-modal');
        modal.style.display = 'flex';
        modal.classList.remove('fade-out');
    }

    closeFragmentGallery() {
        const m = document.getElementById('fragment-gallery-modal');
        m.classList.add('fade-out');
        setTimeout(() => m.style.display = 'none', 300);
    }

    nextEvent() {
        if (this.isGameOver) return;

        // 应用每回合碎片效果
        if (this.equippedFragment && this.equippedFragment.effect && this.equippedFragment.effect.wealthPerRound) {
            this.wealth += this.equippedFragment.effect.wealthPerRound;
            this.showFloatingNumber('wealth-bar', this.equippedFragment.effect.wealthPerRound);
            this.updateStatusDisplay();
        }

        // 检查隐藏连锁事件
        if (this.checkHiddenEvent()) return;

        // 检查路线专属事件
        const routeEvent = this.checkRouteEvent();
        if (routeEvent) {
            this.displayEvent(routeEvent);
            return;
        }

        const baseEvents = this.events[this.epoch];
        const epochHistory = this.history.filter(h => h.epoch === this.epoch && !h.isRouteEvent && !h.isHiddenEvent);
        if (epochHistory.length >= 2) {
            this.epoch++;
            if (this.epoch > 3) {
                this.endGame("历史周期结束");
                return;
            }
            this.applyEpochTheme();
            this.audio.playSfx('epoch');
            this.showEpochTransition();
            return;
        }

        const randomEvent = baseEvents[Math.floor(Math.random() * baseEvents.length)];
        this.displayEvent(randomEvent);
    }

    checkRouteEvent() {
        const maxRoute = Object.entries(this.route).sort((a, b) => b[1] - a[1])[0];
        if (maxRoute[1] >= 2 && Math.random() < 0.5) {
            const evt = this.events.route[maxRoute[0]];
            if (evt) return { ...evt, isRouteEvent: true, routeType: maxRoute[0] };
        }
        return null;
    }

    checkHiddenEvent() {
        const hasTechRevolution = this.history.some(h => h.event === '技术革命' && h.choice.includes('全力'));
        const hasAI = this.history.some(h => h.event === '人工智能取代人力' && h.choice.includes('全面'));
        const notYetTriggered = !this.history.some(h => h.event === '算力独裁');
        if (hasTechRevolution && hasAI && notYetTriggered && this.epoch === 3) {
            this.displayEvent({ ...this.events.hidden.computeDictator, isHiddenEvent: true });
            return true;
        }
        return false;
    }

    displayEvent(event) {
        const eventTitle = document.getElementById('event-title');
        const eventDescription = document.getElementById('event-description');
        const optionsContainer = document.getElementById('options-container');
        const knowledgeText = document.getElementById('knowledge-text');
        const eventImage = document.getElementById('event-image');

        eventTitle.textContent = event.name;
        eventDescription.textContent = event.description;
        knowledgeText.textContent = event.knowledge;
        eventImage.innerHTML = event.imageSvg || '';

        const fragment = document.createDocumentFragment();
        event.options.forEach((option) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            const tagBadge = option.routeTag ? `<span class="route-badge ${option.routeTag}">${this.routeLabel(option.routeTag)}</span>` : '';
            button.innerHTML = `
                <div style="display:flex;align-items:center;gap:10px;">${tagBadge}<div>${option.text}<br>
                <small>财富${option.wealth >= 0 ? '+' : ''}${option.wealth} | 
                矛盾${option.conflict >= 0 ? '+' : ''}${option.conflict} | 
                技术${option.tech >= 0 ? '+' : ''}${option.tech}</small></div></div>
            `;
            button.addEventListener('click', () => this.handleChoice(option, event));
            fragment.appendChild(button);
        });

        optionsContainer.innerHTML = '';
        optionsContainer.appendChild(fragment);
        this.enableAllButtons();
        this.updateStatusDisplay();
    }

    routeLabel(tag) {
        return { conservative: '保守', technologist: '技术', reformer: '改良' }[tag] || tag;
    }

    handleChoice(option, event) {
        this.disableAllButtons();

        // D20 骰子
        const diceRoll = Math.floor(Math.random() * 20) + 1;
        this.lastDiceRoll = diceRoll;
        this.showDiceRoll(diceRoll, () => {
            try {
                // 应用基础数值
                let w = option.wealth, c = option.conflict, t = option.tech;
                // 骰子修正
                if (diceRoll <= 5) { w -= 5; c += 3; }
                else if (diceRoll >= 16) { w += 3; c -= 3; }

                const oldWealth = this.wealth, oldConflict = this.socialConflict, oldTech = this.techPower;

                this.wealth += w;
                this.socialConflict += c;
                this.techPower += t;

                // 路线倾向
                if (option.routeTag) {
                    this.route[option.routeTag] = (this.route[option.routeTag] || 0) + 1;
                }

                this.updateStatusDisplay();
                this.showFloatingNumber('wealth-bar', this.wealth - oldWealth);
                this.showFloatingNumber('conflict-bar', this.socialConflict - oldConflict);
                this.showFloatingNumber('tech-bar', this.techPower - oldTech);

                this.history.push({
                    epoch: this.epoch,
                    event: event.name,
                    choice: option.text,
                    knowledge: event.knowledge,
                    routeTag: option.routeTag,
                    changes: { wealth: w, conflict: c, tech: t },
                    diceRoll,
                    isRouteEvent: event.isRouteEvent,
                    isHiddenEvent: event.isHiddenEvent,
                    historicalParallel: event.historicalParallel,
                    quote: event.quote
                });

                this.updateHistoryDisplay();
                this.checkAchievements();
                this.checkGameStatus();

                if (!this.isGameOver) {
                    this.rounds++;
                    this.pendingNext = () => this.nextEvent();
                    this.showKnowledgeModal(event.knowledge, event.quote);
                }
            } catch (err) {
                console.error('Choice handling error:', err);
                this.enableAllButtons();
            }
        });
    }

    showDiceRoll(value, callback) {
        this.audio.playSfx('dice');
        const overlay = document.getElementById('dice-overlay');
        const diceContainer = document.getElementById('dice-container');
        const resultText = document.getElementById('dice-result-text');

        overlay.style.display = 'flex';
        diceContainer.innerHTML = getDiceSVG(1);
        resultText.textContent = '市场波动中……';

        let frames = 0;
        const interval = setInterval(() => {
            frames++;
            const rand = Math.floor(Math.random() * 20) + 1;
            diceContainer.innerHTML = getDiceSVG(rand);
            if (frames >= 12) {
                clearInterval(interval);
                diceContainer.innerHTML = getDiceSVG(value);
                let desc = '';
                if (value <= 5) desc = `坏运气（${value}）：历史偶然性带来了额外惩罚`;
                else if (value >= 16) desc = `好运气（${value}）：历史偶然性带来了意外收获`;
                else desc = `平稳（${value}）：市场如常波动`;
                resultText.textContent = desc;
                setTimeout(() => {
                    overlay.style.display = 'none';
                    callback();
                }, 900);
            }
        }, 80);
    }

    showFloatingNumber(barId, value) {
        if (value === 0) return;
        this.audio.playSfx('floatUp');
        const bar = document.getElementById(barId);
        const rect = bar.getBoundingClientRect();
        const el = document.createElement('div');
        el.className = 'floating-number';
        el.textContent = (value > 0 ? '+' : '') + value;
        el.style.left = (rect.left + rect.width / 2) + 'px';
        el.style.top = (rect.top - 10) + 'px';
        el.style.color = value > 0 ? '#1dd1a1' : '#ff6b6b';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
    }

    showKnowledgeModal(text, quote) {
        this.audio.playSfx('modal');
        const modal = document.getElementById('knowledge-modal');
        const textEl = document.getElementById('modal-knowledge-text');
        const quoteEl = document.getElementById('modal-quote-text');
        const cursor = document.getElementById('typewriter-cursor');
        const continueBtn = document.getElementById('continue-btn');

        textEl.textContent = '';
        if (quoteEl) quoteEl.textContent = quote ? `${quote.text} —— ${quote.author}` : '';
        cursor.style.display = 'inline';
        continueBtn.style.opacity = '0';
        continueBtn.style.pointerEvents = 'none';

        modal.classList.remove('fade-out');
        modal.style.display = 'flex';

        let index = 0;
        const speed = 28;
        this.typewriterTimer = setInterval(() => {
            textEl.textContent += text.charAt(index);
            index++;
            if (index >= text.length) {
                clearInterval(this.typewriterTimer);
                this.typewriterTimer = null;
                cursor.style.display = 'none';
                continueBtn.style.opacity = '1';
                continueBtn.style.pointerEvents = 'auto';
            }
        }, speed);
    }

    closeKnowledgeModal() {
        const modal = document.getElementById('knowledge-modal');
        if (this.typewriterTimer) {
            clearInterval(this.typewriterTimer);
            this.typewriterTimer = null;
        }
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.style.display = 'none';
            if (this.pendingNext) {
                const fn = this.pendingNext;
                this.pendingNext = null;
                fn();
            }
        }, 300);
    }

    showEpochTransition() {
        const epochNames = { 1: "原始积累纪元", 2: "工业垄断纪元", 3: "AI数字纪元" };
        const eventTitle = document.getElementById('event-title');
        const eventDescription = document.getElementById('event-description');
        const optionsContainer = document.getElementById('options-container');
        const eventImage = document.getElementById('event-image');

        eventTitle.textContent = "🚀 纪元转换";
        eventDescription.textContent = `进入${epochNames[this.epoch]}！资本主义发展进入新阶段。`;
        optionsContainer.innerHTML = '';
        eventImage.innerHTML = '';

        setTimeout(() => this.nextEvent(), 1400);
    }

    checkGameStatus() {
        if (this.socialConflict >= 100) {
            this.endGame("无产阶级革命爆发，资本主义制度被推翻");
            return;
        }
        if (this.wealth <= 0) {
            this.endGame("经济危机导致破产，资本积累失败");
            return;
        }
        if (this.rounds >= 6) {
            this.endGame("历史周期结束");
            return;
        }
        this.updateStatusDisplay();
    }

    endGame(reason) {
        this.isGameOver = true;
        this.audio.playSfx('end');

        const ending = (reason === "历史周期结束") ? this.determineEnding() : { name: "资本主义的终结", description: "资本主义的内在矛盾无法在资本主义框架内得到根本解决。" };
        const eventPanel = document.getElementById('event-panel');
        const gameOverPanel = document.getElementById('game-over-panel');
        const gameOverTitle = document.getElementById('game-over-title');
        const gameOverReason = document.getElementById('game-over-reason');
        const endingDescription = document.getElementById('ending-description');

        eventPanel.style.display = 'none';
        gameOverPanel.classList.remove('fade-out');
        gameOverPanel.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        gameOverTitle.textContent = "🎭 游戏结束";
        gameOverReason.textContent = `原因: ${reason}`;
        endingDescription.textContent = ending.description;

        // 记录结局
        this.endingsRecord.push(`${ending.name} - ${reason}`);
        localStorage.setItem('cg_endings', JSON.stringify(this.endingsRecord));

        // 解锁碎片
        this.unlockFragments(ending, reason);
        // 诊断报告
        this.renderDiagnosticReport(ending);
        // 成就最终检查
        this.checkAchievements(true);

        this.updateHistoryDisplay();
    }

    determineEnding() {
        // 路线权重影响
        const maxRoute = Object.entries(this.route).sort((a, b) => b[1] - a[1])[0];
        if (this.socialConflict >= 80 && this.wealth >= 200) {
            return { name: "技术封建主义", description: "💀 坏结局: 你成为了掌握AI算力资源的数字领主。但99%的人口因失业而沦为无用阶级，社会消费能力崩溃。资本逻辑走向终点：资本无法自行增殖，陷入死寂。" };
        } else if (maxRoute && maxRoute[0] === 'reformer' && this.socialConflict <= 45 && this.wealth >= 140) {
            return { name: "福利国家的乌托邦", description: "⚖️ 普通结局: 你建立了北欧式的高福利社会，矛盾缓和，但资本主义私有制依然存在。虽然看似美好，但根本矛盾（资本增殖）并未消除，只是被延迟。" };
        } else if ((maxRoute && maxRoute[0] === 'technologist' && this.techPower >= 90 && this.socialConflict <= 35) || (this.techPower >= 110 && this.socialConflict <= 30)) {
            return { name: "自由人联合体", description: "🌟 真结局: 由于生产力的极度发达（AI全面应用），物质极大丰富。生产资料私有制失去了存在的意义。你主动将生产资料交予联合体管理，实现了从资本的联合到人的联合的转变。" };
        } else {
            return { name: "资本主义的终结", description: "📉 普通结局: 你的资本主义道路走到了尽头。历史证明，资本主义的内在矛盾无法在资本主义框架内得到根本解决。" };
        }
    }

    unlockFragments(ending, reason) {
        let newlyUnlocked = [];
        for (const key in this.fragments) {
            const f = this.fragments[key];
            if (!f.unlocked && f.condition(this.history, { ...ending, reason })) {
                f.unlocked = true;
                newlyUnlocked.push(f);
            }
        }
        this.saveFragments();
        this.renderUnlockedFragments(newlyUnlocked);
    }

    renderUnlockedFragments(list) {
        const container = document.getElementById('unlocked-fragments');
        if (!list.length) { container.innerHTML = ''; return; }
        container.innerHTML = '<h4>📚 本轮解锁的认知碎片</h4>' + list.map(f => `
            <div class="fragment-unlock-card"><strong>${f.name}</strong><p>${f.desc}</p><p class="quote">${f.quote}</p></div>
        `).join('');
    }

    checkAchievements(finalCheck = false) {
        let newly = [];
        for (const key in this.achievements) {
            const a = this.achievements[key];
            if (!a.unlocked && typeof a.check === 'function' && a.check(this.history, this.fragments, this.endingsRecord)) {
                a.unlocked = true;
                newly.push(a);
            }
        }
        if (newly.length) this.saveAchievements();
        newly.forEach(a => this.showAchievementToast(a));
    }

    showAchievementToast(a) {
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `<div class="achievement-title">成就解锁：${a.name}</div><div class="achievement-desc">${a.desc}</div>`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3000);
    }

    renderDiagnosticReport(ending) {
        // 计算指数
        const total = this.history.length || 1;
        const conservativeCount = this.history.filter(h => h.routeTag === 'conservative').length;
        const technologistCount = this.history.filter(h => h.routeTag === 'technologist').length;
        const reformerCount = this.history.filter(h => h.routeTag === 'reformer').length;
        const exploitation = Math.round((conservativeCount / total) * 100);
        const techOptimism = Math.round((technologistCount / total) * 100);
        const reformSincerity = Math.round((reformerCount / total) * 100);

        document.getElementById('report-exploitation').textContent = exploitation;
        document.getElementById('report-tech').textContent = techOptimism;
        document.getElementById('report-reform').textContent = reformSincerity;

        const radar = generateRadarSVG([exploitation, techOptimism, reformSincerity], ['剥削指数', '技术乐观', '改良诚意'], 100);
        document.getElementById('report-radar').innerHTML = radar;

        // 历史对照
        const parallels = this.history.map(h => `<li><strong>${h.event}：</strong>${h.historicalParallel}</li>`).join('');
        document.getElementById('report-parallels').innerHTML = `<ul class="parallel-list">${parallels}</ul>`;

        // 动态语录
        const quotes = this.history.filter(h => h.quote).map(h => `<p class="report-quote">${h.quote.text} <span class="report-author">—— ${h.quote.author}</span></p>`).join('');
        document.getElementById('report-quotes').innerHTML = quotes || '<p style="opacity:0.7">本轮未收集到经典语录。</p>';
    }

    updateStatusDisplay() {
        const epochNames = { 1: "原始积累纪元", 2: "工业垄断纪元", 3: "AI数字纪元" };
        document.getElementById('epoch-name').textContent = epochNames[this.epoch];
        document.getElementById('round-counter').textContent = `第${this.rounds + 1}回合`;
        document.getElementById('wealth-value').textContent = this.wealth;
        document.getElementById('conflict-value').textContent = this.socialConflict;
        document.getElementById('tech-value').textContent = this.techPower;

        this.updateProgressBar('wealth-bar', this.wealth, 300);
        this.updateProgressBar('conflict-bar', this.socialConflict, 100);
        this.updateProgressBar('tech-bar', this.techPower, 150);

        // 路线条
        const totalRoute = Math.max(1, this.route.conservative + this.route.technologist + this.route.reformer);
        document.getElementById('route-conservative').style.width = ((this.route.conservative / totalRoute) * 100) + '%';
        document.getElementById('route-technologist').style.width = ((this.route.technologist / totalRoute) * 100) + '%';
        document.getElementById('route-reformer').style.width = ((this.route.reformer / totalRoute) * 100) + '%';

        this.addWarningStyles();
    }

    updateProgressBar(barId, value, maxValue) {
        const bar = document.getElementById(barId);
        bar.style.width = Math.min((value / maxValue) * 100, 100) + '%';
    }

    addWarningStyles() {
        const conflictValue = document.getElementById('conflict-value');
        const wealthValue = document.getElementById('wealth-value');
        if (this.socialConflict >= 70) conflictValue.classList.add('warning');
        else conflictValue.classList.remove('warning');
        if (this.wealth <= 30) wealthValue.classList.add('warning');
        else wealthValue.classList.remove('warning');
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        this.history.forEach((record) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <h4>${record.event} ${record.diceRoll ? `<span class="dice-mini">🎲${record.diceRoll}</span>` : ''}</h4>
                <p><strong>选择:</strong> ${record.choice}</p>
                <p><strong>变化:</strong> 财富${record.changes.wealth >= 0 ? '+' : ''}${record.changes.wealth} | 
                矛盾${record.changes.conflict >= 0 ? '+' : ''}${record.changes.conflict} | 
                技术${record.changes.tech >= 0 ? '+' : ''}${record.changes.tech}</p>
                <p class="knowledge"><strong>知识点:</strong> ${record.knowledge}</p>
            `;
            historyList.appendChild(historyItem);
        });
    }

    disableAllButtons() {
        document.querySelectorAll('.option-btn').forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.6';
            button.style.cursor = 'not-allowed';
        });
    }

    enableAllButtons() {
        document.querySelectorAll('.option-btn').forEach(button => {
            button.disabled = false;
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        });
    }

    restartGame() {
        const gameOverPanel = document.getElementById('game-over-panel');
        const eventPanel = document.getElementById('event-panel');
        const toast = document.getElementById('restart-toast');

        gameOverPanel.classList.add('fade-out');
        setTimeout(() => {
            this.wealth = 100; this.socialConflict = 30; this.techPower = 50;
            this.epoch = 1; this.rounds = 0; this.history = [];
            this.isGameOver = false; this.route = { conservative: 0, technologist: 0, reformer: 0 };
            this.equippedFragment = null; this.lastDiceRoll = null;
            this.pendingNext = null;
            if (this.typewriterTimer) { clearInterval(this.typewriterTimer); this.typewriterTimer = null; }
            this.applyEpochTheme();

            gameOverPanel.style.display = 'none';
            gameOverPanel.classList.remove('fade-out');
            document.getElementById('unlocked-fragments').innerHTML = '';

            eventPanel.style.display = 'block';
            eventPanel.style.opacity = '0';
            eventPanel.style.transition = 'opacity 0.5s ease';

            const eventTitle = document.getElementById('event-title');
            const eventDescription = document.getElementById('event-description');
            const optionsContainer = document.getElementById('options-container');
            const knowledgeText = document.getElementById('knowledge-text');
            const eventImage = document.getElementById('event-image');

            eventTitle.textContent = "欢迎来到资本主义世界";
            eventDescription.textContent = "请点击开始游戏按钮，体验资本主义的发展历程";
            knowledgeText.textContent = "游戏将展示资本主义发展的内在矛盾和马克思主义的科学分析";
            eventImage.innerHTML = '';

            optionsContainer.innerHTML = '<button class="start-btn" id="start-btn">开始游戏</button>';
            document.getElementById('start-btn').addEventListener('click', () => this.startGame());

            this.updateStatusDisplay();
            this.updateHistoryDisplay();

            requestAnimationFrame(() => { eventPanel.style.opacity = '1'; });
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }, 400);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.game = new CapitalGame();
});

import { buildEventLibrary } from '../data/events.js';
import { CognitiveFragments } from '../data/fragments.js';
import { Achievements } from '../data/achievements.js';
import { AudioManager } from './AudioManager.js';
import { getDiceSVG, generateRadarSVG, generateTrendChartSVG, generateSocialRadarSVG, getEpochTransitionAnimation, createParticleBurst } from '../utils/helpers.js';
import { EPOCH_NAMES, ROUTE_LABELS, STORAGE_KEYS, GAME_SETTINGS } from '../config.js';

/**
 * 资本：轮回与破局 - 核心游戏引擎（增强版）
 */
export class CapitalGame {
    constructor() {
        this.cash = GAME_SETTINGS.startWealth;
        this.wealth = GAME_SETTINGS.startWealth;
        this.socialConflict = GAME_SETTINGS.startConflict;
        this.techPower = GAME_SETTINGS.startTech;
        this.epoch = 1;
        this.rounds = 0;
        this.history = [];
        this.trendHistory = [];
        this.isGameOver = false;
        this.audio = new AudioManager();
        this.typewriterTimer = null;
        this.pendingNext = null;
        this.stockHoldings = 0;
        this.stockPrice = 100;
        this.stockHistory = [];

        // 路线倾向
        this.route = { conservative: 0, technologist: 0, reformer: 0 };
        // 社会关系
        this.social = { ...GAME_SETTINGS.social };
        // 认知碎片（从 localStorage 读取持久化）
        this.fragments = this.loadFragments();
        // 成就
        this.achievements = this.loadAchievements();
        // 结局记录（用于成就检测）
        this.endingsRecord = JSON.parse(localStorage.getItem(STORAGE_KEYS.endings) || '[]');
        // 纪元特殊事件触发记录
        this.epochSpecialTriggered = new Set();
        // 本轮携带的碎片
        this.equippedFragment = null;
        // 骰子结果
        this.lastDiceRoll = null;

        this.events = buildEventLibrary({});
        this.initializeGame();
    }

    // 允许外部注入事件图库后重新构建
    setEventImages(eventImages) {
        this.events = buildEventLibrary(eventImages);
    }

    loadFragments() {
        const saved = localStorage.getItem(STORAGE_KEYS.fragments);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const merged = {};
                for (const key in CognitiveFragments) {
                    merged[key] = { ...CognitiveFragments[key], ...(parsed[key] || {}) };
                    merged[key].condition = CognitiveFragments[key].condition; // restore function
                }
                return merged;
            } catch (e) {
                console.error('Failed to load fragments:', e);
            }
        }
        return Object.fromEntries(Object.entries(CognitiveFragments).map(([k, v]) => [k, { ...v }]));
    }

    saveFragments() {
        localStorage.setItem(STORAGE_KEYS.fragments, JSON.stringify(this.fragments));
    }

    loadAchievements() {
        const saved = localStorage.getItem(STORAGE_KEYS.achievements);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const merged = {};
                for (const key in Achievements) {
                    merged[key] = { ...Achievements[key], ...(parsed[key] || {}) };
                    merged[key].check = Achievements[key].check; // restore function
                }
                return merged;
            } catch (e) {
                console.error('Failed to load achievements:', e);
            }
        }
        return Object.fromEntries(Object.entries(Achievements).map(([k, v]) => [k, { ...v }]));
    }

    saveAchievements() {
        localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(this.achievements));
    }

    initializeGame() {
        this.bindEvents();
        this.updateStatusDisplay();
        this.applyEpochTheme();
        this.renderFragmentGallery();
        this.maybeShowIntro();
    }

    maybeShowIntro() {
        const skipIntro = localStorage.getItem('cg_skipIntro') === '1';
        const introPanel = document.getElementById('intro-panel');
        if (!introPanel) return;
        if (skipIntro) {
            introPanel.style.display = 'none';
        } else {
            introPanel.style.display = 'flex';
        }
    }

    hideIntro() {
        const introPanel = document.getElementById('intro-panel');
        const skipCheckbox = document.getElementById('intro-skip-checkbox');
        if (skipCheckbox && skipCheckbox.checked) {
            localStorage.setItem('cg_skipIntro', '1');
        }
        if (introPanel) {
            introPanel.classList.add('fade-out');
            setTimeout(() => {
                introPanel.style.display = 'none';
                introPanel.classList.remove('fade-out');
                this.startGame();
            }, 350);
        }
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('continue-btn').addEventListener('click', () => this.closeKnowledgeModal());
        document.getElementById('music-toggle').addEventListener('click', () => this.toggleMusic());
        document.getElementById('fragment-gallery-btn').addEventListener('click', () => this.openFragmentGallery());
        document.getElementById('close-gallery-btn').addEventListener('click', () => this.closeFragmentGallery());

        // Tab 切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // 股市交易按钮
        document.getElementById('stock-buy').addEventListener('click', () => this.tradeStock('buy'));
        document.getElementById('stock-skip').addEventListener('click', () => this.tradeStock('skip'));
        document.getElementById('stock-sell').addEventListener('click', () => this.tradeStock('sell'));
        document.getElementById('intro-start-btn').addEventListener('click', () => this.hideIntro());
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${tabName}`));
    }

    toggleMusic() {
        const btn = document.getElementById('music-toggle');
        const active = this.audio.toggle();
        btn.textContent = active ? '🔊' : '🔇';
        btn.classList.toggle('active', active);
    }

    startGame() {
        document.getElementById('start-btn').style.display = 'none';
        this.showFragmentSelection();
    }

    applyEpochTheme() {
        document.body.className = `epoch-${this.epoch}`;
        document.body.classList.add(`theme-epoch-${this.epoch}`);
        document.body.dataset.epoch = String(this.epoch);
        this.audio.setEpoch(this.epoch);

        const themeMeta = {
            1: { badge: "血色积累", tone: "掠夺、圈地、原始暴力" },
            2: { badge: "煤灰垄断", tone: "烟尘、流水线、工业规训" },
            3: { badge: "蓝焰智能", tone: "算力、数据、算法统治" }
        };
        const currentTheme = themeMeta[this.epoch];

        const eventPanel = document.getElementById('event-panel');
        const statusPanel = document.querySelector('.status-panel');
        const gameHeader = document.querySelector('.game-header');
        const epochBadge = document.getElementById('epoch-card-badge');
        const themeLine = document.getElementById('event-theme-line');

        if (eventPanel) eventPanel.dataset.epoch = String(this.epoch);
        if (statusPanel) statusPanel.dataset.epoch = String(this.epoch);
        if (gameHeader) gameHeader.dataset.epoch = String(this.epoch);
        if (epochBadge) epochBadge.textContent = currentTheme.badge;
        if (themeLine) themeLine.textContent = currentTheme.tone;
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
        if (effect.wealthStart) this.cash += effect.wealthStart;
        if (effect.conflictStart) this.socialConflict += effect.conflictStart;
        if (effect.techStart) this.techPower += effect.techStart;
        this.updateWealth();
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
            this.cash += this.equippedFragment.effect.wealthPerRound;
            this.updateWealth();
            this.showFloatingNumber('cash-bar', this.equippedFragment.effect.wealthPerRound);
            this.updateStatusDisplay();
        }

        // 检查隐藏连锁事件
        if (this.checkHiddenEvent()) return;

        // 检查社会关系特殊事件
        const socialEvent = this.checkSocialEvent();
        if (socialEvent) {
            this.displayEvent(socialEvent);
            return;
        }

        // 检查纪元特殊事件（game-lzk 扩展）
        const epochSpecialEvent = this.checkEpochSpecialEvent();
        if (epochSpecialEvent) {
            this.displayEvent(epochSpecialEvent);
            return;
        }

        // 检查路线专属事件
        const routeEvent = this.checkRouteEvent();
        if (routeEvent) {
            this.displayEvent(routeEvent);
            return;
        }

        const baseEvents = this.events[this.epoch];
        const epochHistory = this.history.filter(h => h.epoch === this.epoch && !h.isRouteEvent && !h.isHiddenEvent && !h.isSpecialEvent && !h.isEpochSpecial);
        if (epochHistory.length >= 4) {
            this.epoch++;
            if (this.epoch > GAME_SETTINGS.maxEpoch) {
                this.endGame("历史周期结束");
                return;
            }
            this.applyEpochTheme();
            this.audio.playSfx('epoch');
            this.showEpochTransition();
            return;
        }

        const randomEvent = baseEvents[Math.floor(Math.random() * baseEvents.length)];

        // 设置股市面板（与当前事件关联）
        this.setupStockMarket(randomEvent);
        this.displayEvent(randomEvent);
    }

    checkRouteEvent() {
        const maxRoute = Object.entries(this.route).sort((a, b) => b[1] - a[1])[0];
        if (maxRoute[1] >= GAME_SETTINGS.routeEventThreshold && Math.random() < GAME_SETTINGS.routeEventChance) {
            const evt = this.events.route[maxRoute[0]];
            if (evt) return { ...evt, isRouteEvent: true, routeType: maxRoute[0] };
        }
        return null;
    }

    checkHiddenEvent() {
        const hasTechRevolution = this.history.some(h => h.event === '技术革命' && h.choice.includes('全力'));
        const hasAI = this.history.some(h => h.event === '人工智能取代人力' && h.choice.includes('全面'));
        const notYetTriggered = !this.history.some(h => h.event === '算力独裁');
        if (hasTechRevolution && hasAI && notYetTriggered && this.epoch === GAME_SETTINGS.maxEpoch) {
            this.displayEvent({ ...this.events.hidden.computeDictator, isHiddenEvent: true });
            return true;
        }
        return false;
    }

    checkSocialEvent() {
        const workerTrust = this.social.worker;
        const govSupport = this.social.gov;
        if (workerTrust <= 10 && !this.history.some(h => h.event === '总罢工' && h.isSpecialEvent)) {
            return { ...this.events.special.workerStrikeEmergency, isSpecialEvent: true };
        }
        if (govSupport >= 90 && !this.history.some(h => h.event === '政策红利' && h.isSpecialEvent)) {
            return { ...this.events.special.policyDividend, isSpecialEvent: true };
        }
        return null;
    }

    checkEpochSpecialEvent() {
        const specials = this.events.special && this.events.special.epochSpecial;
        if (!specials) return null;

        const epochRegularCount = this.history.filter(h => h.epoch === this.epoch && !h.isRouteEvent && !h.isHiddenEvent && !h.isSpecialEvent && !h.isEpochSpecial).length;

        if (this.epoch === 2 && this.techPower >= 65 && epochRegularCount >= 1 && !this.epochSpecialTriggered.has('assemblyLineAlgorithm')) {
            this.epochSpecialTriggered.add('assemblyLineAlgorithm');
            return { ...specials.assemblyLineAlgorithm, isEpochSpecial: true };
        }

        if (this.epoch === 3) {
            if (this.wealth >= 150 && this.techPower >= 85 && this.socialConflict >= 50 && !this.epochSpecialTriggered.has('computeFence')) {
                this.epochSpecialTriggered.add('computeFence');
                return { ...specials.computeFence, isEpochSpecial: true };
            }
            if (this.techPower >= 85 && this.socialConflict <= 45 && this.wealth >= 80 && !this.epochSpecialTriggered.has('publicComputeTrial')) {
                this.epochSpecialTriggered.add('publicComputeTrial');
                return { ...specials.publicComputeTrial, isEpochSpecial: true };
            }
            if (this.techPower >= 80 && this.socialConflict >= 65 && !this.epochSpecialTriggered.has('uselessClassNight')) {
                this.epochSpecialTriggered.add('uselessClassNight');
                return { ...specials.uselessClassNight, isEpochSpecial: true };
            }
        }

        return null;
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

        optionsContainer.innerHTML = '';

        if (event.type === 'slider') {
            this.renderSliderDecision(event, optionsContainer);
        } else {
            const fragment = document.createDocumentFragment();
            event.options.forEach((option) => {
                const card = this.createOptionCard(option, event);
                fragment.appendChild(card);
            });
            optionsContainer.appendChild(fragment);
        }

        this.enableAllButtons();
        this.updateStatusDisplay();
    }

    createOptionCard(option, event) {
        const card = document.createElement('div');
        card.className = `option-card route-${option.routeTag || 'default'}`;
        const tagBadge = option.routeTag ? `<span class="route-badge ${option.routeTag}">${ROUTE_LABELS[option.routeTag] || option.routeTag}</span>` : '';

        const preview = [];
        if (option.wealth) preview.push(`财富 ${option.wealth > 0 ? '+' : ''}${option.wealth}`);
        if (option.conflict) preview.push(`矛盾 ${option.conflict > 0 ? '+' : ''}${option.conflict}`);
        if (option.tech) preview.push(`技术 ${option.tech > 0 ? '+' : ''}${option.tech}`);

        card.innerHTML = `
            <div class="option-card-header">
                ${tagBadge}
                <div class="option-card-title">${option.text}</div>
            </div>
            <div class="option-card-hint">点击查看详细后果与历史隐喻</div>
            <div class="option-card-preview">
                ${preview.length ? preview.map(p => `<span>${p}</span>`).join('') : '<span>维持现状</span>'}
            </div>
            <div class="option-card-details">
                <div class="option-detail-stats">
                    <span class="stat-w">财富${option.wealth >= 0 ? '+' : ''}${option.wealth}</span>
                    <span class="stat-c">矛盾${option.conflict >= 0 ? '+' : ''}${option.conflict}</span>
                    <span class="stat-t">技术${option.tech >= 0 ? '+' : ''}${option.tech}</span>
                </div>
                <div class="option-detail-meta">此选项将强化你的${option.routeTag ? ROUTE_LABELS[option.routeTag] : '中立'}路线倾向。</div>
            </div>
        `;

        card.addEventListener('click', () => this.handleChoice(option, event, card));
        return card;
    }

    renderSliderDecision(event, container) {
        const slider = event.slider;
        const base = event.sliderBase || {};
        const div = document.createElement('div');
        div.className = 'slider-decision';
        div.innerHTML = `
            <div class="slider-decision-header">
                <h4>${slider.label}</h4>
                <p>${slider.preview}</p>
            </div>
            <div class="slider-row">
                <span>保守</span>
                <input type="range" id="event-slider" min="${slider.min}" max="${slider.max}" value="${slider.default}">
                <span>激进</span>
                <div class="slider-value" id="slider-value">${slider.default}%</div>
            </div>
            <div class="slider-preview" id="slider-preview"></div>
            <button class="slider-confirm" id="slider-confirm">确认决策</button>
        `;
        container.appendChild(div);

        const sliderInput = div.querySelector('#event-slider');
        const valueDisplay = div.querySelector('#slider-value');
        const previewDisplay = div.querySelector('#slider-preview');

        const updatePreview = () => {
            const pct = parseInt(sliderInput.value, 10) / 100;
            const w = Math.round((base.wealth || 0) * pct);
            const c = Math.round((base.conflict || 0) * pct);
            const t = Math.round((base.tech || 0) * pct);
            valueDisplay.textContent = `${sliderInput.value}%`;
            previewDisplay.innerHTML = `
                <span class="stat-w">预估财富 ${w >= 0 ? '+' : ''}${w}</span>
                <span class="stat-c">预估矛盾 ${c >= 0 ? '+' : ''}${c}</span>
                <span class="stat-t">预估技术 ${t >= 0 ? '+' : ''}${t}</span>
            `;
        };

        sliderInput.addEventListener('input', updatePreview);
        updatePreview();

        div.querySelector('#slider-confirm').addEventListener('click', () => {
            const pct = parseInt(sliderInput.value, 10) / 100;
            const option = {
                text: `${slider.label} ${sliderInput.value}%`,
                wealth: Math.round((base.wealth || 0) * pct),
                conflict: Math.round((base.conflict || 0) * pct),
                tech: Math.round((base.tech || 0) * pct),
                routeTag: base.routeTag,
                social: base.social ? {
                    worker: Math.round(base.social.worker * pct),
                    gov: Math.round(base.social.gov * pct),
                    media: Math.round(base.social.media * pct),
                    rival: Math.round(base.social.rival * pct)
                } : undefined
            };
            this.handleChoice(option, event, div);
        });
    }

    handleChoice(option, event, cardEl) {
        this.disableAllButtons();

        // D20 骰子
        const diceRoll = Math.floor(Math.random() * 20) + 1;
        this.lastDiceRoll = diceRoll;
        this.showDiceRoll(diceRoll, () => {
            try {
                // 应用基础数值
                let w = option.wealth || 0, c = option.conflict || 0, t = option.tech || 0;
                // 骰子修正
                if (diceRoll <= 5) { w -= 5; c += 3; }
                else if (diceRoll >= 16) { w += 3; c -= 3; }

                const oldWealth = this.wealth, oldConflict = this.socialConflict, oldTech = this.techPower;

                this.cash += w;
                this.socialConflict += c;
                this.techPower += t;

                // 社会关系
                if (option.social) {
                    for (const key in option.social) {
                        this.social[key] = Math.max(GAME_SETTINGS.social.min, Math.min(GAME_SETTINGS.social.max, this.social[key] + (option.social[key] || 0)));
                    }
                }

                // 股价波动（与事件和选择相关）
                const stockChange = this.calculateStockChange(event, option, diceRoll);
                this.stockPrice = Math.max(10, this.stockPrice + stockChange);
                this.updateWealth();

                // 路线倾向
                if (option.routeTag) {
                    this.route[option.routeTag] = (this.route[option.routeTag] || 0) + 1;
                }

                this.updateStatusDisplay();
                const oldStockValue = oldWealth - (this.cash - w);
                this.showFloatingNumber('cash-bar', w);
                this.showFloatingNumber('stock-bar', this.getStockValue() - oldStockValue);
                this.showFloatingNumber('conflict-bar', this.socialConflict - oldConflict);
                this.showFloatingNumber('tech-bar', this.techPower - oldTech);

                // 记录趋势
                this.trendHistory.push({ wealth: this.wealth, conflict: this.socialConflict, tech: this.techPower });

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
                    isSpecialEvent: event.isSpecialEvent,
                    isEpochSpecial: event.isEpochSpecial,
                    historicalParallel: event.historicalParallel,
                    quote: event.quote,
                    social: option.social ? { ...option.social } : undefined
                });

                this.updateHistoryDisplay();
                this.checkAchievements();
                this.checkGameStatus();

                // 卡牌动画
                if (cardEl) {
                    const glowClass = option.routeTag ? `card-glow-${option.routeTag}` : 'card-glow-reformer';
                    cardEl.classList.add(glowClass);
                    const colorMap = { conservative: '#ff6b6b', technologist: '#48dbfb', reformer: '#1dd1a1' };
                    createParticleBurst(cardEl, colorMap[option.routeTag] || '#feca57', 14);
                    if (this.socialConflict >= 80 || this.wealth <= 20) {
                        document.body.classList.add('shake-screen');
                        setTimeout(() => document.body.classList.remove('shake-screen'), 400);
                    }
                }

                if (!this.isGameOver) {
                    this.rounds++;
                    this.pendingNext = () => this.nextEvent();

                    // 显示回合数值变化摘要
                    const totalWealthChange = this.wealth - oldWealth;
                    this.showRoundSummaryToast(totalWealthChange, this.socialConflict - oldConflict, this.techPower - oldTech);

                    // 延迟显示知识弹窗，让玩家看清数值变化
                    setTimeout(() => {
                        this.hideRoundSummaryToast();
                        this.showKnowledgeModal(event.knowledge, event.quote);
                    }, 1400);
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
        overlay.classList.remove('show');
        diceContainer.innerHTML = getDiceSVG(1);
        resultText.textContent = '市场波动中……';

        // 下一帧添加 show 类以触发淡入
        requestAnimationFrame(() => overlay.classList.add('show'));

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
                    overlay.classList.remove('show');
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        callback();
                    }, 300);
                }, 900);
            }
        }, 80);
    }

    showRoundSummaryToast(wealthChange, conflictChange, techChange) {
        const toast = document.getElementById('round-summary-toast');
        const content = document.getElementById('round-summary-content');
        const fmt = (val, label) => {
            const cls = val > 0 ? 'positive' : (val < 0 ? 'negative' : 'neutral');
            const sign = val > 0 ? '+' : '';
            return `<span class="rs-item ${cls}">${label}${sign}${val}</span>`;
        };
        content.innerHTML = `
            <span>本回合变化：</span>
            ${fmt(wealthChange, '财富')}
            ${fmt(conflictChange, '矛盾')}
            ${fmt(techChange, '技术')}
        `;
        toast.style.display = 'block';
        requestAnimationFrame(() => toast.classList.add('show'));
    }

    hideRoundSummaryToast() {
        const toast = document.getElementById('round-summary-toast');
        toast.classList.remove('show');
        setTimeout(() => { toast.style.display = 'none'; }, 300);
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
        const overlay = document.getElementById('epoch-transition-overlay');
        const title = document.getElementById('epoch-transition-title');
        const desc = document.getElementById('epoch-transition-desc');
        const animation = document.getElementById('epoch-animation');

        title.textContent = `🚀 进入${EPOCH_NAMES[this.epoch]}`;
        desc.textContent = '资本主义发展进入新阶段，历史的车轮滚滚向前……';
        animation.innerHTML = getEpochTransitionAnimation(this.epoch - 1, this.epoch);

        overlay.style.display = 'flex';
        overlay.classList.add('show');

        setTimeout(() => {
            overlay.classList.add('hide');
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.classList.remove('show', 'hide');
                this.nextEvent();
            }, 400);
        }, 2400);
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
        if (this.rounds >= GAME_SETTINGS.maxRounds) {
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
        localStorage.setItem(STORAGE_KEYS.endings, JSON.stringify(this.endingsRecord));

        // 解锁碎片
        this.unlockFragments(ending, reason);
        // 诊断报告
        this.renderDiagnosticReport(ending);
        // 成就最终检查
        this.checkAchievements(true);
        // 渲染成就列表
        this.renderAchievementsList();
        // 渲染收集碎片
        this.renderCollectionFragments();

        this.updateHistoryDisplay();
        this.switchTab('ending');
    }

    determineEnding() {
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
            if (!f.unlocked && typeof f.condition === 'function' && f.condition(this.history, { ...ending, reason })) {
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

    renderCollectionFragments() {
        const container = document.getElementById('collection-fragments');
        const all = Object.values(this.fragments);
        let html = '<div class="gallery-list">';
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
        html += '</div>';
        container.innerHTML = html;
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

    renderAchievementsList() {
        const container = document.getElementById('achievements-list');
        const all = Object.values(this.achievements);
        let html = '<div class="achievement-grid">';
        all.forEach(a => {
            html += `
                <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">${a.name.split(' ')[0]}</div>
                    <div class="achievement-name">${a.name.split(' ').slice(1).join(' ')}</div>
                    <div class="achievement-info">${a.desc}</div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
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

        // 历史走势
        document.getElementById('report-trend').innerHTML = generateTrendChartSVG(this.trendHistory);
    }

    updateStatusDisplay() {
        document.getElementById('epoch-name').textContent = EPOCH_NAMES[this.epoch];
        const epochRegularCount = this.history.filter(h => h.epoch === this.epoch && !h.isRouteEvent && !h.isHiddenEvent && !h.isSpecialEvent && !h.isEpochSpecial).length;
        const currentEpochRound = Math.min(epochRegularCount + 1, 4);
        document.getElementById('round-counter').textContent = `本阶段 ${currentEpochRound}/4 回合 | 总 ${Math.min(this.rounds + 1, GAME_SETTINGS.maxRounds)}/${GAME_SETTINGS.maxRounds} 回合`;
        document.getElementById('cash-value').textContent = this.cash;
        document.getElementById('stock-value').textContent = this.getStockValue();
        document.getElementById('conflict-value').textContent = this.socialConflict;
        document.getElementById('tech-value').textContent = this.techPower;

        this.updateProgressBar('cash-bar', this.cash, GAME_SETTINGS.wealthBarMax);
        this.updateProgressBar('stock-bar', this.getStockValue(), GAME_SETTINGS.wealthBarMax);
        this.updateProgressBar('conflict-bar', this.socialConflict, GAME_SETTINGS.conflictBarMax);
        this.updateProgressBar('tech-bar', this.techPower, GAME_SETTINGS.techBarMax);

        // 路线条
        const totalRoute = Math.max(1, this.route.conservative + this.route.technologist + this.route.reformer);
        document.getElementById('route-conservative').style.width = ((this.route.conservative / totalRoute) * 100) + '%';
        document.getElementById('route-technologist').style.width = ((this.route.technologist / totalRoute) * 100) + '%';
        document.getElementById('route-reformer').style.width = ((this.route.reformer / totalRoute) * 100) + '%';

        // 社会关系
        document.getElementById('social-worker').textContent = this.social.worker;
        document.getElementById('social-gov').textContent = this.social.gov;
        document.getElementById('social-media').textContent = this.social.media;
        document.getElementById('social-rival').textContent = this.social.rival;

        const socialValues = [this.social.worker, this.social.gov, this.social.media, this.social.rival];
        document.getElementById('social-radar').innerHTML = generateSocialRadarSVG(socialValues, ['工人', '政府', '媒体', '竞争']);

        // 趋势图
        document.getElementById('trend-chart').innerHTML = generateTrendChartSVG(this.trendHistory);

        this.addWarningStyles();
    }

    updateProgressBar(barId, value, maxValue) {
        const bar = document.getElementById(barId);
        bar.style.width = Math.min((value / maxValue) * 100, 100) + '%';
    }

    addWarningStyles() {
        const conflictValue = document.getElementById('conflict-value');
        const cashValue = document.getElementById('cash-value');
        const stockValue = document.getElementById('stock-value');
        if (this.socialConflict >= 70) conflictValue.classList.add('warning');
        else conflictValue.classList.remove('warning');
        if (this.cash <= 20) cashValue.classList.add('warning');
        else cashValue.classList.remove('warning');
        if (this.wealth <= 30) stockValue.classList.add('warning');
        else stockValue.classList.remove('warning');
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

        // 迷你历史
        const miniList = document.getElementById('mini-history-list');
        if (this.history.length === 0) {
            miniList.innerHTML = '<p class="mini-empty">游戏尚未开始</p>';
        } else {
            miniList.innerHTML = this.history.slice(-4).map(h => `
                <div class="mini-history-item">
                    <div class="mhi-title">${h.event}</div>
                    <div class="mhi-choice">${h.choice}</div>
                </div>
            `).join('');
        }
    }

    disableAllButtons() {
        document.querySelectorAll('.option-card').forEach(card => {
            card.style.pointerEvents = 'none';
            card.style.opacity = '0.6';
        });
        document.querySelectorAll('.slider-confirm').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });
    }

    enableAllButtons() {
        document.querySelectorAll('.option-card').forEach(card => {
            card.style.pointerEvents = 'auto';
            card.style.opacity = '1';
        });
        document.querySelectorAll('.slider-confirm').forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
        });
    }

    // ========== 常驻股市面板 ==========
    getCash() {
        return this.cash;
    }

    getStockValue() {
        return this.stockHoldings * this.stockPrice;
    }

    updateWealth() {
        this.wealth = this.cash + this.getStockValue();
    }

    getMarketExpectation(event) {
        const text = (event.name || '') + (event.description || '');
        if (text.includes('技术') || text.includes('科技') || text.includes('AI') || text.includes('数字化') || text.includes('革命')) {
            return '技术利好，市场看涨 📈';
        }
        if (text.includes('罢工') || text.includes('危机') || text.includes('萧条') || text.includes('崩溃') || text.includes('泡沫') || text.includes('恐慌')) {
            return '社会动荡，市场承压 📉';
        }
        if (text.includes('垄断') || text.includes('扩张') || text.includes('投资') || text.includes('增长') || text.includes('利润')) {
            return '扩张预期，情绪积极 📈';
        }
        return '市场情绪中性，走势不明 ～';
    }

    setupStockMarket(event) {
        this.stockMarketEvent = event;
        const panel = document.getElementById('stock-panel');
        if (panel) {
            panel.style.display = 'block';
            this.renderStockPanel();
        }
    }

    renderStockPanel() {
        const event = this.stockMarketEvent || {};
        const priceEl = document.getElementById('stock-price');
        const holdingsEl = document.getElementById('stock-holdings');
        const marketValueEl = document.getElementById('stock-market-value');
        const cashEl = document.getElementById('stock-cash');
        const expectationEl = document.getElementById('stock-expectation');
        const buyBtn = document.getElementById('stock-buy');
        const sellBtn = document.getElementById('stock-sell');
        const historyEl = document.getElementById('stock-history-compact');

        priceEl.textContent = this.stockPrice;
        holdingsEl.textContent = this.stockHoldings;
        marketValueEl.textContent = this.stockHoldings * this.stockPrice;
        const cash = this.getCash();
        cashEl.textContent = cash;
        expectationEl.textContent = this.getMarketExpectation(event);

        if (buyBtn) buyBtn.disabled = cash < this.stockPrice;
        if (sellBtn) sellBtn.disabled = this.stockHoldings <= 0;

        if (!this.stockHistory || this.stockHistory.length === 0) {
            historyEl.innerHTML = '<span class="stock-empty">暂无交易记录</span>';
        } else {
            const actionMap = { buy: '买入', sell: '卖出', skip: '观望' };
            const tags = this.stockHistory.slice(-5).map(h => {
                const cls = h.priceDelta > 0 ? 'positive' : (h.priceDelta < 0 ? 'negative' : 'neutral');
                const sign = h.priceDelta > 0 ? '+' : '';
                return `<span class="sh-tag ${cls}">${actionMap[h.action] || h.action} @${h.price} ${sign}${h.priceDelta || 0}</span>`;
            }).join('');
            historyEl.innerHTML = tags;
        }
    }

    tradeStock(action) {
        if (action === 'buy') {
            if (this.getCash() >= this.stockPrice) {
                this.cash -= this.stockPrice;
                this.stockHoldings += 1;
                this.updateWealth();
                this.stockHistory.push({ action, price: this.stockPrice, priceDelta: 0 });
                this.audio.playSfx('click');
            }
        } else if (action === 'sell') {
            if (this.stockHoldings > 0) {
                this.cash += this.stockPrice;
                this.stockHoldings -= 1;
                this.updateWealth();
                this.stockHistory.push({ action, price: this.stockPrice, priceDelta: 0 });
                this.audio.playSfx('click');
            }
        } else {
            this.stockHistory.push({ action, price: this.stockPrice, priceDelta: 0 });
        }
        this.updateStatusDisplay();
        this.renderStockPanel();
    }

    calculateStockChange(event, option, diceRoll) {
        let change = 0;
        const text = (event.name || '') + (event.description || '');

        // 事件类型影响（基准）
        if (text.includes('技术') || text.includes('科技') || text.includes('AI') || text.includes('数字化') || text.includes('革命')) {
            change += 5 + Math.random() * 10;
        } else if (text.includes('罢工') || text.includes('危机') || text.includes('萧条') || text.includes('崩溃') || text.includes('泡沫') || text.includes('恐慌')) {
            change -= 8 + Math.random() * 12;
        } else if (text.includes('垄断') || text.includes('扩张') || text.includes('投资') || text.includes('增长') || text.includes('利润')) {
            change += 3 + Math.random() * 7;
        } else {
            change += (Math.random() - 0.5) * 8;
        }

        // 选择影响
        if (option) {
            change += (option.wealth || 0) * 0.25;
            change -= (option.conflict || 0) * 0.35;
            change += (option.tech || 0) * 0.15;
        }

        // 骰子影响
        if (diceRoll) {
            change += (diceRoll - 10) * 0.6;
        }

        return Math.round(change);
    }

    restartGame() {
        const gameOverPanel = document.getElementById('game-over-panel');
        const eventPanel = document.getElementById('event-panel');
        const toast = document.getElementById('restart-toast');

        gameOverPanel.classList.add('fade-out');
        setTimeout(() => {
            this.cash = GAME_SETTINGS.startWealth;
            this.wealth = GAME_SETTINGS.startWealth;
            this.socialConflict = GAME_SETTINGS.startConflict;
            this.techPower = GAME_SETTINGS.startTech;
            this.epoch = 1;
            this.rounds = 0;
            this.history = [];
            this.trendHistory = [];
            this.isGameOver = false;
            this.route = { conservative: 0, technologist: 0, reformer: 0 };
            this.social = { ...GAME_SETTINGS.social };
            this.epochSpecialTriggered = new Set();
            this.equippedFragment = null;
            this.lastDiceRoll = null;
            this.pendingNext = null;
            this.stockHoldings = 0;
            this.stockPrice = 100;
            this.stockHistory = [];
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

            const stockPanel = document.getElementById('stock-panel');
            if (stockPanel) stockPanel.style.display = 'none';

            this.updateStatusDisplay();
            this.updateHistoryDisplay();

            requestAnimationFrame(() => { eventPanel.style.opacity = '1'; });
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }, 400);
    }
}

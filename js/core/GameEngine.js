import { buildEventLibrary } from '../data/events.js';
import { CognitiveFragments } from '../data/fragments.js';
import { Achievements } from '../data/achievements.js';
import { AudioManager } from './AudioManager.js';
import { getDiceSVG, generateRadarSVG } from '../utils/helpers.js';
import { EPOCH_NAMES, ROUTE_LABELS, STORAGE_KEYS, GAME_SETTINGS } from '../config.js';

/**
 * 资本：轮回与破局 - 核心游戏引擎
 */
export class CapitalGame {
    constructor() {
        this.wealth = GAME_SETTINGS.startWealth;
        this.socialConflict = GAME_SETTINGS.startConflict;
        this.techPower = GAME_SETTINGS.startTech;
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
        this.endingsRecord = JSON.parse(localStorage.getItem(STORAGE_KEYS.endings) || '[]');
        // 本轮携带的碎片
        this.equippedFragment = null;
        // 骰子结果
        this.lastDiceRoll = null;

        this.events = buildEventLibrary(buildEventLibrary.assets || {});
        // 重新构建事件库，需要正确的 EventImages 引用
        // 实际上需要传入真正的 EventImages。由于 GameEngine 不知道 assets，
        // 我们在这里改用动态注入或在 main.js 中初始化。
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
            const tagBadge = option.routeTag ? `<span class="route-badge ${option.routeTag}">${ROUTE_LABELS[option.routeTag] || option.routeTag}</span>` : '';
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
        const eventTitle = document.getElementById('event-title');
        const eventDescription = document.getElementById('event-description');
        const optionsContainer = document.getElementById('options-container');
        const eventImage = document.getElementById('event-image');

        eventTitle.textContent = "🚀 纪元转换";
        eventDescription.textContent = `进入${EPOCH_NAMES[this.epoch]}！资本主义发展进入新阶段。`;
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
        document.getElementById('epoch-name').textContent = EPOCH_NAMES[this.epoch];
        document.getElementById('round-counter').textContent = `第${this.rounds + 1}回合`;
        document.getElementById('wealth-value').textContent = this.wealth;
        document.getElementById('conflict-value').textContent = this.socialConflict;
        document.getElementById('tech-value').textContent = this.techPower;

        this.updateProgressBar('wealth-bar', this.wealth, GAME_SETTINGS.wealthBarMax);
        this.updateProgressBar('conflict-bar', this.socialConflict, GAME_SETTINGS.conflictBarMax);
        this.updateProgressBar('tech-bar', this.techPower, GAME_SETTINGS.techBarMax);

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
            this.wealth = GAME_SETTINGS.startWealth;
            this.socialConflict = GAME_SETTINGS.startConflict;
            this.techPower = GAME_SETTINGS.startTech;
            this.epoch = 1;
            this.rounds = 0;
            this.history = [];
            this.isGameOver = false;
            this.route = { conservative: 0, technologist: 0, reformer: 0 };
            this.equippedFragment = null;
            this.lastDiceRoll = null;
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

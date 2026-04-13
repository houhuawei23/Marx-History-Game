/**
 * 通用工具函数
 */

/**
 * 生成 D20 骰子的 SVG 字符串
 * @param {number} value - 骰子点数 (1-20)
 * @returns {string} SVG 字符串
 */
export function getDiceSVG(value) {
    const dots = {
        1: '<circle cx="50" cy="50" r="8" fill="#d4af37"/>',
        2: '<circle cx="30" cy="30" r="6" fill="#d4af37"/><circle cx="70" cy="70" r="6" fill="#d4af37"/>',
        3: '<circle cx="25" cy="25" r="6" fill="#d4af37"/><circle cx="50" cy="50" r="6" fill="#d4af37"/><circle cx="75" cy="75" r="6" fill="#d4af37"/>',
        4: '<circle cx="28" cy="28" r="6" fill="#d4af37"/><circle cx="72" cy="28" r="6" fill="#d4af37"/><circle cx="28" cy="72" r="6" fill="#d4af37"/><circle cx="72" cy="72" r="6" fill="#d4af37"/>',
        5: '<circle cx="25" cy="25" r="6" fill="#d4af37"/><circle cx="75" cy="25" r="6" fill="#d4af37"/><circle cx="50" cy="50" r="6" fill="#d4af37"/><circle cx="25" cy="75" r="6" fill="#d4af37"/><circle cx="75" cy="75" r="6" fill="#d4af37"/>',
        6: '<circle cx="25" cy="25" r="6" fill="#d4af37"/><circle cx="75" cy="25" r="6" fill="#d4af37"/><circle cx="25" cy="50" r="6" fill="#d4af37"/><circle cx="75" cy="50" r="6" fill="#d4af37"/><circle cx="25" cy="75" r="6" fill="#d4af37"/><circle cx="75" cy="75" r="6" fill="#d4af37"/>'
    };
    // 7-20 直接显示数字
    const content = dots[value] || `<text x="50" y="58" font-size="28" fill="#d4af37" text-anchor="middle" font-weight="bold">${value}</text>`;
    return `<svg class="dice-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" rx="12" fill="rgba(0,0,0,0.3)" stroke="#d4af37" stroke-width="3"/>${content}</svg>`;
}

/**
 * 生成雷达图 SVG
 * @param {number[]} values - 三个数值
 * @param {string[]} labels - 三个标签
 * @param {number} maxVal - 最大值，默认 100
 * @returns {string} SVG 字符串
 */
export function generateRadarSVG(values, labels, maxVal = 100) {
    const centerX = 100, centerY = 100, radius = 80;
    const angles = [-Math.PI / 2, Math.PI / 6, 5 * Math.PI / 6];
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

    // 网格线
    let grid = '';
    for (let i = 1; i <= 4; i++) {
        const r = (i / 4) * radius;
        let gp = '';
        angles.forEach(a => {
            gp += `${centerX + r * Math.cos(a)},${centerY + r * Math.sin(a)} `;
        });
        grid += `<polygon points="${gp}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
    }

    // 轴线
    let axes = '';
    angles.forEach(a => {
        axes += `<line x1="${centerX}" y1="${centerY}" x2="${centerX + radius * Math.cos(a)}" y2="${centerY + radius * Math.sin(a)}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
    });

    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="radar-chart">${grid}${axes}<polygon points="${points}" fill="rgba(254,202,87,0.25)" stroke="#feca57" stroke-width="2"/>${labelEls}</svg>`;
}

/**
 * 生成趋势折线图 SVG
 * @param {Array<{wealth:number, conflict:number, tech:number}>} history - 历史数据数组
 * @returns {string} SVG 字符串
 */
export function generateTrendChartSVG(history) {
    if (!history || history.length === 0) {
        return `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg"><text x="150" y="75" fill="rgba(255,255,255,0.5)" text-anchor="middle" font-size="12">暂无数据</text></svg>`;
    }

    const width = 300, height = 140;
    const padding = { top: 10, right: 10, bottom: 24, left: 34 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // 计算最大值
    const maxWealth = Math.max(150, ...history.map(h => h.wealth || 100));
    const maxConflict = Math.max(60, ...history.map(h => h.conflict || 30));
    const maxTech = Math.max(80, ...history.map(h => h.tech || 50));

    const xStep = history.length > 1 ? chartW / (history.length - 1) : chartW;

    function makePath(getter, max) {
        return history.map((h, i) => {
            const x = padding.left + i * xStep;
            const y = padding.top + chartH - (getter(h) / max) * chartH;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    }

    const pathWealth = makePath(h => h.wealth, maxWealth);
    const pathConflict = makePath(h => h.conflict, maxConflict);
    const pathTech = makePath(h => h.tech, maxTech);

    // 网格线
    let gridLines = '';
    for (let i = 0; i <= 3; i++) {
        const y = padding.top + (chartH / 3) * i;
        gridLines += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
    }

    // 底部回合标签
    let labels = '';
    history.forEach((_, i) => {
        const x = padding.left + i * xStep;
        labels += `<text x="${x}" y="${height - 6}" fill="rgba(255,255,255,0.5)" font-size="9" text-anchor="middle">${i + 1}</text>`;
    });

    return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="trend-svg">
        ${gridLines}
        <path d="${pathWealth}" fill="none" stroke="#1dd1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${pathConflict}" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${pathTech}" fill="none" stroke="#48dbfb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="${width - padding.right}" y="${padding.top + 10}" fill="#1dd1a1" font-size="9" text-anchor="end">财富</text>
        <text x="${width - padding.right}" y="${padding.top + 22}" fill="#ff6b6b" font-size="9" text-anchor="end">矛盾</text>
        <text x="${width - padding.right}" y="${padding.top + 34}" fill="#48dbfb" font-size="9" text-anchor="end">技术</text>
        ${labels}
    </svg>`;
}

/**
 * 生成社会关系四轴雷达图 SVG
 * @param {number[]} values - [worker, gov, media, rival]
 * @param {string[]} labels - 四个标签
 * @param {number} maxVal - 最大值，默认 100
 * @returns {string} SVG 字符串
 */
export function generateSocialRadarSVG(values, labels, maxVal = 100) {
    const size = 140;
    const center = size / 2;
    const radius = size * 0.36;
    const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
    let points = '';
    let labelEls = '';

    angles.forEach((a, i) => {
        const r = (Math.min(values[i], maxVal) / maxVal) * radius;
        const x = center + r * Math.cos(a);
        const y = center + r * Math.sin(a);
        points += `${x},${y} `;
        const lx = center + (radius + 14) * Math.cos(a);
        const ly = center + (radius + 14) * Math.sin(a);
        const anchor = lx < center ? 'end' : (lx > center ? 'start' : 'middle');
        labelEls += `<text x="${lx}" y="${ly + 3}" fill="rgba(255,255,255,0.8)" font-size="8" text-anchor="${anchor}">${labels[i]}</text>`;
    });

    // 网格
    let grid = '';
    for (let i = 1; i <= 2; i++) {
        const r = (i / 2) * radius;
        let gp = '';
        angles.forEach(a => {
            gp += `${center + r * Math.cos(a)},${center + r * Math.sin(a)} `;
        });
        grid += `<polygon points="${gp}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
    }

    // 轴线
    let axes = '';
    angles.forEach(a => {
        axes += `<line x1="${center}" y1="${center}" x2="${center + radius * Math.cos(a)}" y2="${center + radius * Math.sin(a)}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
    });

    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" class="social-radar-svg">${grid}${axes}<polygon points="${points}" fill="rgba(72,219,251,0.2)" stroke="#48dbfb" stroke-width="1.5"/>${labelEls}</svg>`;
}

/**
 * 生成纪元过渡动画的 SVG/HTML 内容
 * @param {number} fromEpoch - 来源纪元
 * @param {number} toEpoch - 目标纪元
 * @returns {string} HTML/SVG 字符串
 */
export function getEpochTransitionAnimation(fromEpoch, toEpoch) {
    if (toEpoch === 2) {
        // 蒸汽朋克齿轮
        return `
            <svg class="epoch-gear" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="20" fill="none" stroke="#d4af37" stroke-width="4"/>
                <path d="M60 20 L60 35 M60 85 L60 100 M20 60 L35 60 M85 60 L100 60" stroke="#d4af37" stroke-width="6" stroke-linecap="round"/>
                <path d="M32 32 L43 43 M77 77 L88 88 M32 88 L43 77 M77 43 L88 32" stroke="#d4af37" stroke-width="5" stroke-linecap="round"/>
                <circle cx="60" cy="60" r="8" fill="#d4af37"/>
                <path d="M60 10 A50 50 0 0 1 110 60" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="2" stroke-dasharray="6,4"/>
            </svg>
            <div class="epoch-steam"></div>
        `;
    } else if (toEpoch === 3) {
        // 数字雨/电路板
        let cols = '';
        const chars = '01アイウエオ';
        for (let i = 0; i < 6; i++) {
            const col = Array(8).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
            const left = 20 + i * 24;
            const delay = (Math.random() * 1.5).toFixed(2);
            const duration = (1.5 + Math.random()).toFixed(2);
            cols += `<div class="epoch-matrix-col" style="left:${left}px;animation-duration:${duration}s;animation-delay:${delay}s">${col}</div>`;
        }
        return `
            <div class="epoch-circuit">
                <div class="epoch-circuit-line" style="width:60px;height:2px;top:40px;left:20px;animation-delay:0s"></div>
                <div class="epoch-circuit-line" style="width:2px;height:40px;top:40px;left:80px;animation-delay:0.3s"></div>
                <div class="epoch-circuit-line" style="width:40px;height:2px;top:80px;left:80px;animation-delay:0.6s"></div>
                <div class="epoch-circuit-line" style="width:2px;height:30px;top:100px;left:120px;animation-delay:0.9s"></div>
                <div class="epoch-circuit-line" style="width:50px;height:2px;top:60px;left:130px;animation-delay:1.2s"></div>
                ${cols}
            </div>
        `;
    }
    return '';
}

/**
 * 创建粒子爆发效果并插入到目标元素中
 * @param {HTMLElement} target - 目标元素
 * @param {string} color - 粒子颜色
 * @param {number} count - 粒子数量
 */
export function createParticleBurst(target, color, count = 12) {
    const rect = target.getBoundingClientRect();
    const burst = document.createElement('div');
    burst.className = 'particle-burst';
    burst.style.left = (rect.left + rect.width / 2) + 'px';
    burst.style.top = (rect.top + rect.height / 2) + 'px';
    document.body.appendChild(burst);

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.background = color;
        const angle = (Math.PI * 2 * i) / count;
        const dist = 40 + Math.random() * 40;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        burst.appendChild(p);
    }

    setTimeout(() => burst.remove(), 700);
}

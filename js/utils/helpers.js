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

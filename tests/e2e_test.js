async (page) => {
    const results = [];
    const screenshot = async (name) => {
        await page.screenshot({ path: `/home/hhw/Desktop/00_Personal/00_Courses/03-军政素养/马克思主义经典著作选读/game/tests/screenshots/${name}.png`, fullPage: true });
        results.push(`screenshot: ${name}`);
    };
    const clickBySelector = async (sel) => {
        await page.evaluate((s) => {
            const el = document.querySelector(s);
            if (el) el.click();
        }, sel);
    };
    const closeKnowledge = async () => {
        await page.evaluate(() => {
            if (window.game && window.game.closeKnowledgeModal) {
                window.game.closeKnowledgeModal();
            }
        });
        await page.waitForTimeout(600);
    };

    try {
        await page.goto('http://localhost:8765');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(800);
        await screenshot('test_01_home');

        await clickBySelector('#start-btn');
        await page.waitForTimeout(1000);
        await screenshot('test_02_started');

        // 碎片选择
        if (await page.evaluate(() => {
            const m = document.getElementById('fragment-selection-modal');
            return m && m.style.display !== 'none';
        })) {
            await clickBySelector('.fragment-card');
            await page.waitForTimeout(800);
        }

        // 正常游玩最多 15 步
        for (let i = 0; i < 15; i++) {
            await page.waitForTimeout(1000);

            // 股市小游戏
            if (await page.evaluate(() => {
                const m = document.getElementById('stock-minigame-modal');
                return m && m.style.display !== 'none';
            })) {
                await clickBySelector('.stock-btn');
                results.push(`step ${i + 1}: stock`);
                await page.waitForTimeout(1800);
            }

            // 滑块
            if (await page.evaluate(() => {
                const s = document.getElementById('event-slider');
                return s && s.offsetParent !== null;
            })) {
                await page.evaluate(() => {
                    const s = document.getElementById('event-slider');
                    if (s) { s.value = 60; s.dispatchEvent(new Event('input', { bubbles: true })); }
                });
                await page.waitForTimeout(300);
                await clickBySelector('#slider-confirm');
                results.push(`step ${i + 1}: slider`);
                await page.waitForTimeout(1500);
                await closeKnowledge();
                continue;
            }

            // 卡牌选项
            const cards = await page.$$('.option-card');
            if (cards.length) {
                await clickBySelector('.option-card');
                results.push(`step ${i + 1}: card`);
                await page.waitForTimeout(1500);
                await closeKnowledge();
                continue;
            }

            // 纪元过渡
            if (await page.evaluate(() => {
                const o = document.getElementById('epoch-transition-overlay');
                return o && o.style.display !== 'none';
            })) {
                results.push(`step ${i + 1}: epoch`);
                await screenshot('test_epoch_transition');
                await page.waitForTimeout(2500);
                continue;
            }

            // 游戏结束（自然触发）
            if (await page.evaluate(() => {
                const p = document.getElementById('game-over-panel');
                return p && p.style.display !== 'none';
            })) {
                results.push('game over natural');
                break;
            }
        }

        // 强制触发游戏结束以测试结束面板（如果还没结束）
        const isOver = await page.evaluate(() => {
            if (window.game && !window.game.isGameOver) {
                window.game.endGame('历史周期结束');
            }
            const p = document.getElementById('game-over-panel');
            return p && p.style.display !== 'none';
        });
        if (!isOver) {
            return { status: 'error', message: 'Game over panel not shown', results };
        }

        await screenshot('test_03_gameover');

        // Tab 切换测试
        const tabs = await page.$$('.tab-btn');
        for (let t = 1; t < Math.min(tabs.length, 4); t++) {
            await tabs[t].evaluate(el => el.click());
            await page.waitForTimeout(500);
            await screenshot(`test_04_tab_${t}`);
        }
        results.push(`tabs: ${Math.min(tabs.length, 4) - 1} switched`);

        // 重新开始
        await clickBySelector('#restart-btn');
        await page.waitForTimeout(1200);
        await screenshot('test_05_restarted');
        results.push('restarted');

        // 验证回到首页状态
        const startBtnVisible = await page.evaluate(() => {
            const btn = document.getElementById('start-btn');
            return btn && btn.style.display !== 'none';
        });
        if (!startBtnVisible) {
            return { status: 'error', message: 'Restart did not return to start screen', results };
        }

        return { status: 'ok', results };
    } catch (e) {
        await screenshot('test_error');
        return { status: 'error', message: e.message, results };
    }
}

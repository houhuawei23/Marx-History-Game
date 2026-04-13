import time
import os
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:8765"
SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), "screenshots")

def screenshot(page, name):
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)
    page.screenshot(path=f"{SCREENSHOT_DIR}/{name}.png", full_page=True)
    print(f"[screenshot] {name}")

def close_knowledge(page):
    page.evaluate("""
        const modal = document.getElementById('knowledge-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('fade-out');
        }
        if (window.game) {
            window.game.pendingNext = null;
            if (window.game.typewriterTimer) {
                clearInterval(window.game.typewriterTimer);
                window.game.typewriterTimer = null;
            }
        }
    """)
    page.wait_for_timeout(300)

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        results = []

        try:
            page.goto(BASE_URL)
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(800)
            screenshot(page, "test_01_home")

            page.click("#start-btn")
            page.wait_for_timeout(1000)
            screenshot(page, "test_02_started")

            # 碎片选择
            if page.evaluate("""
                const m = document.getElementById('fragment-selection-modal');
                return m && m.style.display !== 'none';
            """):
                opt = page.query_selector(".fragment-card")
                if opt:
                    opt.click()
                page.wait_for_timeout(800)

            for i in range(15):
                page.wait_for_timeout(1200)

                # 常驻股市面板交易
                if page.evaluate("""
                    const p = document.getElementById('stock-panel');
                    return p && p.style.display !== 'none';
                """):
                    can_buy = page.evaluate("""
                        const btn = document.getElementById('stock-buy');
                        return btn && !btn.disabled;
                    """)
                    can_sell = page.evaluate("""
                        const btn = document.getElementById('stock-sell');
                        return btn && !btn.disabled;
                    """)
                    import random
                    if can_buy and random.random() > 0.6:
                        page.click("#stock-buy")
                        results.append(f"step {i+1}: stock-buy")
                    elif can_sell and random.random() > 0.6:
                        page.click("#stock-sell")
                        results.append(f"step {i+1}: stock-sell")
                    else:
                        page.click("#stock-skip")
                        results.append(f"step {i+1}: stock-skip")
                    page.wait_for_timeout(400)

                # 滑块
                if page.evaluate("""
                    const s = document.getElementById('event-slider');
                    return s && s.offsetParent !== null;
                """):
                    page.evaluate("""
                        const s = document.getElementById('event-slider');
                        if (s) { s.value = 60; s.dispatchEvent(new Event('input', { bubbles: true })); }
                    """)
                    page.wait_for_timeout(300)
                    page.click("#slider-confirm")
                    results.append(f"step {i+1}: slider")
                    page.wait_for_timeout(1200)
                    close_knowledge(page)
                    continue

                # 卡牌
                cards = page.query_selector_all(".option-card")
                if cards:
                    cards[0].click()
                    results.append(f"step {i+1}: card")
                    page.wait_for_timeout(1200)
                    close_knowledge(page)
                    continue

                # 纪元过渡
                if page.evaluate("""
                    const o = document.getElementById('epoch-transition-overlay');
                    return o && o.style.display !== 'none';
                """):
                    results.append(f"step {i+1}: epoch")
                    screenshot(page, "test_epoch_transition")
                    page.wait_for_timeout(2500)
                    continue

                # 游戏结束
                if page.evaluate("""
                    const p = document.getElementById('game-over-panel');
                    return p && p.style.display !== 'none';
                """):
                    results.append("game over natural")
                    break

            # 强制触发游戏结束以测试结束面板
            is_over = page.evaluate("""
                if (window.game && !window.game.isGameOver) {
                    window.game.endGame('历史周期结束');
                }
                const p = document.getElementById('game-over-panel');
                return p && p.style.display !== 'none';
            """)
            if not is_over:
                print("[status] error: Game over panel not shown")
                return { "status": "error", "results": results }

            screenshot(page, "test_03_gameover")

            # Tab 切换测试
            tabs = page.query_selector_all(".tab-btn")
            for t in range(1, min(len(tabs), 4)):
                tabs[t].click()
                page.wait_for_timeout(500)
                screenshot(page, f"test_04_tab_{t}")
            results.append(f"tabs: {min(len(tabs), 4) - 1} switched")

            # 重新开始
            page.click("#restart-btn")
            page.wait_for_timeout(1200)
            screenshot(page, "test_05_restarted")
            results.append("restarted")

            # 验证回到首页状态
            start_btn_visible = page.evaluate("""
                const btn = document.getElementById('start-btn');
                return btn && btn.style.display !== 'none';
            """)
            if not start_btn_visible:
                print("[status] error: Restart did not return to start screen")
                return { "status": "error", "results": results }

            print("\n[results]", results)
            print("[status] ok")
            return { "status": "ok", "results": results }
        except Exception as e:
            screenshot(page, "test_error")
            print("\n[status] error:", e)
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    run_test()

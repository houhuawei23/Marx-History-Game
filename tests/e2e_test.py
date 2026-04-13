import time
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:8765"
SCREENSHOT_DIR = "/home/hhw/Desktop/00_Personal/00_Courses/03-军政素养/马克思主义经典著作选读/game/tests/screenshots"

def screenshot(page, name):
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
                opt = page.query_selector(".fragment-option")
                if opt:
                    opt.click()
                page.wait_for_timeout(800)

            for i in range(10):
                page.wait_for_timeout(1200)

                # 股市小游戏
                if page.evaluate("""
                    const m = document.getElementById('stock-minigame-modal');
                    return m && m.style.display !== 'none';
                """):
                    btns = page.query_selector_all(".stock-btn")
                    if btns:
                        import random
                        btns[random.randint(0, len(btns)-1)].click()
                        results.append(f"step {i+1}: stock")
                        page.wait_for_timeout(1200)

                # 滑块
                if page.evaluate("""
                    const s = document.getElementById('decision-slider');
                    return s && s.offsetParent !== null;
                """):
                    page.evaluate("""
                        const s = document.getElementById('decision-slider');
                        if (s) { s.value = 60; s.dispatchEvent(new Event('input', { bubbles: true })); }
                    """)
                    page.wait_for_timeout(300)
                    page.click("#slider-confirm-btn")
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

                # 游戏结束
                if page.evaluate("""
                    const p = document.getElementById('game-over-panel');
                    return p && p.style.display !== 'none';
                """):
                    results.append("game over")
                    screenshot(page, "test_03_gameover")
                    tabs = page.query_selector_all(".game-over-tab")
                    for t in range(1, min(len(tabs), 4)):
                        tabs[t].click()
                        page.wait_for_timeout(500)
                        screenshot(page, f"test_04_tab_{t}")
                    restart = page.query_selector("#restart-btn")
                    if restart:
                        restart.click()
                        page.wait_for_timeout(1200)
                        screenshot(page, "test_05_restarted")
                    break

                # 纪元过渡
                if page.evaluate("""
                    const o = document.getElementById('epoch-transition-overlay');
                    return o && o.style.display !== 'none';
                """):
                    results.append(f"step {i+1}: epoch")
                    screenshot(page, "test_epoch_transition")
                    page.wait_for_timeout(2500)

            print("\n[results]", results)
            print("[status] ok")
        except Exception as e:
            screenshot(page, "test_error")
            print("\n[status] error:", e)
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    run_test()

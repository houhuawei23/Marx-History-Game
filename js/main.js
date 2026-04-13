import { CapitalGame } from './core/GameEngine.js';
import { EventImages } from './data/assets.js';

/**
 * 游戏入口
 * 在 DOM 加载完成后初始化游戏引擎并注入 SVG 资源
 */
document.addEventListener('DOMContentLoaded', () => {
    const game = new CapitalGame();
    game.setEventImages(EventImages);
    window.game = game;
});

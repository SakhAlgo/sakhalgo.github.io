/**
 * app.js — точка входа в приложение
 */
import { EducationalPlatform } from './core/platform.js';

const platform = new EducationalPlatform();

document.addEventListener('DOMContentLoaded', async () => {
    await platform.init();
});

// Горячие клавиши
document.addEventListener('keydown', e => {
    // F5 / Ctrl+R → запустить (в контексте редактора)
    if (e.key === 'F5') { e.preventDefault(); document.getElementById('runBtn')?.click(); }
});

// Экспорт для отладки
window.__platform = platform;

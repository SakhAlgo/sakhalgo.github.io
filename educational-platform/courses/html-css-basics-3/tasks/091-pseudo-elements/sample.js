/**
 * Проверка решения для задания 091
 * @param {string} html - HTML-код решения
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(html, css) {
    const hasQuoteClass = /<p[^>]*class\s*=\s*["']quote["'][^>]*>/i.test(html);
    const hasBefore = /\.quote\s*::\s*before\s*\{[^}]*content\s*:\s*["']«["']/i.test(css);
    const hasAfter = /\.quote\s*::\s*after\s*\{[^}]*content\s*:\s*["']»["']/i.test(css);
    return hasQuoteClass && hasBefore && hasAfter;
}
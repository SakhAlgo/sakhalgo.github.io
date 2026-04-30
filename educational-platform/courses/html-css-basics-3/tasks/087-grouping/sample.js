/**
 * Проверка решения для задания 087
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(css) {
    const hasGrouping = /h1\s*,\s*h2\s*,\s*h3\s*\{[^}]*color\s*:\s*darkblue/i.test(css);
    const hasH1 = /<h1>/i.test(css);
    const hasH2 = /<h2>/i.test(css);
    const hasH3 = /<h3>/i.test(css);
    return hasGrouping;
}
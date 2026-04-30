/**
 * Проверка решения для задания 090
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(css) {
    return /li\s*:\s*last-child\s*\{[^}]*color\s*:\s*green/i.test(css);
}
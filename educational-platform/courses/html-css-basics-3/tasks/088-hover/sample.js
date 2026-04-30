/**
 * Проверка решения для задания 088
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(css) {
    return /button\s*:\s*hover\s*\{[^}]*background\s*:\s*green/i.test(css);
}
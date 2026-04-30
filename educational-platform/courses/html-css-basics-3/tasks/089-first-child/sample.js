/**
 * Проверка решения для задания 089
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(css) {
    return /li\s*:\s*first-child\s*\{[^}]*font-weight\s*:\s*bold/i.test(css);
}
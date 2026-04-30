/**
 * Проверка решения для задания 094
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(css) {
    const hasDisplayFlex = /\.container\s*\{[^}]*display\s*:\s*flex/i.test(css);
    const hasColumn = /\.container\s*\{[^}]*flex-direction\s*:\s*column/i.test(css);
    return hasDisplayFlex && hasColumn;
}
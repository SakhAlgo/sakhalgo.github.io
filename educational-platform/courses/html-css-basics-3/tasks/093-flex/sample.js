/**
 * Проверка решения для задания 093
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(css) {
    const hasDisplayFlex = /\.container\s*\{[^}]*display\s*:\s*flex/i.test(css);
    const hasFlex1 = /\.item\s*\{[^}]*flex\s*:\s*1/i.test(css);
    return hasDisplayFlex && hasFlex1;
}
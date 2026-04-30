/**
 * Проверка решения для задания 085
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(css) {
    const hasTagSelector = /p\s*\{[^}]*color\s*:\s*blue/i.test(css);
    const hasClassSelector = /\.text\s*\{[^}]*color\s*:\s*green/i.test(css);
    const hasIdSelector = /#main\s*\{[^}]*color\s*:\s*red/i.test(css);
    return hasTagSelector && hasClassSelector && hasIdSelector;
}
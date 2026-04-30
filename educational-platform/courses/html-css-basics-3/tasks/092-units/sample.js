/**
 * Проверка решения для задания 092
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(css) {
    const hasParentWidth = /\.parent\s*\{[^}]*width\s*:\s*400px/i.test(css);
    const hasChildPercent = /\.child\s*\{[^}]*width\s*:\s*50%/i.test(css);
    return hasParentWidth && hasChildPercent;
}
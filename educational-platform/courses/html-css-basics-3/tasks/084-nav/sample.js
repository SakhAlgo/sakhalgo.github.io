/**
 * Проверка решения для задания 084
 * @param {string} html - HTML-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(html) {
    return /<nav>[\s\S]*<\/nav>/i.test(html);
}
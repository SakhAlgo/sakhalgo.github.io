/**
 * Проверка решения для задания 080
 * @param {string} html - HTML-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(html) {
    // Проверяем наличие тега header
    return /<header>[\s\S]*<\/header>/i.test(html);
}
/**
 * Проверка решения для задания 081
 * @param {string} html - HTML-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(html) {
    return /<footer>[\s\S]*<\/footer>/i.test(html);
}
/**
 * Проверка решения для задания 083
 * @param {string} html - HTML-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(html) {
    return /<section>[\s\S]*<\/section>/i.test(html);
}
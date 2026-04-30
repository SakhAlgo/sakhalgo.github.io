/**
 * Проверка решения для задания 082
 * @param {string} html - HTML-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(html) {
    return /<main>[\s\S]*<\/main>/i.test(html);
}
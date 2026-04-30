/**
 * Проверка решения для задания 086
 * @param {string} html - HTML-код решения
 * @param {string} css - CSS-код решения
 * @returns {boolean} - корректно ли решение
 */
export function checkSolution(html, css) {
    const hasDivWithP = /<div>[\s\S]*<p>[\s\S]*<\/p>[\s\S]*<\/div>/i.test(html);
    const hasDivColor = /div\s*\{[^}]*color\s*:\s*navy/i.test(css);
    const hasDivFont = /div\s*\{[^}]*font-family\s*:\s*Arial/i.test(css);
    return hasDivWithP && hasDivColor && hasDivFont;
}
/**
 * Валидатор для задания 057: Простая таблица
 */
export default class Task057Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега table
        const hasTable = /<table[^>]*>.*?<\/table>/is.test(html);
        checks.push({
            label: 'Тег <table> присутствует',
            passed: hasTable,
            hint: 'Добавьте тег <table>'
        });
        if (hasTable) score += 20;

        // Проверка 2: наличие th
        const hasTh = /<th[^>]*>.*?<\/th>/i.test(html);
        checks.push({
            label: 'Заголовки <th> присутствуют',
            passed: hasTh,
            hint: 'Добавьте <th> для заголовков таблицы'
        });
        if (hasTh) score += 20;

        // Проверка 3: текст th
        const thText = /<th[^>]*>(Заголовок 1|Header 1)<\/th>/i.test(html);
        checks.push({
            label: 'Первый заголовок: "Заголовок 1"',
            passed: thText,
            hint: 'Первый <th> должен содержать "Заголовок 1"'
        });
        if (thText) score += 20;

        // Проверка 4: наличие td
        const hasTd = /<td[^>]*>.*?<\/td>/i.test(html);
        checks.push({
            label: 'Ячейки <td> присутствуют',
            passed: hasTd,
            hint: 'Добавьте ячейки <td> с данными'
        });
        if (hasTd) score += 20;

        // Проверка 5: минимум 4 ячейки td
        const tdCount = (html.match(/<td[^>]*>.*?<\/td>/gi) || []).length;
        const enoughCells = tdCount >= 4;
        checks.push({
            label: 'Не менее 4 ячеек <td>',
            passed: enoughCells,
            hint: 'Добавьте минимум 4 ячейки <td>'
        });
        if (enoughCells) score += 20;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
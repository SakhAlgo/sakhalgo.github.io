/**
 * Валидатор для задания 055: Div контейнер
 */
export default class Task055Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега div
        const hasDiv = /<div[^>]*>.*?<\/div>/is.test(html);
        checks.push({
            label: 'Тег div присутствует',
            passed: hasDiv,
            hint: 'Добавьте контейнер div'
        });
        if (hasDiv) score += 25;

        // Проверка 2: два параграфа внутри div
        const divMatch = html.match(/<div[^>]*>(.*?)<\/div>/is);
        const divContent = divMatch ? divMatch[1] : '';
        const pCount = (divContent.match(/<p[^>]*>.*?<\/p>/gi) || []).length;
        const hasTwoP = pCount >= 2;
        checks.push({
            label: 'Внутри div есть 2 параграфа',
            passed: hasTwoP,
            hint: 'Добавьте 2 тега p внутри div'
        });
        if (hasTwoP) score += 25;

        // Проверка 3: текст первого параграфа
        const firstP = /<p[^>]*>(Параграф 1|Paragraph 1)<\/p>/i.test(html);
        checks.push({
            label: 'Первый параграф: "Параграф 1"',
            passed: firstP,
            hint: 'Первый p должен содержать "Параграф 1"'
        });
        if (firstP) score += 25;

        // Проверка 4: текст второго параграфа
        const secondP = /<p[^>]*>(Параграф 2|Paragraph 2)<\/p>/i.test(html);
        checks.push({
            label: 'Второй параграф: "Параграф 2"',
            passed: secondP,
            hint: 'Второй p должен содержать "Параграф 2"'
        });
        if (secondP) score += 25;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
/**
 * Валидатор для задания 021: Заголовок второго уровня
 */
export default class Task021Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега h2
        const hasH2 = /<h2[^>]*>.*?<\/h2>/i.test(html);
        checks.push({
            label: 'Тег <h2> присутствует',
            passed: hasH2,
            hint: 'Добавьте тег <h2> с закрывающим тегом </h2>'
        });
        if (hasH2) score += 50;

        // Проверка 2: текст внутри h2
        const hasText = /<h2[^>]*>[^<]+<\/h2>/i.test(html);
        checks.push({
            label: 'Текст внутри h2',
            passed: hasText,
            hint: 'Добавьте текст внутри тега h2'
        });
        if (hasText) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

/**
 * Валидатор для задания 023: Курсив
 */
export default class Task023Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега em или i
        const hasItalic = /<(em|i)[^>]*>.*?<\/(em|i)>/i.test(html);
        checks.push({
            label: 'Тег em или i присутствует',
            passed: hasItalic,
            hint: 'Используйте тег em или i для курсива'
        });
        if (hasItalic) score += 50;

        // Проверка 2: текст внутри тега
        const hasText = /<(em|i)[^>]*>[^<]+<\/(em|i)>/i.test(html);
        checks.push({
            label: 'Текст внутри тега',
            passed: hasText,
            hint: 'Добавьте текст внутри тега em или i'
        });
        if (hasText) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

/**
 * Валидатор для задания 022: Жирный текст
 */
export default class Task022Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега strong или b
        const hasBold = /<(strong|b)[^>]*>.*?<\/(strong|b)>/i.test(html);
        checks.push({
            label: 'Тег strong или <b> присутствует',
            passed: hasBold,
            hint: 'Используйте тег strong или b для жирного текста'
        });
        if (hasBold) score += 50;

        // Проверка 2: текст внутри тега
        const hasText = /<(strong|b)[^>]*>[^<]+<\/(strong|b)>/i.test(html);
        checks.push({
            label: 'Текст внутри тега',
            passed: hasText,
            hint: 'Добавьте текст внутри тега strong или b'
        });
        if (hasText) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

/**
 * Валидатор для задания 026: Шрифт текста
 */
export default class Task026Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие font-family в CSS
        const hasFontFamily = /font-family\s*:/i.test(css);
        checks.push({
            label: 'Свойство font-family использовано',
            passed: hasFontFamily,
            hint: 'Добавьте свойство font-family в CSS'
        });
        if (hasFontFamily) score += 50;

        // Проверка 2: значение шрифта указано
        const hasFontValue = /font-family\s*:\s*[^;]+/i.test(css);
        checks.push({
            label: 'Указано значение шрифта',
            passed: hasFontValue,
            hint: 'Укажите название шрифта после двоеточия'
        });
        if (hasFontValue) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

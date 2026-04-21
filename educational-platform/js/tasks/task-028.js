/**
 * Валидатор для задания 028: Выравнивание текста
 */
export default class Task028Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие text-align в CSS
        const hasTextAlign = /text-align\s*:/i.test(css);
        checks.push({
            label: 'Свойство text-align использовано',
            passed: hasTextAlign,
            hint: 'Добавьте свойство text-align в CSS'
        });
        if (hasTextAlign) score += 50;

        // Проверка 2: значение center
        const hasCenterValue = /text-align\s*:\s*center/i.test(css);
        checks.push({
            label: 'Значение center',
            passed: hasCenterValue,
            hint: 'Установите значение center'
        });
        if (hasCenterValue) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

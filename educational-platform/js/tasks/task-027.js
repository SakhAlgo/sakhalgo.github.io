/**
 * Валидатор для задания 027: Размер шрифта
 */
export default class Task027Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие font-size в CSS
        const hasFontSize = /font-size\s*:/i.test(css);
        checks.push({
            label: 'Свойство font-size использовано',
            passed: hasFontSize,
            hint: 'Добавьте свойство font-size в CSS'
        });
        if (hasFontSize) score += 50;

        // Проверка 2: значение размера указано
        const hasSizeValue = /font-size\s*:\s*\d+(px|em|rem|%)/i.test(css);
        checks.push({
            label: 'Указано значение размера',
            passed: hasSizeValue,
            hint: 'Укажите размер (например: 16px, 1.5em)'
        });
        if (hasSizeValue) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

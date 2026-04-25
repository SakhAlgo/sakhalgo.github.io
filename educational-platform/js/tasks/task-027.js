/**
 * Валидатор для задания 027: Размер шрифта
 */
export default class Task027Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие текста "Пример" в HTML
        const hasExampleText = html.includes('Пример');
        checks.push({
            label: 'Текст "Пример" присутствует в HTML',
            passed: hasExampleText,
            hint: 'Добавьте текст "Пример" в HTML-разметку'
        });
        if (hasExampleText) score += 25;

        // Проверка 2: наличие font-size в CSS
        const hasFontSize = /font-size\s*:/i.test(css);
        checks.push({
            label: 'Свойство font-size использовано',
            passed: hasFontSize,
            hint: 'Добавьте свойство font-size в CSS'
        });
        if (hasFontSize) score += 25;

        // Проверка 3: значение размера указано
        const hasSizeValue = /font-size\s*:\s*\d+(px|em|rem|%)/i.test(css);
        checks.push({
            label: 'Указано значение размера',
            passed: hasSizeValue,
            hint: 'Укажите размер (например: 16px, 1.5em)'
        });
        if (hasSizeValue) score += 25;

        // Проверка 4: размер шрифта 24px
        const hasFontSize24 = /font-size\s*:\s*24\s*px/i.test(css);
        checks.push({
            label: 'Размер шрифта равен 24px',
            passed: hasFontSize24,
            hint: 'Укажите font-size: 24px'
        });
        if (hasFontSize24) score += 25;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
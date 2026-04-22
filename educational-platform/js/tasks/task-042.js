/**
 * Валидатор для задания 042: Ширина элемента
 */
export default class Task042Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие width в CSS
        const hasWidth = /width\s*:/i.test(css);
        checks.push({
            label: 'Свойство width использовано',
            passed: hasWidth,
            hint: 'Добавьте свойство width в CSS'
        });
        if (hasWidth) score += 50;

        // Проверка 2: значение 200px
        const has200px = /width\s*:\s*200px/i.test(css);
        checks.push({
            label: 'Значение 200px',
            passed: has200px,
            hint: 'Установите значение width: 200px'
        });
        if (has200px) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

/**
 * Валидатор для задания 029: Прозрачность
 */
export default class Task029Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие opacity в CSS
        const hasOpacity = /opacity\s*:/i.test(css);
        checks.push({
            label: 'Свойство opacity использовано',
            passed: hasOpacity,
            hint: 'Добавьте свойство opacity в CSS'
        });
        if (hasOpacity) score += 50;

        // Проверка 2: значение от 0 до 1
        const hasValidOpacity = /opacity\s*:\s*(0(\.\d+)?|1(\.0)?)/i.test(css);
        checks.push({
            label: 'Значение от 0 до 1',
            passed: hasValidOpacity,
            hint: 'Укажите значение от 0 до 1 (например: 0.5)'
        });
        if (hasValidOpacity) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

/**
 * Валидатор для задания 030: Тень блока
 */
export default class Task030Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие box-shadow в CSS
        const hasBoxShadow = /box-shadow\s*:/i.test(css);
        checks.push({
            label: 'Свойство box-shadow использовано',
            passed: hasBoxShadow,
            hint: 'Добавьте свойство box-shadow в CSS'
        });
        if (hasBoxShadow) score += 50;

        // Проверка 2: значение тени указано
        const hasShadowValue = /box-shadow\s*:\s*[^;]+/i.test(css);
        checks.push({
            label: 'Значение тени указано',
            passed: hasShadowValue,
            hint: 'Укажите параметры тени (например: 0 4px 8px rgba(0,0,0,0.5))'
        });
        if (hasShadowValue) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

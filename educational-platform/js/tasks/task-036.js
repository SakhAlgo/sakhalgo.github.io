/**
 * Валидатор для задания 036: Функция с двумя параметрами
 */
export default class Task036Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: объявление функции
        const hasFunction = /\bfunction\s+\w+\s*\(/.test(js);
        checks.push({
            label: 'Функция объявлена',
            passed: hasFunction,
            hint: 'Объявите функцию с помощью function'
        });
        if (hasFunction) score += 50;

        // Проверка 2: два параметра
        const hasTwoParams = /\bfunction\s+\w+\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(js);
        checks.push({
            label: 'Два параметра в функции',
            passed: hasTwoParams,
            hint: 'Укажите два параметра через запятую: function name(a, b)'
        });
        if (hasTwoParams) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

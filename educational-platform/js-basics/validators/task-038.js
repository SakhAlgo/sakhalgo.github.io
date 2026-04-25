/**
 * Валидатор для задания 038: Функция возвращает сумму
 */
export default class Task038Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: функция с двумя параметрами
        const hasTwoParams = /\bfunction\s+\w+\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(js);
        checks.push({
            label: 'Функция с двумя параметрами',
            passed: hasTwoParams,
            hint: 'Объявите функцию с двумя параметрами'
        });
        if (hasTwoParams) score += 50;

        // Проверка 2: return с суммой
        const hasReturnSum = /return\s+\w+\s*\+\s*\w+/.test(js);
        checks.push({
            label: 'Возвращается сумма',
            passed: hasReturnSum,
            hint: 'Верните сумму: return a + b'
        });
        if (hasReturnSum) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

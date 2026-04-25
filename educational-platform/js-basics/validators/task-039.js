/**
 * Валидатор для задания 039: Функция выражение
 */
export default class Task039Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: function expression
        const hasFuncExpr = /=\s*function\s*\(/.test(js);
        checks.push({
            label: 'Function expression использован',
            passed: hasFuncExpr,
            hint: 'Присвойте функцию переменной: const name = function() {}'
        });
        if (hasFuncExpr) score += 100;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

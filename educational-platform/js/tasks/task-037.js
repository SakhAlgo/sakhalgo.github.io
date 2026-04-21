/**
 * Валидатор для задания 037: Стрелочная функция с параметром
 */
export default class Task037Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: стрелочная функция
        const hasArrow = /=>/.test(js);
        checks.push({
            label: 'Стрелочная функция использована',
            passed: hasArrow,
            hint: 'Используйте стрелочную функцию с =>'
        });
        if (hasArrow) score += 50;

        // Проверка 2: параметр
        const hasParam = /\(\s*\w+\s*\)\s*=>/.test(js);
        checks.push({
            label: 'Параметр в функции',
            passed: hasParam,
            hint: 'Укажите параметр в скобках: (param) =>'
        });
        if (hasParam) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

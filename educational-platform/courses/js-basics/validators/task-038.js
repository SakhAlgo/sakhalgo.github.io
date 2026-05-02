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
            hint: 'Объявите функцию с двумя параметрами: function sum(a, b)'
        });
        if (hasTwoParams) score += 30;

        // Проверка 2: return с шаблонной строкой 'Сумма: ${...}'
        const hasReturnTemplate = /return\s*`Сумма:\s*\$\{.*?\}`/i.test(js);
        checks.push({
            label: 'Возвращается строка "Сумма: ${...}"',
            passed: hasReturnTemplate,
            hint: 'Верните шаблонную строку: return `Сумма: ${a + b}`'
        });
        if (hasReturnTemplate) score += 40;

        // Проверка 3: вывод в консоль
        const hasConsoleLog = /console\.log\s*\(.*\)/.test(js);
        checks.push({
            label: 'Результат выведен в консоль',
            passed: hasConsoleLog,
            hint: 'Вызовите console.log() с результатом функции'
        });
        if (hasConsoleLog) score += 30;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

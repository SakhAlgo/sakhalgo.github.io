/**
 * Валидатор для задания 034: Преобразование в число
 */
export default class Task034Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие parseInt
        const hasParseInt = /parseInt\(/.test(js);
        checks.push({
            label: 'Функция parseInt() использована',
            passed: hasParseInt,
            hint: 'Вызовите parseInt() для преобразования строки в число'
        });
        if (hasParseInt) score += 50;

        // Проверка 2: аргумент передан
        const hasArgument = /parseInt\([^)]+\)/.test(js);
        checks.push({
            label: 'Аргумент передан в parseInt',
            passed: hasArgument,
            hint: 'Передайте строку в parseInt: parseInt("123")'
        });
        if (hasArgument) score += 30;

        // Проверка 3: вывод в консоль
        const hasConsoleLog = /console\.log\s*\(/.test(js);
        checks.push({
            label: 'Вывод в консоль',
            passed: hasConsoleLog,
            hint: 'Используйте console.log() для вывода результата преобразования'
        });
        if (hasConsoleLog) score += 20;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

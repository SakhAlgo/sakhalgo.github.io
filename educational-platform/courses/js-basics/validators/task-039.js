/**
 * Валидатор для задания 039: Функция выражение
 */
export default class Task039Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: const greet = function()
        const hasFuncExpr = /const\s+greet\s*=\s*function\s*\(/.test(js);
        checks.push({
            label: 'Function expression const greet = function()',
            passed: hasFuncExpr,
            hint: 'Присвойте функцию переменной: const greet = function() { ... }'
        });
        if (hasFuncExpr) score += 40;

        // Проверка 2: вывод 'Hello!' в консоль
        const hasConsoleLog = /console\.log\s*\(\s*['\"]Hello!['\"]\s*\)/.test(js);
        checks.push({
            label: 'Функция выводит Hello! в консоль',
            passed: hasConsoleLog,
            hint: "Добавьте console.log('Hello!') внутри функции"
        });
        if (hasConsoleLog) score += 30;

        // Проверка 3: вызов greet()
        const hasCall = /greet\s*\(\s*\)/.test(js);
        checks.push({
            label: 'Функция greet() вызвана',
            passed: hasCall,
            hint: 'Вызовите функцию: greet()'
        });
        if (hasCall) score += 30;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

/**
 * Валидатор для задания 040: Вложенный вызов функции
 */
export default class Task040Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: существует функция square
        const hasSquare = /function\s+square\s*\(/.test(js);
        checks.push({
            label: 'Функция square(x) существует',
            passed: hasSquare,
            hint: 'Создайте функцию square(x)'
        });
        if (hasSquare) score += 35;

        // Проверка 2: существует функция process_number
        const hasProcessNumber = /function\s+process_number\s*\(/.test(js);
        checks.push({
            label: 'Функция process_number(x) существует',
            passed: hasProcessNumber,
            hint: 'Создайте функцию process_number(x)'
        });
        if (hasProcessNumber) score += 40;

        // Проверка 3: вывод process_number(5) в консоль
        const hasConsoleLog = /console\.log\s*\([^)]*process_number\s*\([^)]*5\s*\)/.test(js);
        checks.push({
            label: 'Выведен результат process_number(5) в консоль',
            passed: hasConsoleLog,
            hint: 'Добавьте console.log(process_number(5))'
        });
        if (hasConsoleLog) score += 25;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
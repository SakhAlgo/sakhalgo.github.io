/**
 * Валидатор для задания 036: Функция с двумя параметрами
 */
export default class Task036Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: объявление функции multiplication
        const hasFunction = /\bfunction\s+multiplication\s*\(/.test(js);
        checks.push({
            label: 'Функция multiplication объявлена',
            passed: hasFunction,
            hint: 'Объявите функцию multiplication с помощью function'
        });
        if (hasFunction) score += 30;

        // Проверка 2: два параметра в функции multiplication
        const hasTwoParams = /\bfunction\s+multiplication\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(js);
        checks.push({
            label: 'Два параметра в функции',
            passed: hasTwoParams,
            hint: 'Укажите два параметра через запятую: function multiplication(a, b)'
        });
        if (hasTwoParams) score += 25;

        // Проверка 3: возврат результата умножения
        const hasReturnMultiply = /return\s+.+\*\s*.+/.test(js);
        checks.push({
            label: 'Функция возвращает результат умножения',
            passed: hasReturnMultiply,
            hint: 'Добавьте return с оператором умножения: return a * b'
        });
        if (hasReturnMultiply) score += 25;

        // Проверка 4: вызов multiplication с двумя аргументами
        const hasCall = /multiplication\s*\([^)]*,[^)]*\)/.test(js);
        checks.push({
            label: 'Функция multiplication вызвана с двумя аргументами',
            passed: hasCall,
            hint: 'Вызовите multiplication() с двумя числами, например: multiplication(2, 3)'
        });
        if (hasCall) score += 20;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

/**
 * Валидатор для задания 040: Вложенный вызов функции
 */
export default class Task040Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: две функции
        const functionMatches = js.match(/\bfunction\s+\w+/g);
        const hasTwoFunctions = functionMatches && functionMatches.length >= 2;
        checks.push({
            label: 'Две функции объявлены',
            passed: hasTwoFunctions,
            hint: 'Объявите две функции'
        });
        if (hasTwoFunctions) score += 50;

        // Проверка 2: вызов функции внутри другой
        const hasNestedCall = /\b\w+\s*\([^)]*\)/.test(js.replace(/function\s+\w+\s*\([^)]*\)/g, ''));
        checks.push({
            label: 'Вызов функции внутри другой',
            passed: hasNestedCall,
            hint: 'Вызовите одну функцию из тела другой'
        });
        if (hasNestedCall) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

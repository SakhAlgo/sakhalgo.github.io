/**
 * Валидатор для задания 032: Тип данных number
 */
export default class Task032Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие typeof
        const hasTypeof = /\btypeof\b/.test(js);
        checks.push({
            label: 'Оператор typeof использован',
            passed: hasTypeof,
            hint: 'Используйте оператор typeof'
        });
        if (hasTypeof) score += 50;

        // Проверка 2: числовая переменная
        const hasNumber = /\b(let|const|var)\s+\w+\s*=\s*\d+/.test(js);
        checks.push({
            label: 'Числовая переменная объявлена',
            passed: hasNumber,
            hint: 'Объявите переменную с числовым значением'
        });
        if (hasNumber) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

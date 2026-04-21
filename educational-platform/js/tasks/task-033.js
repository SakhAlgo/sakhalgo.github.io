/**
 * Валидатор для задания 033: Преобразование в строку
 */
export default class Task033Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие toString
        const hasToString = /\.toString\(\)/.test(js);
        checks.push({
            label: 'Метод toString() использован',
            passed: hasToString,
            hint: 'Вызовите метод .toString() на числе'
        });
        if (hasToString) score += 50;

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

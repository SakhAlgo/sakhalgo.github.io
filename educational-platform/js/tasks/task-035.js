/**
 * Валидатор для задания 035: Шаблонные строки
 */
export default class Task035Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие обратных кавычек
        const hasBackticks = /`[^`]*`/.test(js);
        checks.push({
            label: 'Шаблонные строки использованы',
            passed: hasBackticks,
            hint: 'Используйте обратные кавычки для шаблонной строки'
        });
        if (hasBackticks) score += 50;

        // Проверка 2: интерполяция ${}
        const hasInterpolation = /\$\{[^}]+\}/.test(js);
        checks.push({
            label: 'Интерполяция ${} использована',
            passed: hasInterpolation,
            hint: 'Вставьте переменную через ${variable}'
        });
        if (hasInterpolation) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

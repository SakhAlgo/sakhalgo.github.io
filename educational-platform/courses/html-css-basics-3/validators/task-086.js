/**
 * Валидатор для задания 086: Наследование свойств
 */
export default class Task086Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: div с p внутри
        const hasDivWithP = /<div>[\s\S]*<p>[\s\S]*<\/p>[\s\S]*<\/div>/i.test(html);
        checks.push({
            label: 'HTML: div содержит p внутри',
            passed: hasDivWithP,
            hint: 'Создайте <div> с <p> внутри'
        });
        if (hasDivWithP) score += 30;

        // Проверка 2: div { color: navy; }
        const hasColor = /div\s*\{[^}]*color\s*:\s*navy/i.test(css);
        checks.push({
            label: 'CSS: div { color: navy; } — наследуемое свойство',
            passed: hasColor,
            hint: 'Добавьте div { color: navy; font-family: Arial; }'
        });
        if (hasColor) score += 35;

        // Проверка 3: div { font-family: Arial; }
        const hasFont = /div\s*\{[^}]*font-family\s*:\s*Arial/i.test(css);
        checks.push({
            label: 'CSS: div { font-family: Arial; } — наследуемое свойство',
            passed: hasFont,
            hint: 'Добавьте font-family: Arial в стили div'
        });
        if (hasFont) score += 35;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
/**
 * Валидатор для задания 094: Flexbox flex-direction
 */
export default class Task094Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: контейнер с классом container
        const hasContainer = /<div[^>]*class\s*=\s*["']container["'][^>]*>/i.test(html);
        checks.push({
            label: 'HTML: div class="container" присутствует',
            passed: hasContainer,
            hint: 'Добавьте <div class="container">'
        });
        if (hasContainer) score += 30;

        // Проверка 2: display: flex
        const hasDisplayFlex = /\.container\s*\{[^}]*display\s*:\s*flex/i.test(css);
        checks.push({
            label: 'CSS: .container { display: flex; }',
            passed: hasDisplayFlex,
            hint: 'Добавьте .container { display: flex; } в CSS'
        });
        if (hasDisplayFlex) score += 35;

        // Проверка 3: flex-direction: column
        const hasColumn = /\.container\s*\{[^}]*flex-direction\s*:\s*column/i.test(css);
        checks.push({
            label: 'CSS: .container { flex-direction: column; }',
            passed: hasColumn,
            hint: 'Добавьте flex-direction: column; в стили .container'
        });
        if (hasColumn) score += 35;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
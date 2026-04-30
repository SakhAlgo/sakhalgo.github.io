/**
 * Валидатор для задания 093: Flexbox display: flex
 */
export default class Task093Validator {
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

        // Проверка 3: flex: 1
        const hasFlex1 = /\.item\s*\{[^}]*flex\s*:\s*1/i.test(css);
        checks.push({
            label: 'CSS: .item { flex: 1; } — равная ширина',
            passed: hasFlex1,
            hint: 'Добавьте .item { flex: 1; } в CSS'
        });
        if (hasFlex1) score += 35;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
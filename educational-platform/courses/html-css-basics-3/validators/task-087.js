/**
 * Валидатор для задания 087: Группировка селекторов
 */
export default class Task087Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: h1, h2, h3 в HTML
        const hasH1 = /<h1>/i.test(html);
        const hasH2 = /<h2>/i.test(html);
        const hasH3 = /<h3>/i.test(html);
        const allHeadings = hasH1 && hasH2 && hasH3;
        checks.push({
            label: 'HTML: есть все заголовки h1, h2, h3',
            passed: allHeadings,
            hint: 'Добавьте <h1>, <h2> и <h3> в HTML'
        });
        if (allHeadings) score += 30;

        // Проверка 2: группировка селекторов
        const hasGrouping = /h1\s*,\s*h2\s*,\s*h3\s*\{[^}]*color\s*:\s*darkblue/i.test(css);
        checks.push({
            label: 'CSS: h1, h2, h3 { color: darkblue; } — группировка',
            passed: hasGrouping,
            hint: 'Добавьте h1, h2, h3 { color: darkblue; } в CSS'
        });
        if (hasGrouping) score += 70;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
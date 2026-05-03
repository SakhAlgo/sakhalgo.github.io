/**
 * Валидатор для задания 090: Псевдокласс :last-child
 */
export default class Task090Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: ul с тремя li
        const hasList = /<ul>[\s\S]*<li>[\s\S]*<li>[\s\S]*<li>[\s\S]*<\/ul>/i.test(html);
        checks.push({
            label: 'HTML: ul с тремя li',
            passed: hasList,
            hint: 'Добавьте ul с тремя пунктами li'
        });
        if (hasList) score += 40;

        // Проверка 2: псевдокласс :last-child
        const hasLastChild = /li\s*:\s*last-child\s*\{[^}]*color\s*:\s*green/i.test(css);
        checks.push({
            label: 'CSS: li:last-child { color: green; }',
            passed: hasLastChild,
            hint: 'Добавьте li:last-child { color: green; } в CSS'
        });
        if (hasLastChild) score += 60;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
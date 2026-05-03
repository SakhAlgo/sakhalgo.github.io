/**
 * Валидатор для задания 089: Псевдокласс :first-child
 */
export default class Task089Validator {
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

        // Проверка 2: псевдокласс :first-child
        const hasFirstChild = /li\s*:\s*first-child\s*\{[^}]*font-weight\s*:\s*bold/i.test(css);
        checks.push({
            label: 'CSS: li:first-child { font-weight: bold; }',
            passed: hasFirstChild,
            hint: 'Добавьте li:first-child { font-weight: bold; } в CSS'
        });
        if (hasFirstChild) score += 60;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
/**
 * Валидатор для задания 088: Псевдокласс :hover
 */
export default class Task088Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: кнопка в HTML
        const hasButton = /<button>[\s\S]*<\/button>/i.test(html);
        checks.push({
            label: 'HTML: тег <button> присутствует',
            passed: hasButton,
            hint: 'Добавьте <button>Наведи</button>'
        });
        if (hasButton) score += 40;

        // Проверка 2: псевдокласс :hover
        const hasHover = /button\s*:\s*hover\s*\{[^}]*background\s*:\s*green/i.test(css);
        checks.push({
            label: 'CSS: button:hover { background: green; }',
            passed: hasHover,
            hint: 'Добавьте button:hover { background: green; color: white; } в CSS'
        });
        if (hasHover) score += 60;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
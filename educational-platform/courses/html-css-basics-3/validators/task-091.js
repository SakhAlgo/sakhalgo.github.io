/**
 * Валидатор для задания 091: Псевдоэлементы ::before и ::after
 */
export default class Task091Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: элемент с классом quote
        const hasQuote = /<[^>]*class\s*=\s*["']quote["'][^>]*>/i.test(html);
        checks.push({
            label: 'HTML: элемент с class="quote"',
            passed: hasQuote,
            hint: 'Добавьте &lt;p class="quote"&lt;Текст цитаты&lt;/p&gt;'
        });
        if (hasQuote) score += 30;

        // Проверка 2: ::before
        const hasBefore = /\.quote\s*::\s*before\s*\{[^}]*content\s*:\s*["']«["']/i.test(css);
        checks.push({
            label: 'CSS: .quote::before { content: "«"; }',
            passed: hasBefore,
            hint: 'Добавьте .quote::before { content: "«"; } в CSS'
        });
        if (hasBefore) score += 35;

        // Проверка 3: ::after
        const hasAfter = /\.quote\s*::\s*after\s*\{[^}]*content\s*:\s*["']»["']/i.test(css);
        checks.push({
            label: 'CSS: .quote::after { content: "»"; }',
            passed: hasAfter,
            hint: 'Добавьте .quote::after { content: "»"; } в CSS'
        });
        if (hasAfter) score += 35;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
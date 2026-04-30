/**
 * Валидатор для задания 084: Навигация nav
 */
export default class Task084Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега nav
        const hasNav = /<nav>[\s\S]*<\/nav>/i.test(html);
        checks.push({
            label: 'Тег nav присутствует',
            passed: hasNav,
            hint: 'Добавьте nav в HTML'
        });
        if (hasNav) score += 50;

        // Проверка 2: внутри nav есть ul с тремя li
        const hasUlInNav = /<nav>[\s\S]*<ul>[\s\S]*<li>[\s\S]*<\/li>[\s\S]*<li>[\s\S]*<\/li>[\s\S]*<li>[\s\S]*<\/li>[\s\S]*<\/ul>[\s\S]*<\/nav>/i.test(html);
        checks.push({
            label: 'Внутри nav есть ul с тремя li в которых ссылки',
            passed: hasUlInNav,
            hint: 'Добавьте ul с тремя li и ссылки'
        });
        if (hasUlInNav) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
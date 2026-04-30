/**
 * Валидатор для задания 083: Раздел section
 */
export default class Task083Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега section
        const hasSection = /<section>[\s\S]*<\/section>/i.test(html);
        checks.push({
            label: 'Тег section присутствует',
            passed: hasSection,
            hint: 'Добавьте section в HTML'
        });
        if (hasSection) score += 50;

        // Проверка 2: внутри section есть h2 и p
        const hasH2InSection = /<section>[\s\S]*<h2>[\s\S]*<\/h2>[\s\S]*<p>[\s\S]*<\/p>[\s\S]*<\/section>/i.test(html);
        checks.push({
            label: 'Внутри section есть <h2> и <p>',
            passed: hasH2InSection,
            hint: 'Добавьте h2 в section'
        });
        if (hasH2InSection) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
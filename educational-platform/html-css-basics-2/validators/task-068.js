/**
 * Валидатор для задания 068: Селектор ID
 */
export default class Task068Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие div с id header
        const hasHeaderId = /<div[^>]*id\s*=\s*["']header["'][^>]*>/i.test(html);
        checks.push({
            label: 'Тег <div id="header"> присутствует',
            passed: hasHeaderId,
            hint: 'Добавьте <div id="header">'
        });
        if (hasHeaderId) score += 40;

        // Проверка 2: селектор #header с font-size: 24px в CSS
        const hasHeaderSelector = /#header\s*\{[^}]*font-size\s*:\s*24px/i.test(css);
        checks.push({
            label: 'Селектор #header с font-size: 24px',
            passed: hasHeaderSelector,
            hint: 'Добавьте #header { font-size: 24px; } в CSS'
        });
        if (hasHeaderSelector) score += 60;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
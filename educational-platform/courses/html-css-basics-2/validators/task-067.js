/**
 * Валидатор для задания 067: Селектор класса
 */
export default class Task067Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие div с классом box
        const hasBoxClass = /<div[^>]*class\s*=\s*["']box["'][^>]*>/i.test(html);
        checks.push({
            label: 'Тег div class="box" присутствует',
            passed: hasBoxClass,
            hint: 'Добавьте div class="box"'
        });
        if (hasBoxClass) score += 40;

        // Проверка 2: селектор .box с color: blue в CSS
        const hasBoxSelector = /\.box\s*\{[^}]*color\s*:\s*lightblue/i.test(css);
        checks.push({
            label: 'Селектор .box с color: lightblue',
            passed: hasBoxSelector,
            hint: 'Добавьте .box { color: lightblue; } в CSS'
        });
        if (hasBoxSelector) score += 60;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
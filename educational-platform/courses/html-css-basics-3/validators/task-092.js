/**
 * Валидатор для задания 092: Единицы измерения px и %
 */
export default class Task092Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: parent с шириной 400px
        const hasParentPx = /\.parent\s*\{[^}]*width\s*:\s*400px/i.test(css);
        checks.push({
            label: 'CSS: .parent { width: 400px; } — абсолютная единица',
            passed: hasParentPx,
            hint: 'Добавьте .parent { width: 400px; } в CSS'
        });
        if (hasParentPx) score += 50;

        // Проверка 2: child с шириной 50%
        const hasChildPercent = /\.child\s*\{[^}]*width\s*:\s*50%/i.test(css);
        checks.push({
            label: 'CSS: .child { width: 50%; } — относительная единица',
            passed: hasChildPercent,
            hint: 'Добавьте .child { width: 50%; } в CSS'
        });
        if (hasChildPercent) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
/**
 * Валидатор для задания 059: HTML комментарий
 */
export default class Task059Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие комментария
        const hasComment = /<!--.*?-->/s.test(html);
        checks.push({
            label: 'HTML-комментарий присутствует',
            passed: hasComment,
            hint: 'Добавьте HTML-комментарий &lt;!-- ... &gt;'
        });
        if (hasComment) score += 50;

        // Проверка 2: правильный текст комментария
        const correctComment = /<!--\s*Это комментарий\s*-->/i.test(html);
        checks.push({
            label: 'Текст комментария: "Это комментарий"',
            passed: correctComment,
            hint: 'Внутри комментария должен быть текст "Это комментарий"'
        });
        if (correctComment) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
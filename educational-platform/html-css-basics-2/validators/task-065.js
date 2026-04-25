/**
 * Валидатор для задания 065: Текст оформление
 */
export default class Task065Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега p
        const hasP = /<p[^>]*>.*?<\/p>/i.test(html);
        checks.push({
            label: 'Тег <p> присутствует',
            passed: hasP,
            hint: 'Добавьте тег <p>'
        });
        if (hasP) score += 20;

        // Проверка 2: text-align: center
        const hasTextAlign = /text-align\s*:\s*center/i.test(css) ||
                             /style\s*=\s*"[^"]*text-align\s*:\s*center[^"]*"/i.test(html);
        checks.push({
            label: 'Выравнивание: text-align: center',
            passed: hasTextAlign,
            hint: 'Установите text-align: center'
        });
        if (hasTextAlign) score += 40;

        // Проверка 3: text-decoration: underline
        const hasUnderline = /text-decoration\s*:\s*underline/i.test(css) ||
                             /style\s*=\s*"[^"]*text-decoration\s*:\s*underline[^"]*"/i.test(html);
        checks.push({
            label: 'Подчёркивание: text-decoration: underline',
            passed: hasUnderline,
            hint: 'Установите text-decoration: underline'
        });
        if (hasUnderline) score += 40;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
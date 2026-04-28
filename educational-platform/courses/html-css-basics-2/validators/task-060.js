/**
 * Валидатор для задания 060: Два цвета
 */
export default class Task060Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега p
        const hasP = /<p[^>]*>.*?<\/p>/i.test(html);
        checks.push({
            label: 'Тег p присутствует',
            passed: hasP,
            hint: 'Добавьте тег p'
        });
        if (hasP) score += 20;

        // Проверка 2: color red (inline или CSS)
        const hasColorRed = /color\s*:\s*red/i.test(css) || /style\s*=\s*"[^"]*color\s*:\s*red[^"]*"/i.test(html);
        checks.push({
            label: 'Цвет текста: red (color: red)',
            passed: hasColorRed,
            hint: 'Установите color: red для параграфа'
        });
        if (hasColorRed) score += 40;

        // Проверка 3: background-color yellow
        const hasBgYellow = /background-color\s*:\s*yellow/i.test(css) || /style\s*=\s*"[^"]*background-color\s*:\s*yellow[^"]*"/i.test(html) || /background\s*:\s*yellow/i.test(css);
        checks.push({
            label: 'Фон: yellow (background-color: yellow)',
            passed: hasBgYellow,
            hint: 'Установите background-color: yellow для параграфа'
        });
        if (hasBgYellow) score += 40;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
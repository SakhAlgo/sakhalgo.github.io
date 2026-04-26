/**
 * Валидатор для задания 062: Граница со скруглением
 */
export default class Task062Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега div
        const hasDiv = /<div[^>]*>.*?<\/div>/i.test(html);
        checks.push({
            label: 'Тег <div> присутствует',
            passed: hasDiv,
            hint: 'Добавьте тег <div>'
        });
        if (hasDiv) score += 20;

        // Проверка 2: border в CSS
        const hasBorder = /border\s*:\s*2px\s+solid\s+(black|#000|#000000)/i.test(css) ||
                          /style\s*=\s*"[^"]*border\s*:\s*2px\s+solid\s+(black|#000|#000000)[^"]*"/i.test(html);
        checks.push({
            label: 'Граница: border: 2px solid black',
            passed: hasBorder,
            hint: 'Установите border: 2px solid black'
        });
        if (hasBorder) score += 40;

        // Проверка 3: border-radius в CSS
        const hasBorderRadius = /border-radius\s*:\s*10px/i.test(css) ||
                                /style\s*=\s*"[^"]*border-radius\s*:\s*10px[^"]*"/i.test(html);
        checks.push({
            label: 'Скругление: border-radius: 10px',
            passed: hasBorderRadius,
            hint: 'Установите border-radius: 10px'
        });
        if (hasBorderRadius) score += 40;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
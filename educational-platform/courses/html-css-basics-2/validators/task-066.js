/**
 * Валидатор для задания 066: Padding всех сторон
 */
export default class Task066Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега div
        const hasDiv = /<div[^>]*>.*?<\/div>/i.test(html);
        checks.push({
            label: 'Тег div присутствует',
            passed: hasDiv,
            hint: 'Добавьте тег div'
        });
        if (hasDiv) score += 10;

        // Проверка 2: padding-top: 10px
        const hasPaddingTop = /padding-top\s*:\s*10px/i.test(css) ||
                              /style\s*=\s*"[^"]*padding-top\s*:\s*10px[^"]*"/i.test(html);
        checks.push({
            label: 'padding-top: 10px',
            passed: hasPaddingTop,
            hint: 'Установите padding-top: 10px'
        });
        if (hasPaddingTop) score += 25;

        // Проверка 3: padding-right: 15px
        const hasPaddingRight = /padding-right\s*:\s*15px/i.test(css) ||
                                /style\s*=\s*"[^"]*padding-right\s*:\s*15px[^"]*"/i.test(html);
        checks.push({
            label: 'padding-right: 15px',
            passed: hasPaddingRight,
            hint: 'Установите padding-right: 15px'
        });
        if (hasPaddingRight) score += 25;

        // Проверка 4: padding-bottom: 20px
        const hasPaddingBottom = /padding-bottom\s*:\s*20px/i.test(css) ||
                                 /style\s*=\s*"[^"]*padding-bottom\s*:\s*20px[^"]*"/i.test(html);
        checks.push({
            label: 'padding-bottom: 20px',
            passed: hasPaddingBottom,
            hint: 'Установите padding-bottom: 20px'
        });
        if (hasPaddingBottom) score += 20;

        // Проверка 5: padding-left: 25px
        const hasPaddingLeft = /padding-left\s*:\s*25px/i.test(css) ||
                               /style\s*=\s*"[^"]*padding-left\s*:\s*25px[^"]*"/i.test(html);
        checks.push({
            label: 'padding-left: 25px',
            passed: hasPaddingLeft,
            hint: 'Установите padding-left: 25px'
        });
        if (hasPaddingLeft) score += 20;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
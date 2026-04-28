/**
 * Валидатор для задания 061: Размеры и отступы
 */
export default class Task061Validator {
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
        if (hasDiv) score += 20;

        // Проверка 2: width в CSS
        const hasWidth = /width\s*:\s*200px/i.test(css) || /style\s*=\s*"[^"]*width\s*:\s*200px[^"]*"/i.test(html);
        checks.push({
            label: 'Ширина: width: 200px',
            passed: hasWidth,
            hint: 'Установите width: 200px'
        });
        if (hasWidth) score += 20;

        // Проверка 3: height в CSS
        const hasHeight = /height\s*:\s*100px/i.test(css) || /style\s*=\s*"[^"]*height\s*:\s*100px[^"]*"/i.test(html);
        checks.push({
            label: 'Высота: height: 100px',
            passed: hasHeight,
            hint: 'Установите height: 100px'
        });
        if (hasHeight) score += 30;

        // Проверка 4: margin в CSS
        const hasMargin = /margin\s*:\s*20px/i.test(css) || /style\s*=\s*"[^"]*margin\s*:\s*20px[^"]*"/i.test(html);
        checks.push({
            label: 'Отступ: margin: 20px',
            passed: hasMargin,
            hint: 'Установите margin: 20px'
        });
        if (hasMargin) score += 30;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
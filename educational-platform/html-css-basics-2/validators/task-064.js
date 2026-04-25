/**
 * Валидатор для задания 064: Шрифт комплексно
 */
export default class Task064Validator {
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

        // Проверка 2: font-family в CSS
        const hasFontFamily = /font-family\s*:\s*(Arial|sans-serif)/i.test(css) ||
                              /style\s*=\s*"[^"]*font-family\s*:[^"]*(Arial|sans-serif)[^"]*"/i.test(html);
        checks.push({
            label: 'Свойство font-family: Arial, sans-serif',
            passed: hasFontFamily,
            hint: 'Установите font-family: Arial, sans-serif'
        });
        if (hasFontFamily) score += 40;

        // Проверка 3: font-size в CSS
        const hasFontSize = /font-size\s*:\s*1[89]px/i.test(css) ||
                            /style\s*=\s*"[^"]*font-size\s*:\s*1[89]px[^"]*"/i.test(html);
        checks.push({
            label: 'Размер шрифта: font-size: 18px',
            passed: hasFontSize,
            hint: 'Установите font-size: 18px'
        });
        if (hasFontSize) score += 40;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
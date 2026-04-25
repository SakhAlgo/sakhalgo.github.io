/**
 * Валидатор для задания 063: Тень и прозрачность
 */
export default class Task063Validator {
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

        // Проверка 2: box-shadow в CSS
        const hasShadow = /box-shadow\s*:/i.test(css) ||
                          /style\s*=\s*"[^"]*box-shadow\s*:[^"]*"/i.test(html);
        checks.push({
            label: 'Свойство box-shadow присутствует',
            passed: hasShadow,
            hint: 'Добавьте box-shadow'
        });
        if (hasShadow) score += 40;

        // Проверка 3: opacity в CSS
        const hasOpacity = /opacity\s*:\s*0\./i.test(css) ||
                           /style\s*=\s*"[^"]*opacity\s*:\s*0\.[^"]*"/i.test(html);
        checks.push({
            label: 'Прозрачность: opacity установлен',
            passed: hasOpacity,
            hint: 'Установите opacity: 0.8'
        });
        if (hasOpacity) score += 40;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
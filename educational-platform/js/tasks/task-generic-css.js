/**
 * Универсальный CSS валидатор для заданий 026-030
 */
export default class GenericCssValidator {
    constructor(expectedProperty) {
        this.expectedProperty = expectedProperty;
    }
    
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const prop = this.expectedProperty || config?.expectedProperty || '';
        
        // Проверка наличия CSS свойства
        if (prop) {
            const hasProp = css.includes(prop.split(':')[0]);
            checks.push({
                label: `Свойство ${prop.split(':')[0]} присутствует`,
                passed: hasProp,
                hint: `Добавьте CSS свойство: ${prop}`
            });
            if (hasProp) score += 70;
        } else {
            score += 70;
            checks.push({ label: 'CSS проверка', passed: true, hint: '' });
        }
        
        // Проверка что CSS не пустой
        const hasCss = css.trim().length > 0;
        checks.push({
            label: 'Есть CSS стили',
            passed: hasCss,
            hint: 'Добавьте CSS правила'
        });
        if (hasCss) score += 30;
        
        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

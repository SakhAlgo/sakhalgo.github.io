/**
 * Универсальный JS валидатор для заданий 031-040
 */
export default class GenericJsValidator {
    constructor(expectedPattern) {
        this.expectedPattern = expectedPattern;
    }
    
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const pattern = this.expectedPattern || config?.expectedPattern || '';
        
        // Проверка наличия JS кода
        const hasJs = js.trim().length > 0;
        checks.push({
            label: 'Есть JavaScript код',
            passed: hasJs,
            hint: 'Напишите JavaScript код'
        });
        if (hasJs) score += 50;
        
        // Проверка паттерна если указан
        if (pattern) {
            const regex = new RegExp(pattern, 'i');
            const hasPattern = regex.test(js);
            checks.push({
                label: 'Правильный синтаксис',
                passed: hasPattern,
                hint: `Используйте правильный синтаксис: ${pattern}`
            });
            if (hasPattern) score += 50;
        } else {
            score += 50;
            checks.push({ label: 'Синтаксис OK', passed: true, hint: '' });
        }
        
        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

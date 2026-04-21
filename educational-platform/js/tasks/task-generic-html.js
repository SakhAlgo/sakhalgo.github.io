/**
 * Универсальный HTML валидатор для заданий 021-025
 */
export default class GenericHtmlValidator {
    constructor(expectedTag) {
        this.expectedTag = expectedTag;
    }
    
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const tag = this.expectedTag || config?.expectedTag || 'div';
        
        // Проверка наличия тега
        const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'i');
        const hasTag = regex.test(html);
        checks.push({
            label: `Тег <${tag}> присутствует`,
            passed: hasTag,
            hint: `Добавьте тег <${tag}> с закрывающим тегом </${tag}>`
        });
        if (hasTag) score += 70;
        
        // Проверка что есть контент
        const hasContent = html.trim().length > 0;
        checks.push({
            label: 'Есть содержимое',
            passed: hasContent,
            hint: 'Добавьте текст внутри тега'
        });
        if (hasContent) score += 30;
        
        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

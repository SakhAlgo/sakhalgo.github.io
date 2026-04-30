/**
 * Валидатор для задания 081: Семантический footer
 */
export default class Task081Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега footer
        const hasFooter = /<footer>[\s\S]*<\/footer>/i.test(html);
        checks.push({
            label: 'Тег footer присутствует',
            passed: hasFooter,
            hint: 'Добавьте footer в HTML'
        });
        if (hasFooter) score += 50;

        // Проверка 2: внутри footer есть параграф с символом копирайта
        const hasCopyInFooter = /<footer>[\s\S]*<p>[\s\S]*©[\s\S]*<\/p>[\s\S]*<\/footer>/i.test(html);
        checks.push({
            label: 'Внутри footer есть p с символом ©',
            passed: hasCopyInFooter,
            hint: 'Добавьте абзац © 2024 Все права защищены внутрь footer'
        });
        if (hasCopyInFooter) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
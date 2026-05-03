/**
 * Валидатор для задания 080: Семантический header
 */
export default class Task080Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега header
        const hasHeader = /<header>[\s\S]*<\/header>/i.test(html);
        checks.push({
            label: 'Тег header присутствует',
            passed: hasHeader,
            hint: 'Добавьте header в HTML'
        });
        if (hasHeader) score += 50;

        // Проверка 2: внутри header есть h1
        const hasH1InHeader = /<header>[\s\S]*<h1>[\s\S]*<\/h1>[\s\S]*<\/header>/i.test(html);
        checks.push({
            label: 'Внутри header есть h1',
            passed: hasH1InHeader,
            hint: 'Добавьте h1 внутрь header'
        });
        if (hasH1InHeader) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
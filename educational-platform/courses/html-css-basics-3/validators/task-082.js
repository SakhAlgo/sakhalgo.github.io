/**
 * Валидатор для задания 082: Основной контент main
 */
export default class Task082Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега main
        const hasMain = /<main>[\s\S]*<\/main>/i.test(html);
        checks.push({
            label: 'Тег main присутствует',
            passed: hasMain,
            hint: 'Добавьте main в HTML'
        });
        if (hasMain) score += 50;

        // Проверка 2: внутри main есть параграф
        const hasPInMain = /<main>[\s\S]*<p>[\s\S]*<\/p>[\s\S]*<\/main>/i.test(html);
        checks.push({
            label: 'Внутри main есть параграф p',
            passed: hasPInMain,
            hint: 'Добавьте абзац Основной текст страницы внутрь main'
        });
        if (hasPInMain) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
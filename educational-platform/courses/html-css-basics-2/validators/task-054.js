/**
 * Валидатор для задания 054: Ссылка с title
 * 
 * Задание: создать ссылку с атрибутами href и title.
 * Требования:
 *   - Тег a
 *   - href="https://example.com"
 *   - title="Перейти на пример"
 *   - Текст ссылки: "Пример ссылки"
 */
export default class Task054Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега a
        const hasA = /<a[^>]*>.*?<\/a>/i.test(html);
        checks.push({
            label: 'Тег a присутствует',
            passed: hasA,
            hint: 'Добавьте тег a'
        });
        if (hasA) score += 20;

        // Проверка 2: текст ссылки "Пример ссылки"
        const correctText = /<a[^>]*>Пример ссылки<\/a>/i.test(html);
        checks.push({
            label: 'Текст ссылки: "Пример ссылки"',
            passed: correctText,
            hint: 'Внутри тега a должен быть текст "Пример ссылки"'
        });
        if (correctText) score += 20;

        // Проверка 3: атрибут href
        const hasHref = /<a[^>]*\shref\s*=\s*"https:\/\/example\.com"[^>]*>/i.test(html);
        checks.push({
            label: 'href="https://example.com"',
            passed: hasHref,
            hint: 'Добавьте атрибут href="https://example.com"'
        });
        if (hasHref) score += 30;

        // Проверка 4: атрибут title
        const hasTitle = /<a[^>]*\stitle\s*=\s*"Перейти\s+на\s+пример"[^>]*>/i.test(html);
        checks.push({
            label: 'title="Перейти на пример"',
            passed: hasTitle,
            hint: 'Добавьте атрибут title="Перейти на пример"'
        });
        if (hasTitle) score += 30;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

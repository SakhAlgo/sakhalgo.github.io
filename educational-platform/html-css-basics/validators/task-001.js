/**
 * Валидатор для задания 001: Заголовок страницы
 */
export default class Task001Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега h1
        const hasH1 = /<h1[^>]*>.*?<\/h1>/i.test(html);
        checks.push({
            label: 'Тег <h1> присутствует',
            passed: hasH1,
            hint: 'Добавьте тег <h1> с закрывающим тегом </h1>'
        });
        if (hasH1) score += 50;

        // Проверка 2: правильный текст
        const correctText = /<h1[^>]*>Привет,\s*мир!<\/h1>/i.test(html);
        checks.push({
            label: 'Текст "Привет, мир!" внутри h1',
            passed: correctText,
            hint: 'Внутри тега h1 должен быть текст "Привет, мир!"'
        });
        if (correctText) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

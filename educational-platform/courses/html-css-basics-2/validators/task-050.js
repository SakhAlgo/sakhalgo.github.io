/**
 * Валидатор для задания 050: Два заголовка
 */
export default class Task050Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега h1
        const hasH1 = /<h1[^>]*>.*?<\/h1>/i.test(html);
        checks.push({
            label: 'Тег h1 присутствует',
            passed: hasH1,
            hint: 'Добавьте тег h1 с закрывающим тегом /h1'
        });
        if (hasH1) score += 25;

        // Проверка 2: правильный текст в h1
        const h1CorrectText = /<h1[^>]*>Привет,\s*мир!<\/h1>/i.test(html);
        checks.push({
            label: 'Текст "Привет, мир!" внутри h1',
            passed: h1CorrectText,
            hint: 'Внутри тега h1 должен быть текст "Привет, мир!"'
        });
        if (h1CorrectText) score += 25;

        // Проверка 3: наличие тега h2
        const hasH2 = /<h2[^>]*>.*?<\/h2>/i.test(html);
        checks.push({
            label: 'Тег h2 присутствует',
            passed: hasH2,
            hint: 'Добавьте тег h2 с закрывающим тегом /h2'
        });
        if (hasH2) score += 25;

        // Проверка 4: правильный текст в h2
        const h2CorrectText = /<h2[^>]*>Добро пожаловать!<\/h2>/i.test(html);
        checks.push({
            label: 'Текст "Добро пожаловать!" внутри h2',
            passed: h2CorrectText,
            hint: 'Внутри тега h2 должен быть текст "Добро пожаловать!"'
        });
        if (h2CorrectText) score += 25;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
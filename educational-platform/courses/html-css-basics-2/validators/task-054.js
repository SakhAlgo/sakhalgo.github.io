/**
 * Валидатор для задания 054: Изображение с заголовком
 */
export default class Task054Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега h2
        const hasH2 = /<h2[^>]*>.*?<\/h2>/i.test(html);
        checks.push({
            label: 'Тег h2 присутствует',
            passed: hasH2,
            hint: 'Добавьте тег h2'
        });
        if (hasH2) score += 25;

        // Проверка 2: текст "Моё изображение" в h2
        const correctH2 = /<h2[^>]*>Моё изображение<\/h2>/i.test(html);
        checks.push({
            label: 'Текст h2: "Моё изображение"',
            passed: correctH2,
            hint: 'Внутри h2 должен быть текст "Моё изображение"'
        });
        if (correctH2) score += 25;

        // Проверка 3: наличие тега img
        const hasImg = /<img[^>]*>/i.test(html);
        checks.push({
            label: 'Тег img присутствует',
            passed: hasImg,
            hint: 'Добавьте тег img'
        });
        if (hasImg) score += 25;

        // Проверка 4: атрибут alt
        const correctAlt = /<img[^>]*\salt\s*=\s*"Описание"/i.test(html);
        checks.push({
            label: 'alt="Описание"',
            passed: correctAlt,
            hint: 'Добавьте атрибут alt="Описание"'
        });
        if (correctAlt) score += 25;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
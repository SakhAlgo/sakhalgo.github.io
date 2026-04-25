/**
 * Валидатор для задания 053: Изображение с атрибутами
 */
export default class Task053Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега img
        const hasImg = /<img[^>]*>/i.test(html);
        checks.push({
            label: 'Тег <img> присутствует',
            passed: hasImg,
            hint: 'Добавьте тег <img>'
        });
        if (hasImg) score += 25;

        // Проверка 2: атрибут alt
        const hasAlt = /<img[^>]*\salt\s*=\s*"[^"]*"/i.test(html);
        checks.push({
            label: 'Атрибут alt присутствует',
            passed: hasAlt,
            hint: 'Добавьте атрибут alt="Пример изображения"'
        });
        if (hasAlt) score += 25;

        // Проверка 3: правильное значение alt
        const correctAlt = /<img[^>]*\salt\s*=\s*"Пример изображения"/i.test(html);
        checks.push({
            label: 'alt="Пример изображения"',
            passed: correctAlt,
            hint: 'В атрибуте alt должно быть "Пример изображения"'
        });
        if (correctAlt) score += 17;

        // Проверка 4: атрибут width
        const correctWidth = /<img[^>]*\swidth\s*=\s*"300"/i.test(html);
        checks.push({
            label: 'width="300"',
            passed: correctWidth,
            hint: 'Добавьте атрибут width="300"'
        });
        if (correctWidth) score += 17;

        // Проверка 5: атрибут height
        const correctHeight = /<img[^>]*\sheight\s*=\s*"200"/i.test(html);
        checks.push({
            label: 'height="200"',
            passed: correctHeight,
            hint: 'Добавьте атрибут height="200"'
        });
        if (correctHeight) score += 16;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
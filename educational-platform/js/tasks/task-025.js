/**
 * Валидатор для задания 025: Разрыв строки
 */
export default class Task025Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега br
        const hasBr = /<br\s*\/?>/i.test(html);
        checks.push({
            label: 'Тег <br> присутствует',
            passed: hasBr,
            hint: 'Добавьте тег <br> для разрыва строки'
        });
        if (hasBr) score += 50;

        // Проверка 2: текст до и после br
        const hasTextAround = /[^<]+<br\s*\/?>[^<]+/i.test(html);
        checks.push({
            label: 'Текст до и после <br>',
            passed: hasTextAround,
            hint: 'Добавьте текст до и после тега <br>'
        });
        if (hasTextAround) score += 50;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

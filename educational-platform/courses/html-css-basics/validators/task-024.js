/**
 * Валидатор для задания 024: Нумерованный список
 */
export default class Task024Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега ol
        const hasOl = /<ol[^>]*>.*?<\/ol>/is.test(html);
        checks.push({
            label: 'Тег ol присутствует',
            passed: hasOl,
            hint: 'Добавьте тег ol с закрывающим тегом /ol'
        });
        if (hasOl) score += 30;

        // Проверка 2: наличие тегов li
        const liMatches = html.match(/<li[^>]*>.*?<\/li>/gi) || [];
        const hasLi = liMatches.length >= 3;
        checks.push({
            label: 'Минимум 3 элемента li',
            passed: hasLi,
            hint: `Добавьте минимум 3 элемента li (найдено: ${liMatches.length})`
        });
        if (hasLi) score += 40;

        // Проверка 3: текст внутри li
        const hasTextInLi = /<li[^>]*>[^<]+<\/li>/i.test(html);
        checks.push({
            label: 'Текст внутри элементов li',
            passed: hasTextInLi,
            hint: 'Добавьте текст внутри каждого элемента li'
        });
        if (hasTextInLi) score += 30;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

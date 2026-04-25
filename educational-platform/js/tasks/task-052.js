/**
 * Валидатор для задания 052: Список с 3 элементами
 */
export default class Task052Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега ul
        const hasUl = /<ul[^>]*>.*?<\/ul>/is.test(html);
        checks.push({
            label: 'Тег <ul> присутствует',
            passed: hasUl,
            hint: 'Добавьте неупорядоченный список <ul>'
        });
        if (hasUl) score += 25;

        // Проверка 2: три элемента li внутри ul
        const liCount = (html.match(/<li[^>]*>/gi) || []).length;
        const hasThreeLi = liCount === 3;
        checks.push({
            label: 'Список содержит 3 элемента <li>',
            passed: hasThreeLi,
            hint: 'Добавьте 3 элемента <li> внутри <ul>'
        });
        if (hasThreeLi) score += 25;

        // Проверка 3: текст "Яблоко" в первом li
        const firstItem = /<li[^>]*>Яблоко<\/li>/i.test(html);
        checks.push({
            label: 'Первый элемент: "Яблоко"',
            passed: firstItem,
            hint: 'Первый <li> должен содержать текст "Яблоко"'
        });
        if (firstItem) score += 17;

        // Проверка 4: текст "Банан" во втором li
        const secondItem = /<li[^>]*>Банан<\/li>/i.test(html);
        checks.push({
            label: 'Второй элемент: "Банан"',
            passed: secondItem,
            hint: 'Второй <li> должен содержать текст "Банан"'
        });
        if (secondItem) score += 17;

        // Проверка 5: текст "Апельсин" в третьем li
        const thirdItem = /<li[^>]*>Апельсин<\/li>/i.test(html);
        checks.push({
            label: 'Третий элемент: "Апельсин"',
            passed: thirdItem,
            hint: 'Третий <li> должен содержать текст "Апельсин"'
        });
        if (thirdItem) score += 16;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
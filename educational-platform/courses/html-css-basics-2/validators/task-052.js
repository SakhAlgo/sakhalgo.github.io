/**
 * Валидатор для задания 052: Список с 3 элементами
 */
export default class Task052Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 0: наличие тега ul
        const hasUl = /<ul[^>]*>.*?<\/ul>/is.test(html);
        checks.push({
            label: 'Тег &lt;ul&gt; присутствует',
            passed: hasUl,
            hint: 'Добавьте неупорядоченный список &lt;ul&gt;'
        });
        if (hasUl) score += 12;

        // Проверка 1: наличие тега h1
        const hasH1 = /<h1[^>]*>.*?<\/h1>/is.test(html);
        checks.push({
            label: 'Тег &lt;h1&gt; присутствует',
            passed: hasH1,
            hint: 'Добавьте неупорядоченный список &lt;h1&gt;'
        });
        if (hasH1) score += 15;

        // Проверка 2: три элемента li внутри ul
        const liCount = (html.match(/<li[^>]*>/gi) || []).length;
        const hasThreeLi = liCount === 3;
        checks.push({
            label: 'Список содержит 3 элемента &lt;li&gt;',
            passed: hasThreeLi,
            hint: 'Добавьте 3 элемента &lt;li&gt; внутри &lt;ul&gt;'
        });
        if (hasThreeLi) score += 25;

        // Проверка 3: текст "Яблоко" в первом li
        const firstItem = /<li[^>]*>Яблоко<\/li>/i.test(html);
        checks.push({
            label: 'Первый элемент: "Яблоко"',
            passed: firstItem,
            hint: 'Первый &lt;li&gt; должен содержать текст "Яблоко"'
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
            hint: 'Третий &lt;li&gt; должен содержать текст "Апельсин"'
        });
        if (thirdItem) score += 16;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
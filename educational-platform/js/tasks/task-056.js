/**
 * Валидатор для задания 056: Смешанные списки
 */
export default class Task056Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие ul
        const hasUl = /<ul[^>]*>.*?<\/ul>/is.test(html);
        checks.push({
            label: 'Неупорядоченный список <ul> присутствует',
            passed: hasUl,
            hint: 'Добавьте тег <ul>'
        });
        if (hasUl) score += 20;

        // Проверка 2: наличие ol
        const hasOl = /<ol[^>]*>.*?<\/ol>/is.test(html);
        checks.push({
            label: 'Упорядоченный список <ol> присутствует',
            passed: hasOl,
            hint: 'Добавьте тег <ol>'
        });
        if (hasOl) score += 20;

        // Проверка 3: три li в ul
        const hasUlLis = /<ul[^>]*>.*?(<li[^>]*>.*?<\/li>.*?){3}.*?<\/ul>/is.test(html);
        checks.push({
            label: 'В <ul> 3 элемента <li>',
            passed: hasUlLis,
            hint: 'Добавьте 3 <li> внутри <ul>'
        });
        if (hasUlLis) score += 15;

        // Проверка 4: три li в ol
        const hasOlLis = /<ol[^>]*>.*?(<li[^>]*>.*?<\/li>.*?){3}.*?<\/ol>/is.test(html);
        checks.push({
            label: 'В <ol> 3 элемента <li>',
            passed: hasOlLis,
            hint: 'Добавьте 3 <li> внутри <ol>'
        });
        if (hasOlLis) score += 15;

        // Проверка 5: тексты ul
        const ulTexts = ['Кот', 'Собака', 'Птица'].every(t => new RegExp(`<li[^>]*>${t}<\\/li>`).test(html));
        checks.push({
            label: 'В ul: "Кот", "Собака", "Птица"',
            passed: ulTexts,
            hint: 'Элементы ul должны содержать: Кот, Собака, Птица'
        });
        if (ulTexts) score += 15;

        // Проверка 6: тексты ol
        const olTexts = ['Первый', 'Второй', 'Третий'].every(t => new RegExp(`<li[^>]*>${t}<\\/li>`).test(html));
        checks.push({
            label: 'В ol: "Первый", "Второй", "Третий"',
            passed: olTexts,
            hint: 'Элементы ol должны содержать: Первый, Второй, Третий'
        });
        if (olTexts) score += 15;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
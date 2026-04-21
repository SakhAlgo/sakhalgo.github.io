export default class Task015Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasPlus = /\+/.test(js);
        checks.push({ label: 'Оператор +', passed: hasPlus, hint: 'Используйте + для конкатенации' });
        if (hasPlus) score += 40;
        const hasConcat = /(firstName|lastName)/.test(js);
        checks.push({ label: 'firstName/lastName', passed: hasConcat, hint: 'Используйте firstName и lastName' });
        if (hasConcat) score += 30;
        const hasSpace = /[\"\']\s+[\"\']/.test(js);
        checks.push({ label: 'Пробел между именами', passed: hasSpace, hint: 'Добавьте пробел между именами' });
        if (hasSpace) score += 30;
        return { passed: score >= 70, score, checks };
    }
}

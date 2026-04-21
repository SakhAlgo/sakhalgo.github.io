export default class Task011Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasLet = /\blet\b/.test(js);
        checks.push({ label: 'Использовано let', passed: hasLet, hint: 'Объявите переменную через let' });
        if (hasLet) score += 50;
        const hasName = /\bname\b/.test(js);
        checks.push({ label: 'Переменная name', passed: hasName, hint: 'Название переменной: name' });
        if (hasName) score += 50;
        return { passed: score >= 70, score, checks };
    }
}

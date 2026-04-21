export default class Task012Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasDecl = /\b(let|const)\b/.test(js);
        checks.push({ label: 'let или const', passed: hasDecl, hint: 'Используйте let или const' });
        if (hasDecl) score += 40;
        const hasGreeting = /\bgreeting\s*=/.test(js);
        checks.push({ label: 'greeting = ...', passed: hasGreeting, hint: 'Создайте переменную greeting' });
        if (hasGreeting) score += 30;
        const hasPrivet = /[\"\']Привет[\"\']/.test(js);
        checks.push({ label: 'Значение "Привет"', passed: hasPrivet, hint: 'Значение должно быть "Привет"' });
        if (hasPrivet) score += 30;
        return { passed: score >= 70, score, checks };
    }
}

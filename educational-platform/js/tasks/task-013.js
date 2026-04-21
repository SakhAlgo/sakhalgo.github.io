export default class Task013Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasDecl = /\b(let|const)\b/.test(js);
        checks.push({ label: 'let или const', passed: hasDecl, hint: 'Используйте let или const' });
        if (hasDecl) score += 40;
        const hasAge = /\bage\s*=\s*25\b/.test(js);
        checks.push({ label: 'age = 25', passed: hasAge, hint: 'Присвойте age значение 25' });
        if (hasAge) score += 60;
        return { passed: score >= 70, score, checks };
    }
}

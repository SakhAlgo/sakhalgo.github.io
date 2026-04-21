export default class Task014Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasDecl = /\b(let|const)\b/.test(js);
        checks.push({ label: 'let или const', passed: hasDecl, hint: 'Используйте let или const' });
        if (hasDecl) score += 40;
        const hasActive = /\bisActive\s*=\s*true\b/.test(js);
        checks.push({ label: 'isActive = true', passed: hasActive, hint: 'Присвойте isActive значение true' });
        if (hasActive) score += 60;
        return { passed: score >= 70, score, checks };
    }
}

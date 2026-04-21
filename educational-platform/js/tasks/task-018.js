export default class Task018Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasReturn = /\breturn\s+a\s*\+\s*b\b/.test(js);
        checks.push({ label: 'return a + b', passed: hasReturn, hint: 'Верните сумму a + b' });
        if (hasReturn) score += 100;
        return { passed: score >= 70, score, checks };
    }
}

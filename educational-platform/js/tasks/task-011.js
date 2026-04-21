export default class Task011Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasLet = /(let|const)\s+/.test(js);
        checks.push({ label: 'Объявление переменной (let/const)', passed: hasLet, hint: 'Используйте let или const' });
        if (hasLet) score += 50;
        const hasName = /\bname\b\s*=/.test(js);
        checks.push({ label: 'Переменная name', passed: hasName, hint: 'Объявите переменную name' });
        if (hasName) score += 50;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

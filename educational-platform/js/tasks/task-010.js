export default class Task010Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasBorder = /border\s*:\s*2px\s+solid\s+(black|#000|#000000)/i.test(css);
        checks.push({ label: 'border: 2px solid black', passed: hasBorder, hint: 'Добавьте border: 2px solid black' });
        if (hasBorder) score += 100;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

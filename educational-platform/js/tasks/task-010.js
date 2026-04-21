export default class Task010Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasBorder = /border\s*:\s*2px\s+solid\s+red/i.test(css);
        checks.push({ label: 'Граница 2px solid red', passed: hasBorder, hint: 'Установите border: 2px solid red' });
        if (hasBorder) score += 100;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

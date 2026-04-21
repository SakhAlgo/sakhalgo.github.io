export default class Task009Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasMargin = /margin\s*:\s*20px/i.test(css);
        checks.push({ label: 'margin: 20px', passed: hasMargin, hint: 'Добавьте margin: 20px' });
        if (hasMargin) score += 50;
        const hasPadding = /padding\s*:\s*10px/i.test(css);
        checks.push({ label: 'padding: 10px', passed: hasPadding, hint: 'Добавьте padding: 10px' });
        if (hasPadding) score += 50;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

export default class Task008Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasWidth = /width\s*:\s*200px/i.test(css);
        checks.push({ label: 'width: 200px', passed: hasWidth, hint: 'Добавьте width: 200px' });
        if (hasWidth) score += 50;
        const hasHeight = /height\s*:\s*100px/i.test(css);
        checks.push({ label: 'height: 100px', passed: hasHeight, hint: 'Добавьте height: 100px' });
        if (hasHeight) score += 50;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

export default class Task006Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasColor = /color\s*:/i.test(css);
        checks.push({ label: 'Свойство color присутствует', passed: hasColor, hint: 'Добавьте свойство color' });
        if (hasColor) score += 40;
        const isRed = /color\s*:\s*(red|#ff0000|#f00)/i.test(css);
        checks.push({ label: 'Цвет красный (red)', passed: isRed, hint: 'Установите color: red' });
        if (isRed) score += 60;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

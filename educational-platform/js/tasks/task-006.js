export default class Task006Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasColor = /color\s*:/i.test(css);
        checks.push({ label: 'Свойство color присутствует', passed: hasColor, hint: 'Добавьте свойство color' });
        if (hasColor) score += 40;
        const isBlue = /color\s*:\s*(blue|#0000ff|#00f)/i.test(css);
        checks.push({ label: 'Цвет синий (blue)', passed: isBlue, hint: 'Установите color: blue' });
        if (isBlue) score += 60;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

export default class Task007Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasBg = /(background|background-color)\s*:/i.test(css);
        checks.push({ label: 'Свойство background присутствует', passed: hasBg, hint: 'Добавьте background' });
        if (hasBg) score += 40;
        const isBlue = /(background|background-color)\s*:\s*(blue|#0000ff|#00f)/i.test(css);
        checks.push({ label: 'Фон синий (blue)', passed: isBlue, hint: 'Установите background: blue' });
        if (isBlue) score += 60;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

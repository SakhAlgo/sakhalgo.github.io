export default class Task011Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasVar = /(let|const)\s+name\s*=/.test(js);
        checks.push({ label: 'Переменная name объявлена', passed: hasVar, hint: 'Объявите переменную name' });
        if (hasVar) score += 40;
        const hasValue = /name\s*=\s*['\"]JavaScript['\"]/.test(js);
        checks.push({ label: 'Значение JavaScript', passed: hasValue, hint: 'Установите значение JavaScript' });
        if (hasValue) score += 60;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

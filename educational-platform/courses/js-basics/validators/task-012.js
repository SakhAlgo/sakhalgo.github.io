export default class Task012Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasVar = /const\s+greeting\s*=/.test(js);
        checks.push({ label: 'Переменная greeting объявлена', passed: hasVar, hint: 'Объявите переменную greeting' });
        if (hasVar) score += 40;
        const hasValue = /greeting\s*=\s*['\"]Привет, мир\!['\"]/.test(js);
        checks.push({ label: 'Значение Привет, мир!', passed: hasValue, hint: 'Установите значение Привет, мир!' });
        if (hasValue) score += 60;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

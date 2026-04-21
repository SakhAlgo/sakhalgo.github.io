export default class Task014Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasVar = /const\s+isReady\s*=/.test(js);
        checks.push({ label: 'Переменная isReady объявлена', passed: hasVar, hint: 'Объявите переменную isReady' });
        if (hasVar) score += 40;
        const hasValue = /isReady\s*=\s*true/.test(js);
        checks.push({ label: 'Значение true', passed: hasValue, hint: 'Установите значение true' });
        if (hasValue) score += 60;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

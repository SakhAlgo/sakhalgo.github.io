export default class Task015Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasFirst = /(let|const)\s+firstName\s*=\s*['\"]John['\"]/.test(js);
        checks.push({ label: 'firstName = John', passed: hasFirst, hint: 'Создайте firstName = John' });
        if (hasFirst) score += 30;
        const hasLast = /(let|const)\s+lastName\s*=\s*['\"]Doe['\"]/.test(js);
        checks.push({ label: 'lastName = Doe', passed: hasLast, hint: 'Создайте lastName = Doe' });
        if (hasLast) score += 30;
        const hasFull = /fullName\s*=\s*firstName\s*\+\s*['\"\s]+\s*\+\s*lastName/.test(js);
        checks.push({ label: 'Конкатенация в fullName', passed: hasFull, hint: 'Создайте fullName через конкатенацию' });
        if (hasFull) score += 40;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

export default class Task015Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasFirst = /(let|const)\s+firstName\s*=\s*['\"]John['\"]/.test(js);
        checks.push({ label: 'firstName = John', passed: hasFirst, hint: 'Создайте firstName = John' });
        if (hasFirst) score += 20;
        const hasLast = /(let|const)\s+lastName\s*=\s*['\"]Doe['\"]/.test(js);
        checks.push({ label: 'lastName = Doe', passed: hasLast, hint: 'Создайте lastName = Doe' });
        if (hasLast) score += 20;
        const hasFull = /fullName\s*=\s*firstName\s*\+\s*['\"\s]+\s*\+\s*lastName/.test(js);
        checks.push({ label: 'Конкатенация в fullName', passed: hasFull, hint: 'Создайте fullName через конкатенацию' });
        if (hasFull) score += 30;
        const hasConsoleLog = /console\.log\s*\(/.test(js);
        checks.push({ label: 'Вывод в консоль', passed: hasConsoleLog, hint: 'Используйте console.log() для вывода значения' });
        if (hasConsoleLog) score += 30;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

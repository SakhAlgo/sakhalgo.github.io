export default class Task017Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasFunc = /function\s+greet\s*\(\s*name\s*\)/.test(js);
        checks.push({ label: 'function greet(name)', passed: hasFunc, hint: 'Создайте функцию greet(name)' });
        if (hasFunc) score += 50;
        const hasLog = /console\.log/.test(js);
        checks.push({ label: 'console.log', passed: hasLog, hint: 'Выведите сообщение через console.log' });
        if (hasLog) score += 50;
        return { passed: score >= 70, score, checks };
    }
}

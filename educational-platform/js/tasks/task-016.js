export default class Task016Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasFunc = /function\s+sayHello\s*\(\s*\)/.test(js);
        checks.push({ label: 'Функция sayHello объявлена', passed: hasFunc, hint: 'Создайте функцию sayHello()' });
        if (hasFunc) score += 50;
        const hasLog = /console\.log\s*\(\s*['\"]Hello['\"]\s*\)/.test(js);
        checks.push({ label: 'Вывод Hello в консоль', passed: hasLog, hint: 'Добавьте console.log(\"Hello\")' });
        if (hasLog) score += 50;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

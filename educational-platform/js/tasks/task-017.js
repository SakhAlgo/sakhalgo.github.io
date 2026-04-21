export default class Task017Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasFunc = /function\s+greet\s*\(\s*name\s*\)/.test(js);
        checks.push({ label: 'Функция greet(name) объявлена', passed: hasFunc, hint: 'Создайте функцию greet(name)' });
        if (hasFunc) score += 50;
        const hasGreeting = /['\"]Hello,\s*['\"]\s*\+\s*name/.test(js);
        checks.push({ label: 'Приветствие с именем', passed: hasGreeting, hint: 'Добавьте вывод \"Hello, \" + name' });
        if (hasGreeting) score += 50;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

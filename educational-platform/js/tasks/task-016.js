export default class Task016Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasFunc = /function\s+sayHello\s*\(\)/.test(js);
        checks.push({ label: 'function sayHello()', passed: hasFunc, hint: 'Создайте функцию sayHello()' });
        if (hasFunc) score += 50;
        const hasBody = /\{[\s\S]*\}/.test(js);
        checks.push({ label: 'Тело функции {}', passed: hasBody, hint: 'Добавьте тело функции' });
        if (hasBody) score += 50;
        return { passed: score >= 70, score, checks };
    }
}

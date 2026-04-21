export default class Task020Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasCall = /myFunction\s*\(\s*\)/.test(js);
        checks.push({ label: 'myFunction()', passed: hasCall, hint: 'Вызовите myFunction()' });
        if (hasCall) score += 100;
        return { passed: score >= 70, score, checks };
    }
}

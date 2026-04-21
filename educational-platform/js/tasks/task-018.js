export default class Task018Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasFunc = /function\s+add\s*\(\s*a\s*,\s*b\s*\)/.test(js);
        checks.push({ label: 'Функция add(a, b) объявлена', passed: hasFunc, hint: 'Создайте функцию add(a, b)' });
        if (hasFunc) score += 40;
        const hasReturn = /return\s+a\s*\+\s*b/.test(js);
        checks.push({ label: 'Возврат суммы a + b', passed: hasReturn, hint: 'Добавьте return a + b' });
        if (hasReturn) score += 60;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

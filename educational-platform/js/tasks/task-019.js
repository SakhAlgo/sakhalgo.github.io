export default class Task019Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasArrow = /const\s+square\s*=\s*\([^)]*\)\s*=>/.test(js);
        checks.push({ label: 'Стрелочная функция square', passed: hasArrow, hint: 'Создайте стрелочную функцию square' });
        if (hasArrow) score += 50;
        const hasSquare = /x\s*\*\s*x/.test(js);
        checks.push({ label: 'Возврат x * x', passed: hasSquare, hint: 'Верните x * x' });
        if (hasSquare) score += 50;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

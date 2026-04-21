export default class Task019Validator {
    async validate(html, css, js, samples, config) {
        const checks = []; let score = 0;
        const hasArrow = /=>/.test(js);
        checks.push({ label: 'Стрелочная функция =>', passed: hasArrow, hint: 'Используйте стрелочную функцию' });
        if (hasArrow) score += 50;
        const hasDouble = /\bdouble\b/.test(js);
        checks.push({ label: 'Функция double', passed: hasDouble, hint: 'Назовите функцию double' });
        if (hasDouble) score += 50;
        return { passed: score >= 70, score, checks };
    }
}

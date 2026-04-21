export default class Task004Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;
        const hasImg = /<img[^>]*>/i.test(html);
        checks.push({ label: 'Тег <img> присутствует', passed: hasImg, hint: 'Добавьте тег <img>' });
        if (hasImg) score += 30;
        const hasSrc = /src=['"]image\.jpg['"]/i.test(html);
        checks.push({ label: 'Атрибут src="image.jpg"', passed: hasSrc, hint: 'Добавьте src="image.jpg"' });
        if (hasSrc) score += 35;
        const hasAlt = /alt=['"]Картинка['"]/i.test(html);
        checks.push({ label: 'Атрибут alt="Картинка"', passed: hasAlt, hint: 'Добавьте alt="Картинка"' });
        if (hasAlt) score += 35;
        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}

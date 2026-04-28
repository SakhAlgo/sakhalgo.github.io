export default class Task005Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;
    const hasA = /<a[^>]*>.*?<\/a>/i.test(html);
    checks.push({
      label: "Тег a присутствует",
      passed: hasA,
      hint: "Добавьте тег a",
    });
    if (hasA) score += 30;
    const hasHref = /href=['"]https:\/\/example\.com['"]/i.test(html);
    checks.push({
      label: 'Атрибут href="https://example.com"',
      passed: hasHref,
      hint: "Добавьте правильный href",
    });
    if (hasHref) score += 35;
    const hasText = /<a[^>]*>Перейти<\/a>/i.test(html);
    checks.push({
      label: 'Текст "Перейти"',
      passed: hasText,
      hint: 'Текст ссылки должен быть "Перейти"',
    });
    if (hasText) score += 35;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

export default class Task002Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;
    const hasP = /<p[^>]*>.*?<\/p>/i.test(html);
    checks.push({
      label: "Тег p присутствует",
      passed: hasP,
      hint: "Добавьте тег p",
    });
    if (hasP) score += 50;
    const correctText = /<p[^>]*>Это мой первый абзац\.<\/p>/i.test(html);
    checks.push({
      label: 'Текст "Это мой первый абзац."',
      passed: correctText,
      hint: "Проверьте текст внутри p",
    });
    if (correctText) score += 50;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

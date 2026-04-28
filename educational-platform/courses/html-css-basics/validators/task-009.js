export default class Task009Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;
    const hasPadding = /padding\s*:\s*20px/i.test(css);
    checks.push({
      label: "Padding 20px",
      passed: hasPadding,
      hint: "Установите padding: 20px",
    });
    if (hasPadding) score += 50;
    const hasMargin = /margin\s*:\s*10px/i.test(css);
    checks.push({
      label: "Margin 10px",
      passed: hasMargin,
      hint: "Установите margin: 10px",
    });
    if (hasMargin) score += 50;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

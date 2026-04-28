export default class Task007Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;
    const hasBg = /background(-color)?\s*:/i.test(css);
    checks.push({
      label: "Свойство background-color присутствует",
      passed: hasBg,
      hint: "Добавьте свойство background-color",
    });
    if (hasBg) score += 40;
    const isYellow = /background(-color)?\s*:\s*(yellow|#ffff00|#ff0)/i.test(
      css,
    );
    checks.push({
      label: "Фон желтый (yellow)",
      passed: isYellow,
      hint: "Установите background-color: yellow",
    });
    if (isYellow) score += 60;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

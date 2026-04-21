export default class Task008Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasWidth = /width\s*:\s*100px/i.test(css);
    checks.push({
      label: "Ширина 100px",
      passed: hasWidth,
      hint: "Установите width: 100px",
    });
    if (hasWidth) score += 34;

    const hasHeight = /height\s*:\s*50px/i.test(css);
    checks.push({
      label: "Высота 50px",
      passed: hasHeight,
      hint: "Установите height: 50px",
    });
    if (hasHeight) score += 33;

    const hasBackground = /background-color\s*:\s*blue/i.test(css);
    checks.push({
      label: "Синий фон (background-color: blue)",
      passed: hasBackground,
      hint: "Установите background-color: blue",
    });
    if (hasBackground) score += 33;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

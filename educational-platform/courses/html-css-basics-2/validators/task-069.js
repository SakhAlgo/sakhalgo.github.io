/**
 * Валидатор для задания 069: Комбинированный селектор
 */
export default class Task069Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка 1: наличие div с p внутри
    const hasDivWithP = /<div[^>]*>.*?<p[^>]*>.*?<\/p>.*?<\/div>/i.test(html);
    checks.push({
      label: "Тег p внутри <div> присутствует",
      passed: hasDivWithP,
      hint: "Добавьте &lt;div&gt;&lt;p&gt;...&lt;/p&gt;&lt;/div&gt;",
    });
    if (hasDivWithP) score += 40;

    // Проверка 2: комбинированный селектор div p с color: green
    const hasCombinedSelector = /div\s+p\s*\{[^}]*color\s*:\s*green/i.test(css);
    checks.push({
      label: "Селектор div p с color: green",
      passed: hasCombinedSelector,
      hint: "Добавьте div p { color: green; } в CSS",
    });
    if (hasCombinedSelector) score += 60;

    return {
      passed: score >= (config.passThreshold || 70),
      score,
      checks,
    };
  }
}

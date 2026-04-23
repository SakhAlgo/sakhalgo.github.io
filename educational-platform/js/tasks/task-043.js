/**
 * Валидатор для задания 043: Исправить селектор класса
 */
export default class Task043Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка 1: селектор начинается с точки
    const hasPointSelector = /\.highlight\s*\{/i.test(css);
    checks.push({
      label: "Селектор .highlight присутствует",
      passed: hasPointSelector,
      hint: "Селектор класса должен начинаться с точки: .highlight",
    });
    if (hasPointSelector) score += 50;

    // Проверка 2: нет селектора без точки
    const hasWrongSelector = /^highlight\s*\{/m.test(css) && !hasPointSelector;
    checks.push({
      label: "Ошибка исправлена (нет селектора без точки)",
      passed: !hasWrongSelector,
      hint: "Удалите неправильный селектор highlight без точки",
    });
    if (!hasWrongSelector) score += 50;

    return {
      passed: score >= (config.passThreshold || 70),
      score,
      checks,
    };
  }
}

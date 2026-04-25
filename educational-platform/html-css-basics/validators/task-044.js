/**
 * Валидатор для задания 044: Дописать селектор класса
 */
export default class Task044Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка 1: селектор .button присутствует
    const hasButtonSelector = /\.button\s*\{/i.test(css);
    checks.push({
      label: "Селектор .button написан",
      passed: hasButtonSelector,
      hint: "Напишите селектор: .button",
    });
    if (hasButtonSelector) score += 50;

    // Проверка 2: стили присутствуют
    const hasStyles =
      /background\s*:/i.test(css) &&
      /color\s*:/i.test(css) &&
      /padding\s*:/i.test(css);
    checks.push({
      label: "Все стили сохранены",
      passed: hasStyles,
      hint: "Оставьте свойства background, color и padding",
    });
    if (hasStyles) score += 50;

    return {
      passed: score >= (config.passThreshold || 70),
      score,
      checks,
    };
  }
}

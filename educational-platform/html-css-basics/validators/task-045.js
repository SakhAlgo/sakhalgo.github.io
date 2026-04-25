/**
 * Валидатор для задания 045: Селектор для всех абзацев
 */
export default class Task045Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка 1: селектор p присутствует
    const hasPSelector = /^p\s*\{/m.test(css);
    checks.push({
      label: "Селектор p написан",
      passed: hasPSelector,
      hint: "Напишите селектор: p (просто буква p)",
    });
    if (hasPSelector) score += 50;

    // Проверка 2: стили присутствуют
    const hasStyles = /line-height\s*:/i.test(css) && /color\s*:/i.test(css);
    checks.push({
      label: "Все стили сохранены",
      passed: hasStyles,
      hint: "Оставьте свойства line-height и color",
    });
    if (hasStyles) score += 50;

    return {
      passed: score >= (config.passThreshold || 70),
      score,
      checks,
    };
  }
}

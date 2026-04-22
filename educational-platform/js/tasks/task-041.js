/**
 * Валидатор для задания 041: Выравнивание текста влево
 */
export default class Task041Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка 1: наличие text-align в CSS
    const hasTextAlign = /text-align\s*:/i.test(css);
    checks.push({
      label: "Свойство text-align использовано",
      passed: hasTextAlign,
      hint: "Добавьте свойство text-align в CSS",
    });
    if (hasTextAlign) score += 50;

    // Проверка 2: значение left
    const hasLeftValue = /text-align\s*:\s*left/i.test(css);
    checks.push({
      label: "Значение left",
      passed: hasLeftValue,
      hint: "Установите значение left",
    });
    if (hasLeftValue) score += 50;

    return {
      passed: score >= (config.passThreshold || 70),
      score,
      checks,
    };
  }
}

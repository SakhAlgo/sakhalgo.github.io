export default class Task072Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка использования цикла for
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasFor,
      hint: "Добавьте for (let i = 5; i >= 1; i--) { ... }",
    });
    if (hasFor) score += 25;

    // Проверка инициализации i = 5 в for
    const hasInit = /for\s*\(\s*let\s+i\s*=\s*5/.test(js);
    checks.push({
      label: "Начальное значение i = 5 в цикле for",
      passed: hasInit,
      hint: "Укажите for (let i = 5; ...)",
    });
    if (hasInit) score += 20;

    // Проверка условия i >= 1 (обратный отсчёт)
    const hasCondition = /for\s*\([^)]*;\s*i\s*>=\s*1\s*;/.test(js);
    checks.push({
      label: "Условие i >= 1 (от 5 до 1)",
      passed: hasCondition,
      hint: "Укажите условие i >= 1 в цикле for",
    });
    if (hasCondition) score += 20;

    // Проверка декремента i--
    const hasDecrement = /for\s*\([^)]*;\s*[^;]*;\s*i\s*-{2}\s*\)/.test(js);
    checks.push({
      label: "Декремент i-- в цикле for",
      passed: hasDecrement,
      hint: "Укажите i-- как третье выражение в for",
    });
    if (hasDecrement) score += 20;

    // Проверка вывода через console.log (без textContent)
    const hasConsoleLog = /console\.log\s*\(\s*i\s*\)/.test(js);
    checks.push({
      label: "Вывод i через console.log()",
      passed: hasConsoleLog,
      hint: "Внутри цикла добавьте console.log(i)",
    });
    if (hasConsoleLog) score += 15;


    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
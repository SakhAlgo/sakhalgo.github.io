export default class Task076Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка внешнего цикла for
    const hasOuterFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasOuterFor,
      hint: "Добавьте for (let i = 1; i <= 3; i++)",
    });
    if (hasOuterFor) score += 15;

    // Проверка вложенности: два цикла for
    const forMatches = js.match(/\bfor\s*\(/g);
    const hasNested = forMatches && forMatches.length >= 2;
    checks.push({
      label: "Два вложенных цикла for (внешний и внутренний)",
      passed: hasNested,
      hint: "Внутри одного for добавьте ещё один for (let j = 1; j <= 3; j++)",
    });
    if (hasNested) score += 20;

    // Проверка переменной i (внешний цикл)
    const hasOuterVar = /\bfor\s*\(\s*(let|var)\s+i\s*=\s*1/.test(js);
    checks.push({
      label: "Внешний цикл с let i = 1",
      passed: hasOuterVar,
      hint: "Напишите for (let i = 1; i <= 3; i++)",
    });
    if (hasOuterVar) score += 10;

    // Проверка внутреннего цикла до 3
    const hasInnerCondition = /j\s*<=\s*3/.test(js);
    checks.push({
      label: "Внутренний цикл до j <= 3",
      passed: hasInnerCondition,
      hint: "Укажите j <= 3 во внутреннем цикле",
    });
    if (hasInnerCondition) score += 15;

    // Проверка умножения i * j
    const hasMultiplication = /\bi\s*\*\s*j\b/.test(js);
    checks.push({
      label: "Умножение i * j в выводе",
      passed: hasMultiplication,
      hint: "Выведите результат i * j",
    });
    if (hasMultiplication) score += 15;

    // Проверка вывода
    const hasOutput = /textContent\s*\+=/.test(js);
    checks.push({
      label: "Вывод результата в #output",
      passed: hasOutput,
      hint: "Используйте textContent += row;",
    });
    if (hasOutput) score += 10;

    // Проверка getElementById
    const hasGetElement = /getElementById\s*\(\s*['"]output['"]\s*\)/.test(js);
    checks.push({
      label: "Обращение к #output",
      passed: hasGetElement,
      hint: 'Используйте document.getElementById("output")',
    });
    if (hasGetElement) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
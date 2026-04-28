export default class Task075Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка цикла for
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasFor,
      hint: "Добавьте for (let i = 1; i <= 10; i++)",
    });
    if (hasFor) score += 15;

    // Проверка continue
    const hasContinue = /\bcontinue\b/.test(js);
    checks.push({
      label: "Использован оператор continue",
      passed: hasContinue,
      hint: "Добавьте continue для пропуска нечётных чисел",
    });
    if (hasContinue) score += 20;

    // Проверка проверки на чётность (i % 2 !== 0 или i % 2 == 1)
    const hasOddCheck = /i\s*%\s*2\s*(!==?|==?)\s*0/.test(js) || /i\s*%\s*2\s*(==?|===?)\s*1/.test(js);
    checks.push({
      label: "Проверка на нечётность (i % 2 !== 0) для continue",
      passed: hasOddCheck,
      hint: "Добавьте if (i % 2 !== 0) { continue; }",
    });
    if (hasOddCheck) score += 20;

    // Проверка вывода чётных чисел
    const hasOutput = /textContent\s*\+=/.test(js);
    checks.push({
      label: "Вывод результата в #output",
      passed: hasOutput,
      hint: "Используйте textContent += i",
    });
    if (hasOutput) score += 15;

    // Проверка getElementById
    const hasGetElement = /getElementById\s*\(\s*['"]output['"]\s*\)/.test(js);
    checks.push({
      label: "Обращение к #output",
      passed: hasGetElement,
      hint: 'Используйте document.getElementById("output")',
    });
    if (hasGetElement) score += 15;

    // Проверка диапазона 1..10
    const hasRange = /i\s*<=\s*10/.test(js);
    checks.push({
      label: "Цикл от 1 до 10 включительно",
      passed: hasRange,
      hint: "Укажите i <= 10 в цикле",
    });
    if (hasRange) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
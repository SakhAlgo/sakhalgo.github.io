export default class Task099Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+getNumberType\s*\(/.test(js);
    checks.push({
      label: "Функция getNumberType объявлена",
      passed: hasFunction,
      hint: "Создайте функцию getNumberType(n)",
    });
    if (hasFunction) score += 20;

    const hasSwitch = /\bswitch\s*\(/.test(js);
    checks.push({
      label: "Использован switch",
      passed: hasSwitch,
      hint: "Добавьте конструкцию switch",
    });
    if (hasSwitch) score += 15;

    const hasCase = /\bcase\s+\d+/.test(js);
    checks.push({
      label: "Использованы case с числами",
      passed: hasCase,
      hint: "Добавьте case для каждого числа",
    });
    if (hasCase) score += 15;

    const hasDefault = /\bdefault\s*:/.test(js);
    checks.push({
      label: "Использован default",
      passed: hasDefault,
      hint: "Добавьте блок default",
    });
    if (hasDefault) score += 10;

    const returnsOdd = /return\s+['"]odd['"]/.test(js);
    checks.push({
      label: 'Возвращает "odd" для нечётных',
      passed: returnsOdd,
      hint: 'Добавьте return "odd"',
    });
    if (returnsOdd) score += 10;

    const returnsEven = /return\s+['"]even['"]/.test(js);
    checks.push({
      label: 'Возвращает "even" для чётных',
      passed: returnsEven,
      hint: 'Добавьте return "even"',
    });
    if (returnsEven) score += 10;

    const returnsOutOfRange = /return\s+['"]out of range['"]/.test(js);
    checks.push({
      label: 'Возвращает "out of range" для остальных',
      passed: returnsOutOfRange,
      hint: 'Добавьте return "out of range"',
    });
    if (returnsOutOfRange) score += 10;

    // нечётные: 1,3,5 — проверка через case fallthrough
    const hasOddFallthrough = /case\s+1[\s\S]*case\s+3[\s\S]*case\s+5/.test(js);
    checks.push({
      label: "Объединены case 1, 3, 5 для odd",
      passed: hasOddFallthrough,
      hint: "Сгруппируйте case 1, 3, 5 вместе",
    });
    if (hasOddFallthrough) score += 10;

    return { passed: score >= (config.passThreshold || 60), score, checks };
  }
}
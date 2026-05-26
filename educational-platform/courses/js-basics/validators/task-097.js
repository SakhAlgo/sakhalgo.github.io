export default class Task097Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+getFoodType\s*\(/.test(js);
    checks.push({
      label: "Функция getFoodType объявлена",
      passed: hasFunction,
      hint: "Создайте функцию getFoodType(food)",
    });
    if (hasFunction) score += 20;

    const hasSwitch = /\bswitch\s*\(/.test(js);
    checks.push({
      label: "Использован switch",
      passed: hasSwitch,
      hint: "Добавьте конструкцию switch",
    });
    if (hasSwitch) score += 15;

    const hasCase = /\bcase\s+[^:]+:/m.test(js);
    checks.push({
      label: "Использованы case",
      passed: hasCase,
      hint: "Добавьте case для каждого значения",
    });
    if (hasCase) score += 15;

    const hasDefault = /\bcase\s+[^:]*:/m.test(js);
    checks.push({
      label: "Использован default",
      passed: hasDefault,
      hint: "Добавьте блок default",
    });
    if (hasDefault) score += 10;

    const returnsFruit = /return\s+['"]fruit['"]/.test(js);
    checks.push({
      label: 'Возвращает "fruit" для фруктов',
      passed: returnsFruit,
      hint: 'Добавьте return "fruit"',
    });
    if (returnsFruit) score += 10;

    const returnsVegetable = /return\s+['"]vegetable['"]/.test(js);
    checks.push({
      label: 'Возвращает "vegetable" для овощей',
      passed: returnsVegetable,
      hint: 'Добавьте return "vegetable"',
    });
    if (returnsVegetable) score += 10;

    const returnsGrain = /return\s+['"]grain['"]/.test(js);
    checks.push({
      label: 'Возвращает "grain" для хлеба',
      passed: returnsGrain,
      hint: 'Добавьте return "grain"',
    });
    if (returnsGrain) score += 10;

    const returnsUnknown = /return\s+['"]unknown['"]/.test(js);
    checks.push({
      label: 'Возвращает "unknown" для остальных',
      passed: returnsUnknown,
      hint: 'Добавьте return "unknown"',
    });
    if (returnsUnknown) score += 10;

    return { passed: score >= (config.passThreshold || 60), score, checks };
  }
}
export default class Task100Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+getPlanetName\s*\(/.test(js);
    checks.push({
      label: "Функция getPlanetName объявлена",
      passed: hasFunction,
      hint: "Создайте функцию getPlanetName(n)",
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
      hint: "Добавьте case для каждой планеты",
    });
    if (hasCase) score += 15;

    const hasDefault = /\bdefault\s*:/.test(js);
    checks.push({
      label: "Использован default",
      passed: hasDefault,
      hint: "Добавьте блок default",
    });
    if (hasDefault) score += 10;

    const returnsMercury = /return\s+['"]Mercury['"]/.test(js);
    checks.push({
      label: 'Возвращает "Mercury" для 1',
      passed: returnsMercury,
      hint: 'Добавьте return "Mercury"',
    });
    if (returnsMercury) score += 10;

    const returnsVenus = /return\s+['"]Venus['"]/.test(js);
    checks.push({
      label: 'Возвращает "Venus" для 2',
      passed: returnsVenus,
      hint: 'Добавьте return "Venus"',
    });
    if (returnsVenus) score += 10;

    const returnsEarth = /return\s+['"]Earth['"]/.test(js);
    checks.push({
      label: 'Возвращает "Earth" для 3',
      passed: returnsEarth,
      hint: 'Добавьте return "Earth"',
    });
    if (returnsEarth) score += 10;

    const returnsMars = /return\s+['"]Mars['"]/.test(js);
    checks.push({
      label: 'Возвращает "Mars" для 4',
      passed: returnsMars,
      hint: 'Добавьте return "Mars"',
    });
    if (returnsMars) score += 10;

    return { passed: score >= (config.passThreshold || 60), score, checks };
  }
}
export default class Task098Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+getTrafficLightAction\s*\(/.test(js);
    checks.push({
      label: "Функция getTrafficLightAction объявлена",
      passed: hasFunction,
      hint: "Создайте функцию getTrafficLightAction(color)",
    });
    if (hasFunction) score += 20;

    const hasSwitch = /\bswitch\s*\(/.test(js);
    checks.push({
      label: "Использован switch",
      passed: hasSwitch,
      hint: "Добавьте конструкцию switch",
    });
    if (hasSwitch) score += 15;

    const hasCase = /\bcase\s+/.test(js);
    checks.push({
      label: "Использованы case",
      passed: hasCase,
      hint: "Добавьте case для каждого цвета",
    });
    if (hasCase) score += 15;

    const hasDefault = /\bdefault\s*:/.test(js);
    checks.push({
      label: "Использован default",
      passed: hasDefault,
      hint: "Добавьте блок default",
    });
    if (hasDefault) score += 10;

    const returnsGo = /return\s+['"]go['"]/.test(js);
    checks.push({
      label: 'Возвращает "go" для green',
      passed: returnsGo,
      hint: 'Добавьте return "go"',
    });
    if (returnsGo) score += 10;

    const returnsWait = /return\s+['"]wait['"]/.test(js);
    checks.push({
      label: 'Возвращает "wait" для yellow',
      passed: returnsWait,
      hint: 'Добавьте return "wait"',
    });
    if (returnsWait) score += 10;

    const returnsStop = /return\s+['"]stop['"]/.test(js);
    checks.push({
      label: 'Возвращает "stop" для red',
      passed: returnsStop,
      hint: 'Добавьте return "stop"',
    });
    if (returnsStop) score += 10;

    const returnsInvalid = /return\s+['"]invalid color['"]/.test(js);
    checks.push({
      label: 'Возвращает "invalid color" для остальных',
      passed: returnsInvalid,
      hint: 'Добавьте return "invalid color"',
    });
    if (returnsInvalid) score += 10;

    return { passed: score >= (config.passThreshold || 60), score, checks };
  }
}
export default class Task016Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;
    const hasFunc = /function\s+sayHello\s*\(\s*\)/.test(js);
    checks.push({
      label: "Функция sayHello объявлена",
      passed: hasFunc,
      hint: "Создайте функцию sayHello()",
    });
    if (hasFunc) score += 50;
    const hasReturn = /return\s+['\"]Hello['\"]/i.test(js);
    checks.push({
      label: "Возврат значения Hello",
      passed: hasReturn,
      hint: 'Добавьте return \"Hello\"',
    });
    if (hasReturn) score += 50;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

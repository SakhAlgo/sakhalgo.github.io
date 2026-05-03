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
    if (hasFunc) score += 30;
    const hasReturn = /console\.log\s*\(?\s*['\"]Hello['\"]/i.test(js);
    checks.push({
      label: "Добавьте console.log()",
      passed: hasReturn,
      hint: 'Добавьте console.log() \"Hello\"',
    });
    if (hasReturn) score += 30;

    const hasCall = /(?<!function\s+)sayHello\s*\(\s*\)/i.test(js);
    checks.push({
      label: "Вызов функции sayHello",
      passed: hasCall,
      hint: 'Добавьте вызов функции sayHello()',
    });
    if (hasCall) score += 40;


    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

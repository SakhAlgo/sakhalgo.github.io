export default class Task020Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;
    const hasFunc = /function\s+start\s*\(\s*\)/.test(js);
    checks.push({
      label: "Функция start() объявлена",
      passed: hasFunc,
      hint: "Создайте функцию start()",
    });
    if (hasFunc) score += 50;
    const hasCall = /start\s*\(\s*\)/.test(js);
    checks.push({
      label: "Функция вызвана",
      passed: hasCall,
      hint: "Вызовите start()",
    });
    if (hasCall) score += 50;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

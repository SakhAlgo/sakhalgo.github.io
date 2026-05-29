export default class Task165Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /queue\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив queue объявлен",
      passed: hasArray,
      hint: "Создайте массив: const queue = [100, 200, 300, 400]",
    });
    if (hasArray) score += 20;

    const hasShift = /queue\.shift\s*\(/.test(js);
    checks.push({
      label: "Использован метод shift",
      passed: hasShift,
      hint: "Вызовите queue.shift()",
    });
    if (hasShift) score += 30;

    const hasConsoleLog = /console\.log\s*\(\s*queue\s*\)/.test(js);
    checks.push({
      label: "Вывод обновлённого массива",
      passed: hasConsoleLog,
      hint: "Выведите queue через console.log(queue)",
    });
    if (hasConsoleLog) score += 50;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
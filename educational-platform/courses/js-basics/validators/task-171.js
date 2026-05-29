export default class Task171Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /nums\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив nums объявлен",
      passed: hasArray,
      hint: "Создайте массив: const nums = [1, 2, 3, 4, 5]",
    });
    if (hasArray) score += 20;

    const hasReverse = /nums\.reverse\s*\(/.test(js);
    checks.push({
      label: "Использован метод reverse",
      passed: hasReverse,
      hint: "Вызовите nums.reverse()",
    });
    if (hasReverse) score += 40;

    const hasConsoleLog = /console\.log\s*\(\s*nums/.test(js);
    checks.push({
      label: "Вывод перевёрнутого массива",
      passed: hasConsoleLog,
      hint: "Выведите nums через console.log(nums)",
    });
    if (hasConsoleLog) score += 40;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
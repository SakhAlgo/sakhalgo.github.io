export default class Task162Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /numbers\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив numbers объявлен",
      passed: hasArray,
      hint: "Создайте массив: const numbers = [1, 2, 3]",
    });
    if (hasArray) score += 15;

    const hasPush = /numbers\.push\s*\(/.test(js);
    checks.push({
      label: "Использован метод push",
      passed: hasPush,
      hint: "Используйте numbers.push(4, 5)",
    });
    if (hasPush) score += 25;

    const hasPushArgs = /numbers\.push\s*\(\s*4\s*,\s*5\s*\)/.test(js);
    checks.push({
      label: "Добавлены числа 4 и 5",
      passed: hasPushArgs,
      hint: "Вызовите numbers.push(4, 5)",
    });
    if (hasPushArgs) score += 20;

    const hasConsoleLog = /console\.log\s*\(\s*numbers\.length\s*\)/.test(js);
    checks.push({
      label: "Вывод длины массива в консоль",
      passed: hasConsoleLog,
      hint: "Выведите numbers.length через console.log()",
    });
    if (hasConsoleLog) score += 40;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
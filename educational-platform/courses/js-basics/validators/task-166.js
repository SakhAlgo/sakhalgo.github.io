export default class Task166Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /scores\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив scores объявлен",
      passed: hasArray,
      hint: "Создайте массив: const scores = [10, 20, 30, 25, 40]",
    });
    if (hasArray) score += 20;

    const hasIndexOf = /scores\.indexOf\s*\(/.test(js);
    checks.push({
      label: "Использован метод indexOf",
      passed: hasIndexOf,
      hint: "Вызовите scores.indexOf(25)",
    });
    if (hasIndexOf) score += 20;

    const hasIndexOfArg = /scores\.indexOf\s*\(\s*25\s*\)/.test(js);
    checks.push({
      label: "Поиск числа 25",
      passed: hasIndexOfArg,
      hint: "Вызовите scores.indexOf(25)",
    });
    if (hasIndexOfArg) score += 30;

    const hasConsoleLog = /console\.log\s*\(\s*scores\.indexOf/.test(js);
    checks.push({
      label: "Вывод результата indexOf в консоль",
      passed: hasConsoleLog,
      hint: "Выведите scores.indexOf(25) через console.log()",
    });
    if (hasConsoleLog) score += 30;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
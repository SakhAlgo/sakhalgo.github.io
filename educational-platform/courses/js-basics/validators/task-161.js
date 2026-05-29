export default class Task161Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /fruits\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив fruits объявлен",
      passed: hasArray,
      hint: "Создайте массив: const fruits = ['apple', 'banana', 'cherry']",
    });
    if (hasArray) score += 15;

    const hasModify = /fruits\s*\[\s*fruits\.length\s*-\s*1\s*\]\s*=\s*'orange'/.test(js);
    checks.push({
      label: "Замена последнего элемента на 'orange'",
      passed: hasModify,
      hint: "Используйте fruits[fruits.length - 1] = 'orange'",
    });
    if (hasModify) score += 35;

    const hasLength = /fruits\.length\s*-\s*1/.test(js);
    checks.push({
      label: "Использование fruits.length - 1",
      passed: hasLength,
      hint: "Обратитесь к последнему элементу через fruits.length - 1",
    });
    if (hasLength) score += 20;

    const hasConsoleLog = /console\.log\s*\(\s*fruits\s*\)/.test(js);
    checks.push({
      label: "Вывод массива fruits в консоль",
      passed: hasConsoleLog,
      hint: "Выведите fruits через console.log(fruits)",
    });
    if (hasConsoleLog) score += 30;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
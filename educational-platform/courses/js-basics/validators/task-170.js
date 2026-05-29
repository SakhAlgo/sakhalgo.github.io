export default class Task170Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArr1 = /arr1\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив arr1 объявлен",
      passed: hasArr1,
      hint: "Создайте массив: const arr1 = [1, 2]",
    });
    if (hasArr1) score += 10;

    const hasArr2 = /arr2\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив arr2 объявлен",
      passed: hasArr2,
      hint: "Создайте массив: const arr2 = [3, 4]",
    });
    if (hasArr2) score += 10;

    const hasConcat = /arr1\.concat\s*\(/.test(js);
    checks.push({
      label: "Использован метод concat",
      passed: hasConcat,
      hint: "Вызовите arr1.concat(arr2)",
    });
    if (hasConcat) score += 15;

    const hasCombined = /(const|let|var)\s+combined\s*=/.test(js);
    checks.push({
      label: "Результат сохранён в переменную combined",
      passed: hasCombined,
      hint: "Создайте: const combined = arr1.concat(arr2)",
    });
    if (hasCombined) score += 25;

    const hasConsoleLog = /console\.log\s*\(\s*combined/.test(js);
    checks.push({
      label: "Вывод объединённого массива",
      passed: hasConsoleLog,
      hint: "Выведите combined через console.log(combined)",
    });
    if (hasConsoleLog) score += 40;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
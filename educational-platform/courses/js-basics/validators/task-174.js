export default class Task174Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasData = /data\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив data объявлен",
      passed: hasData,
      hint: "Создайте массив: let data = [3, 8, 1, 8, 5, 3, 9, 9, 2]",
    });
    if (hasData) score += 10;

    const hasSet = /new\s+Set\s*\(/.test(js);
    checks.push({
      label: "Использован Set для удаления дубликатов",
      passed: hasSet,
      hint: "Используйте [...new Set(data)] для удаления дубликатов",
    });
    if (hasSet) score += 15;

    const hasSpreadSet = /\.\.\.new\s+Set/.test(js);
    checks.push({
      label: "Spread оператор с Set",
      passed: hasSpreadSet,
      hint: "Разверните Set через [...new Set(data)]",
    });
    if (hasSpreadSet) score += 15;

    const hasSortDesc = /sort\s*\(\s*\(.+\)\s*=>\s*/.test(js) && /b\s*-\s*a/.test(js);
    checks.push({
      label: "Сортировка по убыванию (b - a)",
      passed: hasSortDesc,
      hint: "Используйте sort((a, b) => b - a) для сортировки по убыванию",
    });
    if (hasSortDesc) score += 15;

    const hasUnshift = /\.unshift\s*\(\s*0\s*\)/.test(js);
    checks.push({
      label: "Добавление 0 в начало через unshift",
      passed: hasUnshift,
      hint: "Вызовите unshift(0)",
    });
    if (hasUnshift) score += 15;

    const hasPop = /\.pop\s*\(/.test(js);
    checks.push({
      label: "Удаление последнего элемента через pop",
      passed: hasPop,
      hint: "Вызовите pop()",
    });
    if (hasPop) score += 15;

    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Вывод итогового массива в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат через console.log()",
    });
    if (hasConsoleLog) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
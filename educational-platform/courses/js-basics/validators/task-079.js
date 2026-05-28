export default class Task079Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка массива fruits
    const hasArray = /const\s+fruits\s*=\s*\[\s*['"]яблоко['"]\s*,\s*['"]банан['"]\s*,\s*['"]апельсин['"]\s*,\s*['"]виноград['"]\s*,\s*['"]груша['"]\s*\]/.test(js);
    checks.push({
      label: "Массив fruits объявлен правильно",
      passed: hasArray,
      hint: "Объявите const fruits = ['яблоко', 'банан', 'апельсин', 'виноград', 'груша']",
    });
    if (hasArray) score += 15;

    // Проверка цикла for с обратным счётом
    const hasReverseFor = /\bfor\s*\(\s*(let|var)\s+i\s*=\s*fruits\.length\s*-\s*1/.test(js);
    checks.push({
      label: "Цикл начинается с последнего индекса",
      passed: hasReverseFor,
      hint: "Напишите for (let i = fruits.length - 1; i >= 0; i--)",
    });
    if (hasReverseFor) score += 20;

    // Проверка условия i >= 0
    const hasCondition = /i\s*>=\s*0/.test(js);
    checks.push({
      label: "Условие цикла i >= 0",
      passed: hasCondition,
      hint: "Укажите условие i >= 0",
    });
    if (hasCondition) score += 15;

    // Проверка декремента i--
    const hasDecrement = /i--/.test(js);
    checks.push({
      label: "Декремент i--",
      passed: hasDecrement,
      hint: "Уменьшайте i на 1: i--",
    });
    if (hasDecrement) score += 15;

    // Проверка вывода в консоль с индексом
     const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Вывод элемента с индексом в консоль",
      passed: hasConsoleLog,
      hint: "Выведите console.log('Элемент ' + i + ': ' + fruits[i])",
    });
    if (hasConsoleLog) score += 35;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
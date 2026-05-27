export default class Task074Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции findNumber
    const hasFunction = /function\s+findNumber\s*\(/.test(js);
    checks.push({
      label: "Функция findNumber объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function findNumber(arr, target) { ... }",
    });
    if (hasFunction) score += 15;

    // Проверка параметров функции (arr, target)
    const hasParams = /function\s+findNumber\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция принимает два параметра (arr, target)",
      passed: hasParams,
      hint: "Укажите параметры: function findNumber(arr, target)",
    });
    if (hasParams) score += 10;

    // Проверка цикла for
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasFor,
      hint: "Добавьте for (let i = 0; i < arr.length; i++)",
    });
    if (hasFor) score += 15;

    // Проверка условия if (arr[i] === target)
    const hasIf = /\bif\s*\(\s*arr\s*\[\s*i\s*\]\s*===?\s*target\s*\)/.test(js);
    checks.push({
      label: "Проверка arr[i] === target внутри цикла",
      passed: hasIf,
      hint: "Добавьте if (arr[i] === target)",
    });
    if (hasIf) score += 15;

    // Проверка вызова findNumber с правильными аргументами
    const hasCall = /findNumber\s*\(\s*\[\s*3\s*,\s*7\s*,\s*1\s*,\s*9\s*,\s*4\s*\]\s*,\s*1\s*\)/.test(js);
    checks.push({
      label: "Вызов findNumber([3, 7, 1, 9, 4], 1)",
      passed: hasCall,
      hint: "Вызовите findNumber([3, 7, 1, 9, 4], 1)",
    });
    if (hasCall) score += 25;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Добавьте console.log(result) или console.log(findNumber(...))",
    });
    if (hasConsoleLog) score += 10;

    // Проверка что в console.log передается результат вызова функции
    const hasLogWithCall = /console\.log\s*\(\s*findNumber\s*\([^)]+\)\s*\)/.test(js) ||
                           /console\.log\s*\(\s*result\s*\)/.test(js);
    checks.push({
      label: "В console.log передается результат работы функции",
      passed: hasLogWithCall,
      hint: "Напишите console.log(findNumber([3, 7, 1, 9, 4], 1)) или сохраните результат в переменную и выведите её",
    });
    if (hasLogWithCall) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
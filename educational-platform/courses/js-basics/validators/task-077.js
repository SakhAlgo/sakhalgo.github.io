export default class Task077Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка массива numbers
    const hasArray = /const\s+numbers\s*=\s*\[\s*5\s*,\s*12\s*,\s*8\s*,\s*3\s*,\s*10\s*\]/.test(js);
    checks.push({
      label: "Массив numbers объявлен с элементами [5, 12, 8, 3, 10]",
      passed: hasArray,
      hint: "Объявите const numbers = [5, 12, 8, 3, 10]",
    });
    if (hasArray) score += 15;

    // Проверка переменной sum
    const hasSum = /\b(let|var)\s+sum\s*=\s*0/.test(js);
    checks.push({
      label: "Переменная sum инициализирована нулём",
      passed: hasSum,
      hint: "Создайте let sum = 0",
    });
    if (hasSum) score += 15;

    // Проверка цикла for
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasFor,
      hint: "Добавьте for (let i = 0; i < numbers.length; i++)",
    });
    if (hasFor) score += 15;

    // Проверка использования length
    const hasLength = /numbers\.length/.test(js);
    checks.push({
      label: "Использовано numbers.length в условии цикла",
      passed: hasLength,
      hint: "Укажите i < numbers.length в цикле",
    });
    if (hasLength) score += 10;

    // Проверка суммирования
    const hasSummation = /sum\s*\+=\s*numbers\s*\[\s*i\s*\]/.test(js);
    checks.push({
      label: "Суммирование элементов: sum += numbers[i]",
      passed: hasSummation,
      hint: "Внутри цикла добавьте sum += numbers[i]",
    });
    if (hasSummation) score += 15;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Вывод суммы в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат",
    });
    if (hasConsoleLog) score += 20;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
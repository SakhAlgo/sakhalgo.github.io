export default class Task078Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка массива numbers
    const hasArray = /const\s+numbers\s*=\s*\[\s*23\s*,\s*45\s*,\s*12\s*,\s*67\s*,\s*34\s*,\s*89\s*,\s*5\s*\]/.test(js);
    checks.push({
      label: "Массив numbers объявлен правильно",
      passed: hasArray,
      hint: "Объявите const numbers = [23, 45, 12, 67, 34, 89, 5]",
    });
    if (hasArray) score += 15;

    // Проверка переменной max
    const hasMax = /(let|var)\s+max\s*=\s*numbers\s*\[\s*0\s*\]/.test(js);
    checks.push({
      label: "Переменная max инициализирована первым элементом",
      passed: hasMax,
      hint: "Создайте let max = numbers[0]",
    });
    if (hasMax) score += 15;

    // Проверка цикла for с i = 1
    const hasForStart = /\bfor\s*\(\s*(let|var)\s+i\s*=\s*1/.test(js);
    checks.push({
      label: "Цикл начинается с i = 1",
      passed: hasForStart,
      hint: "Напишите for (let i = 1; i < numbers.length; i++)",
    });
    if (hasForStart) score += 15;

    // Проверка условия if (numbers[i] > max)
    const hasIf = /\bif\s*\(\s*numbers\s*\[\s*i\s*\]\s*>\s*max\s*\)/.test(js);
    checks.push({
      label: "Проверка numbers[i] > max",
      passed: hasIf,
      hint: "Добавьте if (numbers[i] > max)",
    });
    if (hasIf) score += 15;

    // Проверка обновления max
    const hasUpdate = /max\s*=\s*numbers\s*\[\s*i\s*\]/.test(js);
    checks.push({
      label: "Обновление переменной max",
      passed: hasUpdate,
      hint: "Внутри if присвойте max = numbers[i]",
    });
    if (hasUpdate) score += 15;

    // Проверка вывода в консоль
     const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Вывод максимума в консоль",
      passed: hasConsoleLog,
      hint: "Выведите console.log('Максимальное число: ' + max)",
    });
    if (hasConsoleLog) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
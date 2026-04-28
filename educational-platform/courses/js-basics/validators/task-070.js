export default class Task070Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия цикла for
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasFor,
      hint: "Добавьте цикл for (let i = 1; i <= 5; i++)",
    });
    if (hasFor) score += 20;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Вывод в консоль через console.log()",
      passed: hasConsoleLog,
      hint: "Используйте console.log(i) для вывода числа",
    });
    if (hasConsoleLog) score += 15;

    // Проверка итерации от 1 до 5
    const hasRange1to5 = /i\s*<=\s*5/.test(js);
    checks.push({
      label: "Цикл выполняется до i <= 5",
      passed: hasRange1to5,
      hint: "Укажите условие i <= 5 в цикле",
    });
    if (hasRange1to5) score += 15;

    // Проверка, что console.log выводит i
    const hasConsoleLogI = /console\.log\s*\(\s*i\s*\)/.test(js);
    checks.push({
      label: "Выводится значение счётчика i через console.log(i)",
      passed: hasConsoleLogI,
      hint: "Добавьте console.log(i) внутри цикла",
    });
    if (hasConsoleLogI) score += 20;

    // Проверка инкремента i++
    const hasIncrement = /i\s*\+\+/.test(js);
    checks.push({
      label: "Есть инкремент i++ (шаг цикла)",
      passed: hasIncrement,
      hint: "Добавьте i++ в цикле",
    });
    if (hasIncrement) score += 10;

    // Проверка правильного синтаксиса for
    const hasFullFor = /\bfor\s*\(\s*(let|var)\s+i\s*=\s*1/.test(js);
    checks.push({
      label: "Цикл for с let i = 1",
      passed: hasFullFor,
      hint: "Напишите for (let i = 1; i <= 5; i++)",
    });
    if (hasFullFor) score += 20;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
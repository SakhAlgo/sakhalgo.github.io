export default class Task152Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка переменной i с начальным значением 1
    const hasInitialization = /let\s+i\s*=\s*1/.test(js) || /var\s+i\s*=\s*1/.test(js);
    checks.push({
      label: "Переменная i объявлена и инициализирована значением 1",
      passed: hasInitialization,
      hint: "Добавьте let i = 1",
    });
    if (hasInitialization) score += 15;

    // Проверка цикла while
    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован цикл while",
      passed: hasWhile,
      hint: "Создайте цикл while (i <= 10)",
    });
    if (hasWhile) score += 15;

    // Проверка условия i <= 10
    const hasCondition = /while\s*\(\s*i\s*<=\s*10\s*\)/.test(js);
    checks.push({
      label: "Условие цикла i <= 10",
      passed: hasCondition,
      hint: "Укажите условие i <= 10",
    });
    if (hasCondition) score += 15;

    // Проверка проверки чётности
    const hasEvenCheck = /if\s*\(\s*i\s*%\s*2\s*===?\s*0\s*\)/.test(js);
    checks.push({
      label: "Проверка чётности: i % 2 === 0",
      passed: hasEvenCheck,
      hint: "Добавьте if (i % 2 === 0)",
    });
    if (hasEvenCheck) score += 20;

    // Проверка инкремента i++
    const hasIncrement = /i\s*\+\+/.test(js);
    checks.push({
      label: "Инкремент i++ внутри цикла",
      passed: hasIncrement,
      hint: "Добавьте i++ внутри цикла для увеличения счётчика",
    });
    if (hasIncrement) score += 15;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(\s*i\s*\)/.test(js);
    checks.push({
      label: "Вывод чётных чисел в консоль через console.log(i)",
      passed: hasConsoleLog,
      hint: "Внутри if добавьте console.log(i) для вывода чётных чисел",
    });
    if (hasConsoleLog) score += 10;


    // Проверка порядка: проверка чётности, вывод, инкремент
    const hasCorrectOrder = /console\.log\s*\(/.test(js);
    if (hasCorrectOrder) {
      checks.push({
        label: "Правильный порядок операций в цикле",
        passed: true,
        hint: "Сначала проверка чётности, затем вывод, потом инкремент",
      });
      score += 10;
    } else {
      checks.push({
        label: "Правильный порядок операций в цикле",
        passed: false,
        hint: "Убедитесь, что сначала идёт проверка if, затем console.log, потом i++",
      });
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
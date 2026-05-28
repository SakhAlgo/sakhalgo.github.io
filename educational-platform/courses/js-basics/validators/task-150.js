export default class Task150Validator {
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
    if (hasInitialization) score += 20;

    // Проверка цикла while
    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован цикл while",
      passed: hasWhile,
      hint: "Создайте цикл while (i <= 5)",
    });
    if (hasWhile) score += 20;

    // Проверка условия i <= 5
    const hasCondition = /while\s*\(\s*i\s*<=\s*5\s*\)/.test(js);
    checks.push({
      label: "Условие цикла i <= 5",
      passed: hasCondition,
      hint: "Укажите условие i <= 5",
    });
    if (hasCondition) score += 15;

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
      label: "Вывод i в консоль через console.log(i)",
      passed: hasConsoleLog,
      hint: "Внутри цикла добавьте console.log(i)",
    });
    if (hasConsoleLog) score += 20;

    // Проверка порядка: сначала console.log, потом i++ (или наоборот)
    const hasLogThenIncrement = /console\.log\s*\(\s*i\s*\)\s*;?\s*i\s*\+?\+?/.test(js);
    const hasIncrementThenLog = /i\s*\+\+\s*;?\s*console\.log\s*\(\s*i\s*\)/.test(js);
    const hasCorrectOrder = hasLogThenIncrement || hasIncrementThenLog;
    
    if (hasCorrectOrder) {
      checks.push({
        label: "Правильный порядок: вывод и инкремент в цикле",
        passed: true,
        hint: "Убедитесь, что console.log(i) и i++ находятся внутри цикла",
      });
      score += 10;
    } else {
      checks.push({
        label: "Правильный порядок: вывод и инкремент в цикле",
        passed: false,
        hint: "Убедитесь, что console.log(i) и i++ находятся внутри цикла",
      });
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
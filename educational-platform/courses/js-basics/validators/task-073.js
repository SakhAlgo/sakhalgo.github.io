export default class Task073Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка for...of
    const hasForOf = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasForOf,
      hint: "Добавьте for (const fruit of fruits)",
    });
    if (hasForOf) score += 20;

    // Проверка ключевого слова of
    const hasOf = /\bof\b/.test(js);
    checks.push({
      label: "Использовано ключевое слово of (for...of)",
      passed: hasOf,
      hint: "Напишите for (const fruit of fruits)",
    });
    if (hasOf) score += 20;

    // Проверка массива fruits
    const hasFruits = /\bfruits\b/.test(js);
    checks.push({
      label: "Массив fruits существует",
      passed: hasFruits,
      hint: "Объявите const fruits = ['яблоко', 'банан', 'апельсин']",
    });
    if (hasFruits) score += 15;

    // Проверка переменной для элемента
    const hasElement = /\bconst\s+\w+\s+of\b/.test(js) || /\blet\s+\w+\s+of\b/.test(js);
    checks.push({
      label: "Объявлена переменная для элемента массива",
      passed: hasElement,
      hint: "Используйте const fruit of fruits",
    });
    if (hasElement) score += 15;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Добавьте console.log(fruit) внутри цикла",
    });
    if (hasConsoleLog) score += 20;

    // Проверка что fruit передается в console.log
    const hasFruitInLog = /console\.log\s*\(\s*fruit\s*\)/.test(js);
    checks.push({
      label: "В console.log передается fruit",
      passed: hasFruitInLog,
      hint: "Напишите console.log(fruit)",
    });
    if (hasFruitInLog) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
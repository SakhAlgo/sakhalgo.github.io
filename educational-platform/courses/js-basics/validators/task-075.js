export default class Task075Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка цикла for
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasFor,
      hint: "Добавьте for (let i = 1; i <= 10; i++)",
    });
    if (hasFor) score += 15;

    // Проверка continue
    const hasContinue = /\bcontinue\b/.test(js);
    checks.push({
      label: "Использован оператор continue",
      passed: hasContinue,
      hint: "Добавьте continue для пропуска нечётных чисел",
    });
    if (hasContinue) score += 10;

    // Проверка проверки на чётность (i % 2 !== 0 или i % 2 == 1)
    const hasOddCheck = /i\s*%\s*2\s*(!==?|==?)\s*0/.test(js) || /i\s*%\s*2\s*(==?|===?)\s*1/.test(js);
    checks.push({
      label: "Проверка на нечётность (i % 2 !== 0) для continue",
      passed: hasOddCheck,
      hint: "Добавьте if (i % 2 !== 0) { continue; }",
    });
    if (hasOddCheck) score += 10;

    // Проверка вывода в консоль (console.log)
    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Использован console.log для вывода",
      passed: hasConsoleLog,
      hint: "Добавьте console.log(i) для вывода чётных чисел",
    });
    if (hasConsoleLog) score += 15;

    // Проверка что в console.log передается i
    const hasLogWithI = /console\.log\s*\(\s*i\s*\)/.test(js);
    checks.push({
      label: "В console.log передается переменная i",
      passed: hasLogWithI,
      hint: "Напишите console.log(i) внутри цикла после проверки",
    });
    if (hasLogWithI) score += 15;

    // Проверка диапазона 1..10
    const hasRange = /i\s*<=\s*10/.test(js);
    checks.push({
      label: "Цикл от 1 до 10 включительно",
      passed: hasRange,
      hint: "Укажите i <= 10 в цикле",
    });
    if (hasRange) score += 15;

    // Проверка начального значения (let i = 1)
    const hasStartValue = /let\s+i\s*=\s*1/.test(js);
    checks.push({
      label: "Цикл начинается с 1",
      passed: hasStartValue,
      hint: "Инициализируйте let i = 1",
    });
    if (hasStartValue) score += 10;

    // Проверка что continue находится внутри if
    const hasIfWithContinue = /\bif\s*\([^)]+\)\s*\{\s*continue\s*;?\s*\}/.test(js);
    checks.push({
      label: "continue находится внутри условия if",
      passed: hasIfWithContinue,
      hint: "Используйте if (условие) { continue; }",
    });
    if (hasIfWithContinue) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
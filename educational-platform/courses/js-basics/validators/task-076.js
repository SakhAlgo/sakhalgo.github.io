export default class Task076Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка внешнего цикла for
    const hasOuterFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasOuterFor,
      hint: "Добавьте for (let i = 1; i <= 3; i++)",
    });
    if (hasOuterFor) score += 15;

    // Проверка вложенности: два цикла for
    const forMatches = js.match(/\bfor\s*\(/g);
    const hasNested = forMatches && forMatches.length >= 2;
    checks.push({
      label: "Два вложенных цикла for (внешний и внутренний)",
      passed: hasNested,
      hint: "Внутри одного for добавьте ещё один for (let j = 1; j <= 3; j++)",
    });
    if (hasNested) score += 10;

    // Проверка переменной i (внешний цикл)
    const hasOuterVar = /\bfor\s*\(\s*(let|var)\s+i\s*=\s*1/.test(js);
    checks.push({
      label: "Внешний цикл с let i = 1",
      passed: hasOuterVar,
      hint: "Напишите for (let i = 1; i <= 3; i++)",
    });
    if (hasOuterVar) score += 10;

    // Проверка переменной j (внутренний цикл)
    const hasInnerVar = /\bfor\s*\(\s*(let|var)\s+j\s*=\s*1/.test(js);
    checks.push({
      label: "Внутренний цикл с let j = 1",
      passed: hasInnerVar,
      hint: "Напишите for (let j = 1; j <= 3; j++)",
    });
    if (hasInnerVar) score += 10;

    // Проверка внутреннего цикла до 3
    const hasInnerCondition = /j\s*<=\s*3/.test(js);
    checks.push({
      label: "Внутренний цикл до j <= 3",
      passed: hasInnerCondition,
      hint: "Укажите j <= 3 во внутреннем цикле",
    });
    if (hasInnerCondition) score += 10;

    // Проверка умножения i * j
    const hasMultiplication = /\bi\s*\*\s*j\b/.test(js);
    checks.push({
      label: "Умножение i * j в выводе",
      passed: hasMultiplication,
      hint: "Вычислите произведение i * j",
    });
    if (hasMultiplication) score += 15;

    // Проверка формирования строки с форматом i x j = результат
    const hasFormatString = /['"`][ix*]\s*\+\s*i\s*\+\s*['"`][x*]\s*\+\s*j\s*\+\s*['"`]=['"`]\s*\+\s*\(?\s*i\s*\*\s*j\s*\)?/.test(js) ||
                           /i\s*\+\s*['"`]x['"`]\s*\+\s*j\s*\+\s*['"`]=['"`]\s*\+\s*\(?\s*i\s*\*\s*j/.test(js);
    checks.push({
      label: "Форматирование строки: i + 'x' + j + '=' + (i*j)",
      passed: hasFormatString,
      hint: "Используйте формат i + 'x' + j + '=' + (i * j)",
    });
    if (hasFormatString) score += 10;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Использован console.log для вывода",
      passed: hasConsoleLog,
      hint: "Добавьте console.log(row) или console.log(result)",
    });
    if (hasConsoleLog) score += 10;

    // Проверка что в console.log передается строка с результатом
    const hasLogWithResult = /console\.log\s*\(\s*(?:row|result|[^)]*[ix][^)]*\*\s*[ji][^)]*)\s*\)/.test(js);
    checks.push({
      label: "В console.log передается результат вычислений",
      passed: hasLogWithResult,
      hint: "Выведите сформированную строку через console.log()",
    });
    if (hasLogWithResult) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
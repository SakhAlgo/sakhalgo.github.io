export default class Task019Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // 1. Проверка: стрелочная функция square объявлена
    const hasArrow = /square\s*=\s*\([^)]*\)\s*=>/.test(js);
    checks.push({
      label: "Стрелочная функция square объявлена",
      passed: hasArrow,
      hint: "Создайте стрелочную функцию const square = (x) => ...",
    });
    if (hasArrow) score += 30;

    // 2. Проверка: функция принимает параметр
    const hasParam = /square\s*=\s*\(\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Стрелочная функция принимает параметр",
      passed: hasParam,
      hint: "Добавьте параметр, например (x)",
    });
    if (hasParam) score += 20;

    // 3. Проверка: возвращает x * x
    const hasSquare = /x\s*\*\s*x/.test(js);
    checks.push({
      label: "Возврат x * x (квадрат числа)",
      passed: hasSquare,
      hint: "Верните x * x",
    });
    if (hasSquare) score += 25;

    // 4. Проверка: вызов функции с аргументом 5 и вывод результата
    const hasCall = /square\s*\(\s*5\s*\)/.test(js);
    const hasOutput =
      /console\.log\s*\(/.test(js) || /\.textContent\s*=/.test(js);
    checks.push({
      label: "Вызовите square(5) и выведите результат (console.log или DOM)",
      passed: hasCall && hasOutput,
      hint: "Вызовите square(5) и выведите результат через console.log или DOM",
    });
    if (hasCall && hasOutput) score += 25;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

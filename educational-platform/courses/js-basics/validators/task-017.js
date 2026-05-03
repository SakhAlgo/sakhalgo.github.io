export default class Task017Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // 1. Проверка: функция greet объявлена
    const hasFunc = /function\s+greet\s*\(/.test(js);
    checks.push({
      label: "Функция greet объявлена",
      passed: hasFunc,
      hint: "Создайте функцию greet()",
    });
    if (hasFunc) score += 30;

    // 2. Проверка: функция принимает параметр name
    const hasParam = /function\s+greet\s*\(\s*name\s*\)/.test(js);
    checks.push({
      label: "Функция greet принимает параметр name",
      passed: hasParam,
      hint: "Добавьте параметр name в функцию greet",
    });
    if (hasParam) score += 30;

    // 3. Проверка: функция выводит результат (console.log или DOM)
    const hasOutput =
      /console\.log\s*\(/.test(js) || /\.textContent\s*=/.test(js);
    checks.push({
      label: "Функция выводит результат (console.log или DOM)",
      passed: hasOutput,
      hint: "Добавьте console.log() или обновите DOM для вывода приветствия",
    });
    if (hasOutput) score += 40;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

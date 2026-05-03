export default class Task020Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // 1. Проверка: функция start объявлена
    const hasFunc = /function\s+start\s*\(/.test(js);
    checks.push({
      label: "Функция start объявлена",
      passed: hasFunc,
      hint: "Создайте функцию start()",
    });
    if (hasFunc) score += 20;

    // 2. Проверка: функция принимает параметр name
    const hasParam = /function\s+start\s*\(\s*name\s*\)/.test(js);
    checks.push({
      label: "Функция start принимает параметр name",
      passed: hasParam,
      hint: "Добавьте параметр name в функцию start",
    });
    if (hasParam) score += 25;

    // 3. Проверка: вывод 'Started ' + значение параметра (console.log или DOM)
    const hasOutput =
      /['"]Started\s*['"]\s*\+/.test(js) || /['"]Started\s+server['"]/.test(js);
    checks.push({
      label: "Функция выводит 'Started ' + значение параметра",
      passed: hasOutput,
      hint: "Добавьте вывод 'Started ' + name",
    });
    if (hasOutput) score += 30;

    // 4. Проверка: вызов функции start с аргументом 'server'
    const hasCall = /start\s*\(\s*['"]server['"]\s*\)/.test(js);
    checks.push({
      label: "Вызовите start('server')",
      passed: hasCall,
      hint: "Вызовите функцию start с аргументом 'server'",
    });
    if (hasCall) score += 25;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

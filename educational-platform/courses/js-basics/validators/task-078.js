export default class Task078Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка цикла for...in
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasFor,
      hint: "Добавьте for (const key in user)",
    });
    if (hasFor) score += 15;

    // Проверка ключевого слова in
    const hasIn = /\bin\b/.test(js);
    checks.push({
      label: "Использовано ключевое слово in (for...in)",
      passed: hasIn,
      hint: "Напишите for (const key in user)",
    });
    if (hasIn) score += 20;

    // Проверка объекта user
    const hasUser = /const\s+user\s*=/.test(js);
    checks.push({
      label: "Объект user объявлен",
      passed: hasUser,
      hint: "Объявите const user = { name: 'Алиса', age: 25, city: 'Москва' }",
    });
    if (hasUser) score += 15;

    // Проверка доступа через скобочную нотацию user[key]
    const hasBracketNotation = /user\s*\[\s*key\s*\]/.test(js);
    checks.push({
      label: "Обращение к свойству через user[key]",
      passed: hasBracketNotation,
      hint: "Используйте user[key] для получения значения",
    });
    if (hasBracketNotation) score += 20;

    // Проверка вывода в формате "ключ: значение"
    const hasOutputFormat = /key.*:.*user/.test(js) || /user.*key/.test(js);
    checks.push({
      label: "Вывод в формате 'ключ: значение'",
      passed: hasOutputFormat,
      hint: "Выведите key + ': ' + user[key]",
    });
    if (hasOutputFormat) score += 15;

    // Проверка вывода
    const hasOutput = /textContent\s*\+=/.test(js);
    checks.push({
      label: "Вывод результата в #output",
      passed: hasOutput,
      hint: "Используйте textContent += key",
    });
    if (hasOutput) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
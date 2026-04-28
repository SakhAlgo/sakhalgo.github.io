export default class Task074Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции findNumber
    const hasFunction = /function\s+findNumber\s*\(/.test(js);
    checks.push({
      label: "Функция findNumber объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function findNumber(arr, target) { ... }",
    });
    if (hasFunction) score += 15;

    // Проверка цикла for
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Использован цикл for",
      passed: hasFor,
      hint: "Добавьте for (let i = 0; i < arr.length; i++)",
    });
    if (hasFor) score += 15;

    // Проверка условия if (arr[i] === target)
    const hasIf = /\bif\s*\(\s*arr\s*\[\s*i\s*\]\s*===?\s*target\s*\)/.test(js);
    checks.push({
      label: "Проверка arr[i] === target внутри цикла",
      passed: hasIf,
      hint: "Добавьте if (arr[i] === target)",
    });
    if (hasIf) score += 15;

    // Проверка return i (возврат индекса)
    const hasReturnIndex = /return\s+i/.test(js);
    checks.push({
      label: "Возврат индекса найденного элемента (return i)",
      passed: hasReturnIndex,
      hint: "Добавьте return i; если элемент найден",
    });
    if (hasReturnIndex) score += 15;

    // Проверка return -1
    const hasReturnNegative = /return\s+-1/.test(js);
    checks.push({
      label: "Возврат -1 если элемент не найден",
      passed: hasReturnNegative,
      hint: "Добавьте return -1; после цикла",
    });
    if (hasReturnNegative) score += 15;

    // Проверка использования arr.length
    const hasLength = /arr\.length/.test(js);
    checks.push({
      label: "Использовано arr.length в условии цикла",
      passed: hasLength,
      hint: "Укажите i < arr.length в цикле",
    });
    if (hasLength) score += 10;

    // Проверка вызова findNumber
    const hasCall = /findNumber\s*\(/.test(js);
    checks.push({
      label: "Функция findNumber вызывается",
      passed: hasCall,
      hint: "Вызовите findNumber(numbers, 30)",
    });
    if (hasCall) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
export default class Task158Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+fibonacci\s*\(/.test(js);
    checks.push({ label: "Объявлена функция fibonacci", passed: hasFunction, hint: "Добавьте function fibonacci(n) { ... }" });
    if (hasFunction) score += 15;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте цикл while" });
    if (hasWhile) score += 15;

    const hasArray = /let\s+arr\s*=\s*\[/.test(js);
    checks.push({ label: "Создан массив arr", passed: hasArray, hint: "Создайте массив [0, 1]" });
    if (hasArray) score += 15;

    const hasPush = /\.push\s*\(/.test(js);
    checks.push({ label: "Добавление в массив .push()", passed: hasPush, hint: "Добавьте arr.push()" });
    if (hasPush) score += 15;

    const hasFibonacciSum = /arr\[i\s*-\s*1\]\s*\+\s*arr\[i\s*-\s*2\]/.test(js);
    checks.push({ label: "Вычисление суммы двух предыдущих", passed: hasFibonacciSum, hint: "Используйте arr[i-1] + arr[i-2]" });
    if (hasFibonacciSum) score += 20;

    const hasReturn = /\breturn\s+arr/.test(js);
    checks.push({ label: "Возврат массива arr", passed: hasReturn, hint: "Верните arr" });
    if (hasReturn) score += 10;

    const hasOutput = /textContent\s*\+?=/.test(js);
    checks.push({ label: "Вывод в #output", passed: hasOutput, hint: "Выведите результат в #output" });
    if (hasOutput) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
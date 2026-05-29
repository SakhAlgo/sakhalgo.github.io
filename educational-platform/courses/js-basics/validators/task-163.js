export default class Task163Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /items\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив items объявлен",
      passed: hasArray,
      hint: "Создайте массив: const items = ['a', 'b', 'c', 'd']",
    });
    if (hasArray) score += 10;

    const hasPop = /items\.pop\s*\(/.test(js);
    checks.push({
      label: "Использован метод pop",
      passed: hasPop,
      hint: "Вызовите items.pop() и сохраните результат в переменную",
    });
    if (hasPop) score += 15;

    const hasRemoved = /\s*removed\s*/.test(js);
    checks.push({
      label: "Переменная для удалённого элемента",
      passed: hasRemoved,
      hint: "Создайте переменную: const removed = items.pop()",
    });
    if (hasRemoved) score += 25;

    const hasConsoleLogRemoved = /\s*removed\s*/.test(js);
    checks.push({
      label: "Вывод удалённого элемента",
      passed: hasConsoleLogRemoved,
      hint: "Выведите removed через console.log(removed)",
    });
    if (hasConsoleLogRemoved) score += 25;

    const hasConsoleLogItems = /\s*\items\s*/.test(js);
    checks.push({
      label: "Вывод оставшегося массива",
      passed: hasConsoleLogItems,
      hint: "Выведите items через console.log(items)",
    });
    if (hasConsoleLogItems) score += 25;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
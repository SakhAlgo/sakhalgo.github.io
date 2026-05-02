export default class Task054Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия функции getOrderStatus
    const hasFunction = /function\s+getOrderStatus\s*\(/.test(js);
    checks.push({
      label: "Функция getOrderStatus объявлена",
      passed: hasFunction,
      hint: "Создайте функцию getOrderStatus(isPaid, isShipped)",
    });
    if (hasFunction) score += 20;

    // Проверка использования if
    const hasIf = /\bif\s*\(/.test(js);
    checks.push({
      label: "Использован if",
      passed: hasIf,
      hint: "Добавьте условие if",
    });
    if (hasIf) score += 10;

    // Проверка использования тернарного оператора
    const hasTernary = /\?[^:]*:/.test(js);
    checks.push({
      label: "Использован тернарный оператор (?:)",
      passed: hasTernary,
      hint: "Добавьте тернарный оператор ? :",
    });
    if (hasTernary) score += 25;

    // Проверка возврата 'awaiting payment'
    const returnsAwaiting =
      /return\s+['"]awaiting\s*payment['"]/.test(js);
    checks.push({
      label: 'Возвращает "awaiting payment" если не оплачен',
      passed: returnsAwaiting,
      hint: 'Добавьте return "awaiting payment"',
    });
    if (returnsAwaiting) score += 15;

    // Проверка возврата 'processing'
    const returnsProcessing = /return\s+['"]processing['"]/.test(js);
    checks.push({
      label: 'Возвращает "processing" если оплачен, но не отправлен',
      passed: returnsProcessing,
      hint: 'Добавьте return "processing"',
    });
    if (returnsProcessing) score += 15;

    // Проверка возврата 'shipped'
    const returnsShipped = /return\s+['"]shipped['"]/.test(js);
    checks.push({
      label: 'Возвращает "shipped" если оплачен и отправлен',
      passed: returnsShipped,
      hint: 'Добавьте return "shipped"',
    });
    if (returnsShipped) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
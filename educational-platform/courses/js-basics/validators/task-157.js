export default class Task157Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+sumDigits\s*\(/.test(js);
    checks.push({ label: "Объявлена функция sumDigits", passed: hasFunction, hint: "Добавьте function sumDigits(n) { ... }" });
    if (hasFunction) score += 15;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте while (n > 0)" });
    if (hasWhile) score += 20;

    const hasMod = /n\s*%\s*10/.test(js);
    checks.push({ label: "Взятие цифры n % 10", passed: hasMod, hint: "Используйте n % 10 для получения цифры" });
    if (hasMod) score += 20;

    const hasFloor = /Math\.floor\s*\(\s*n\s*\/\s*10\s*\)/.test(js);
    checks.push({ label: "Удаление цифры Math.floor(n / 10)", passed: hasFloor, hint: "Используйте Math.floor(n / 10)" });
    if (hasFloor) score += 15;

    const hasSumAccum = /sum\s*\+=\s*n\s*%\s*10/.test(js);
    checks.push({ label: "Накопление суммы: sum += n % 10", passed: hasSumAccum, hint: "Добавьте sum += n % 10" });
    if (hasSumAccum) score += 15;

    const hasReturn = /\breturn\s+sum/.test(js);
    checks.push({ label: "Возврат sum", passed: hasReturn, hint: "Верните sum" });
    if (hasReturn) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
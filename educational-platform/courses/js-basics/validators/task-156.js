export default class Task156Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+getDigits\s*\(/.test(js);
    checks.push({ label: "Объявлена функция getDigits", passed: hasFunction, hint: "Добавьте function getDigits(n) { ... }" });
    if (hasFunction) score += 15;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте while (n > 0)" });
    if (hasWhile) score += 15;

    const hasMod = /n\s*%\s*10/.test(js);
    checks.push({ label: "Взятие цифры n % 10", passed: hasMod, hint: "Используйте n % 10 для получения цифры" });
    if (hasMod) score += 20;

    const hasFloor = /Math\.floor\s*\(\s*n\s*\/\s*10\s*\)/.test(js);
    checks.push({ label: "Удаление цифры Math.floor(n / 10)", passed: hasFloor, hint: "Используйте Math.floor(n / 10)" });
    if (hasFloor) score += 15;

    const hasPush = /\.push\s*\(/.test(js);
    checks.push({ label: "Добавление в массив .push()", passed: hasPush, hint: "Добавьте digits.push()" });
    if (hasPush) score += 10;

    const hasReverse = /\.reverse\s*\(/.test(js);
    checks.push({ label: "Переворот массива .reverse()", passed: hasReverse, hint: "Цифры добавляются с конца, примените .reverse()" });
    if (hasReverse) score += 10;

    const hasReturn = /\breturn\s+digits/.test(js);
    checks.push({ label: "Возврат массива digits", passed: hasReturn, hint: "Верните digits" });
    if (hasReturn) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
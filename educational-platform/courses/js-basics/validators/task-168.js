export default class Task168Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /letters\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив letters объявлен",
      passed: hasArray,
      hint: "Создайте массив: const letters = ['a', 'b', 'c', 'd', 'e']",
    });
    if (hasArray) score += 15;

    const hasSlice = /letters\.slice\s*\(/.test(js);
    checks.push({
      label: "Использован метод slice",
      passed: hasSlice,
      hint: "Вызовите letters.slice(1, 4)",
    });
    if (hasSlice) score += 15;

    const hasSliceArgs = /letters\.slice\s*\(\s*1\s*,\s*4\s*\)/.test(js);
    checks.push({
      label: "Параметры slice(1, 4)",
      passed: hasSliceArgs,
      hint: "Вызовите letters.slice(1, 4)",
    });
    if (hasSliceArgs) score += 20;

    const hasPart = /(const|let|var)\s+part\s*=/.test(js);
    checks.push({
      label: "Новый массив сохранён в переменную part",
      passed: hasPart,
      hint: "Создайте переменную: const part = letters.slice(1, 4)",
    });
    if (hasPart) score += 20;

    const hasConsoleLog = /console\.log\s*\(\s*part/.test(js);
    checks.push({
      label: "Вывод нового массива part",
      passed: hasConsoleLog,
      hint: "Выведите part через console.log(part)",
    });
    if (hasConsoleLog) score += 30;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
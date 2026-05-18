export default class Task048Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия функции canAccess
    const hasFunction = /function\s+canAccess\s*\(/.test(js);
    checks.push({
      label: "Функция canAccess объявлена",
      passed: hasFunction,
      hint: "Создайте функцию canAccess(age, hasLicense)",
    });
    if (hasFunction) score += 15;

    // Проверка использования if с age >= 18
    const hasAgeCheck = /if\s*\(\s*age\s*>=\s*18/.test(js);
    checks.push({
      label: "Проверка age >= 18",
      passed: hasAgeCheck,
      hint: "Добавьте условие if (age >= 18)",
    });
    if (hasAgeCheck) score += 15;

    // Проверка использования else
    const hasElse = /\belse\b/.test(js);
    checks.push({
      label: "Использован else",
      passed: hasElse,
      hint: "Добавьте блок else",
    });
    if (hasElse) score += 25;

    // Проверка возврата 'drive'
    const returnsDrive = /return\s+['"]drive['"]/.test(js);
    checks.push({
      label: 'Возвращает "drive" при age >= 18 и hasLicense === true',
      passed: returnsDrive,
      hint: 'Добавьте return "drive"',
    });
    if (returnsDrive) score += 15;

    // Проверка возврата 'no license'
    const returnsNoLicense = /return\s+['"]no\s*license['"]/.test(js);
    checks.push({
      label: 'Возвращает "no license" при age >= 18 и hasLicense === false',
      passed: returnsNoLicense,
      hint: 'Добавьте return "no license"',
    });
    if (returnsNoLicense) score += 15;

    // Проверка возврата 'too young'
    const returnsTooYoung = /return\s+['"]too\s*young['"]/.test(js);
    checks.push({
      label: 'Возвращает "too young" при age < 18',
      passed: returnsTooYoung,
      hint: 'Добавьте return "too young"',
    });
    if (returnsTooYoung) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

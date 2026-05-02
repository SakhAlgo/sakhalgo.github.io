export default class Task125PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bfor\b.*\bin\b.*\[?\]?/.test(pyCode)) {
      checks.push({ name: "Используется list comprehension (for)", passed: true, label: "Используется list comprehension (for)" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результат выведен", passed: true, label: "Результат выведен" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

export default class Task118PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bfor\b/.test(pyCode) && /\brange\b/.test(pyCode)) {
      checks.push({ name: "Используется цикл for", passed: true, label: "Используется цикл for" });
    }

    if (/\btotal\b/.test(pyCode)) {
      checks.push({ name: "Переменная total используется", passed: true, label: "Переменная total используется" });
    }

    if (/print\s*\(\s*total\s*\)/.test(pyCode)) {
      checks.push({ name: "Результат выведен через print()", passed: true, label: "Результат выведен через print()" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

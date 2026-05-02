export default class Task134PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bin\b/.test(pyCode)) {
      checks.push({ name: "Проверка через in", passed: true, label: "Проверка через in" });
    }

    if (/\.find\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .find()", passed: true, label: "Используется .find()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результаты выведены", passed: true, label: "Результаты выведены" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

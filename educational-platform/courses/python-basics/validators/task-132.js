export default class Task132PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.format\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .format()", passed: true, label: "Используется .format()" });
    }

    if (/f["\x27]/.test(pyCode)) {
      checks.push({ name: "Используется f-строка", passed: true, label: "Используется f-строка" });
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

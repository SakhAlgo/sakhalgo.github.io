export default class Task133PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.split\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .split()", passed: true, label: "Используется .split()" });
    }

    if (/\.join\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .join()", passed: true, label: "Используется .join()" });
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

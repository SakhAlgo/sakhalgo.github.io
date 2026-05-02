export default class Task119PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bcontinue\b/.test(pyCode)) {
      checks.push({ name: "Используется continue", passed: true, label: "Используется continue" });
    }

    if (/\bbreak\b/.test(pyCode)) {
      checks.push({ name: "Используется break", passed: true, label: "Используется break" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется print()", passed: true, label: "Используется print()" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

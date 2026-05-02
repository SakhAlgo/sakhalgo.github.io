export default class Task121PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\[["\x27]яблоко["\x27]/.test(pyCode) || /\[["\x27]банан["\x27]/.test(pyCode)) {
      checks.push({ name: "Список fruits содержит фрукты", passed: true, label: "Список fruits содержит фрукты" });
    }

    if (/print\s*\(\s*fruits\s*\)/.test(pyCode)) {
      checks.push({ name: "Список выведен", passed: true, label: "Список выведен" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

export default class Task130PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\[["\x27]user2["\x27]\]\[["\x27]name["\x27]\]/.test(pyCode)) {
      checks.push({ name: "Доступ к вложенному словарю", passed: true, label: "Доступ к вложенному словарю" });
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

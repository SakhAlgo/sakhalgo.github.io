export default class Task116PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bfor\b.*\brange\b/.test(pyCode)) {
      checks.push({ name: "Используется for с range()", passed: true, label: "Используется for с range()" });
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

export default class Task110PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\blambda\b/.test(pyCode)) {
      checks.push({ name: "Используется lambda", passed: true, label: "Используется lambda" });
    }

    if (/\bdouble\s*=/.test(pyCode)) {
      checks.push({ name: "Лямбда присвоена переменной double", passed: true, label: "Лямбда присвоена переменной double" });
    }

    if (/double\s*\(\s*5\s*\)/.test(pyCode)) {
      checks.push({ name: "double(5) вызвана", passed: true, label: "double(5) вызвана" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

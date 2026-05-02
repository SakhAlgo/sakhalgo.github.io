export default class Task122PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\[0\]/.test(pyCode)) {
      checks.push({ name: "Первый элемент через [0]", passed: true, label: "Первый элемент через [0]" });
    }

    if (/\[-1\]/.test(pyCode)) {
      checks.push({ name: "Последний элемент через [-1]", passed: true, label: "Последний элемент через [-1]" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

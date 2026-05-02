export default class Task124PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    (function() {
      const slices = pyCode.match(/\[\s*[^:]*:[^:]*\]/g);
      const pass = slices && slices.length >= 2;
      checks.push({ name: "Используются срезы списка", passed: !!pass, label: "Используются срезы списка" });
    })();


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

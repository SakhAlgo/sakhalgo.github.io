export default class Task108PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/def\s+square\s*\(\s*x\s*\)/.test(pyCode)) {
      checks.push({ name: "Функция square(x) объявлена", passed: true, label: "Функция square(x) объявлена" });
    }

    if (/\breturn\b/.test(pyCode)) {
      checks.push({ name: "Функция возвращает значение", passed: true, label: "Функция возвращает значение" });
    }

    if (/square\s*\(\s*5\s*\)/.test(pyCode)) {
      checks.push({ name: "square(5) вызвана", passed: true, label: "square(5) вызвана" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

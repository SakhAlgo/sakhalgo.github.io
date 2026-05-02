export default class Task113PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bx\s*=\s*0\b/.test(pyCode)) {
      checks.push({ name: "x = 0 объявлена", passed: true, label: "x = 0 объявлена" });
    }

    if (/\bif\b/.test(pyCode) && /\belif\b/.test(pyCode) && /\belse\b/.test(pyCode)) {
      checks.push({ name: "Используется if/elif/else", passed: true, label: "Используется if/elif/else" });
    }

    if (/"Ноль"/.test(pyCode) || /\x27Ноль\x27/.test(pyCode)) {
      checks.push({ name: "Выводится Ноль", passed: true, label: "Выводится Ноль" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

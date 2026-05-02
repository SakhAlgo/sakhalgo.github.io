export default class Task112PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bx\s*=\s*3\b/.test(pyCode)) {
      checks.push({ name: "x = 3 объявлена", passed: true, label: "x = 3 объявлена" });
    }

    if (/\bif\b/.test(pyCode) && /\belse\b/.test(pyCode)) {
      checks.push({ name: "Используется if/else", passed: true, label: "Используется if/else" });
    }

    if (/"Больше"/.test(pyCode) || /\x27Больше\x27/.test(pyCode)) {
      checks.push({ name: "Выводится Больше", passed: true, label: "Выводится Больше" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

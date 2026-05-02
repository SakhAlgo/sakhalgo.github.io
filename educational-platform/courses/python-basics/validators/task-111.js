export default class Task111PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bx\s*=\s*10\b/.test(pyCode)) {
      checks.push({ name: "x = 10 объявлена", passed: true, label: "x = 10 объявлена" });
    }

    if (/\bif\s+.+:\s*$/.test(pyCode)) {
      checks.push({ name: "Используется if", passed: true, label: "Используется if" });
    }

    if (/print\s*\(\s*["\x27]Больше 5["\x27]\s*\)/.test(pyCode)) {
      checks.push({ name: "Выводится Больше 5", passed: true, label: "Выводится Больше 5" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

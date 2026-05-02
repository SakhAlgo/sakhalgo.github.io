export default class Task103PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/age\s*=/.test(pyCode)) {
      checks.push({ name: "Переменная age объявлена", passed: true, label: "Переменная age объявлена" });
    }

    if (/\bage\s*=\s*25\b/.test(pyCode)) {
      checks.push({ name: "Присвоено значение 25", passed: true, label: "Присвоено значение 25" });
    }

    if (/print\s*\(\s*age\s*\)/.test(pyCode)) {
      checks.push({ name: "print(age) используется", passed: true, label: "print(age) используется" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

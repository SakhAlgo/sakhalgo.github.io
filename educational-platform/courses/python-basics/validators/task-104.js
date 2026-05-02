export default class Task104PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/is_ready\s*=/.test(pyCode)) {
      checks.push({ name: "Переменная is_ready объявлена", passed: true, label: "Переменная is_ready объявлена" });
    }

    if (/\bis_ready\s*=\s*True\b/.test(pyCode)) {
      checks.push({ name: "Присвоено значение True", passed: true, label: "Присвоено значение True" });
    }

    if (/print\s*\(\s*is_ready\s*\)/.test(pyCode)) {
      checks.push({ name: "print(is_ready) используется", passed: true, label: "print(is_ready) используется" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

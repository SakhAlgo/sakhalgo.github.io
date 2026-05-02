export default class Task101PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/name\s*=/.test(pyCode)) {
      checks.push({ name: "Переменная name объявлена", passed: true, label: "Переменная name объявлена" });
    }

    if (/["\x27]Python["\x27]/.test(pyCode)) {
      checks.push({ name: "Присвоено значение \"Python\"", passed: true, label: "Присвоено значение \"Python\"" });
    }

    if (/print\s*\(\s*name\s*\)/.test(pyCode)) {
      checks.push({ name: "print(name) используется", passed: true, label: "print(name) используется" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

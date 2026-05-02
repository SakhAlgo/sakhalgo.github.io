export default class Task102PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/greeting\s*=/.test(pyCode)) {
      checks.push({ name: "Переменная greeting объявлена", passed: true, label: "Переменная greeting объявлена" });
    }

    if (/["\x27]Привет, мир!["\x27]/.test(pyCode)) {
      checks.push({ name: "Присвоено корректное значение", passed: true, label: "Присвоено корректное значение" });
    }

    if (/print\s*\(\s*greeting\s*\)/.test(pyCode)) {
      checks.push({ name: "print(greeting) используется", passed: true, label: "print(greeting) используется" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

export default class Task107PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/def\s+hello\s*\(\s*name\s*\)/.test(pyCode)) {
      checks.push({ name: "Функция hello(name) объявлена", passed: true, label: "Функция hello(name) объявлена" });
    }

    if (/hello\s*\(\s*["\x27]Python["\x27]\s*\)/.test(pyCode)) {
      checks.push({ name: "Функция вызвана с Python", passed: true, label: "Функция вызвана с Python" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

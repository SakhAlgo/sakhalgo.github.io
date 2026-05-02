export default class Task117PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bwhile\b/.test(pyCode)) {
      checks.push({ name: "Используется цикл while", passed: true, label: "Используется цикл while" });
    }

    if (/\bi\s*\+?=\s*1\b/.test(pyCode)) {
      checks.push({ name: "Счётчик i увеличивается", passed: true, label: "Счётчик i увеличивается" });
    }

    if (/print\s*\(\s*i\s*\)/.test(pyCode)) {
      checks.push({ name: "Значение i выводится", passed: true, label: "Значение i выводится" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

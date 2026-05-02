export default class Task115PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bx\s*=\s*7\b/.test(pyCode)) {
      checks.push({ name: "x = 7 объявлена", passed: true, label: "x = 7 объявлена" });
    }

    if (/\bif\s+.+\s+else\b/.test(pyCode)) {
      checks.push({ name: "Используется тернарный оператор", passed: true, label: "Используется тернарный оператор" });
    }

    if (/print\s*\(/.test(pyCode) && /\bresult\b/.test(pyCode)) {
      checks.push({ name: "Результат выведен через print()", passed: true, label: "Результат выведен через print()" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

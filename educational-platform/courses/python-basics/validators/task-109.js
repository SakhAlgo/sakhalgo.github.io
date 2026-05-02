export default class Task109PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/def\s+add\s*\(\s*a\s*,\s*b\s*\)/.test(pyCode)) {
      checks.push({ name: "Функция add(a, b) объявлена", passed: true, label: "Функция add(a, b) объявлена" });
    }

    if (/\breturn\s+a\s*\+\s*b\b/.test(pyCode)) {
      checks.push({ name: "Возвращается сумма a + b", passed: true, label: "Возвращается сумма a + b" });
    }

    if (/add\s*\(\s*3\s*,\s*7\s*\)/.test(pyCode) && /print\s*\(/.test(pyCode)) {
      checks.push({ name: "add(3, 7) выведена через print()", passed: true, label: "add(3, 7) выведена через print()" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

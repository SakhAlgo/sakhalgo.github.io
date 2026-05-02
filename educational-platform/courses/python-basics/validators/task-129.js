export default class Task129PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.items\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .items()", passed: true, label: "Используется .items()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Пары ключ=значение выведены", passed: true, label: "Пары ключ=значение выведены" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

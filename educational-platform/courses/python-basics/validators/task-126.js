export default class Task126PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/["\x27]name["\x27]/.test(pyCode)) {
      checks.push({ name: "Ключ name присутствует", passed: true, label: "Ключ name присутствует" });
    }

    if (/["\x27]age["\x27]/.test(pyCode)) {
      checks.push({ name: "Ключ age присутствует", passed: true, label: "Ключ age присутствует" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Словарь выведен", passed: true, label: "Словарь выведен" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

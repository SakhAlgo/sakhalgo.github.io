export default class Task127PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\btitle\b/.test(pyCode) && /\bprice\b/.test(pyCode)) {
      checks.push({ name: "Ключи title и price присутствуют", passed: true, label: "Ключи title и price присутствуют" });
    }

    if (/\[["\x27]title["\x27]\]/.test(pyCode)) {
      checks.push({ name: "Доступ к элементам через ключи", passed: true, label: "Доступ к элементам через ключи" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Значения выведены", passed: true, label: "Значения выведены" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

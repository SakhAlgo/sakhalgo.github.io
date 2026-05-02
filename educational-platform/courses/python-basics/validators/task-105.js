export default class Task105PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/name\s*=/.test(pyCode) && /age\s*=/.test(pyCode)) {
      checks.push({ name: "Переменные name и age объявлены", passed: true, label: "Переменные name и age объявлены" });
    }

    if (/f["\x27]/.test(pyCode)) {
      checks.push({ name: "Используется f-строка", passed: true, label: "Используется f-строка" });
    }

    if (/\{name\}/.test(pyCode) && /\{age\}/.test(pyCode)) {
      checks.push({ name: "Подстановка name и age в f-строку", passed: true, label: "Подстановка name и age в f-строку" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется print()", passed: true, label: "Используется print()" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

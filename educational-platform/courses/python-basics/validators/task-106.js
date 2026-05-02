export default class Task106PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/def\s+greet\s*\(/.test(pyCode)) {
      checks.push({ name: "Функция greet() объявлена", passed: true, label: "Функция greet() объявлена" });
    }

    if (/"Привет!"/.test(pyCode) || /\x27Привет!\x27/.test(pyCode)) {
      checks.push({ name: "Функция выводит Привет!", passed: true, label: "Функция выводит Привет!" });
    }

    if (/greet\s*\(/.test(pyCode)) {
      checks.push({ name: "Функция greet() вызвана", passed: true, label: "Функция greet() вызвана" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

export default class Task114PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\ba\s*=\s*5\b/.test(pyCode) && /\bb\s*=\s*10\b/.test(pyCode)) {
      checks.push({ name: "a = 5, b = 10 объявлены", passed: true, label: "a = 5, b = 10 объявлены" });
    }

    if (/\band\b/.test(pyCode)) {
      checks.push({ name: "Используется логический and", passed: true, label: "Используется логический and" });
    }

    if (/"Оба положительные"/.test(pyCode) || /\x27Оба положительные\x27/.test(pyCode)) {
      checks.push({ name: "Выводится Оба положительные", passed: true, label: "Выводится Оба положительные" });
    }


    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

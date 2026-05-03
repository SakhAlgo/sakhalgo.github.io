export default class Task117PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Используется цикл while",
        label: "Используется цикл while",
        passed: /\bwhile\b/.test(pyCode),
      },
      {
        name: "Счётчик i увеличивается",
        label: "Счётчик i увеличивается",
        passed: /\bi\s*\+?=\s*1\b/.test(pyCode),
      },
      {
        name: "Значение i выводится",
        label: "Значение i выводится",
        passed: /print\s*\(\s*i\s*\)/.test(pyCode),
      },
    ];

    const totalChecks = checks.length;
    const pointsPerCheck = 100 / totalChecks;

    const score = checks.reduce(
      (sum, check) => sum + (check.passed ? pointsPerCheck : 0),
      0
    );

    const passThreshold = config?.passThreshold ?? 80;

    return {
      passed: score >= passThreshold,
      score: Math.round(score),
      checks,
    };
  }
}
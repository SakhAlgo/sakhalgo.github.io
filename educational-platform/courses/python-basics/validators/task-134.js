export default class Task134PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Проверка через in",
        label: "Проверка через in",
        passed: /\bin\b/.test(pyCode),
      },
      {
        name: "Используется .find()",
        label: "Используется .find()",
        passed: /\.find\s*\(/.test(pyCode),
      },
      {
        name: "Результаты выведены",
        label: "Результаты выведены",
        passed: /print\s*\(/.test(pyCode),
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
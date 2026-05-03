export default class Task123PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Используется append()",
        label: "Используется append()",
        passed: /\.append\s*\(/.test(pyCode),
      },
      {
        name: "Используется remove()",
        label: "Используется remove()",
        passed: /\.remove\s*\(/.test(pyCode),
      },
      {
        name: "Результат выведен",
        label: "Результат выведен",
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
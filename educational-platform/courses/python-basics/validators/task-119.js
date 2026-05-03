export default class Task119PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Используется continue",
        label: "Используется continue",
        passed: /\bcontinue\b/.test(pyCode),
      },
      {
        name: "Используется break",
        label: "Используется break",
        passed: /\bbreak\b/.test(pyCode),
      },
      {
        name: "Используется print()",
        label: "Используется print()",
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
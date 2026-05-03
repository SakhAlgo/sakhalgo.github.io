export default class Task121PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Список fruits содержит фрукты",
        label: "Список fruits содержит фрукты",
        passed: /\[["\x27]яблоко["\x27]/.test(pyCode) || /\[["\x27]банан["\x27]/.test(pyCode),
      },
      {
        name: "Список выведен",
        label: "Список выведен",
        passed: /print\s*\(\s*fruits\s*\)/.test(pyCode),
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
export default class Task130PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Доступ к вложенному словарю",
        label: "Доступ к вложенному словарю",
        passed: /\[["\x27]user2["\x27]\]\[["\x27]name["\x27]\]/.test(pyCode),
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
export default class Task115PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "x = 7 объявлена",
        label: "x = 7 объявлена",
        passed: /\bx\s*=\s*7\b/.test(pyCode),
      },
      {
        name: "Используется тернарный оператор",
        label: "Используется тернарный оператор",
        passed: /\bif\s+.+\s+else\b/.test(pyCode),
      },
      {
        name: "Результат выведен через print()",
        label: "Результат выведен через print()",
        passed: /print\s*\(/.test(pyCode) && /\bresult\b/.test(pyCode),
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
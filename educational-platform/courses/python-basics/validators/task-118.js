export default class Task118PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Используется цикл for",
        label: "Используется цикл for",
        passed: /\bfor\b/.test(pyCode) && /\brange\b/.test(pyCode),
      },
      {
        name: "Переменная total используется",
        label: "Переменная total используется",
        passed: /\btotal\b/.test(pyCode),
      },
      {
        name: "Результат выведен через print()",
        label: "Результат выведен через print()",
        passed: /print\s*\(\s*total\s*\)/.test(pyCode),
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
export default class Task103PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Переменная age объявлена",
        label: "Переменная age объявлена",
        passed: /age\s*=/.test(pyCode),
      },
      {
        name: "Присвоено значение 25",
        label: "Присвоено значение 25",
        passed: /\bage\s*=\s*25\b/.test(pyCode),
      },
      {
        name: "print(age) используется",
        label: "print(age) используется",
        passed: /print\s*\(\s*age\s*\)/.test(pyCode),
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
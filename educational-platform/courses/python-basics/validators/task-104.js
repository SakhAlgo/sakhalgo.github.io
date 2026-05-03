export default class Task104PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Переменная is_ready объявлена",
        label: "Переменная is_ready объявлена",
        passed: /is_ready\s*=/.test(pyCode),
      },
      {
        name: "Присвоено значение True",
        label: "Присвоено значение True",
        passed: /\bis_ready\s*=\s*True\b/.test(pyCode),
      },
      {
        name: "print(is_ready) используется",
        label: "print(is_ready) используется",
        passed: /print\s*\(\s*is_ready\s*\)/.test(pyCode),
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
export default class Task111PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "x = 10 объявлена",
        label: "x = 10 объявлена",
        passed: /\bx\s*=\s*10\b/.test(pyCode),
      },
      {
        name: "Используется if",
        label: "Используется if",
        passed: /\bif\s+.+:\s*$/.test(pyCode),
      },
      {
        name: "Выводится Больше 5",
        label: "Выводится Больше 5",
        passed: /print\s*\(\s*["\x27]Больше 5["\x27]\s*\)/.test(pyCode),
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
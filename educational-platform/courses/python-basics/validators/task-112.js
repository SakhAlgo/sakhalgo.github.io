export default class Task112PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "x = 3 объявлена",
        label: "x = 3 объявлена",
        passed: /\bx\s*=\s*3\b/.test(pyCode),
      },
      {
        name: "Используется if/else",
        label: "Используется if/else",
        passed: /\bif\b/.test(pyCode) && /\belse\b/.test(pyCode),
      },
      {
        name: "Выводится Больше",
        label: "Выводится Больше",
        passed: /"Больше"/.test(pyCode) || /\x27Больше\x27/.test(pyCode),
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
export default class Task113PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "x = 0 объявлена",
        label: "x = 0 объявлена",
        passed: /\bx\s*=\s*0\b/.test(pyCode),
      },
      {
        name: "Используется if/elif/else",
        label: "Используется if/elif/else",
        passed: /\bif\b/.test(pyCode) && /\belif\b/.test(pyCode) && /\belse\b/.test(pyCode),
      },
      {
        name: "Выводится Ноль",
        label: "Выводится Ноль",
        passed: /"Ноль"/.test(pyCode) || /\x27Ноль\x27/.test(pyCode),
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
export default class Task114PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "a = 5, b = 10 объявлены",
        label: "a = 5, b = 10 объявлены",
        passed: /\ba\s*=\s*5\b/.test(pyCode) && /\bb\s*=\s*10\b/.test(pyCode),
      },
      {
        name: "Используется логический and",
        label: "Используется логический and",
        passed: /\band\b/.test(pyCode),
      },
      {
        name: "Выводится Оба положительные",
        label: "Выводится Оба положительные",
        passed: /"Оба положительные"/.test(pyCode) || /\x27Оба положительные\x27/.test(pyCode),
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
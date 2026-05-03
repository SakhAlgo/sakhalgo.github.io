export default class Task110PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Используется lambda",
        label: "Используется lambda",
        passed: /\blambda\b/.test(pyCode),
      },
      {
        name: "Лямбда присвоена переменной double",
        label: "Лямбда присвоена переменной double",
        passed: /\bdouble\s*=/.test(pyCode),
      },
      {
        name: "double(5) вызвана",
        label: "double(5) вызвана",
        passed: /double\s*\(\s*5\s*\)/.test(pyCode),
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
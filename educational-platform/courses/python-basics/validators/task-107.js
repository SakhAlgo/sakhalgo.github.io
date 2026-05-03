export default class Task107PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Функция hello(name) объявлена",
        label: "Функция hello(name) объявлена",
        passed: /def\s+hello\s*\(\s*name\s*\)/.test(pyCode),
      },
      {
        name: "Функция вызвана с Python",
        label: "Функция вызвана с Python",
        passed: /hello\s*\(\s*["\x27]Python["\x27]\s*\)/.test(pyCode),
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

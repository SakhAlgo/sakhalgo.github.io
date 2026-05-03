export default class Task106PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Функция greet() объявлена",
        label: "Функция greet() объявлена",
        passed: /def\s+greet\s*\(/.test(pyCode),
      },
      {
        name: "Функция выводит Привет!",
        label: "Функция выводит Привет!",
        passed: /"Привет!"/.test(pyCode) || /'Привет!'/.test(pyCode),
      },
      {
        name: "Функция greet() вызвана",
        label: "Функция greet() вызвана",
        passed: /greet\s*\(/.test(pyCode),
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
export default class Task108PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Функция square(x) объявлена",
        label: "Функция square(x) объявлена",
        passed: /def\s+square\s*\(\s*x\s*\)/.test(pyCode),
      },
      {
        name: "Функция возвращает значение",
        label: "Функция возвращает значение",
        passed: /\breturn\b/.test(pyCode),
      },
      {
        name: "square(5) вызвана",
        label: "square(5) вызвана",
        passed: /square\s*\(\s*5\s*\)/.test(pyCode),
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
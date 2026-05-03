export default class Task109PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Функция add(a, b) объявлена",
        label: "Функция add(a, b) объявлена",
        passed: /def\s+add\s*\(\s*a\s*,\s*b\s*\)/.test(pyCode),
      },
      {
        name: "Возвращается сумма a + b",
        label: "Возвращается сумма a + b",
        passed: /\breturn\s+a\s*\+\s*b\b/.test(pyCode),
      },
      {
        name: "add(3, 7) выведена через print()",
        label: "add(3, 7) выведена через print()",
        passed: /add\s*\(\s*3\s*,\s*7\s*\)/.test(pyCode) && /print\s*\(/.test(pyCode),
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
export default class Task105PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Переменные name и age объявлены",
        label: "Переменные name и age объявлены",
        passed: /name\s*=/.test(pyCode) && /age\s*=/.test(pyCode),
      },
      {
        name: "Используется f-строка",
        label: "Используется f-строка",
        passed: /f["']/.test(pyCode),
      },
      {
        name: "Подстановка name и age в f-строку",
        label: "Подстановка name и age в f-строку",
        passed: /\{name\}/.test(pyCode) && /\{age\}/.test(pyCode),
      },
      {
        name: "Используется print()",
        label: "Используется print()",
        passed: /print\s*\(/.test(pyCode),
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
export default class Task102PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Переменная greeting объявлена",
        label: "Переменная greeting объявлена",
        passed: /greeting\s*=/.test(pyCode),
      },
      {
        name: "Присвоено корректное значение",
        label: "Присвоено корректное значение",
        passed: /["\x27]Привет, мир!["\x27]/.test(pyCode),
      },
      {
        name: "print(greeting) используется",
        label: "print(greeting) используется",
        passed: /print\s*\(\s*greeting\s*\)/.test(pyCode),
      },
    ];

    const totalChecks = checks.length;               // 4
    const pointsPerCheck = 100 / totalChecks;         // 25 за каждую

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
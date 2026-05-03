export default class Task101PyValidator {
  async validate(pyCode, css, js, samples, config) {

    // Все проверки объявляются заранее с результатом passed: true/false
    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Переменная name объявлена",
        label: "Переменная name объявлена",
        passed: /name\s*=/.test(pyCode),
      },
      {
        name: 'Присвоено значение "Python"',
        label: 'Присвоено значение "Python"',
        passed: /["\x27]Python["\x27]/.test(pyCode),
      },
      {
        name: "print(name) используется",
        label: "print(name) используется",
        passed: /print\s*\(\s*name\s*\)/.test(pyCode),
      },
    ];

    // Каждая проверка стоит одинаковое количество баллов
    const totalChecks = checks.length;                        // 4
    const pointsPerCheck = 100 / totalChecks;                 // 25 за каждую

    // Суммируем баллы только за пройденные проверки
    const score = checks.reduce(
      (sum, check) => sum + (check.passed ? pointsPerCheck : 0),
      0
    );

    const passThreshold = config?.passThreshold ?? 80;

    return {
      passed: score >= passThreshold,  // true если >= 70%
      score: Math.round(score),        // округляем итоговый балл
      checks,
    };
  }
}
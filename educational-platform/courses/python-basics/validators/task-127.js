export default class Task127PyValidator {
  async validate(pyCode, css, js, samples, config) {

    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Ключи title и price присутствуют",
        label: "Ключи title и price присутствуют",
        passed: /\btitle\b/.test(pyCode) && /\bprice\b/.test(pyCode),
      },
      {
        name: "Доступ к элементам через ключи",
        label: "Доступ к элементам через ключи",
        passed: /\[["\x27]title["\x27]\]/.test(pyCode),
      },
      {
        name: "Значения выведены",
        label: "Значения выведены",
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
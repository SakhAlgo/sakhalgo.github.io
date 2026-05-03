export default class Task126PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [
      {
        name: "Код предоставлен",
        label: "Код предоставлен",
        passed: Boolean(pyCode && pyCode.trim().length > 0),
      },
      {
        name: "Ключ name присутствует",
        label: "Ключ name присутствует",
        passed: /["\x27]name["\x27]/.test(pyCode),
      },
      {
        name: "Ключ age присутствует",
        label: "Ключ age присутствует",
        passed: /["\x27]age["\x27]/.test(pyCode),
      },
      {
        name: "Словарь выведен",
        label: "Словарь выведен",
        passed: /print\s*\(/.test(pyCode),
      },
    ];

    const totalChecks = checks.length;
    const pointsPerCheck = 100 / totalChecks;

    const score = checks.reduce(
      (sum, check) => sum + (check.passed ? pointsPerCheck : 0),
      0,
    );

    const passThreshold = config?.passThreshold ?? 80;

    return {
      passed: score >= passThreshold,
      score: Math.round(score),
      checks,
    };
  }
}

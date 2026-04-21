export default class Task004Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasImg = /<img[^>]*>/i.test(html);
    checks.push({
      label: "Тег <img> присутствует",
      passed: hasImg,
      hint: "Добавьте тег <img>",
    });
    if (hasImg) score += 30;

    const hasSrc =
      /src=['"]https:\/\/1avatara\.ru\/pic\/space\/space021\.jpg['"]/i.test(
        html,
      );
    checks.push({
      label: 'Атрибут src="https://1avatara.ru/pic/space/space021.jpg"',
      passed: hasSrc,
      hint: 'Добавьте src="https://1avatara.ru/pic/space/space021.jpg"',
    });
    if (hasSrc) score += 35;

    const hasAlt = /alt=['"]Космос['"]/i.test(html);
    checks.push({
      label: 'Атрибут alt="Космос"',
      passed: hasAlt,
      hint: 'Добавьте alt="Космос"',
    });
    if (hasAlt) score += 35;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

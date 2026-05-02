/**
 * Валидатор для задания 051: Абзац с форматированием
 */
export default class Task051Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка 1: наличие тега p
    const hasP = /<p[^>]*>.*?<\/p>/is.test(html);
    checks.push({
      label: "Тег &lt;p&gt; присутствует",
      passed: hasP,
      hint: "Добавьте тег &lt;p&gt; с текстом",
    });
    if (hasP) score += 20;

    // Проверка 2: текст "Привет, мир!" внутри p
    const pText = /<p[^>]*>[^<]*Привет, */is.test(html);
    checks.push({
      label: 'Текст "Привет, мир!" внутри p',
      passed: pText,
      hint: 'Внутри тега p должен быть текст "Привет, мир!"',
    });
    if (pText) score += 20;

    // Проверка 3: наличие strong внутри p
    const hasStrong = /<strong[^>]*>.*?<\/strong>/i.test(html);
    checks.push({
      label: "Тег &lt;strong&gt; присутствует внутри p",
      passed: hasStrong,
      hint: "Добавьте тег &lt;strong&gt; внутри p для выделения текста",
    });
    if (hasStrong) score += 20;

    // Проверка 4: текст "мир" внутри strong
    const strongText = /<strong[^>]*>мир<\/strong>/i.test(html);
    checks.push({
      label: 'Текст "мир" внутри strong',
      passed: strongText,
      hint: 'Внутри strong должен быть текст "мир"',
    });
    if (strongText) score += 20;

    // Проверка 5: наличие em внутри p
    const hasEm = /<em[^>]*>.*?<\/em>/i.test(html);
    checks.push({
      label: "Тег em присутствует внутри p",
      passed: hasEm,
      hint: "Добавьте тег em внутри p для курсива",
    });
    if (hasEm) score += 20;

    return {
      passed: score >= (config.passThreshold || 70),
      score,
      checks,
    };
  }
}

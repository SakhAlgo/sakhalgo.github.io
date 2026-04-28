export default class Task003Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;
    const hasUl = /<ul[^>]*>/i.test(html);
    checks.push({
      label: "Тег ul присутствует",
      passed: hasUl,
      hint: "Добавьте ul",
    });
    if (hasUl) score += 20;
    const liCount = (html.match(/<li[^>]*>/gi) || []).length;
    const hasThreeLi = liCount >= 3;
    checks.push({
      label: "Три элемента li",
      passed: hasThreeLi,
      hint: "Добавьте 3 элемента li",
    });
    if (hasThreeLi) score += 30;
    const hasMoloko = /Молоко/i.test(html);
    const hasHleb = /Хлеб/i.test(html);
    const hasYaitsa = /Яйца/i.test(html);
    const allItems = hasMoloko && hasHleb && hasYaitsa;
    checks.push({
      label: "Элементы: Молоко, Хлеб, Яйца",
      passed: allItems,
      hint: "Проверьте названия продуктов",
    });
    if (allItems) score += 50;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}

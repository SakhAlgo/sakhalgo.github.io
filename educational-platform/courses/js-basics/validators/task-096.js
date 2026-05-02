export default class Task051Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия функции suggestActivity
    const hasFunction = /function\s+suggestActivity\s*\(/.test(js);
    checks.push({
      label: "Функция suggestActivity объявлена",
      passed: hasFunction,
      hint: "Создайте функцию suggestActivity(isWeekend, isRainy)",
    });
    if (hasFunction) score += 20;

    // Проверка использования if
    const hasIf = /\bif\s*\(/.test(js);
    checks.push({
      label: "Использован if",
      passed: hasIf,
      hint: "Добавьте условие if",
    });
    if (hasIf) score += 10;

    // Проверка использования else
    const hasElse = /\}\s*else\s*\{/.test(js) || /\belse\b[^{]*\{/.test(js);
    checks.push({
      label: "Использован else",
      passed: hasElse,
      hint: "Добавьте блок else",
    });
    if (hasElse) score += 10;

    // Проверка использования логического &&
    const hasAnd = /&&/.test(js);
    checks.push({
      label: "Использован логический оператор &&",
      passed: hasAnd,
      hint: "Добавьте оператор &&",
    });
    if (hasAnd) score += 15;

    // Проверка использования !
    const hasNot = /!isRainy/.test(js) || /!isWeekend/.test(js);
    checks.push({
      label: "Использован логический оператор !",
      passed: hasNot,
      hint: "Добавьте оператор ! (логическое НЕ)",
    });
    if (hasNot) score += 10;

    // Проверка возврата 'go for a walk'
    const returnsWalk = /return\s+['"]go\s*for\s*a\s*walk['"]/.test(js);
    checks.push({
      label: 'Возвращает "go for a walk" когда выходной и нет дождя',
      passed: returnsWalk,
      hint: 'Добавьте return "go for a walk"',
    });
    if (returnsWalk) score += 15;

    // Проверка возврата 'watch a movie'
    const returnsMovie = /return\s+['"]watch\s*a\s*movie['"]/.test(js);
    checks.push({
      label: 'Возвращает "watch a movie" когда выходной и дождь',
      passed: returnsMovie,
      hint: 'Добавьте return "watch a movie"',
    });
    if (returnsMovie) score += 10;

    // Проверка возврата 'work'
    const returnsWork = /return\s+['"]work['"]/.test(js);
    checks.push({
      label: 'Возвращает "work" в будний день',
      passed: returnsWork,
      hint: 'Добавьте return "work"',
    });
    if (returnsWork) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
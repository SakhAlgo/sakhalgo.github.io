export default class Task159Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка переменной i = 1
    const hasIInit = /let\s+i\s*=\s*1/.test(js) || /var\s+i\s*=\s*1/.test(js);
    checks.push({
      label: "Переменная i инициализирована как 1",
      passed: hasIInit,
      hint: "Объявите let i = 1 для внешнего цикла",
    });
    if (hasIInit) score += 10;

    // Проверка внешнего цикла while
    const hasOuterWhile = /while\s*\(\s*i\s*<=\s*3\s*\)/.test(js);
    checks.push({
      label: "Внешний цикл while (i <= 3)",
      passed: hasOuterWhile,
      hint: "Создайте внешний цикл while (i <= 3)",
    });
    if (hasOuterWhile) score += 15;

    // Проверка объявления j внутри внешнего цикла
    const hasJInitInside = /while\s*\(\s*i\s*<=\s*3\s*\)\s*\{[^}]*let\s+j\s*=\s*1/.test(js);
    checks.push({
      label: "Переменная j объявлена внутри внешнего цикла (let j = 1)",
      passed: hasJInitInside,
      hint: "Внутри внешнего цикла объявите let j = 1",
    });
    if (hasJInitInside) score += 10;

    // Проверка внутреннего цикла while
    const hasInnerWhile = /while\s*\(\s*j\s*<=\s*3\s*\)/.test(js);
    checks.push({
      label: "Внутренний цикл while (j <= 3)",
      passed: hasInnerWhile,
      hint: "Создайте внутренний цикл while (j <= 3)",
    });
    if (hasInnerWhile) score += 15;

    // Проверка формирования строки с умножением
    const hasMultiplicationFormat = /['"`][x*]\s*\+\s*j\s*\+\s*['"`]=['"`]\s*\+\s*\(\s*i\s*\*\s*j\s*\)/.test(js) ||
                                   /i\s*\+\s*['"`]x['"`]\s*\+\s*j\s*\+\s*['"`]=['"`]\s*\+\s*\(?\s*i\s*\*\s*j/.test(js) ||
                                   /`.*\$\{i\}x\$\{j\}=\$\{i\*j\}`/.test(js);
    checks.push({
      label: "Форматирование строки: i + 'x' + j + '=' + (i*j)",
      passed: hasMultiplicationFormat,
      hint: "Используйте формат i + 'x' + j + '=' + (i * j)",
    });
    if (hasMultiplicationFormat) score += 15;

    // Проверка добавления пробела
    const hasSpace = /\+\s*['"]\s*['"]/.test(js) || /\+\s*' '/.test(js) || /\+\s*" "/.test(js);
    checks.push({
      label: "Добавление пробела после каждого выражения",
      passed: hasSpace,
      hint: "Добавьте пробел в конец строки: + ' '",
    });
    if (hasSpace) score += 5;

    // Проверка инкремента j++
    const hasJIncrement = /j\s*\+\+/.test(js);
    checks.push({
      label: "Инкремент j++ внутри внутреннего цикла",
      passed: hasJIncrement,
      hint: "Добавьте j++ внутри внутреннего цикла",
    });
    if (hasJIncrement) score += 10;

    // Проверка инкремента i++ после внутреннего цикла
    const hasIIncrement = /i\s*\+\+/.test(js);
    checks.push({
      label: "Инкремент i++ после внутреннего цикла",
      passed: hasIIncrement,
      hint: "После внутреннего цикла добавьте i++",
    });
    if (hasIIncrement) score += 10;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Использован console.log для вывода",
      passed: hasConsoleLog,
      hint: "Добавьте console.log(row) для вывода каждой строки",
    });
    if (hasConsoleLog) score += 10;

    // Проверка что выводится строка (row или result)
    const hasLogWithRow = /console\.log\s*\(\s*(?:row|result)\s*(?:\.trim\(\))?\s*\)/.test(js);
    checks.push({
      label: "Вывод сформированной строки в консоль",
      passed: hasLogWithRow,
      hint: "Выведите переменную row (или result) через console.log()",
    });
    if (hasLogWithRow) score += 10;

    // Проверка порядка: сначала формирование строки, потом вывод
    const hasCorrectOrder = /while\s*\(\s*i\s*<=\s*3\s*\)\s*\{[^}]*let\s+row\s*=[^}]*while\s*\(\s*j\s*<=\s*3\s*\)\s*\{[^}]*row\s*\+=\s*[^}]*j\s*\+\+\s*\}[^}]*console\.log[^}]*i\s*\+\+/.test(js);
    if (hasCorrectOrder) {
      checks.push({
        label: "Правильный порядок операций",
        passed: true,
        hint: "Сначала формирование строки, затем вывод, потом i++",
      });
      score += 10;
    } else {
      // Проверяем хотя бы наличие всех компонентов
      checks.push({
        label: "Правильный порядок операций",
        passed: hasInnerWhile && hasConsoleLog && hasIIncrement,
        hint: "Убедитесь, что сначала формируется строка, затем вывод в консоль, потом i++",
      });
    }

    // Проверка использования trim() (необязательно)
    const hasTrim = /\.trim\(\)/.test(js);
    if (hasTrim) {
      checks.push({
        label: "Использование trim() для удаления лишнего пробела",
        passed: true,
        hint: "Хорошо, используете trim() для удаления последнего пробела",
      });
      score += 5;
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
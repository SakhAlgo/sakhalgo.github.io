export default class Task156Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции getDigits
    const hasFunction = /function\s+getDigits\s*\(/.test(js);
    checks.push({
      label: "Функция getDigits объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function getDigits(n) { ... }",
    });
    if (hasFunction) score += 15;

    // Проверка параметра функции
    const hasParameter = /function\s+getDigits\s*\(\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция принимает параметр n",
      passed: hasParameter,
      hint: "Укажите параметр: function getDigits(n)",
    });
    if (hasParameter) score += 10;

    // Проверка массива digits
    const hasArray = /let\s+digits\s*=\s*\[\]/.test(js) || /var\s+digits\s*=\s*\[\]/.test(js);
    checks.push({
      label: "Создан массив digits = []",
      passed: hasArray,
      hint: "Создайте пустой массив let digits = []",
    });
    if (hasArray) score += 10;

    // Проверка цикла while
    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован цикл while",
      passed: hasWhile,
      hint: "Добавьте цикл while (n > 0)",
    });
    if (hasWhile) score += 15;

    // Проверка условия n > 0
    const hasCondition = /while\s*\(\s*n\s*>\s*0\s*\)/.test(js);
    checks.push({
      label: "Условие цикла n > 0",
      passed: hasCondition,
      hint: "Укажите условие n > 0",
    });
    if (hasCondition) score += 10;

    // Проверка получения последней цифры n % 10
    const hasModulo = /n\s*%\s*10/.test(js);
    checks.push({
      label: "Получение последней цифры: n % 10",
      passed: hasModulo,
      hint: "Используйте n % 10 для получения последней цифры",
    });
    if (hasModulo) score += 10;

    // Проверка добавления цифры в массив
    const hasPush = /digits\.push\s*\(/.test(js);
    const hasUnshift = /digits\.unshift\s*\(/.test(js);
    const hasAddToArray = hasPush || hasUnshift;
    checks.push({
      label: "Добавление цифры в массив (push или unshift)",
      passed: hasAddToArray,
      hint: "Используйте digits.push(n % 10) или digits.unshift(n % 10)",
    });
    if (hasAddToArray) score += 10;

    // Проверка удаления последней цифры
    const hasFloorDivision = /n\s*=\s*Math\.floor\s*\(\s*n\s*\/\s*10\s*\)/.test(js);
    checks.push({
      label: "Удаление последней цифры: n = Math.floor(n / 10)",
      passed: hasFloorDivision,
      hint: "Добавьте n = Math.floor(n / 10)",
    });
    if (hasFloorDivision) score += 10;

    // Проверка переворота массива (если использован push)
    let hasReverse = true;
    if (hasPush && !hasUnshift) {
      hasReverse = /digits\.reverse\s*\(\)/.test(js);
      checks.push({
        label: "Переворот массива с помощью .reverse()",
        passed: hasReverse,
        hint: "Если используете push, добавьте return digits.reverse()",
      });
      if (hasReverse) score += 10;
    } else if (hasUnshift) {
      checks.push({
        label: "Использование unshift (не требует reverse)",
        passed: true,
        hint: "Можно использовать unshift вместо push + reverse",
      });
      score += 10;
    } else {
      checks.push({
        label: "Переворот или правильный порядок цифр",
        passed: false,
        hint: "Используйте .reverse() после цикла или добавляйте цифры через .unshift()",
      });
    }

    // Проверка return digits
    const hasReturn = /\breturn\s+digits\b/.test(js);
    checks.push({
      label: "Возврат массива digits",
      passed: hasReturn,
      hint: "Добавьте return digits (или return digits.reverse())",
    });
    if (hasReturn) score += 10;

    // Проверка вызова getDigits(123)
    const hasCall = /getDigits\s*\(\s*123\s*\)/.test(js);
    checks.push({
      label: "Вызов getDigits(123)",
      passed: hasCall,
      hint: "Вызовите функцию: getDigits(123)",
    });
    if (hasCall) score += 10;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(\s*(?:result|getDigits\s*\([^)]+\))\s*\)/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат: console.log(result) или console.log(getDigits(123))",
    });
    if (hasConsoleLog) score += 15;

    // Проверка обработки числа 0
    const hasZeroCheck = /if\s*\(\s*n\s*===\s*0\s*\)/.test(js);
    if (!hasZeroCheck) {
      // Проверяем, что функция вернёт [0] для n=0
      checks.push({
        label: "Обработка числа 0 (вернёт [0])",
        passed: false,
        hint: "Для n = 0 добавьте проверку: if (n === 0) return [0];",
      });
      // Не вычитаем баллы, но даём предупреждение
    } else {
      checks.push({
        label: "Обработка числа 0",
        passed: true,
        hint: "Хорошо, добавлена обработка для n = 0",
      });
      score += 5;
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
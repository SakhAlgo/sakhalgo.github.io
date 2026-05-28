export default class Task157Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции sumDigits
    const hasFunction = /function\s+sumDigits\s*\(/.test(js);
    checks.push({
      label: "Функция sumDigits объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function sumDigits(n) { ... }",
    });
    if (hasFunction) score += 15;

    // Проверка параметра функции
    const hasParameter = /function\s+sumDigits\s*\(\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция принимает параметр n",
      passed: hasParameter,
      hint: "Укажите параметр: function sumDigits(n)",
    });
    if (hasParameter) score += 10;

    // Проверка переменной sum
    const hasSum = /let\s+sum\s*=\s*0/.test(js) || /var\s+sum\s*=\s*0/.test(js);
    checks.push({
      label: "Переменная sum инициализирована нулём",
      passed: hasSum,
      hint: "Создайте let sum = 0",
    });
    if (hasSum) score += 10;

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

    // Проверка получения и добавления последней цифры
    const hasModuloAdd = /sum\s*\+=\s*n\s*%\s*10/.test(js);
    checks.push({
      label: "Суммирование цифр: sum += n % 10",
      passed: hasModuloAdd,
      hint: "Внутри цикла добавьте sum += n % 10",
    });
    if (hasModuloAdd) score += 15;

    // Проверка удаления последней цифры
    const hasFloorDivision = /n\s*=\s*Math\.floor\s*\(\s*n\s*\/\s*10\s*\)/.test(js);
    checks.push({
      label: "Удаление последней цифры: n = Math.floor(n / 10)",
      passed: hasFloorDivision,
      hint: "Добавьте n = Math.floor(n / 10)",
    });
    if (hasFloorDivision) score += 10;

    // Проверка return sum
    const hasReturn = /\breturn\s+sum\b/.test(js);
    checks.push({
      label: "Возврат значения sum",
      passed: hasReturn,
      hint: "Добавьте return sum в конце функции",
    });
    if (hasReturn) score += 10;

    // Проверка вызова sumDigits(123)
    const hasCall = /sumDigits\s*\(\s*123\s*\)/.test(js);
    checks.push({
      label: "Вызов sumDigits(123)",
      passed: hasCall,
      hint: "Вызовите функцию: sumDigits(123)",
    });
    if (hasCall) score += 10;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(\s*(?:result|sumDigits\s*\([^)]+\))\s*\)/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат: console.log(result) или console.log(sumDigits(123))",
    });
    if (hasConsoleLog) score += 15;

    // Проверка обработки числа 0
    const hasZeroHandling = /if\s*\(\s*n\s*===\s*0\s*\)\s*\{?\s*return\s+0/.test(js);
    if (hasZeroHandling) {
      checks.push({
        label: "Обработка числа 0",
        passed: true,
        hint: "Хорошо, добавлена обработка для n = 0",
      });
      score += 5;
    } else {
      // Проверяем, что цикл while не выполнится для n=0, sum останется 0
      const hasNoLoopZero = !/while\s*\(\s*n\s*>\s*0\s*\)/.test(js) || true;
      checks.push({
        label: "Для n = 0 функция вернёт 0 (цикл не выполнится)",
        passed: true,
        hint: "Для n = 0 цикл не выполнится, sum = 0 (это верно)",
      });
      // Не вычитаем баллы, так как это работает правильно
    }

    // Проверка обработки отрицательных чисел
    const hasAbsHandling = /Math\.abs\s*\(/.test(js);
    if (hasAbsHandling) {
      checks.push({
        label: "Обработка отрицательных чисел",
        passed: true,
        hint: "Отлично, используется Math.abs() для обработки отрицательных чисел",
      });
      score += 5;
    } else {
      checks.push({
        label: "Для отрицательных чисел рекомендуется использовать Math.abs()",
        passed: false,
        hint: "Добавьте n = Math.abs(n) для обработки отрицательных чисел",
      });
      // Не вычитаем баллы, только рекомендация
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
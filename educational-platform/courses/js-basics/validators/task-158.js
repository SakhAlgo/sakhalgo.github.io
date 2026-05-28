export default class Task158Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции fibonacci
    const hasFunction = /function\s+fibonacci\s*\(/.test(js);
    checks.push({
      label: "Функция fibonacci объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function fibonacci(n) { ... }",
    });
    if (hasFunction) score += 15;

    // Проверка параметра функции
    const hasParameter = /function\s+fibonacci\s*\(\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция принимает параметр n",
      passed: hasParameter,
      hint: "Укажите параметр: function fibonacci(n)",
    });
    if (hasParameter) score += 10;

    // Проверка обработки n <= 0
    const hasZeroOrLess = /if\s*\(\s*n\s*<=\s*0\s*\)/.test(js);
    checks.push({
      label: "Обработка случая n <= 0 (возврат [])",
      passed: hasZeroOrLess,
      hint: "Добавьте if (n <= 0) return [];",
    });
    if (hasZeroOrLess) score += 10;

    // Проверка обработки n === 1
    const hasOneCase = /if\s*\(\s*n\s*===\s*1\s*\)/.test(js);
    checks.push({
      label: "Обработка случая n === 1 (возврат [0])",
      passed: hasOneCase,
      hint: "Добавьте if (n === 1) return [0];",
    });
    if (hasOneCase) score += 10;

    // Проверка создания массива [0, 1]
    const hasArrayInit = /let\s+arr\s*=\s*\[\s*0\s*,\s*1\s*\]/.test(js) || /var\s+arr\s*=\s*\[\s*0\s*,\s*1\s*\]/.test(js);
    checks.push({
      label: "Создание массива arr = [0, 1]",
      passed: hasArrayInit,
      hint: "Создайте массив let arr = [0, 1]",
    });
    if (hasArrayInit) score += 10;

    // Проверка переменной i = 2
    const hasIInit = /let\s+i\s*=\s*2/.test(js) || /var\s+i\s*=\s*2/.test(js);
    checks.push({
      label: "Переменная i инициализирована как 2",
      passed: hasIInit,
      hint: "Создайте let i = 2 (начинаем с третьего элемента)",
    });
    if (hasIInit) score += 5;

    // Проверка цикла while
    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован цикл while",
      passed: hasWhile,
      hint: "Добавьте цикл while (i < n)",
    });
    if (hasWhile) score += 10;

    // Проверка условия i < n
    const hasCondition = /while\s*\(\s*i\s*<\s*n\s*\)/.test(js);
    checks.push({
      label: "Условие цикла i < n",
      passed: hasCondition,
      hint: "Укажите условие i < n (не i <= n)",
    });
    if (hasCondition) score += 10;

    // Проверка вычисления следующего числа Фибоначчи
    const hasFibonacciAdd = /arr\.push\s*\(\s*arr\s*\[\s*i\s*-\s*1\s*\]\s*\+\s*arr\s*\[\s*i\s*-\s*2\s*\]\s*\)/.test(js);
    checks.push({
      label: "Вычисление следующего числа: arr.push(arr[i-1] + arr[i-2])",
      passed: hasFibonacciAdd,
      hint: "Внутри цикла добавьте arr.push(arr[i-1] + arr[i-2])",
    });
    if (hasFibonacciAdd) score += 15;

    // Проверка инкремента i++
    const hasIncrement = /i\s*\+\+/.test(js);
    checks.push({
      label: "Инкремент i++ внутри цикла",
      passed: hasIncrement,
      hint: "Добавьте i++ после push",
    });
    if (hasIncrement) score += 5;

    // Проверка return arr
    const hasReturn = /\breturn\s+arr\b/.test(js);
    checks.push({
      label: "Возврат массива arr",
      passed: hasReturn,
      hint: "Добавьте return arr в конце функции",
    });
    if (hasReturn) score += 10;

    // Проверка вызова fibonacci(6)
    const hasCall = /fibonacci\s*\(\s*6\s*\)/.test(js);
    checks.push({
      label: "Вызов fibonacci(6)",
      passed: hasCall,
      hint: "Вызовите функцию: fibonacci(6)",
    });
    if (hasCall) score += 5;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(\s*(?:result|fibonacci\s*\([^)]+\)(?:\.join\([^)]+\))?)\s*\)/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат: console.log(result) или console.log(fibonacci(6))",
    });
    if (hasConsoleLog) score += 10;

    // Проверка правильности последовательности (необязательно, но полезно)
    const hasCorrectSequence = /arr\s*\[\s*i\s*-\s*1\s*\]\s*\+\s*arr\s*\[\s*i\s*-\s*2\s*\]/.test(js);
    if (hasCorrectSequence) {
      checks.push({
        label: "Правильное использование индексов для чисел Фибоначчи",
        passed: true,
        hint: "Отлично, используется arr[i-1] + arr[i-2]",
      });
      score += 5;
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
export default class Task047Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка наличия функции ageCategory
        const hasFunction = /function\s+ageCategory\s*\(/.test(js);
        checks.push({ label: 'Функция ageCategory объявлена', passed: hasFunction, hint: 'Создайте функцию ageCategory(age)' });
        if (hasFunction) score += 15;

        // Проверка использования if
        const hasIf = /\bif\s*\(/.test(js);
        checks.push({ label: 'Использован if', passed: hasIf, hint: 'Добавьте условие if' });
        if (hasIf) score += 10;

        // Проверка использования else if
        const hasElseIf = /\belse\s+if\b/.test(js);
        checks.push({ label: 'Использован else if', passed: hasElseIf, hint: 'Добавьте else if' });
        if (hasElseIf) score += 15;

        // Проверка использования else
        const hasElse = /\}\s*else\s*\{/.test(js) || /\belse\b[^{]*\{/.test(js);
        checks.push({ label: 'Использован else', passed: hasElse, hint: 'Добавьте блок else' });
        if (hasElse) score += 10;

        // Проверка возврата 'child'
        const returnsChild = /return\s+['"]child['"]/.test(js);
        checks.push({ label: 'Возвращает "child" для возраста 0-12', passed: returnsChild, hint: 'Добавьте return "child"' });
        if (returnsChild) score += 15;

        // Проверка возврата 'teen'
        const returnsTeen = /return\s+['"]teen['"]/.test(js);
        checks.push({ label: 'Возвращает "teen" для возраста 13-17', passed: returnsTeen, hint: 'Добавьте return "teen"' });
        if (returnsTeen) score += 15;

        // Проверка возврата 'adult'
        const returnsAdult = /return\s+['"]adult['"]/.test(js);
        checks.push({ label: 'Возвращает "adult" для возраста 18-64', passed: returnsAdult, hint: 'Добавьте return "adult"' });
        if (returnsAdult) score += 10;

        // Проверка возврата 'senior'
        const returnsSenior = /return\s+['"]senior['"]/.test(js);
        checks.push({ label: 'Возвращает "senior" для возраста 65+', passed: returnsSenior, hint: 'Добавьте return "senior"' });
        if (returnsSenior) score += 10;

        return { passed: score >= (config.passThreshold || 70), score, checks };
    }
}
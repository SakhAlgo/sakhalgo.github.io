/**
 * Валидатор для задания 085: Специфичность селекторов
 */
export default class Task085Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: селектор тега p
        const hasTagSelector = /p\s*\{[^}]*color\s*:\s*blue/i.test(css);
        checks.push({
            label: 'Селектор p { color: blue; } (вес 0,0,1)',
            passed: hasTagSelector,
            hint: 'Добавьте p { color: blue; } в CSS'
        });
        if (hasTagSelector) score += 30;

        // Проверка 2: селектор класса .text
        const hasClassSelector = /\.text\s*\{[^}]*color\s*:\s*green/i.test(css);
        checks.push({
            label: 'Селектор .text { color: green; } (вес 0,1,0)',
            passed: hasClassSelector,
            hint: 'Добавьте .text { color: green; } в CSS'
        });
        if (hasClassSelector) score += 35;

        // Проверка 3: селектор id #main
        const hasIdSelector = /#main\s*\{[^}]*color\s*:\s*red/i.test(css);
        checks.push({
            label: 'Селектор #main { color: red; } (вес 1,0,0)',
            passed: hasIdSelector,
            hint: 'Добавьте #main { color: red; } в CSS'
        });
        if (hasIdSelector) score += 35;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
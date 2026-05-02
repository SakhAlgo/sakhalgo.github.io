/**
 * Валидатор для задания 037: Стрелочная функция с параметром
 */
export default class Task037Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: стрелочная функция getGreeting
        const hasArrowFunc = /const\s+getGreeting\s*=\s*\(?\s*\w*\s*\)?\s*=>/.test(js);
        checks.push({
            label: 'Стрелочная функция getGreeting объявлена',
            passed: hasArrowFunc,
            hint: 'Объявите стрелочную функцию getGreeting: const getGreeting = (param) => ...'
        });
        if (hasArrowFunc) score += 30;

        // Проверка 2: параметр param
        const hasParam = /const\s+getGreeting\s*=\s*\(?\s*param\s*\)?\s*=>/.test(js);
        checks.push({
            label: 'Параметр param в функции',
            passed: hasParam,
            hint: 'Укажите параметр param: const getGreeting = (param) => ...'
        });
        if (hasParam) score += 25;

        // Проверка 3: возврат с шаблонной строкой Hello, ${param}
        const hasTemplateReturn = /return\s*`Hello,\s*\$\{.*?\}`/.test(js);
        checks.push({
            label: 'Функция возвращает `Hello, ${param}`',
            passed: hasTemplateReturn,
            hint: 'Добавьте return с шаблонной строкой: return `Hello, ${param}`'
        });
        if (hasTemplateReturn) score += 25;

        // Проверка 4: вызов getGreeting('World')
        const hasCall = /getGreeting\s*\(\s*['\"]World['\"]\s*\)/.test(js);
        checks.push({
            label: 'Функция вызвана с параметром World',
            passed: hasCall,
            hint: 'Вызовите getGreeting(\'World\')'
        });
        if (hasCall) score += 20;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}

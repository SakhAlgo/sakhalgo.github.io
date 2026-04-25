/**
 * Валидатор для задания 058: Форма ввода
 */
export default class Task058Validator {
    async validate(html, css, js, samples, config) {
        const checks = [];
        let score = 0;

        // Проверка 1: наличие тега form
        const hasForm = /<form[^>]*>.*?<\/form>/is.test(html);
        checks.push({
            label: 'Тег <form> присутствует',
            passed: hasForm,
            hint: 'Добавьте тег <form>'
        });
        if (hasForm) score += 25;

        // Проверка 2: input type="text"
        const hasInput = /<input[^>]*type\s*=\s*"text"[^>]*>/i.test(html);
        checks.push({
            label: 'Поле ввода <input type="text"> присутствует',
            passed: hasInput,
            hint: 'Добавьте <input type="text"> внутри формы'
        });
        if (hasInput) score += 25;

        // Проверка 3: наличие кнопки
        const hasButton = /<button[^>]*>.*?<\/button>/i.test(html);
        checks.push({
            label: 'Кнопка <button> присутствует',
            passed: hasButton,
            hint: 'Добавьте тег <button>'
        });
        if (hasButton) score += 25;

        // Проверка 4: текст кнопки
        const buttonText = /<button[^>]*>Отправить<\/button>/i.test(html);
        checks.push({
            label: 'Текст кнопки: "Отправить"',
            passed: buttonText,
            hint: 'Кнопка должна содержать текст "Отправить"'
        });
        if (buttonText) score += 25;

        return {
            passed: score >= (config.passThreshold || 70),
            score,
            checks
        };
    }
}
import { TaskValidator } from '../core/validator.js';

/**
 * Валидатор задания 002: Калькулятор
 */
export default class CalculatorValidator extends TaskValidator {

    async validate(userHTML, userCSS, userJS, samples, rules) {
        const doc = this.parseHTML(userHTML, userCSS, userJS);

        const checks = [
            // ── Структура ──────────────────────────────────────────
            {
                id:     'has-display',
                label:  'Дисплей калькулятора',
                weight: 10,
                passed: this.checkSelector(doc, '#display') ||
                         this.checkSelector(doc, '.display') ||
                         this.checkSelector(doc, 'input[type="text"]') ||
                         this.checkSelector(doc, 'input[readonly]') ||
                         this.checkSelector(doc, '.calc-display'),
                hint:   'Добавьте элемент дисплея с id="display" или классом .display'
            },
            {
                id:     'has-digit-buttons',
                label:  'Кнопки цифр (0-9)',
                weight: 10,
                passed: this._hasDigitButtons(doc),
                hint:   'Добавьте кнопки для цифр 0-9'
            },
            {
                id:     'has-operator-buttons',
                label:  'Кнопки операторов (+, -, *, /)',
                weight: 10,
                passed: this._hasOperatorButtons(doc),
                hint:   'Добавьте кнопки для операторов +, -, *, /'
            },
            {
                id:     'has-equals',
                label:  'Кнопка "=" (результат)',
                weight: 8,
                passed: this._hasEqualsButton(doc),
                hint:   'Добавьте кнопку равенства "="'
            },
            {
                id:     'has-clear',
                label:  'Кнопка очистки (C или AC)',
                weight: 6,
                passed: this._hasClearButton(doc),
                hint:   'Добавьте кнопку очистки C или AC'
            },

            // ── JavaScript ─────────────────────────────────────────
            {
                id:     'js-click-handler',
                label:  'Обработчики кликов по кнопкам',
                weight: 12,
                passed: this.checkJSPattern(userJS, /addEventListener|onclick|\.click/i),
                hint:   'Добавьте обработчики событий click для кнопок'
            },
            {
                id:     'js-display-update',
                label:  'Обновление дисплея',
                weight: 10,
                passed: this.checkJSPattern(userJS, /display|innerHTML|textContent|value/i),
                hint:   'В JS должно быть обновление содержимого дисплея'
            },
            {
                id:     'js-calculation',
                label:  'Вычисление результата',
                weight: 14,
                passed: this.checkJSPattern(userJS, /eval|parseFloat|parseInt|result|calculate/i) &&
                         this.checkJSPattern(userJS, /[+\-*\/]/),
                hint:   'Добавьте логику вычисления результата'
            },

            // ── CSS ────────────────────────────────────────────────
            {
                id:     'css-grid-or-flex',
                label:  'CSS Grid или Flexbox для кнопок',
                weight: 10,
                passed: userCSS.includes('grid') || userCSS.includes('flex'),
                hint:   'Используйте CSS Grid или Flexbox для расположения кнопок'
            },
            {
                id:     'css-styled',
                label:  'Стилизация кнопок и дисплея',
                weight: 10,
                passed: userCSS.length > 80,
                hint:   'Добавьте стили для кнопок и дисплея'
            }
        ];

        const score = this.buildScore(checks);
        return {
            score,
            checks,
            passed: score >= (rules?.passThreshold || 70)
        };
    }

    _hasDigitButtons(doc) {
        const buttons = Array.from(doc.querySelectorAll('button, [class*="btn"], [class*="key"]'));
        const texts   = buttons.map(b => b.textContent.trim());
        const digits  = ['0','1','2','3','4','5','6','7','8','9'];
        return digits.filter(d => texts.includes(d)).length >= 5;
    }

    _hasOperatorButtons(doc) {
        const buttons = Array.from(doc.querySelectorAll('button, [class*="btn"], [class*="key"]'));
        const texts   = buttons.map(b => b.textContent.trim());
        const ops     = ['+', '-', '*', '/', '×', '÷'];
        return ops.filter(op => texts.some(t => t.includes(op))).length >= 2;
    }

    _hasEqualsButton(doc) {
        const buttons = Array.from(doc.querySelectorAll('button, [class*="btn"], [class*="key"]'));
        return buttons.some(b => b.textContent.trim() === '=');
    }

    _hasClearButton(doc) {
        const buttons  = Array.from(doc.querySelectorAll('button, [class*="btn"], [class*="key"]'));
        const patterns = ['c', 'ac', 'ce', 'clear', 'очистить'];
        return buttons.some(b => patterns.includes(b.textContent.trim().toLowerCase()));
    }
}

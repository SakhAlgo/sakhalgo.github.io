import { TaskValidator } from '../core/validator.js';

/**
 * Валидатор задания 001: Профильная карточка пользователя
 */
export default class UserCardValidator extends TaskValidator {

    async validate(userHTML, userCSS, userJS, samples, rules) {
        const doc   = this.parseHTML(userHTML, userCSS, userJS);
        const frame = this.createTestFrame(userHTML, userCSS, userJS);

        // Небольшая задержка для рендера
        await new Promise(r => setTimeout(r, 100));

        const checks = [
            // ── Структура ──────────────────────────────────────────
            {
                id:      'has-profile-card',
                label:   'Класс .profile-card',
                weight:  10,
                passed:  this.checkSelector(doc, '.profile-card'),
                hint:    'Добавьте элемент с классом .profile-card'
            },
            {
                id:      'has-avatar',
                label:   'Элемент аватара (.avatar)',
                weight:  8,
                passed:  this.checkSelector(doc, '.avatar') || this.checkSelector(doc, 'img'),
                hint:    'Добавьте изображение аватара с классом .avatar'
            },
            {
                id:      'has-name',
                label:   'Заголовок h2',
                weight:  8,
                passed:  this.checkSelector(doc, 'h2'),
                hint:    'Добавьте имя пользователя в теге <h2>'
            },
            {
                id:      'has-job',
                label:   'Профессия (.job)',
                weight:  8,
                passed:  this.checkSelector(doc, '.job') || this.checkSelector(doc, 'p'),
                hint:    'Добавьте профессию с классом .job'
            },
            {
                id:      'has-button',
                label:   'Кнопка (.btn)',
                weight:  8,
                passed:  this.checkSelector(doc, '.btn') || this.checkSelector(doc, 'button'),
                hint:    'Добавьте кнопку с классом .btn'
            },

            // ── Текст ──────────────────────────────────────────────
            {
                id:      'name-text',
                label:   'Имя "Алексей Иванов"',
                weight:  10,
                passed:  this.checkText(doc, 'h2', ['алексей', 'иванов']),
                hint:    'В <h2> должны быть "Алексей" и "Иванов"'
            },
            {
                id:      'job-text',
                label:   'Профессия "Frontend-разработчик"',
                weight:  10,
                passed:  this.checkText(doc, '.job', ['frontend', 'разработчик']) ||
                          this.checkText(doc, 'p', ['frontend', 'разработчик']),
                hint:    'В .job должны быть "Frontend" и "разработчик"'
            },
            {
                id:      'btn-text',
                label:   'Текст кнопки "Подписаться"',
                weight:  6,
                passed:  this.checkText(doc, '.btn', ['подписаться']) ||
                          this.checkText(doc, 'button', ['подписаться']),
                hint:    'Кнопка должна содержать текст "Подписаться"'
            },

            // ── CSS ────────────────────────────────────────────────
            {
                id:      'card-radius',
                label:   'Скругление карточки (border-radius)',
                weight:  8,
                passed:  this.checkCSSRule(userCSS, '.profile-card', 'border-radius') ||
                          this.checkComputedStyle(frame, '.profile-card', 'borderRadius'),
                hint:    'Добавьте border-radius к .profile-card'
            },
            {
                id:      'card-shadow',
                label:   'Тень карточки (box-shadow)',
                weight:  8,
                passed:  this.checkCSSRule(userCSS, '.profile-card', 'box-shadow') ||
                          userCSS.toLowerCase().includes('box-shadow'),
                hint:    'Добавьте box-shadow к .profile-card'
            },
            {
                id:      'flex-centering',
                label:   'Flex-центрирование карточки',
                weight:  8,
                passed:  (this.checkCSSRule(userCSS, 'body', 'display') || userCSS.includes('display: flex') || userCSS.includes('display:flex')) &&
                          (userCSS.includes('justify-content') || userCSS.includes('align-items')),
                hint:    'Используйте display:flex с justify-content и align-items на body'
            },
            {
                id:      'card-background',
                label:   'Фон карточки',
                weight:  8,
                passed:  this.checkCSSRule(userCSS, '.profile-card', 'background') ||
                          userCSS.toLowerCase().includes('background'),
                hint:    'Добавьте background-color к .profile-card'
            }
        ];

        this.removeTestFrame(frame);
        const score = this.buildScore(checks);

        return {
            score,
            checks,
            passed: score >= (rules?.passThreshold || 70)
        };
    }
}

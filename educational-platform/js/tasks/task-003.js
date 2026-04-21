import { TaskValidator } from '../core/validator.js';

/**
 * Валидатор задания 003: Анимированная кнопка
 */
export default class AnimatedButtonValidator extends TaskValidator {

    async validate(userHTML, userCSS, userJS, samples, rules) {
        const doc = this.parseHTML(userHTML, userCSS, userJS);

        const checks = [
            // ── HTML ───────────────────────────────────────────────
            {
                id:     'has-button',
                label:  'Наличие кнопки',
                weight: 10,
                passed: this.checkSelector(doc, 'button') || this.checkSelector(doc, '.btn'),
                hint:   'Добавьте элемент кнопки <button>'
            },
            {
                id:     'btn-text',
                label:  'Текст кнопки',
                weight: 6,
                passed: (doc.querySelector('button') || doc.querySelector('.btn'))?.textContent.trim().length > 0,
                hint:   'Добавьте текст внутри кнопки'
            },

            // ── CSS Transitions ────────────────────────────────────
            {
                id:     'has-transition',
                label:  'CSS-переход (transition)',
                weight: 15,
                passed: userCSS.includes('transition'),
                hint:   'Добавьте свойство transition к кнопке'
            },
            {
                id:     'has-hover',
                label:  'Состояние :hover',
                weight: 12,
                passed: userCSS.includes(':hover'),
                hint:   'Добавьте стили для состояния кнопки при наведении (:hover)'
            },
            {
                id:     'hover-changes',
                label:  'Hover меняет: цвет/тень/масштаб',
                weight: 12,
                passed: this._hoverHasChanges(userCSS),
                hint:   'В :hover измените хотя бы одно из: background, color, transform, box-shadow'
            },

            // ── CSS Animation ──────────────────────────────────────
            {
                id:     'has-animation',
                label:  'CSS-анимация (@keyframes или animation)',
                weight: 15,
                passed: userCSS.includes('@keyframes') || userCSS.includes('animation'),
                hint:   'Добавьте @keyframes анимацию (пульсация, мерцание и т.д.)'
            },
            {
                id:     'has-transform',
                label:  'Трансформация (transform)',
                weight: 10,
                passed: userCSS.includes('transform') || userCSS.includes('scale') || userCSS.includes('translate'),
                hint:   'Используйте transform: scale() или translate() для анимации'
            },

            // ── Active / Focus ─────────────────────────────────────
            {
                id:     'has-active',
                label:  'Состояние :active или :focus',
                weight: 10,
                passed: userCSS.includes(':active') || userCSS.includes(':focus'),
                hint:   'Добавьте стили для :active (нажатие) или :focus'
            },

            // ── Styling ────────────────────────────────────────────
            {
                id:     'styling-basic',
                label:  'Базовая стилизация (padding, border-radius)',
                weight: 10,
                passed: userCSS.includes('padding') && (userCSS.includes('border-radius') || userCSS.includes('border-radius')),
                hint:   'Добавьте padding и border-radius к кнопке'
            },
            {
                id:     'cursor-pointer',
                label:  'Курсор pointer',
                weight: 5,
                passed: userCSS.includes('cursor: pointer') || userCSS.includes('cursor:pointer'),
                hint:   'Добавьте cursor: pointer к кнопке'
            },

            // ── Centering ─────────────────────────────────────────
            {
                id:     'centered',
                label:  'Кнопка центрирована на странице',
                weight: 5,
                passed: (userCSS.includes('display: flex') || userCSS.includes('display:flex') || userCSS.includes('text-align: center') || userCSS.includes('margin: auto')),
                hint:   'Разместите кнопку по центру страницы'
            }
        ];

        const score = this.buildScore(checks);
        return {
            score,
            checks,
            passed: score >= (rules?.passThreshold || 70)
        };
    }

    _hoverHasChanges(css) {
        const hoverRegex = /:hover\s*\{([^}]+)\}/gi;
        let match;
        const changeProps = ['background', 'color', 'transform', 'box-shadow', 'border', 'opacity', 'scale'];
        while ((match = hoverRegex.exec(css)) !== null) {
            const block = match[1].toLowerCase();
            if (changeProps.some(p => block.includes(p))) return true;
        }
        return false;
    }
}

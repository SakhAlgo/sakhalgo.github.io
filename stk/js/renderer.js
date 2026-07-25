/**
 * RENDERER MODULE
 * Отвечает за отрисовку интерфейса
 */

class Renderer {
    constructor(container) {
        this.container = container;
        console.log('🎨 Renderer инициализирован');
    }

    renderQuestion(question, index, total, userAnswer, onSelect, onCheck, onNext, onFinish, checked) {
        if (!question) {
            this.container.innerHTML = `<div class="empty-state">Нет вопросов для этого раздела.</div>`;
            return;
        }

        const type = question.type || 'radio';
        const inputType = type === 'checkbox' ? 'checkbox' : 'radio';
        const name = `q${index}`;
        const selected = userAnswer || [];

        let html = `
            <div class="question-card">
                <div class="question-header">
                    <div class="question-counter">Вопрос ${index + 1} из ${total}</div>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="options">
        `;

        question.options.forEach((opt, optIdx) => {
            const isSelected = selected.includes(optIdx);
            const isCorrect = checked && question.correct.includes(optIdx);
            const isWrong = checked && isSelected && !question.correct.includes(optIdx);
            let optClass = 'option-item';
            if (isSelected) optClass += ' selected';
            if (isCorrect) optClass += ' correct';
            if (isWrong) optClass += ' wrong';

            html += `
                <div class="${optClass}" data-qidx="${index}" data-optidx="${optIdx}">
                    <input type="${inputType}" name="${name}" value="${optIdx}" ${isSelected ? 'checked' : ''} ${checked ? 'disabled' : ''}>
                    <label>${opt}</label>
                    ${isCorrect ? '<span class="mark-correct">✓</span>' : ''}
                    ${isWrong ? '<span class="mark-wrong">✗</span>' : ''}
                </div>
            `;
        });

        // html += `
        //         </div>
        //         <div class="feedback-area" id="feedbackArea">
        // `;

        // if (checked) {
        //     const answerResult = DataAPI.checkAnswer(question, selected);
        //     html += `<div class="feedback ${answerResult ? 'feedback-pass' : 'feedback-fail'}">
        //         ${answerResult
        //             ? '<span class="feedback-icon">✅</span> Правильно!'
        //             : `<span class="feedback-icon">❌</span> Неправильно. Правильный ответ: ${this.formatCorrectAnswer(question)}`
        //         }
        //     </div>`;
        // }

        html += `
                </div>
                <div class="nav-buttons">
                    <div class="left-group">
                    </div>
                    <div class="right-group">
                        ${!checked ? `<button class="btn" id="checkBtn">🔍 Проверить</button>` : ''}
                        ${checked && index < total - 1 ? `<button class="btn" id="nextQuestionBtn">Далее →</button>` : ''}
                        ${checked && index >= total - 1 ? `<button class="btn" id="finishTestBtn">✅ Завершить тест</button>` : ''}
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;

        if (!checked) {
            this.container.querySelectorAll('.option-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    const qIdx = parseInt(this.dataset.qidx);
                    const optIdx = parseInt(this.dataset.optidx);
                    if (onSelect) onSelect(qIdx, optIdx, this);
                });
            });
        }

        const checkBtn = document.getElementById('checkBtn');
        if (checkBtn && onCheck) {
            checkBtn.addEventListener('click', onCheck);
        }

        const nextBtn = document.getElementById('nextQuestionBtn');
        if (nextBtn && onNext) {
            nextBtn.addEventListener('click', onNext);
        }

        const finishBtn = document.getElementById('finishTestBtn');
        if (finishBtn && onFinish) {
            finishBtn.addEventListener('click', onFinish);
        }
    }

    formatCorrectAnswer(question) {
        return question.correct.map(idx => question.options[idx]).join(', ');
    }

    renderEmpty(message = 'Нажмите «Начать тест» для старта') {
        this.container.innerHTML = `<div class="empty-state">${message}</div>`;
    }

    renderResults(correct, total, percent, time, grade) {
        const correctSpan = document.getElementById('correctCount');
        const totalSpan = document.getElementById('totalCount');
        const timeSpan = document.getElementById('resultTime');
        const detailEl = document.getElementById('resultDetail');
        const gradeDisplay = document.getElementById('gradeDisplay');

        if (correctSpan) correctSpan.textContent = correct;
        if (totalSpan) totalSpan.textContent = total;
        if (timeSpan) timeSpan.textContent = time;
        if (detailEl) {
            detailEl.innerHTML = `Правильных ответов: ${correct} из ${total} (${percent.toFixed(1)}%)`;
        }
        if (gradeDisplay) {
            gradeDisplay.textContent = grade.text;
            gradeDisplay.className = `grade ${grade.class}`;
        }
    }

    showResults() {
        const el = document.getElementById('resultArea');
        if (el) el.classList.remove('hidden');
    }

    hideResults() {
        const el = document.getElementById('resultArea');
        if (el) el.classList.add('hidden');
    }

    disableInputs() {
        this.container.querySelectorAll('input').forEach(inp => inp.disabled = true);
    }

    hideNavigation() {
        const buttons = this.container.querySelectorAll('.nav-buttons button');
        buttons.forEach(b => b.style.display = 'none');
    }
}

// Экспортируем в глобальную область
window.Renderer = Renderer;
console.log('✅ Renderer загружен');
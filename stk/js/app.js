/**
 * APP MODULE
 * Главный контроллер приложения
 */

class App {
    constructor() {
        // DOM элементы
        this.tabsContainer = document.getElementById('tabsContainer');
        this.questionsContainer = document.getElementById('questionsContainer');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.questionCountInput = document.getElementById('questionCount');
        this.startBtn = document.getElementById('startTestBtn');
        this.resetBtn = document.getElementById('resetTestBtn');
        this.retryBtn = document.getElementById('retryTestBtn');

        // Состояние
        this.currentSection = 'tv';
        this.questions = [];
        this.userAnswers = [];
        this.currentIndex = 0;
        this.testActive = false;
        this.testFinished = false;

        // Проверяем наличие API
        if (typeof DataAPI === 'undefined') {
            console.error('❌ DataAPI не загружен!');
            alert('Ошибка загрузки данных! Проверьте консоль.');
            return;
        }

        // Инициализация
        this.renderer = new Renderer(this.questionsContainer);
        this.timer = new Timer(
            this.timerDisplay,
            null,
            () => this.finishTest()
        );

        this.init();
    }

    init() {
        console.log('🚀 App инициализирован');
        
        // Загрузка сохранённого состояния
        const savedState = StorageAPI.load();

        if (savedState && savedState.questions && savedState.questions.length > 0) {
            console.log('📂 Восстановлено сохранённое состояние');
            this.restoreState(savedState);
        } else {
            this.switchSection('tv');
        }

        // События
        this.bindEvents();

        // Настройка теории
        this.setupTheoryToggles();
        
        console.log('✅ App готов к работе');
    }

    bindEvents() {
        // Вкладки
        this.tabsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (btn && btn.dataset.section !== this.currentSection) {
                this.switchSection(btn.dataset.section);
            }
        });

        // Кнопки
        this.startBtn.addEventListener('click', () => {
            console.log('▶ Нажата кнопка "Начать тест"');
            this.startTest();
        });
        
        this.resetBtn.addEventListener('click', () => {
            console.log('🔄 Нажата кнопка "Сброс"');
            this.resetTest();
        });
        
        this.retryBtn.addEventListener('click', () => {
            console.log('🔄 Нажата кнопка "Пройти заново"');
            this.startTest();
        });
    }

    setupTheoryToggles() {
        document.querySelectorAll('.toggle-theory').forEach(btn => {
            btn.addEventListener('click', function() {
                const section = this.dataset.section;
                const body = document.getElementById(`theoryBody${capitalize(section)}`);
                if (body) {
                    const isHidden = body.classList.contains('hidden');
                    body.classList.toggle('hidden');
                    this.textContent = isHidden ? 'Скрыть теорию' : 'Показать теорию';
                    
                    if (isHidden && typeof DataAPI !== 'undefined') {
                        DataAPI.renderTheory(section, body);
                        console.log(`📘 Теория для ${section} отображена`);
                    }
                }
            });
        });
    }

    switchSection(section) {
        if (this.testActive && !this.testFinished) {
            if (!confirm('Тест активен. Переключиться? Прогресс будет сброшен.')) return;
        }

        this.clearTest();
        this.currentSection = section;

        // Обновляем вкладки
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === section);
        });

        // Обновляем секции
        document.querySelectorAll('.section-content').forEach(el => {
            el.classList.remove('active');
        });
        const sectionEl = document.getElementById(`section-${section}`);
        if (sectionEl) {
            sectionEl.classList.add('active');
        }

        // Скрываем теорию при переключении
        const body = document.getElementById(`theoryBody${capitalize(section)}`);
        if (body) {
            body.classList.add('hidden');
            const btn = document.querySelector(`.toggle-theory[data-section="${section}"]`);
            if (btn) {
                btn.textContent = 'Показать теорию';
            }
        }

        this.renderer.renderEmpty();
        StorageAPI.clear();
        console.log(`📂 Переключено на раздел: ${section}`);
    }

    startTest() {
        if (this.testActive && !this.testFinished) {
            if (!confirm('Тест уже запущен. Начать заново?')) return;
        }

        const count = parseInt(this.questionCountInput.value) || 20;
        console.log(`📝 Запуск теста для раздела ${this.currentSection}, вопросов: ${count}`);
        
        this.clearTest();

        if (typeof DataAPI === 'undefined') {
            alert('Ошибка загрузки данных!');
            return;
        }

        const questions = DataAPI.getTestQuestions(this.currentSection, count);
        console.log(`📋 Получено вопросов: ${questions.length}`);
        
        if (questions.length === 0) {
            alert('Нет вопросов для этого раздела!');
            return;
        }

        this.questions = questions;
        this.userAnswers = this.questions.map(() => []);
        this.checkedQuestions = this.questions.map(() => false);
        this.currentIndex = 0;
        this.testActive = true;
        this.testFinished = false;

        this.renderer.hideResults();

        // Прячем секции теории во время теста
        document.querySelectorAll('.section-content.active').forEach(el => el.classList.remove('active'));

        // Запускаем таймер
        this.timer.start(0);

        this.renderQuestion();
        this.saveState();
        console.log('✅ Тест запущен');
    }

    renderQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.finishTest();
            return;
        }

        const q = this.questions[this.currentIndex];
        const answer = this.userAnswers[this.currentIndex] || [];
        const isChecked = this.checkedQuestions[this.currentIndex];

        this.renderer.renderQuestion(
            q,
            this.currentIndex,
            this.questions.length,
            answer,
            (qIdx, optIdx, element) => this.handleSelect(qIdx, optIdx, element),
            () => this.checkAnswer(),
            () => this.nextQuestion(),
            () => this.finishTest(),
            isChecked
        );
    }

    checkAnswer() {
        this.checkedQuestions[this.currentIndex] = true;
        this.renderQuestion();
        this.saveState();
    }

    handleSelect(qIdx, optIdx, element) {
        if (!this.testActive || this.testFinished) return;

        const q = this.questions[qIdx];
        if (!q) return;

        const input = element.querySelector('input');

        if (q.type === 'radio') {
            const parent = element.closest('.options');
            parent.querySelectorAll('.option-item').forEach(el => {
                el.classList.remove('selected');
            });
            element.classList.add('selected');
            input.checked = true;
            this.userAnswers[qIdx] = [optIdx];
        } else if (q.type === 'checkbox') {
            if (!this.userAnswers[qIdx]) this.userAnswers[qIdx] = [];
            const arr = this.userAnswers[qIdx];
            const pos = arr.indexOf(optIdx);
            if (pos !== -1) {
                arr.splice(pos, 1);
                element.classList.remove('selected');
                input.checked = false;
            } else {
                arr.push(optIdx);
                arr.sort((a, b) => a - b);
                element.classList.add('selected');
                input.checked = true;
            }
            this.userAnswers[qIdx] = arr;
        }

        this.saveState();
    }

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.renderQuestion();
            this.saveState();
        }
    }

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderQuestion();
            this.saveState();
        }
    }

    finishTest() {
        if (this.testFinished) return;

        console.log('🏁 Завершение теста');
        this.testActive = false;
        this.testFinished = true;
        this.timer.stop();

        if (typeof DataAPI !== 'undefined') {
            const results = DataAPI.calculateResults(this.questions, this.userAnswers);
            const grade = DataAPI.getGrade(results.percent);

            console.log(`📊 Результаты: ${results.correct}/${results.total} (${results.percent.toFixed(1)}%)`);
            console.log(`🏆 Оценка: ${grade.text}`);

            this.renderer.renderResults(
                results.correct,
                results.total,
                results.percent,
                this.timer.formatTime(this.timer.getTime()),
                grade
            );
        } else {
            this.renderer.renderResults(0, 0, 0, '00:00', { text: 'Ошибка', class: 'poor' });
        }
        
        this.renderer.showResults();
        this.renderer.disableInputs();
        this.renderer.hideNavigation();

        this.saveState();
    }

    resetTest() {
        if (this.testActive && !this.testFinished) {
            if (!confirm('Сбросить текущий тест?')) return;
        }
        this.clearTest();
        this.switchSection(this.currentSection);
        console.log('🔄 Тест сброшен');
    }

    clearTest() {
        this.timer.stop();
        this.timer.reset();
        this.testActive = false;
        this.testFinished = false;
        this.questions = [];
        this.userAnswers = [];
        this.checkedQuestions = [];
        this.currentIndex = 0;
        this.renderer.hideResults();
        StorageAPI.clear();
    }

    saveState() {
        StorageAPI.save({
            section: this.currentSection,
            questions: this.questions,
            answers: this.userAnswers,
            checked: this.checkedQuestions,
            current: this.currentIndex,
            timer: this.timer.getTime(),
            active: this.testActive,
            finished: this.testFinished
        });
    }

    restoreState(state) {
        console.log('📂 Восстановление состояния...');
        this.currentSection = state.section || 'tv';
        this.questions = state.questions || [];
        this.userAnswers = state.answers || [];
        this.checkedQuestions = state.checked || this.questions.map(() => false);
        this.currentIndex = state.current || 0;
        this.testActive = state.active || false;
        this.testFinished = state.finished || false;

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === this.currentSection);
        });
        document.querySelectorAll('.section-content').forEach(el => {
            el.classList.remove('active');
        });
        const sectionEl = document.getElementById(`section-${this.currentSection}`);
        if (sectionEl) sectionEl.classList.add('active');

        if (this.testActive) {
            this.timer.start(state.timer || 0);
            this.renderQuestion();
            console.log('▶ Тест восстановлен (активный)');
        } else if (this.testFinished) {
            this.timer.updateDisplay();
            this.renderQuestion();
            this.renderer.disableInputs();
            this.renderer.hideNavigation();

            if (typeof DataAPI !== 'undefined') {
                const results = DataAPI.calculateResults(this.questions, this.userAnswers);
                const grade = DataAPI.getGrade(results.percent);
                this.renderer.renderResults(
                    results.correct,
                    results.total,
                    results.percent,
                    this.timer.formatTime(this.timer.getTime()),
                    grade
                );
            }
            this.renderer.showResults();
            console.log('📊 Тест восстановлен (завершён)');
        } else {
            this.renderer.renderEmpty();
            console.log('⏸ Тест не активен');
        }
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM загружен, инициализация App...');
    
    const missing = [];
    if (typeof DataAPI === 'undefined') missing.push('DataAPI');
    if (typeof StorageAPI === 'undefined') missing.push('StorageAPI');
    if (typeof Timer === 'undefined') missing.push('Timer');
    if (typeof Renderer === 'undefined') missing.push('Renderer');
    
    if (missing.length > 0) {
        console.error(`❌ Не загружены модули: ${missing.join(', ')}`);
        alert(`Ошибка загрузки модулей: ${missing.join(', ')}`);
        return;
    }
    
    new App();
});
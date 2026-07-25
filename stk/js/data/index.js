/**
 * DATA MODULE - Главный файл
 * Регистрирует все разделы и их данные
 */

const SECTION_DATA = {};

function registerSection(key, data) {
    SECTION_DATA[key] = data;
}

const DataAPI = {
    getSections() {
        return Object.keys(SECTION_DATA);
    },

    getSectionData(section) {
        return SECTION_DATA[section] || null;
    },

    getQuestions(section) {
        const data = SECTION_DATA[section];
        return data ? data.questions : [];
    },

    getTestQuestions(section, count) {
        const questions = this.getQuestions(section);
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length)).map(q => {
            const indices = q.options.map((_, i) => i);
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            const indexMap = {};
            indices.forEach((oldIdx, newIdx) => { indexMap[oldIdx] = newIdx; });
            return {
                ...q,
                options: indices.map(i => q.options[i]),
                correct: q.correct.map(oldIdx => indexMap[oldIdx]).sort((a, b) => a - b)
            };
        });
    },

    checkAnswer(question, userAnswer) {
        if (!question || !question.correct) return false;
        if (userAnswer.length !== question.correct.length) return false;
        const sortedUser = [...userAnswer].sort((a, b) => a - b);
        const sortedCorrect = [...question.correct].sort((a, b) => a - b);
        return sortedUser.every((val, idx) => val === sortedCorrect[idx]);
    },

    calculateResults(questions, answers) {
        let correct = 0;
        const total = questions.length;
        questions.forEach((q, idx) => {
            const answer = answers[idx] || [];
            if (this.checkAnswer(q, answer)) correct++;
        });
        return {
            correct,
            total,
            percent: total > 0 ? (correct / total) * 100 : 0
        };
    },

    getGrade(percent) {
        if (percent >= 90) return { text: 'Отлично', class: 'excellent' };
        if (percent >= 70) return { text: 'Хорошо', class: 'good' };
        if (percent >= 50) return { text: 'Удовлетворительно', class: 'satisfactory' };
        return { text: 'Плохо', class: 'poor' };
    },

    renderTheory(section, element) {
        const data = SECTION_DATA[section];
        if (data && data.theory && element) {
            element.innerHTML = data.theory;
            element.classList.remove('hidden');
        }
    }
};

// Регистрируем раздел TV
if (typeof TV_THEORY !== 'undefined' && typeof TV_QUESTIONS !== 'undefined') {
    registerSection('tv', {
        name: 'Кабельное ТВ',
        icon: '📺',
        theory: TV_THEORY,
        questions: TV_QUESTIONS
    });
    console.log('✅ Раздел TV зарегистрирован');
} else {
    console.warn('⚠️ Данные TV не найдены');
}

// Регистрируем раздел Internet
if (typeof INTERNET_THEORY !== 'undefined' && typeof INTERNET_QUESTIONS !== 'undefined') {
    registerSection('internet', {
        name: 'Интернет',
        icon: '🌐',
        theory: INTERNET_THEORY,
        questions: INTERNET_QUESTIONS
    });
    console.log('✅ Раздел Internet зарегистрирован');
} else {
    console.warn('⚠️ Данные Internet не найдены');
}

// Регистрируем раздел Domofon
if (typeof DOMOFON_THEORY !== 'undefined' && typeof DOMOFON_QUESTIONS !== 'undefined') {
    registerSection('domofon', {
        name: 'Домофоны',
        icon: '📞',
        theory: DOMOFON_THEORY,
        questions: DOMOFON_QUESTIONS
    });
    console.log('✅ Раздел Domofon зарегистрирован');
} else {
    console.warn('⚠️ Данные Domofon не найдены');
}

// Регистрируем раздел Oformlenie
if (typeof OFORMLENIE_THEORY !== 'undefined' && typeof OFORMLENIE_QUESTIONS !== 'undefined') {
    registerSection('oformlenie', {
        name: 'Оформление',
        icon: '📋',
        theory: OFORMLENIE_THEORY,
        questions: OFORMLENIE_QUESTIONS
    });
    console.log('✅ Раздел Oformlenie зарегистрирован');
} else {
    console.warn('⚠️ Данные Oformlenie не найдены');
}

// Проверяем загрузку
console.log(`📊 Загружено разделов: ${DataAPI.getSections().length}`);
console.log(`📋 Список разделов: ${DataAPI.getSections().join(', ')}`);

// Экспортируем в глобальную область
window.TEST_DATA = SECTION_DATA;
window.DataAPI = DataAPI;

console.log('✅ DataAPI полностью загружен!');